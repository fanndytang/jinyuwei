<template>
  <aside class="aside">
    <Category></Category>
    <Centers></Centers>
    <HeadPhone></HeadPhone>
  </aside>
</template>
<script>
  import Category from '~components/default/Left/left_category.vue'
  import Centers from '~components/default/Left/left_center.vue'
  import HeadPhone from '~components/default/Left/left_headphone.vue'

  export default {
    components: {
      Category,
      Centers,
      HeadPhone
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .aside {
    .item {

    }
  }
</style>
