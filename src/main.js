// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import components from 'pkgs/components/'
import directive from './tools/directive'
import * as filters from './tools/filter'
import $ from 'jquery'
import './assets/icon/iconfont.css'
import './assets/styles/index.scss'
import './assets/icon/iconfont.js'
import './permission'
import App from './App'

window.jQuery = window.$ = $;

/** 注册 element 组件 */
Vue.use(ElementUI, {size: 'medium'});

/** 注册全局常用组件 */
components.map(component => Vue.component(component.name, component));

/** 注册一个全局自定义指令 */
directive.map(directive => Vue.directive(directive.name, directive.event));

/** 注册管道 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

/** 生产提示关闭 */
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
