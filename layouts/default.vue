<template>
  <el-row>
    <el-col :span="24">
      <JYWheader></JYWheader>
    </el-col>
    <el-col :span="4">
      <JYWleft></JYWleft>
    </el-col>
    <el-col :span="20">
      <nuxt/>
    </el-col>
  </el-row>
</template>

<script>
  import JYWheader from '~/components/default/header.vue'
  import JYWleft from '~/components/default/aside.vue'

  export default {
    //  middleware: 'check_index',
    components: {
      JYWheader,
      JYWleft
    }
  }
</script>

<style  rel="stylesheet/less" lang="less">
  body {
    margin: 0;
    padding: 0;
  }
  [v-cloak] {
    display: none;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

