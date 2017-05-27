<template>
  <div>
    <el-row>
      <el-col :span="4">
        <JYWleft></JYWleft>
      </el-col>
      <el-col :span="20">
        <JYWheader></JYWheader>
        <nuxt/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import JYWheader from '~/components/admin/header.vue'
  import JYWleft from '~/components/admin/aside.vue'

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

