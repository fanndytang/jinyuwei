import Vue from 'vue';
import App from './app.vue';
import router from './router';
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Main from './plugins/main.js';
import store from './plugins/store.js';
import VueQuillEditor from 'vue-quill-editor';


Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.prototype.$http = Axios;
Vue.prototype.MyMain = Main;

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    store,
    render: h => h(App)
});
