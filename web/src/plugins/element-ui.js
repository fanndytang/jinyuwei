import Vue from 'vue'
if (process.BROWSER_BUILD) {
  Vue.use(require('src/plugins/element-ui'))
}
