/**
* @Author: geyuanjun
* @Date:   2016-07-19 17:44:46
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-20 11:14:30
*/
import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
