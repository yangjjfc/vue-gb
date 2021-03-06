import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style

NProgress.configure({ showSpinner: false });// NProgress Configuration

// permission judge function
const hasPermission = (roles, permissionRoles) => {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
};

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    console.log(to);
    if (to.path === '/login') {
        next();
        NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        console.log(store.getters.roles);
        if (store.getters.roles && store.getters.roles.length) {
            console.log('有权限');
            next();
        } else {
            store.dispatch('currentUser').then(() => {
                // 没有登陆 跳到登陆页 what
                let user = store.getters.userInfo;
                if (!user || !user.enterpriseNo) {
                    next('/login');
                }
                store.dispatch('getUserRoles').then(rose => {
                    store.dispatch('GenerateRoutes', rose).then((res) => { 
                        if (res.length) {
                            router.addRoutes(res);
                            next({...to});
                        } else {
                            next('/login');
                        }
                    });
                }).catch(errs => {
                    console.info(errs);
                    // 无法获取权限则跳到登入页,无权限进入系统
                    next('/login');
                });
            });
        }
        // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        //     store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        //         const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
        //         store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
        //             router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        //             next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //         });
        //     }).catch((err) => {
        //         store.dispatch('FedLogOut').then(() => {
        //             Message.error(err || 'Verification failed, please login again');
        //             next({ path: '/' });
        //         });
        //     });
        // } else {
        //     // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //     if (hasPermission(store.getters.roles, to.meta.roles)) {
        //         next();//
        //     } else {
        //         next({path: '/401', replace: true, query: { noGoBack: true }});
        //     }
        //     // 可删 ↑
        // }
    }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});
