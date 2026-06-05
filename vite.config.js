import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html')
      }
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    open: 'msedge'
  }
});
