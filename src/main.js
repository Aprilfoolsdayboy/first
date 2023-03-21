import { createApp } from 'vue'
// import Vue from 'vue'
const buildMode = "DEVELOP"


import App from './App.vue'
import axios from 'axios'
import router from './router'
// createApp(App).mount('#app')
const app = createApp(App).use(router)

// API 서버 주소 설정
app.config.globalProperties.$buildMode = "DEVELOP"
app.config.globalProperties.$userToken = "";
app.config.globalProperties.$userToken = "";
if(app.config.globalProperties.$buildMode == "DEVELOP"){ // 개발 서버
    axios.defaults.baseURL="http://localhost:8585"
}
if(app.config.globalProperties.$buildMode == "RELEASE"){ // 운영 서버
    axios.defaults.baseURL="http://www.twogenesis.com:8585"
}
axios.defaults.baseURL="http://localhost:8585"
// 운영 Server
// axios.defaults.baseURL="http://www.twogenesis.com:8585"
// Vue.prototype.$http = axios;
// this.$http를 사용해서 axios를 모든 컴포넌트에서 사용가능하게 해줌
app.config.globalProperties.$http = axios
app.mount("#app")

