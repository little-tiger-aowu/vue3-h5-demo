import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { VantResolver,VarletUIResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite';
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Components({
          resolvers:[
              VantResolver(),
              VarletUIResolver()
          ]
      })
  ],
  server:{
      host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
      '#': path.resolve('./src/type') // #代替src/type
    }
  },
  //适配
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
                }),
                postCssPxToRem({
                    // 自适应，px>rem转换
                    rootValue: 37.5, // 75表示750设计稿，37.5表示375设计稿
                    propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
                }),
            ],
        },
    }
})
