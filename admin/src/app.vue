<template>
  <el-row>
    <el-col :span="24">
      <JYWheader></JYWheader>
    </el-col>
    <el-col :span="4">
      <JYWleft></JYWleft>
    </el-col>
    <el-col :span="20" style="padding: 0 30px;">
      <index></index>
    </el-col>
  </el-row>
</template>

<script>
    import JYWheader from './components/header.vue'
    import JYWleft from './components/aside.vue'
    import Index from './pages/index.vue'

    export default {
        components: {
            JYWheader,
            JYWleft,
            Index
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
