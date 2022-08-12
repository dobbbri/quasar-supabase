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
        path: '/main-menu',
        name: 'main-menu',
        component: () => import('pages/MainMenu.vue')
      },
      {
        path: '/load-data',
        name: 'load-data',
        component: () => import('pages/LoadData.vue')
      },

      // customers
      {
        path: '/customer-list',
        name: 'customer-list',
        component: () => import('pages/customer/CustomerList.vue')
      },
      {
        path: '/customer-view/:id?',
        name: 'customer-view',
        component: () => import('pages/customer/CustomerView.vue')
      },
      {
        path: '/customer-form',
        name: 'customer-form',
        component: () => import('pages/customer/CustomerForm.vue')
      },

      // products
      {
        path: '/product-list',
        name: 'product-list',
        component: () => import('pages/product/ProductList.vue')
      },
      {
        path: '/product-view/:id?',
        name: 'product-view',
        component: () => import('pages/product/ProductView.vue')
      },
      {
        path: '/product-form',
        name: 'product-form',
        component: () => import('pages/product/ProductForm.vue')
      },
      {
        path: '/calculate-sale-value-form',
        name: 'calculate-sale-value-form',
        component: () => import('pages/product/CalculateSaleValueForm.vue')
      },

      // services
      {
        path: '/service-list',
        name: 'service-list',
        component: () => import('pages/service/ServiceList.vue')
      },
      {
        path: '/service-view/:id?',
        name: 'service-view',
        component: () => import('pages/service/ServiceView.vue')
      },
      {
        path: '/service-form',
        name: 'service-form',
        component: () => import('pages/service/ServiceForm.vue')
      },

      // orders
      {
        path: '/order-form',
        name: 'order-form',
        component: () => import('pages/order/OrderForm.vue')
      },
      {
        path: '/order-item-list',
        name: 'order-item-list',
        component: () => import('pages/order/OrderItemList.vue')
      },
      {
        path: '/order-item-select',
        name: 'order-item-select',
        component: () => import('pages/order/OrderItemSelect.vue')
      },

      // settings
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
      },
      {
        path: '/payment-condition-form',
        name: 'payment-condition-form',
        component: () => import('pages/settings/PaymentConditionForm.vue')
      },
      {
        path: '/order-status-form',
        name: 'order-status-form',
        component: () => import('pages/settings/OrderStatusForm.vue')
      },
      {
        path: '/cost-category-form',
        name: 'cost-category-form',
        component: () => import('pages/settings/CostCategoryForm.vue')
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
