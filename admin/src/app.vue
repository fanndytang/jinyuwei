<template>
  <el-row>
    <el-col :span="24">
      <MainHeader></MainHeader>
    </el-col>
    <el-col :span="4">
      <MainMenu></MainMenu>
    </el-col>
    <el-col :span="20" style="padding: 0 30px;">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
    import MainHeader from './components/mainHeader.vue'
    import MainMenu from './components/mainLeft.vue'
   // import Index from './pages/index.vue'

    export default {
        components: {
            MainHeader,
            MainMenu
         //   Index
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
