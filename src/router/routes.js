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
      },
      {
        path: '/product-public/:id',
        name: 'product-public',
        component: () => import('pages/product/Public.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/category', name: 'category', component: () => import('pages/category/List.vue') },
      {
        path: '/form-category/:id?',
        name: '/form-category',
        component: () => import('pages/category/Form.vue')
      },
      { path: '/product', name: 'product', component: () => import('pages/product/List.vue') },
      {
        path: '/form-product/:id?',
        name: 'form-product',
        component: () => import('pages/product/Form.vue')
      },
      {
        path: '/form-config/:id?',
        name: 'form-config',
        component: () => import('pages/config/Form.vue')
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
