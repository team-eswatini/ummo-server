import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

const server_url = process.env.NODE_ENV === 'production' ?
    `${window.location}`
    : 'http://localhost:3000'
window.server_url = `${server_url}/api`

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
