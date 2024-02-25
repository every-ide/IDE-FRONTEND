import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@/src', replacement: resolve(__dirname, 'src') },
      {
        find: '@/components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@/pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: '@/utils',
        replacement: resolve(__dirname, 'src/utils'),
      },
    ],
  },
  server: {
    port: 3000,
  },
  // define: {
  //   global: {},
  // },
  plugins: [react(), tsconfigPaths()],
});
