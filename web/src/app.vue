<template>
  <div>
    <pageTop></pageTop>
    <el-row class="container">
      <el-col :span="8" :offset="16">
        <pageSearch></pageSearch>
      </el-col>
    </el-row>
    <mainNav></mainNav>
    <mainBanner v-if="hasMainBanner"></mainBanner>
    <el-row class="container" style="clear:both;">
      <el-col :span="6" v-if="hasLeft">
        <mainLeft></mainLeft>
      </el-col>
      <el-col :span="hasLeft ? 18 : 24">
        <router-view></router-view>
      </el-col>
    </el-row>
    <mainFooter></mainFooter>
    <scrollTop></scrollTop>
  </div>
</template>

<script>
    import pageTop from './components/pageTop.vue';
    import pageSearch from './components/pageSearch.vue';
    import mainNav from './components/mainNav.vue';
    import mainBanner from './components/mainBanner.vue';
    import mainLeft from './components/mainLeft.vue';
    import mainFooter from './components/pageFooter.vue';
    import scrollTop from './components/scrollTop.vue';

    export default {
        computed: {
            hasLeft: function() {
                let arr = this.$jyw.noLeftMenu || [];
                let flag = true;
                if(!!arr.length) {
                    for(let key in arr) {
                        if(arr[key] === this.$route.name) {
                            flag = false;
                        }
                    }
                }
                return flag;
            },
            hasMainBanner: function() {
                return this.$route.path === '/';
            }
        },
        components: {
            pageTop,
            pageSearch,
            mainNav,
            mainLeft,
            mainBanner,
            scrollTop,
            mainFooter
        }
    };
</script>

<style  rel="stylesheet/less" lang="less">
  body {
    margin: 0;
    padding: 0;
    min-width: 998px;
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
