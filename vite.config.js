import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

// ----------------------------------------------------------------------

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'apple-touc-icon.png', 'masked-icon.svg'],

  manifest: {
    name: 'APIP TA',
    short_name: '',
    description: 'APIP TA',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/favicon/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
    // },
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
