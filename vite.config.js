import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        kids: resolve(__dirname, 'kids.html'),
        adults: resolve(__dirname, 'adults.html')
      }
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    open: 'msedge'
  }
});
