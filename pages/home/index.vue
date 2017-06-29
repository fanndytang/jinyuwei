<template>
 <div>
   <banner></banner>
   <h5>推荐列表</h5>
   <myList :filters="filters" class="list-box"></myList>
 </div>
</template>

<script>
  import myList from '~pages/home/components/productlist.vue'
  import banner from '~pages/home/components/index_banner.vue'

  export default {
    data () {
      return {
        filters: {}
      }
    },
    components: {
      myList,
      banner
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .list-box {
    padding: 20px;
  }
</style>
