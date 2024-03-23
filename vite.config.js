import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
//引入自定义icon插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    //配置自定义icon
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(),'src/assets/icons/svg')],
      symbolId: '[name]'
    })
  ],
  resolve: {
    //使用import时可以省略后缀
    extensions: ['.js','.vue','.json','.css'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
