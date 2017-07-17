import Vue from 'vue';
import App from './app';
import router from './router';
import Axios from 'axios';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.prototype.$http = Axios;

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    render: h => h(App)
});
