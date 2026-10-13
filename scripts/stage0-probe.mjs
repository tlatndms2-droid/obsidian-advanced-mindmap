import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';

const bundledRequire = createRequire('C:/Users/tlatn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = bundledRequire('playwright');
const port = Number(process.argv[2] || 9257);
const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
try {
  const candidates = browser.contexts().flatMap(context => context.pages());
  const matched = [];
  for (const page of candidates) {
    if ((await page.title()).includes('Canvas-Mindmap-Sandbox')) matched.push(page);
  }
  if (matched.length !== 1) throw new Error('Expected exactly one Canvas-Mindmap-Sandbox page.');
  const page = matched[0];
  const target = await page.evaluate(() => ({ title: document.title, vault: app.vault.adapter.basePath }));
  const expected = 'C:\\Users\\tlatn\\AppData\\Local\\CanvasMindmap-Stage0-20261013\\Canvas-Mindmap-Sandbox';
  if (target.vault !== expected) throw new Error('Sandbox path mismatch; refusing to operate.');
  const report = await page.evaluate(() => {
    const methods = object => {
      const names = new Set();
      for (let p = object; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
        for (const key of Object.getOwnPropertyNames(p)) {
          const d = Object.getOwnPropertyDescriptor(p, key);
          if (typeof d?.value === 'function') names.add(key);
        }
      }
      return [...names].sort();
    };
    return {
      pluginMethods: methods(app.plugins),
      canvasPluginEnabled: !!app.internalPlugins.getPluginById('canvas')?.enabled,
      loadedFoundation: !!app.plugins.plugins['canvas-mindmap'],
      workspaceMethods: methods(app.workspace).filter(name => /leaf|active|trigger|layout/i.test(name))
    };
  });
  const artifactRoot = path.resolve('verification/artifacts/stage0');
  await mkdir(artifactRoot, { recursive: true });
  await writeFile(path.join(artifactRoot, 'environment.json'), JSON.stringify({ ...target, ...report }, null, 2));
  if (!process.argv[3] || process.argv[3] === 'canvas') console.log(JSON.stringify({ ...target, ...report }, null, 2));
  if (process.argv[3] === 'canvas') {
    const canvasReport = await page.evaluate(async () => {
      await app.plugins.loadManifests();
      await app.plugins.setEnable(true);
      await app.plugins.enablePluginAndSave('canvas-mindmap');
      const fixture = 'STAGE0-한글-Canvas.canvas';
      const data = { nodes: [
        { id: 'a', type: 'text', text: '기준 카드 A', x: 0, y: 0, width: 180, height: 80 },
        { id: 'b', type: 'text', text: '기존 카드 B', x: 300, y: 0, width: 180, height: 80 },
        { id: 'c', type: 'text', text: '기존 카드 C', x: 300, y: 180, width: 180, height: 80 }
      ], edges: [{ id: 'ab', fromNode: 'a', fromSide: 'right', toNode: 'b', toSide: 'left' }] };
      let file = app.vault.getAbstractFileByPath(fixture);
      if (!file) file = await app.vault.create(fixture, JSON.stringify(data, null, 2));
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(file);
      const canvas = leaf.view.canvas;
      const methods = object => {
        const names = new Set();
        for (let p = object; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
          for (const key of Object.getOwnPropertyNames(p)) {
            const descriptor = Object.getOwnPropertyDescriptor(p, key);
            if (typeof descriptor?.value === 'function') names.add(key);
          }
        }
        return [...names].sort();
      };
      return {
        version: app.plugins.plugins['canvas-mindmap']?.manifest.version,
        stage: app.plugins.plugins['canvas-mindmap']?.implementationStage,
        canvasKeys: Object.keys(canvas), canvasMethods: methods(canvas),
        historyKeys: Object.keys(canvas.history || {}), historyMethods: methods(canvas.history),
        nodeKeys: Object.keys(canvas.nodes.get('a')), nodeMethods: methods(canvas.nodes.get('a')),
        viewMethods: methods(leaf.view),
        data: canvas.getData()
      };
    });
    await writeFile(path.join(artifactRoot, 'canvas-capabilities.json'), JSON.stringify(canvasReport, null, 2));
    await page.screenshot({ path: path.join(artifactRoot, 'canvas-initial.png') });
    console.log(JSON.stringify(canvasReport, null, 2));
  }
  if (process.argv[3] === 'methods') {
    const signatures = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      const a = c.nodes.get('a');
      return Object.fromEntries([
        ['setData', c.setData], ['pushHistory', c.pushHistory], ['requestPushHistory', c.requestPushHistory],
        ['undo', c.undo], ['redo', c.redo], ['historyPush', c.history.push], ['historyClear', c.history.clear],
        ['selectOnly', c.selectOnly], ['setIsEditing', a.setIsEditing], ['startEditing', a.startEditing],
        ['setText', a.setText], ['resize', a.resize], ['saveImmediately', c.view.saveImmediately]
      ].map(([name, fn]) => [name, fn.toString().slice(0, 1800)]));
    });
    console.log(JSON.stringify(signatures, null, 2));
  }
  if (process.argv[3] === 'state') {
    console.log(JSON.stringify(await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      return {
        data: c.getData(), history: { current: c.history.current, count: c.history.data.length },
        activeElement: document.activeElement?.outerHTML.slice(0, 1500),
        editors: [...document.querySelectorAll('[contenteditable], textarea')].map(el => ({ tag: el.tagName, classes: el.className, editable: el.getAttribute('contenteditable'), parent: el.parentElement.className })),
        node: c.nodes.get('a').nodeEl.outerHTML.slice(0, 3000)
      };
    }), null, 2));
    await page.screenshot({ path: path.join(artifactRoot, 'current-state.png') });
    for (const frame of page.frames().filter(frame => frame !== page.mainFrame())) {
      console.log(JSON.stringify(await frame.evaluate(() => ({ url: location.href, editors: [...document.querySelectorAll('[contenteditable],textarea')].map(el => ({tag:el.tagName,classes:el.className})), body: document.body.innerText.slice(0, 200) })), null, 2));
    }
  }
  if (process.argv[3] === 'transactions') {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await copyFile(path.join(target.vault, 'STAGE0-한글-Canvas.canvas'), path.join(artifactRoot, `before-transactions-${Date.now()}.canvas`));
    await page.locator('.canvas-wrapper').click({ position: { x: 15, y: 15 } });
    const initial = JSON.parse(await readFile(path.join(artifactRoot, 'canvas-capabilities.json'), 'utf8')).data;
    await page.evaluate(data => app.workspace.getLeavesOfType('canvas')[0].view.canvas.setData(data), initial);
    const result = {};
    result.transaction = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      const before = c.getData();
      if (c.requestPushHistory.cancel) c.requestPushHistory.cancel();
      c.history.clear();
      c.pushHistory(before);
      const next = structuredClone(before);
      next.nodes.find(n => n.id === 'b').x = 580;
      next.nodes.push({ id: 'd', type: 'text', text: '신규 카드 D · 기반 검증', x: 280, y: 0, width: 180, height: 80 });
      next.edges.push({ id: 'ad', fromNode: 'a', fromSide: 'right', toNode: 'd', toSide: 'left' });
      c.setData(next);
      c.selectOnly(c.nodes.get('d'));
      c.requestSave();
      return { before, after: c.getData(), historyCurrent: c.history.current, selection: [...c.selection].map(n => n.id) };
    });
    assert.equal(result.transaction.historyCurrent, 1);
    assert.deepEqual(result.transaction.selection, ['d']);
    await page.keyboard.press('Control+z');
    await page.waitForFunction(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.size === 3);
    result.undo = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      return { data: c.getData(), selection: [...c.selection].map(n => n.id) };
    });
    assert.deepEqual(result.undo.data, result.transaction.before);
    await page.keyboard.press('Control+Shift+z');
    await page.waitForFunction(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.size === 4);
    result.redo = await page.evaluate(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.getData());
    assert.deepEqual(result.redo, result.transaction.after);
    await page.screenshot({ path: path.join(artifactRoot, 'native-transaction-redo.png') });
    await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      c.selectOnly(c.nodes.get('a'));
      c.panIntoView(c.nodes.get('a').getBBox());
    });
    await page.getByText('기준 카드 A', { exact: true }).dblclick();
    await page.waitForFunction(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.get('a').isEditing);
    result.editStarted = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      const node = c.nodes.get('a');
      window.stage0EditTransitions = [];
      window.stage0EditObserver?.disconnect();
      window.stage0EditObserver = new MutationObserver(() => {
        window.stage0EditTransitions.push(node.isEditing);
      });
      window.stage0EditObserver.observe(node.nodeEl, { attributes: true, attributeFilter: ['class'] });
      return { editing: node.isEditing, editors: node.nodeEl.querySelectorAll('.cm-content').length };
    });
    const editor = page.frameLocator('.canvas-node.is-editing iframe').locator('.cm-content');
    await editor.fill('기준 카드 A\n편집한 한글 내용은 Undo 후에도 유지');
    await page.locator('.canvas-wrapper').click({ position: { x: 15, y: 15 } });
    await page.waitForFunction(() => !app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.get('a').isEditing);
    result.editEnd = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      window.stage0EditObserver.disconnect();
      const text = c.nodes.get('a').text;
      c.requestPushHistory.cancel?.();
      const beforeSize = c.getData();
      c.history.clear();
      c.pushHistory(beforeSize);
      const afterSize = structuredClone(beforeSize);
      const n = afterSize.nodes.find(n => n.id === 'a');
      n.width = 260; n.height = 140;
      c.setData(afterSize);
      c.selectOnly(c.nodes.get('a'));
      return { text, transitions: window.stage0EditTransitions, beforeSize, afterSize: c.getData() };
    });
    assert(result.editEnd.text.includes('편집한 한글 내용'));
    assert(result.editEnd.transitions.includes(false));
    await page.keyboard.press('Control+z');
    await page.waitForFunction(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.get('a').width === 180);
    result.sizeUndo = await page.evaluate(() => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      return { data: c.getData(), selection: [...c.selection].map(n => n.id) };
    });
    assert.deepEqual(result.sizeUndo.data, result.editEnd.beforeSize);
    await page.keyboard.press('Control+Shift+z');
    await page.waitForFunction(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.nodes.get('a').width === 260);
    result.sizeRedo = await page.evaluate(() => app.workspace.getLeavesOfType('canvas')[0].view.canvas.getData());
    assert.deepEqual(result.sizeRedo, result.editEnd.afterSize);
    result.saved = await page.evaluate(async () => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      c.requestSave();
      await c.view.saveImmediately();
      return { data: c.getData(), maxUndo: c.history.max };
    });
    await page.waitForFunction(async expected => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      return JSON.stringify(JSON.parse(await app.vault.adapter.read(c.view.file.path))) === expected;
    }, JSON.stringify(result.saved.data));
    result.errors = errors;
    await writeFile(path.join(artifactRoot, 'transactions.json'), JSON.stringify(result, null, 2));
    await page.screenshot({ path: path.join(artifactRoot, 'editing-and-size-redo.png') });
    console.log(JSON.stringify({ transactionUndo: true, transactionRedo: true, selectedDeletedCardAfterUndo: result.undo.selection, editEndDetected: true, sizeUndoPreservesText: true, sizeRedo: true, nativeUndoMax: result.saved.maxUndo, runtimeErrors: errors }, null, 2));
  }
  if (process.argv[3] === 'storage') {
    const pluginFolder = path.resolve(target.vault, '.obsidian/plugins/canvas-mindmap');
    assert(pluginFolder.startsWith(path.resolve(target.vault) + path.sep));
    const backupRoot = path.join(artifactRoot, `before-uninstall-${Date.now()}`);
    await mkdir(backupRoot, { recursive: true });
    const before = {};
    for (const asset of ['main.js', 'manifest.json', 'styles.css']) {
      const contents = await readFile(path.join(pluginFolder, asset));
      before[asset] = createHash('sha256').update(contents).digest('hex');
      await copyFile(path.join(pluginFolder, asset), path.join(backupRoot, asset));
    }
    await copyFile(path.join(target.vault, 'STAGE0-한글-Canvas.canvas'), path.join(backupRoot, 'canvas-before-uninstall.canvas'));
    await copyFile(path.join(target.vault, '.obsidian/workspace.json'), path.join(backupRoot, 'workspace-before-uninstall.json'));
    const storageBefore = await page.evaluate(async () => {
      const probeFolder = '.canvas-mindmap-stage0-probe';
      if (!await app.vault.adapter.exists(probeFolder)) await app.vault.adapter.mkdir(probeFolder);
      const sample = { probeOnly: true, canvas: 'STAGE0-한글-Canvas.canvas', cardReference: 'a', name: '한글 보존 시험' };
      await app.vault.adapter.write(`${probeFolder}/metadata.json`, JSON.stringify(sample));
      const plugin = app.plugins.plugins['canvas-mindmap'];
      await plugin.saveData({ probeOnly: true, marker: 'plugin-local-data' });
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      c.requestSave(); await c.view.saveImmediately();
      return { sample, canvas: c.getData(), pluginData: await plugin.loadData() };
    });
    await copyFile(path.join(pluginFolder, 'data.json'), path.join(backupRoot, 'data-before-uninstall.json'));
    const disabled = await page.evaluate(async () => {
      await app.plugins.disablePluginAndSave('canvas-mindmap');
      return { canvas: app.workspace.getLeavesOfType('canvas')[0].view.canvas.getData(), external: JSON.parse(await app.vault.adapter.read('.canvas-mindmap-stage0-probe/metadata.json')) };
    });
    assert.deepEqual(disabled.canvas, storageBefore.canvas);
    assert.deepEqual(disabled.external, storageBefore.sample);
    const uninstalled = await page.evaluate(async () => {
      await app.plugins.uninstallPlugin('canvas-mindmap');
      return {
        loaded: !!app.plugins.plugins['canvas-mindmap'],
        pluginFolderExists: await app.vault.adapter.exists('.obsidian/plugins/canvas-mindmap'),
        external: JSON.parse(await app.vault.adapter.read('.canvas-mindmap-stage0-probe/metadata.json')),
        canvas: app.workspace.getLeavesOfType('canvas')[0].view.canvas.getData()
      };
    });
    assert.equal(uninstalled.loaded, false);
    assert.equal(uninstalled.pluginFolderExists, false);
    assert.deepEqual(uninstalled.external, storageBefore.sample);
    assert.deepEqual(uninstalled.canvas, storageBefore.canvas);
    await mkdir(pluginFolder, { recursive: true });
    for (const asset of ['main.js', 'manifest.json', 'styles.css']) await copyFile(path.join(backupRoot, asset), path.join(pluginFolder, asset));
    const reinstalled = await page.evaluate(async () => {
      await app.plugins.loadManifests();
      await app.plugins.enablePluginAndSave('canvas-mindmap');
      await app.plugins.saveConfig();
      await app.workspace.saveLayout();
      return {
        version: app.plugins.plugins['canvas-mindmap'].manifest.version,
        stage: app.plugins.plugins['canvas-mindmap'].implementationStage,
        external: JSON.parse(await app.vault.adapter.read('.canvas-mindmap-stage0-probe/metadata.json')),
        pluginData: await app.plugins.plugins['canvas-mindmap'].loadData(),
        canvas: app.workspace.getLeavesOfType('canvas')[0].view.canvas.getData()
      };
    });
    assert.deepEqual(reinstalled.external, storageBefore.sample);
    assert.deepEqual(reinstalled.canvas, storageBefore.canvas);
    assert.equal(reinstalled.version, '0.1.0');
    const after = {};
    for (const asset of Object.keys(before)) after[asset] = createHash('sha256').update(await readFile(path.join(pluginFolder, asset))).digest('hex');
    assert.deepEqual(after, before);
    await writeFile(path.join(artifactRoot, 'storage.json'), JSON.stringify({ storageBefore, disabled, uninstalled, reinstalled, before, after }, null, 2));
    await page.screenshot({ path: path.join(artifactRoot, 'storage-reinstalled.png') });
    console.log(JSON.stringify({ disablePreservesCanvas: true, actualUninstallRan: true, vaultExternalProbeSurvives: true, pluginLocalDataAfterReinstall: reinstalled.pluginData, reinstallAssetHashesMatch: true, version: reinstalled.version }, null, 2));
  }
  if (process.argv[3] === 'restart-check') {
    const storage = JSON.parse(await readFile(path.join(artifactRoot, 'storage.json'), 'utf8'));
    await page.waitForFunction(() => !!app.plugins.plugins['canvas-mindmap'] && !!app.workspace.getLeavesOfType('canvas')[0]?.view.canvas);
    const restart = await page.evaluate(async () => {
      const c = app.workspace.getLeavesOfType('canvas')[0].view.canvas;
      return {
        version: app.plugins.plugins['canvas-mindmap'].manifest.version,
        stage: app.plugins.plugins['canvas-mindmap'].implementationStage,
        canvas: c.getData(),
        external: JSON.parse(await app.vault.adapter.read('.canvas-mindmap-stage0-probe/metadata.json')),
        history: { count: c.history.data.length, current: c.history.current, canUndo: c.history.canUndo() }
      };
    });
    assert.equal(restart.version, '0.1.0');
    assert.deepEqual(restart.canvas, storage.reinstalled.canvas);
    assert.deepEqual(restart.external, storage.storageBefore.sample);
    assert.equal(restart.history.canUndo, false);
    await writeFile(path.join(artifactRoot, 'restart.json'), JSON.stringify(restart, null, 2));
    await page.screenshot({ path: path.join(artifactRoot, 'restart-verified.png') });
    console.log(JSON.stringify({ restartLoadsFoundation: true, version: restart.version, canvasPreserved: true, externalMetadataPreserved: true, nativeUndoSessionReset: true, history: restart.history }, null, 2));
  }
} finally {
  // Disconnect CDP without closing the separately opened Sandbox process.
  await browser.close();
}
