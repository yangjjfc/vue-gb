import Vue from 'vue';
import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import store from './store';
import axios from './utils/axios/';
import router from './router';
import App from './App';
import './utils/icons'; // icon
import './permission'; // permission control
import './errorLog';// error log

Vue.config.productionTip = false;

Vue.prototype.Http = axios; // 添加vue请求方法

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
