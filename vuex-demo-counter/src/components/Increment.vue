<template>
  <div>
    <button @click="increment">增加1</button>
    <button @click="decrement">减少1</button>
  </div>
</template>
<script>
  import {INCREASE, DECREASE} from '../vuex/actions'
  console.log(INCREASE)
  export default {
    vuex: {
      actions: {
        increment: INCREASE,
        decrement: DECREASE
      }
    }
  }
</script>
