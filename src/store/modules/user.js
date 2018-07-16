import Http from '@/utils/axios';
let URL = {
    MENULIST: 'brp.user.getCurrentUserMenuRights' // 获取员工的功能权限
};
const user = {
    state: {
        userInfo: {}, // 用户信息
        menuList: [], // 用户权限菜单
        routers: [], // 路由
        buttons: [] // 按钮权限
    },
    mutations: {
        // 用户登入
        CHANGEUSER (state, data) {
            state.userInfo = data;
            sessionStorage.setItem('user', JSON.stringify(state.userInfo));
        },
        // 用户退出,清除数据
        CLEARSTATE (state, data) {
            state = {
                userInfo: {}, 
                menuList: [], 
                routers: [], 
                buttons: []
            };
            sessionStorage.clear();
        },  
        // 获取权限
        GETROLES (state, data) {
            state.menuList = data;
        },
        // 按钮权限
        SETBUTTONS (state, data) {
            state.buttons = data;
        },
        // 默认打开
        DEFAULTOPEN (state, data) {
            if (!state.defaultOpen) {
                state.defaultOpen = [];
                state.defaultOpen.push(data);
            } else if (state.defaultOpen.indexOf(data) === -1) {
                state.defaultOpen.push(data);
            }
        }
    },
    actions: {
        // 登录
        login (context, data) {
            return new Promise((resolve, reject) => {
                Http('/sys/account/login', {
                    ignoreErr: true,
                    ...data
                }).then(result => {
                    let userinfo = result || {};
                    if (userinfo.msg) {
                        context.commit('CHANGEUSER', userinfo.msg);
                        resolve(userinfo);
                    } else {
                        reject(userinfo);
                    }
                }, err => {
                    reject(err);
                });
            });
        },
        // 退出
        async logout (context, data) {
            return new Promise((resolve, reject) => {
                Http('/sys/account/logout', data).then(result => {
                    context.commit('CLEARSTATE');
                    resolve(true);
                }, err => {
                    reject(err);
                });
            });
        },
        // 当前用户信息
        currentUser ({ commit, state }) {
            return new Promise((resolve, reject) => {
                state.userInfo && state.userInfo.enterpriseNo ? resolve(state.userInfo) // 判断是否需要去请求
                    : Http('/sys/account/currentUser', {
                        token: state.userInfo.token || ''
                    }).then(result => {
                        // 获取token 获取登录信息
                        let user = result.msg || {};
                        commit('CHANGEUSER', user);
                        resolve(user);
                    }, err => {
                        reject(err);
                    });
            });
        },
        // 获取用户菜单
        getUserMenus ({ commit, state }) {
            return new Promise((resolve, reject) => {
                state.menuList ? resolve(state.menuList) : Http(URL.MENULIST).then(res => {
                    if (res.data) {
                        let munuList = res.data.menuTree;
                        commit('GETROLES', munuList);
                        commit('SETBUTTONS', res.data.permissionList);
                        resolve(state.menuList);
                    } else {
                        reject('获取用户菜单失败');
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

export default user;