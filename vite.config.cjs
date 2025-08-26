// vite.config.cjs
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // you can change this if needed
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
