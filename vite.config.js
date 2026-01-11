import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(), 
    VitePWA({ 
      registerType: 'script-defer',
      injectRegister: 'auto',
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        lang: 'cs',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // devOptions: {
      //   enabled: true
      // } 
    })
  ],
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
