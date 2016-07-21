/**
* @Author: geyuanjun
* @Date:   2016-07-20 22:50:44
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-21 15:37:25
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

const mutations = {
  INCREASE (state, amount) {
    state.count += amount
  },
  DECREASE (state, amount) {
    state.count -= amount
  },
  UPDATE (state, amount) {
    state.count = amount
  }
}

export default new Vuex.Store({
  state,
  mutations
})
