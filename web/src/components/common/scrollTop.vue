<template>
    <div class="page-component-up" @click="scrollTop()">
        <i class="el-icon-caret-top"></i>
    </div>
</template>

<script>
    export default {
        methods: {
            scrollTop() {
                document.body.scrollTop = 0;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .page-component-up {
        background-color: #58b7ff;
        position: fixed;
        right: 100px;
        bottom: 150px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        cursor: pointer;
        opacity: .4;
        transition: .3s;
        i {
            color: #fff;
            display: block;
            line-height: 50px;
            text-align: center;
            font-size: 22px;
        }
        &:hover {
            opacity: 1;
        }
    }
</style>
