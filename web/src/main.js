import Vue from 'vue';
import App from './app.vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import Main from './plugins/main.js';
import 'element-ui/lib/theme-default/index.css';
import router from './router';

Vue.use(ElementUI);
Vue.prototype.$http = Axios;
Vue.prototype.MyMain = Main;

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    render: h => h(App)
});
