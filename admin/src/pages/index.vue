<template>
  <div>

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
