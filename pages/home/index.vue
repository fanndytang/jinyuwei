<template>
 <div>
   <nav>
     oeg
   </nav>
   <banner></banner>
  <!-- <h5>推荐列表</h5>-->
   <myList :filters="filters"></myList>
 </div>
</template>

<script>
  import myList from '~components/default/Product/list.vue'
  import banner from '~pages/home/components/index_banner.vue'

  export default {
    data () {
      return {
        filters: {}
      }
    },
    components: {
      myList,
      banner
    }
  }
</script>
