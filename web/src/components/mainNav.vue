<template>
  <nav class="nav">
    <el-menu v-cloak :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item, index) in list" :key="index" :index="index.toString()">
        <a :href="item.link">
          <i class="item.icon"></i>
          {{item.title}}
        </a>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        list: []
      }
    },
    mounted: function () {
      this.getMainNav()
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      getMainNav () {
        this.$http.get('/api/nav/list?type=2').then(data => {
          let list = JSON.parse(data.request.response).data;
          list = list.sort(this.MyMain.compare('sort'));
          this.list = list;
        });
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "../assets/css/components/varible";
  .nav {
    height: 60px;
    background: @main-color;
    line-height: 60px;
    margin-bottom: 20px;
    .el-menu {
      list-style: none;
      background: transparent;
      .el-menu-item {
        display: inline-block;
        padding: 0 15px;
        transition: all .2s;
        a {
          color: #fff;
          display: block;
          text-decoration: none;
        }
        &:hover {
          background: #fff;
          a {
            color: @main-color;
          }
        }
      }
    }
  }
</style>
