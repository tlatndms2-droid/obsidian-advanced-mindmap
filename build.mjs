import { build } from 'esbuild';
await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'cjs',
  target: 'es2020',
  outfile: 'main.js',
  external: ['obsidian', 'electron', ...['fs', 'path', 'util']],
  sourcemap: false,
  banner: { js: '/* Canvas Mindmap */' }
});
