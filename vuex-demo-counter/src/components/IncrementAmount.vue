<template>
  <div>
    <input v-model="thisMessage" debounce="500">
  </div>
</template>
<script>
  import {UPDATE} from '../vuex/actions'
  import {getCount} from '../vuex/getters'
  export default {
    vuex: {
      getters: {
        countValue: getCount
      },
      actions: {
        update: UPDATE
      }
    },
    computed: {
      thisMessage: {
        get () {
          return this.countValue
        },
        set (val) {
          this.update(val)
        }
      }
    }
  }
</script>
