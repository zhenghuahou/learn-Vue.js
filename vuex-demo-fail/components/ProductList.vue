<template id="">
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price }}
      <br>
      <button
        type="button"
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>
<script>
import { getAllProducts, addToCart } from '../vuex/actions'

export default {
  name: 'Product',
  vuex: {
    getters: {
      products: ({ products }) => products.all
    },
    actions: {
      getAllProducts,
      addToCart
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>
