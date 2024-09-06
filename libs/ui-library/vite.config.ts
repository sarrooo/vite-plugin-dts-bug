import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

// @see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
      outDir: fileURLToPath(new URL('./dist', import.meta.url)),
      exclude: ['dist', 'node_modules'],
      rollupTypes: true,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist/build', import.meta.url)),
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      name: 'my-ui-library',
      fileName: format => `index.${format}.js`,
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
