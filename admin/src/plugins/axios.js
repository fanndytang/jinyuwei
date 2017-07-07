import Vue from 'vue'
import axios from 'src/plugins/axios'
import apiConfig from '../config/api'

const service = axios.create({
  baseURL: apiConfig.baseUrl
})

// 拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

Vue.prototype.$http = service
export default service
