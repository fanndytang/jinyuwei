<template>
  <div>
    <Page :type="2"></Page>
  </div>
</template>

<script>
    import Page from 'src/pages/common.vue';

    export default {
        data () {
            return {
                filters: {}
            }
        },
        components: {
            Page
        }
    }
</script>
