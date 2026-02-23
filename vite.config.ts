import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/aladin': {
        target: 'https://www.aladin.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/aladin/, '/ttb/api'),
      },
    },
  },
});
