<template>
  <div class="search">
    <el-input
            placeholder="请输入关键词"
            icon="search"
            v-model="keywords"
            :on-icon-click="handleIconClick">
    </el-input>
  </div>
</template>

<script>
  export default {
      data() {
          return {
              keywords: ''
          }
      },
      methods: {
          handleIconClick(ev) {
              console.log(ev);
          }
      }
  }
</script>


<style rel="stylesheet/less" lang="less" scoped>
  .search {
    margin: 20px 0;
  }
</style>
