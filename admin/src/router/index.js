import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/', component: r => require(['src/pages/product.vue'], r)},
        {path: '/advert', component: r => require(['src/pages/advert.vue'], r)},
        {path: '/product', component: r => require(['src/pages/product.vue'], r)},
        {path: '/nav', component: r => require(['src/pages/nav.vue'], r)},
        {path: '/order', component: r => require(['src/pages/order.vue'], r)},
        {path: '/setup', component: r => require(['src/pages/setup.vue'], r)}
    ]
});
