<template>
  <div class="app">
    <h1>购物车示例</h1>
    <hr>
    <h2>产品</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>
<script>
  import ProductList from './ProductList.vue'
  import Cart from './Cart.vue'

  export default {
    name: 'App',
    components: { ProductList, Cart }
  }

</script>
