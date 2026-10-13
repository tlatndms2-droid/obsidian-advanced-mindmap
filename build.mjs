import { build } from 'esbuild';
await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'cjs',
  target: 'es2020',
  outfile: 'main.js',
  external: ['obsidian', 'electron', ...['fs', 'path', 'util']],
  sourcemap: 'inline',
  banner: { js: '/* Canvas Mindmap — stage 0 foundation; not a verified product release. */' }
});
