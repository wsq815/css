import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routes = [
  {
    name: '/',
    path: '/',
    component: (resolve) => require(['view/admin.vue'], resolve),
    children: [
      {
        path: '/',
        redirect: '/user-administer'
      },
      // 设备管理
      {
        name: 'equipment-list',
        path: '/equipment-list',
        component: (resolve) => require(['view/equipment-management/index.vue'], resolve)
      },
      // 添加设备
      {
        name: 'add-equipment',
        path: '/add-equipment',
        component: (resolve) => require(['view/equipment-management/add.vue'], resolve)
      },
      // 更新
      {
        name: 'update-equipment',
        path: '/update-equipment/:id',
        component: (resolve) => require(['view/equipment-management/add.vue'], resolve)
      },
      // 用户管理
      {
        name: 'user-administer',
        path: '/user-administer',
        component: (resolve) => require(['view/user-administer/index.vue'], resolve)
      },
      // 添加用户
      {
        name: 'add-user',
        path: '/add-user',
        component: (resolve) => require(['view/user-administer/add-user.vue'], resolve)
      },
      // 更新
      {
        name: 'update-user',
        path: '/update-user/:id',
        component: (resolve) => require(['view/user-administer/add-user.vue'], resolve)
      },
      // 白名单
      // {
      //   name: 'white-list',
      //   path: '/white-list',
      //   component: (resolve) => require(['view/user-administer/white-list.vue'], resolve)
      // },
      // 产品管理
      // 产品列表
      {
        name: 'product-list',
        path: '/product-list',
        component: (resolve) => require(['view/product-management/index.vue'], resolve)
      },
      // 添加产品
      {
        name: 'add-product',
        path: '/add-product',
        component: (resolve) => require(['view/product-management/add-product.vue'], resolve)
      },
      // 更新产品
      {
        name: 'update-product',
        path: '/update-product/:id',
        component: (resolve) => require(['view/product-management/add-product.vue'], resolve)
      },
      // 产品分类
      {
        name: 'product-classification',
        path: '/product-classification',
        component: (resolve) => require(['view/product-management/product-classification.vue'], resolve)
      },
      // 添加分类
      {
        name: 'add-product-classification',
        path: 'add-product-classification',
        component: (resolve) => require(['view/product-management/add-product-classification.vue'], resolve)
      },
      // 更新分类
      {
        name: 'update-product-classification',
        path: '/update-product-classification/:id',
        component: (resolve) => require(['view/product-management/add-product-classification.vue'], resolve)
      },
      // 厂家信息
      {
        name: 'factory-list',
        path: '/factory-list',
        component: (resolve) => require(['view/factory-info/index.vue'], resolve)
      },
      // 添加厂家信息
      {
        name: 'add-factory',
        path: '/add-factory',
        component: (resolve) => require(['view/factory-info/add.vue'], resolve)
      },
      // 更新
      {
        name: 'update-factory',
        path: '/update-factory/:id',
        component: (resolve) => require(['view/factory-info/add.vue'], resolve)
      },
      // 固件管理
      {
        name: 'firmware-list',
        path: '/firmware-list',
        component: (resolve) => require(['view/firmware/add-mission.vue'], resolve)
      },
      // app用户列表
      {
        name: 'app-user-list',
        path: '/app-user-list',
        component: (resolve) => require(['view/app-user-list/index.vue'], resolve)
      },
      // 添加app 用户
      {
        name: 'add-app-user',
        path: '/add-app-user',
        component: (resolve) => require(['view/app-user-list/add-app-user'], resolve)
      },
      // 更新app 用户
      {
        name: 'update-app-user',
        path: '/add-app-user/:id',
        component: (resolve) => require(['view/app-user-list/add-app-user'], resolve)
      },
      // app详情
      {
        name: 'app-user-details',
        path: '/app-user-details/:id',
        component: (resolve) => require(['view/app-user-list/app-user-details.vue'], resolve)
      },
      // app分享详情
      {
        name: '/app-sharing-details',
        path: '/app-sharing-details',
        component: (resolve) => require(['view/app-user-list/app-sharing-details.vue'], resolve)
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: (resolve) => require(['view/login.vue'], resolve)
  }
];

let routers = new Router({
  routes
});

routers.beforeEach((to, from, next) => {
  if (to.name === 'login' && window.localStorage.getItem('token')) {
    next('/');
  } else if (to.name !== 'login' && !window.localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

export default routers;
