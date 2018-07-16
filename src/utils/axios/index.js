import axios from 'axios';
import Interceptor from './interceptor';
import store from '@/store';
const TimeOut = 15000;
// 初始化拦截器
new Interceptor(TimeOut); // eslint-disable-line no-new
/**
 * 基础配置
 * 更多配置请参考 https://github.com/axios/axios
 * @param {*} url  请求地址
 * @param {*} data  参数
 * @param {*} type  请求类型,默认post
 */
let Http = async (url, data = {}, type = 'post') => {
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };
    // 添加header token
    let token = store.state.user.userInfo.token || ''; // vuex组件模块化,暂时无法直接获取state的方法
    if (token) {
        headers = Object.assign(headers, {'jtoken': token});
    }
    // 忽略防止重复请求
    if (data.ignoreRepeat) {
        headers.ignoreRepeat = true;
        delete data.ignoreRepeat;
    }
    // 忽略错误提示
    if (data.ignoreErr) {
        headers.ignoreErr = true;
        delete data.ignoreErr;
    }
    let config = {
        url: url,
        method: type,
        data: data,
        timeout: TimeOut, // 超时时间
        headers: headers,
        responseType: 'json',
        validateStatus: function (status) {
            return status >= 200 && status < 300; // 默认的
        },
        maxRedirects: 5
    };
    let response = null;
    try {
        response = await axios(config);
    } catch (error) {
        response = Promise.reject(error);
    }
    return response;
};

export default Http;
