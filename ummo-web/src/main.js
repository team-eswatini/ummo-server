import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

const Parse = require('parse')
Parse.initialize("ummo");
const server_url = process.env.NODE_ENV === 'production' ?
    `${window.location}`
    : 'http://localhost:3000/'

Parse.serverURL = `${server_url}api`



const parse = require('./parse')
console.log(parse)
Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {
            $parse: {}
        }
    },
    created: function () {
        this.$parse = Parse
    }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
