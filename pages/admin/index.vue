<template>
  <div>
    后台首页
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: ''
        }
      }
    },
    layout: 'admin',
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
