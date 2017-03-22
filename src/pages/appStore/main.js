import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Vuex from 'vuex'

import 	VueResourse from 'vue-resource'
Vue.use(VueResourse)

// 阿里字体图标
import './static/css/neat-min.css'
import './static/css/iconfont.css'

// ui框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//调用手机底层
import '../static/js/summer.min.js'

new Vue({
    el: "#app",
    router,
    store,
    render:(h)=>h(App)
})
