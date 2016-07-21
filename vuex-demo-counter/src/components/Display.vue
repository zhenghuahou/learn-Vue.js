<template>
  <div>
    <h2>count is {{countValue}}</h2>
  </div>
</template>
<script>
import {getCount} from '../vuex/getters'  // 方法名需要添加括号

export default {
  vuex: {
    getters: {
      countValue: getCount
    }
  }
}
</script>
