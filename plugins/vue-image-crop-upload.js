import Vue from 'vue'
if (process.BROWSER_BUILD) {
  Vue.use(require('vue-image-crop-upload'))
}
