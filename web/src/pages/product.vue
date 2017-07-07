<template>
  <myList :filters="filters"></myList>
</template>

<script>
  import myList from '../components/Product/list.vue'
  export default {
    data () {
      return {
        filters: {}
      }
    },
    components: {
      myList
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
