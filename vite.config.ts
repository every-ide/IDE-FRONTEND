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
  define: {
    global: {},
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // WebSocket 및 HTTP 요청을 위한 프록시 설정
      '/ws': {
        target: 'ws://43.203.66.34:8000/ws',
        ws: true,
      },
    },
  },
});
