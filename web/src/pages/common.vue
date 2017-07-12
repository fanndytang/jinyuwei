<template>
    <div>
        <pageTop></pageTop>
        <el-row class="container">
            <el-col :span="8" :offset="16">
                <pageSearch></pageSearch>
            </el-col>
        </el-row>
        <mainNav></mainNav>
        <mainBanner></mainBanner>
        <el-row class="container">
            <el-col :span="6">
                <mainLeft></mainLeft>
            </el-col>
            <el-col :span="18">
                <mainIndex v-if="type === 1"></mainIndex>
                <mainDetail v-if="type === 2"></mainDetail>
                <mainOrder v-if="type === 3"></mainOrder>
                <mainProduct v-if="type === 4"></mainProduct>
            </el-col>
        </el-row>
        <mainFooter></mainFooter>
        <scrollTop></scrollTop>
    </div>
</template>

<script>
    import pageTop from '../components/common/pageTop.vue';
    import pageSearch from '../components/common/pageSearch.vue';
    import mainNav from '../components/common/mainNav.vue';
    import mainBanner from '../components/common/mainBanner.vue';
    import mainLeft from '../components/common/mainLeft.vue';
    import mainFooter from '../components/common/pageFooter.vue';
    import scrollTop from '../components/common/scrollTop.vue';

    import mainIndex from '../components/index.vue';
    import mainDetail from '../components/detail.vue';
    import mainOrder from '../components/order.vue';
    import mainProduct from '../components/product.vue';
    export default {
        props: {
            type: {
                type: Number,
                default: 1
            }
        },
        components: {
            pageTop,
            pageSearch,
            mainNav,
            mainLeft,
            mainBanner,
            scrollTop,
            mainIndex,
            mainDetail,
            mainOrder,
            mainProduct
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
