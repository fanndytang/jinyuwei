<template>
  <div class="header">
    <div class="item">menu</div>
    <div class="item">menu</div>
    <div class="item">menu</div>
  </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
  .header {
    height: 34px;
    background: #f5f5f5;
    color: #999;
    border-bottom: 1px solid #ccc;
    line-height: 34px;
    text-align: right;
    .item {
      padding: 0 20px;
      display: inline-block;
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid #ccc;
      }
    }
  }
</style>
