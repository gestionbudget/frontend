import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/transactions': 'https://backend-appjava.onrender.com',
    },
  },
});