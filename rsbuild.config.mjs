import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/main.ts',
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
