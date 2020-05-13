import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from "fastclick";

import toast from "common/toast";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
