<template>
  <div>
    <pageTop></pageTop>
    <pageSearch></pageSearch>
    <div class="container">
      <mainNav></mainNav>
      <div class="clearfix"></div>
      <el-row>
        <el-col :span="6">
          <mainLeft></mainLeft>
        </el-col>
        <el-col :span="18">
          <Index></Index>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import pageTop from '~./components/pageTop.vue'
    import pageSearch from './components/pageSearch.vue'
    import mainNav from './components/mainNav.vue'
    import mainLeft from './components/mainLeft.vue'
    import Index from './pages/index.vue'

    export default {
        components: {
            pageTop,
            pageSearch,
            mainNav,
            mainLeft,
            Index
        }
    }
</script>

<style  rel="stylesheet/less" lang="less">
  body {
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: block;
  }
  @media (max-width: 1025px) {
    .container {
      max-width: 980px;
    }
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
