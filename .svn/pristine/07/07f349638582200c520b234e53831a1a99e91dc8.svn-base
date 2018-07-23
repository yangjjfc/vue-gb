import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '@/pages/layout/Layout';

Vue.use(Router);

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/pages/login/index'), hidden: true },
    //   { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
    //   { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
    //   { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
    {
        path: '',
        component: Layout,
        name: 'user-permission',
        redirect: '/user-permission/user',
        meta: { title: '用户权限', icon: 'dashboard', noCache: true },
        children: [{
            path: 'user-permission/user',
            component: () => import('@/pages/user-permission/user/index'),
            name: 'user-permission-user',
            meta: { title: '用户管理', noCache: true }
        }, {
            path: 'user-permission/role',
            component: () => import('@/pages/user-permission/role/index'),
            name: 'user-permission-role',
            meta: { title: '角色管理', noCache: true }
        }, {
            path: 'user-permission/menu',
            component: () => import('@/pages/user-permission/menu/index'),
            name: 'user-permission-menu',
            meta: { title: '菜单管理', noCache: true }
        }]
    }, {
        path: '/system',
        component: Layout,
        name: 'system',
        redirect: '/system/platform',
        meta: { title: '系统管理', icon: 'dashboard', noCache: true },
        children: [{
            path: 'platform',
            component: () => import('@/pages/system/platform/index'),
            name: 'system-platform',
            meta: { title: '存储系统管理', noCache: true }
        }, {
            path: 'storage',
            component: () => import('@/pages/system/storage/index'),
            name: 'system-storage',
            meta: { title: '媒体工具', noCache: true }
        }, {
            path: 'administrative',
            component: () => import('@/pages/system/administrative/index'),
            name: 'system-administrative',
            meta: { title: '行政区域管理', noCache: true }
        }, {
            path: 'emergency',
            component: () => import('@/pages/system/emergency/index'),
            name: 'system-emergency',
            meta: { title: '系统告警管理', noCache: true }
        }, {
            path: 'report',
            component: () => import('@/pages/system/report/index'),
            name: 'system-report',
            meta: { title: '用户操作日志', noCache: true }
        }]
    }, {
        path: '/resource',
        component: Layout,
        name: 'resource',
        redirect: '/resource/manage',
        meta: { title: '资源管理', icon: 'dashboard', noCache: true },
        children: [{
            path: 'manage',
            component: () => import('@/pages/resource/manage/index'),
            name: 'resource-manage',
            meta: { title: '终端管理', noCache: true }
        }, {
            path: 'account',
            component: () => import('@/pages/resource/account/index'),
            name: 'resource-account',
            meta: { title: '终端开户', noCache: true }
        }, {
            path: 'equipment',
            component: () => import('@/pages/resource/equipment/index'),
            name: 'resource-equipment',
            meta: { title: '设备管理', noCache: true }
        }]
    }, {
        path: '/supervise',
        component: Layout,
        name: 'supervise',
        redirect: '/supervise/recall',
        meta: { title: '监管检测', icon: 'dashboard', noCache: true },
        children: [{
            path: 'recall',
            component: () => import('@/pages/supervise/recall/index'),
            name: 'supervise-recall',
            meta: { title: '回溯与监听', noCache: true }
        }, {
            path: 'broadcast',
            component: () => import('@/pages/supervise/broadcast/index'),
            name: 'supervise-broadcast',
            meta: { title: '广播统计报表', noCache: true }
        }, {
            path: 'gis',
            component: () => import('@/pages/supervise/gis/index'),
            name: 'supervise-gis',
            meta: { title: 'GIS展示', noCache: true }
        }, {
            path: 'terminal',
            component: () => import('@/pages/supervise/terminal/index'),
            name: 'supervise-terminal',
            meta: { title: '终端统计报表', noCache: true }
        }, {
            path: 'resurssiluettelo',
            component: () => import('@/pages/supervise/resurssiluettelo/index'),
            name: 'supervise-resurssiluettelo',
            meta: { title: '资源状态列表', noCache: true }
        }]
    }, {
        path: '/broadcast',
        component: Layout,
        name: 'broadcast',
        redirect: '/broadcast/recall',
        meta: { title: '广播控制', icon: 'dashboard', noCache: true },
        children: [{
            path: 'content',
            component: () => import('@/pages/broadcast/content/index'),
            name: 'broadcast-content',
            meta: { title: '广播内容采集', noCache: true }
        }, {
            path: 'diffuse',
            component: () => import('@/pages/broadcast/diffuse/index'),
            name: 'broadcast-diffuse',
            meta: { title: '广播下发', noCache: true }
        }, {
            path: 'gis',
            component: () => import('@/pages/broadcast/gis/index'),
            name: 'broadcast-gis',
            meta: { title: 'GIS广播', noCache: true }
        }, {
            path: 'single',
            component: () => import('@/pages/broadcast/single/index'),
            name: 'broadcast-single',
            meta: { title: '排期单广播', noCache: true }
        }, {
            path: 'greenb',
            component: () => import('@/pages/broadcast/greenb/index'),
            name: 'broadcast-greenb',
            meta: { title: '绿色通道广播', noCache: true }
        }, {
            path: 'manoeuvre',
            component: () => import('@/pages/broadcast/manoeuvre/index'),
            name: 'broadcast-manoeuvre',
            meta: { title: '演习演练', noCache: true }
        }]
    }
//   { 
//     path: '/documentation',
//     component: Layout,
//     redirect: '/documentation/index',
//     children: [{
//       path: 'index',
//       component: () => import('@/views/documentation/index'),
//       name: 'documentation',
//       meta: { title: 'documentation', icon: 'documentation', noCache: true }
//     }]
//   },
//   {
//     path: '/guide',
//     component: Layout,
//     redirect: '/guide/index',
//     children: [{
//       path: 'index',
//       component: () => import('@/views/guide/index'),
//       name: 'guide',
//       meta: { title: 'guide', icon: 'guide', noCache: true }
//     }]
//   }
];

export default new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true }
];
