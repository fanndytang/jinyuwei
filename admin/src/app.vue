<template>
  <div>
    <MainHeader></MainHeader>
    <el-row type="flex">
      <el-col :span="4">
        <MainMenu :style="{height: height +'px', overflow: 'auto'}"></MainMenu>
      </el-col>
      <el-col :span="20" style="padding: 0 30px;">
        <router-view :style="{height: height +'px', overflow: 'auto'}"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import MainHeader from './components/mainHeader.vue'
    import MainMenu from './components/mainLeft.vue'

    export default {
        data () {
            return {
                height: 100
            }
        },
        components: {
            MainHeader,
            MainMenu
        },
        mounted () {
            this.height = document.body.clientHeight - 100;
        }
    }
</script>

<style  rel="stylesheet/less" lang="less">
  body,html {
    height: 100%;
  }
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
