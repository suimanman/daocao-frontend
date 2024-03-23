
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入路由守卫
import '@/router/permission.js'
// 注册全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 自注册全局组件
app.component('svg-icon', SvgIcon);
app.use(pinia);
app.use(router)

app.mount('#app')
