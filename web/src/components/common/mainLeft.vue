<template>
  <aside class="main-aside">
    <Category></Category>
    <Centers></Centers>
    <HeadPhone></HeadPhone>
  </aside>
</template>
<script>
  import Category from './Left/left_category.vue';
  import Centers from './Left/left_center.vue';
  import HeadPhone from './Left/left_headphone.vue';

  export default {
    components: {
      Category,
      Centers,
      HeadPhone
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../assets/css/components/varible";
  .main-aside {
    .item {
      border: 1px solid #eee;
      margin: 0 20px 20px 0;
      .item-header {
        color: #fff;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        background: @main-color;
        margin: 0;
        font-weight: normal;
      }
      .item-content {
        padding: 15px;
        color: #333;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
</style>
