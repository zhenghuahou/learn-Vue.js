<template id="">
  <div class="cart">
    <h2>你的购物车</h2>
    <p v-show="!products.length"><i>请选购商品</i></p>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price }} x {{ p.quantity }}
      </li>
    </ul>
    <p>总计: {{ total }}</p>
    <p>
      <button
        :disabled="!products.length"
        @click="checkout(products)"
        type="button">Checkout</button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>
<script>
import { checkout } from '../vuex/actions'
import { cartProducts } from '../vuex/getters'

export default {
  name: 'Cart',
  vuex: {
    getters: {
      products: cartProducts,
      checkoutStatus: ({ cart }) => cart.lastCheckout
    },
    actions: {
      checkout
    }
  },
  computed: {
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  }
}
</script>
