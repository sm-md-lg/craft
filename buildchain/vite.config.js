import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import ViteRestart from 'vite-plugin-restart';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import critical from 'rollup-plugin-critical';
import path from 'path';

// https://vitejs.dev/config/
export default ({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    manifest: true,
    outDir: '../cms/web/dist',
    rollupOptions: {
      input: {
        app: '/src/js/app.ts',
      },
      output: {
        sourcemap: true
      },
    }
  },
  plugins: [
    critical({
      criticalUrl: 'https://nystudio107.com',
      criticalBase: '../cms/web/dist/criticalcss/',
      criticalPages: [
        { uri: '/', template: 'index' },
      ],
      criticalConfig: {
      }
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    nodeResolve({
      moduleDirectories: [
        path.resolve('./node_modules'),
      ],
    }),
    ViteRestart({
      reload: [
        '../src/templates/**/*',
      ],
    }),
    vue(),
  ],
  publicDir: '../src/public',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
  }
});