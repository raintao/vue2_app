import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

//main的5个首页面
// import mainMsg  from '../pages/main/msg.vue'
const mainMsg = r => require.ensure([], () => r(require('../pages/main/msg.vue')))
const mainDing = r => require.ensure([], () => r(require('../pages/main/ding.vue')))
const mainWork = r => require.ensure([], () => r(require('../pages/main/work.vue')))
const mainContacts = r => require.ensure([], () => r(require('../pages/main/contacts.vue')))
const mainMy = r => require.ensure([], () => r(require('../pages/main/my.vue')))

//消息中子页面
const msgNewFriend = r => require.ensure([], () => r(require('../pages/main/newFriend.vue')))
//DING中新建ding任务
const addDing = r => require.ensure([], () => r(require('../pages/main/addDing.vue')))

//appstore子项目页面

const AppStore = r => require.ensure([], () => r(require('../pages/appStore/index')))
const appList = r => require.ensure([], () => r(require('../pages/appStore/appList')))
const appDetail = r => require.ensure([], () => r(require('../pages/appStore/appDetail')))

const Other = r => require.ensure([], () => r(require('../pages/appStore/other')))
const Socket = r => require.ensure([], () => r(require('../pages/appStore/socket')))


Vue.use(Router)

const routes = [{

  path:'/',component:App,
  children:[
    { path: "",redirect:"/appstore" },
    { path: "/mainMsg",component: mainMsg },
    { path: "/mainDing",component: mainDing},
    { path: "/mainWork",component: mainWork},
    { path: "/mainContacts",component: mainContacts},
    { path: "/mainMy",component: mainMy},

    //appstore 路由
    { path: "/appstore",component: AppStore},
    { path: "/applist", component: appList },
    { path: "/appDetail", component: appDetail },
    { path: "/other", component: Other },
    { path: "/socket", component: Socket },

  ]
}]

export default new Router({
    routes,linkActiveClass:"my-active"
})
