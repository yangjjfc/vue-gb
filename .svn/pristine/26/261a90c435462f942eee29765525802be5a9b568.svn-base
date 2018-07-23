/**
 * axios interceptor 拦截器配置
 */
import axios from 'axios';
import {Message} from 'element-ui';
class Interceptor {
    constructor (timeout) {
        this.req = {timeout: timeout};// 防止同个链接连续请求
        this.request();
        this.response();
    }

    requestTimeout (name) {
        setTimeout(() => {
            if (this.req[name]) {
                delete this.req[name];
            }
        }, this.req.timeout);
    }
    // 把对象键值转换成数组形式 
    getParams (obj) {
        var result = [],
            keys = Object.keys(obj);
        keys && keys.forEach(function (val) {
            var str = val + '=' + (typeof obj[val] === 'string' ? obj[val].toString() : JSON.stringify(obj[val]));
            result.push(str);
        });
        return result.join('&');
    }

    // 对请求数据做些什么
    request () {
        axios.interceptors.request.use((request) => {
            request.urlGuid = request.url + '?' + this.getParams(request.data); // 防止同个链接连续请求
            // 本地
            if (~request.url.indexOf('.json')) {
                request.method = 'GET';
                request.url = '/static/data/' + request.url + (~request.url.indexOf('.json') ? '?' : '.json?') + this.getParams(request.data || {});
                // 线上
            } else if (request.headers.ignoreRepeat || !this.req[request.urlGuid]) {
                request.url = '/yjgb' + request.url;
                this.req[request.urlGuid] = true;
                this.requestTimeout(request.urlGuid);
            } else if (this.req[request.urlGuid]) {
                return Promise.reject('重复请求');
            }
            return request;
        }, (error) => Promise.reject(error));
    }

    // 对响应数据做点什么
    response () {
        axios.interceptors.response.use((response) => {
            delete this.req[response.config.urlGuid]; // 防止同个链接连续请求
            if (response.data) {
                if (response.data.success) {
                    return response.data;
                } else {
                    if (response.config.ignoreErr) { // 防止弹出错误提示
                        Message.error({
                            showClose: true,
                            message: `${response.data.msg}`
                        });
                    }
                    return Promise.reject(response.data);
                }
            }
            return response;
        }, (error) => Promise.reject(error));
    }
}
export default Interceptor;
