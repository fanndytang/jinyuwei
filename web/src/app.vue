<template>
  <div>
    <Page :type="1"></Page>
  </div>
</template>

<script>
    import Page from './pages/common.vue';
    export default {
        components: {
            Page
        }
    };
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
