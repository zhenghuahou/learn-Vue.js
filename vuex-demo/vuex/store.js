/**
* @Author: geyuanjun
* @Date:   2016-07-19 18:25:51
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-20 11:24:35
*/

import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    cart,
    products
  }
})
