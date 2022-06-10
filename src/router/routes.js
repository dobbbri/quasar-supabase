const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/auth/UserLogin.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/auth/UserRegister.vue')
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('pages/auth/ForgotPassword.vue')
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('pages/auth/ResetPassword.vue')
      },
      {
        path: '/user-logout',
        name: 'user-logout',
        component: () => import('pages/auth/UserLogout.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/initial-routines',
        name: 'initial-routines',
        component: () => import('pages/InitialRoutines.vue')
      },
      {
        path: '/category-list',
        name: 'category-list',
        component: () => import('pages/category/CategoryList.vue')
      },
      {
        path: '/category-form/:id?',
        name: 'category-form',
        component: () => import('pages/category/CategoryForm.vue')
      },
      {
        path: '/product-list',
        name: 'product-list',
        component: () => import('pages/product/ProductList.vue')
      },
      {
        path: '/product-form/:id?',
        name: 'product-form',
        component: () => import('pages/product/ProductForm.vue')
      },
      {
        path: '/stock-form',
        name: 'stock-form',
        component: () => import('pages/product/stock/StockForm.vue')
      },
      {
        path: '/customer-list',
        name: 'customer-list',
        component: () => import('pages/customer/CustomerList.vue')
      },
      {
        path: '/customer-form/:id?',
        name: 'customer-form',
        component: () => import('pages/customer/CustomerForm.vue')
      },

      {
        path: '/settings-form',
        name: 'settings-form',
        component: () => import('pages/settings/SettingsForm.vue')
      },
      {
        path: '/measure-unit-form',
        name: 'measure-unit-form',
        component: () => import('pages/settings/MeasureUnitForm.vue')
      },
      {
        path: '/payment-method-form',
        name: 'payment-method-form',
        component: () => import('pages/settings/PaymentMethodForm.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one, but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
