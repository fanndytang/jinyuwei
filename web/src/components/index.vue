<template>
    <div>
        <myList :filters="filters"></myList>
    </div>
</template>

<script>
    import myList from './common/Product/list.vue';

    export default {
        data () {
            return {
                filters: {}
            }
        },
        components: {
            myList
        }
    }
</script>
