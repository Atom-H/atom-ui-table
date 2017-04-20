// 开发/上线阶段全局变量
// http://113.6.252.23:6688/tools/vue?page=1&limit=15
if (process.env.NODE_ENV == 'production') {
    window.API_ROOT = 'http://113.6.252.23:6688';
    window.MENU_URL = [window.API_ROOT, '/personal/menu'].join('');
    window.LOGIN_URL = [window.API_ROOT, '/oauth'].join('');
    window.MESSAGE_LIST = [window.API_ROOT, '/polling '].join('');
} else {
    window.API_ROOT = './mock';
    window.MENU_URL = './mock/menu';
    window.LOGIN_URL = './mock/login';
    window.MESSAGE_LIST = './mock/auto/messageList'
}

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './scss/global.scss'
window.axios = require('axios');
axios.defaults.headers.common['Access-Token'] = store.state.loginModule.accessToken;
window.qs = require('qs');

// debug
window.l = window.syslog = input => console.log(input);
window.c = input => console.log(JSON.stringify(input, null, 4));

// 路由根路径
window.HOME_ROUTE = '/home/';
// window.FileAPI = {cors: true, debug: true};

/**
 * 登陆验证
 * 如果accessToken为空, 跳转到/login
 */
router.beforeEach((to, from, next) => {
    // 排除404 和 login, 不验证token
    if (-1 != ['view404', 'loginView'].indexOf(to.name)) {
        next();
    } else {
        if (-1 != ['', undefined, null].indexOf(store.state.loginModule.accessToken)) {
            next({ path: '/login' });
        } else {
            next();
        }
    }
});
Vue.config.productionTip = false;

import Dialog from './components/Dialog';
Vue.use(Dialog)

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    template: '<App/>',
    router,
    components: { App },
});



// function a(){
//     console.log(213)
// }

// function abc(){
//     return Promise.resolve(a);
// }
// abc().then(c=>{
// c();
// })


// Raven
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';
// Raven
//     .config('https://91523ac45c3a4c0b99ff408d89c46e56@sentry.io/148184')
//     .addPlugin(RavenVue, Vue)
//     .install();
