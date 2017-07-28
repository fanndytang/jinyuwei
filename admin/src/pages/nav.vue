<template>
  <div>
    <navList></navList>
    <navAdd @add="addNav"></navAdd>
  </div>
</template>
<script>
  import navList from 'src/pages/nav/list.vue'
  import navAdd from 'src/pages/nav/add.vue'
  export default {
      data() {
          return {
            //  item: {}
          }
      },
      methods:{
          addNav(item){
              this.$children[0].list.push(item);
            // console.log( this.$children)
          }
      },
      components: {
          navList,
          navAdd
      }
  }
</script>
