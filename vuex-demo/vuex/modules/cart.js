/**
* @Author: geyuanjun
* @Date:   2016-07-19 18:37:50
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-19 19:02:38
*/

import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../mutation-types'

// 初始化状态
const state = {
  added: [],
  lastCheckout: null  //checkout之后的状态
}

// mutations
const mutations = {
  [ADD_TO_CART] (state, productId) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === productId)
    if (!record) {
      state.added.push({
        id: productId,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },

  [CHECKOUT_REQUEST] (state) {
    //清空cart
    state.added = []
    state.lastCheckout = null
  },

  [CHECKOUT_SUCCESS] (state) {
    state.lastCheckout = 'successful'
  },

  [CHECKOUT_FAILURE] (state, savedCartItems) {
    state.added = savedCartItems,
    state.lastCheckout = 'failed'
  }
}
