<template>
  <div id="app">
    <display></display>
    <increment></Increment>
    <increment-amount></increment-amount>
  </div>
</template>
<script>
import Display from './components/Display'
import Increment from './components/Increment'
import IncrementAmount from './components/IncrementAmount'
import store from './vuex/store'

export default {
  components: {
    Display,
    Increment,
    IncrementAmount
  },
  store
}
</script>
