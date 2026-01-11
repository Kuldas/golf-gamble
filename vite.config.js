import { resolve } from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
  root: '.',
  base: '/',
  plugins: [tailwindcss()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        historie: resolve(__dirname, 'historie/index.html'),
        statistiky: resolve(__dirname, 'statistiky/index.html'),
      },
    },
  },
  server: {
    host: 'golf-gamble.test',
    open: true,
  },
});
