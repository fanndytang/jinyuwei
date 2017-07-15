import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: r => require(['../pages/index.vue'], r) },
        { path: '/detail/:id', component: r=> require(['../pages/detail.vue'], r) }
    ]
});
