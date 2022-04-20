const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', redirect: '/login' },
      { path: '/login', name: 'login', component: () => import('pages/auth/Login.vue') },
      { path: '/register', name: 'register', component: () => import('pages/auth/Register.vue') },
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
      { path: '/index', name: 'index', component: () => import('pages/IndexPage.vue') },
      {
        path: '/category-list',
        name: 'category-list',
        component: () => import('pages/category/List.vue')
      },
      {
        path: '/category-form/:id?',
        name: 'category-form',
        component: () => import('pages/category/Form.vue')
      },
      {
        path: '/product-list',
        name: 'product-list',
        component: () => import('pages/product/List.vue')
      },
      {
        path: '/product-form/:id?',
        name: 'product-form',
        component: () => import('pages/product/Form.vue')
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
