import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { usePermissStore } from './store/permiss';
//引入ElemUi
import 'element-plus/dist/index.css'
import './assets/css/icon.css';
//创建实例对象App
const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册element plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 自定义权限指令
const permiss = usePermissStore();
//el表示指令绑定的元素 binding.value表示指令的绑定值 后面自定义类型 需要使用v-permiss使用
/**
 
v-permiss被应用在侧边栏中的菜单项和子菜单项上 
1）这个指令会在元素插入到 DOM 中之后被调用，然后根据权限判断是否显示该菜单项或子菜单项
 */
app.directive('permiss', {
    mounted(el, binding) {
        if (!permiss.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    },
});
app.mount('#app');
