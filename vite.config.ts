import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import VueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
    }),
    AutoImport({
      dts: true,
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        // custom
        {
          '@/store': [
            'useStore'
          ],
          '@websanova/vue-auth/src/v3.js': [
            'useAuth'
          ]
        }
      ],

      // custom resolvers
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      // resolvers: [],
      // eslintrc: {
      // 	enabled: true, // Default `false`
      // 	filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      // 	globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      // },
    }),
    Pages(),
    Layouts(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, './locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    exclude: ['vue-demi'],
  },
});
