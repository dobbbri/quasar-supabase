const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/auth/UserLogin.vue') },
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
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/initial-routines',
        name: 'initial-routines',
        component: () => import('pages/InitialRoutines.vue')
      },
      { path: '/index', name: 'index', component: () => import('pages/IndexPage.vue') },
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
        path: '/measure-unit-form/:id?',
        name: 'measure-unit-form',
        component: () => import('pages/measure_unit/MeasureUnitForm.vue')
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
]

export default routes
