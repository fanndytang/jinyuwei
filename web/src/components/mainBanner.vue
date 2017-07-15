<template>
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in bannerList" :key="item">
            <nuxt :to="item.link">
                <img :src="item.picture" :alt="item.content">
            </nuxt>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        data() {
            return {
                bannerList: []
            };
        },
        mounted() {
            this.getBanner();
        },
        methods: {
            getBanner() {
                let self = this;
                self.$http.get('/api/advert/list?group=index').then(data => {
                    self.bannerList = JSON.parse(data.request.response).data;
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
</script>
