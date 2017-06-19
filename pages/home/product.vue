<template>
  <my-list :filters="filters"></my-list>
</template>

<script>
  import List from '~components/default/productlist.vue'
  export default {
    data () {
      return {
        filters: {}
      }
    },
    components: {
      'my-list': List
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .el-card {
    border-radius: 0;
    .el-card__body {
      padding: 0;
    }
    .image {
      height: 230px;
      display: block;
    }
    .detail {
      height: 60px;
    }
  }

</style>
