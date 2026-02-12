import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/main.js',
    },
  },
  html: {
    template: './index.html',
  },
  output: {
    assetPrefix: './',
    distPath: {
      root: 'dist',
    },
  },
  server: {
    port: 3000,
  },
});
