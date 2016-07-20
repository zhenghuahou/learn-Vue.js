/**
* @Author: geyuanjun
* @Date:   2016-07-19 18:38:1
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-19 18:47:52
*/

import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART
} from '../mutation-types'

// 初始化
const state = {
  all: []
}

// mutation
const mutations = {
  [RECEIVE_PRODUCTS] (state, products) {
    state.all = products
  },

  [ADD_TO_CART] (state, productId) {
    // 减少库存
    state.all.find(p => p.id === productId).inventory--
  }
}

export default {
  state,
  mutations
}
