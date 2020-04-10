import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/back_page/login.vue'),
  },
  {
    name: 'HelloWorld',
    path: '/',
    component: () => import('../views/front_page/HelloWorld.vue'),
    children: [
      {
        name: 'frontHome',
        path: '',
        component: () => import('../views/front_page/FrontHome.vue'),
      },
      {
        name: 'frontCoupon',
        path: 'frontcoupon',
        component: () => import('../views/front_page/FrontCoupon.vue'),
      },
      {
        name: 'frontProduct',
        path: 'frontproduct',
        component: () => import('../views/front_page/FrontProduct.vue'),
      },
      {
        name: 'frontProductIn',
        path: 'frontproductIn',
        component: () => import('../views/front_page/FrontProductIn.vue'),
      },
      {
        name: 'frontCart',
        path: 'frontcart',
        component: () => import('../views/front_page/FrontCart.vue'),
      },
      {
        name: 'OrderCheck',
        path: 'ordercheck',
        component: () => import('../views/front_page/OrderCheck.vue'),
      },
      {
        name: 'OrderPayment',
        path: 'orderpayment',
        component: () => import('../views/front_page/OrderPayment.vue'),
      },
      {
        name: 'PaymentSuccessful',
        path: 'paymentsuccessful',
        component: () => import('../views/front_page/PaymentSuccessful.vue'),
      },
    ],
  },
  {
    name: 'Dashboard',
    path: '/Dashboard',
    component: () => import('../views/back_page/Dashboard.vue'),
    children: [
      {
        name: 'Products',
        path: 'Products',
        component: () => import('../views/back_page/Products.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'Order',
        path: 'Order',
        component: () => import('../views/back_page/Order.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'Couponcode',
        path: 'Couponcode',
        component: () => import('../views/back_page/Couponcode.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'CustomerOrder',
        path: 'customer_order',
        component: () => import('../views/back_page/CustomerOrder.vue'),
      },
      {
        name: 'CustomerCheckout',
        path: 'Customer_checkout/:orderId',
        component: () => import('../views/back_page/CustomerCheckout.vue'),
      },
      {
        name: 'Cart',
        path: 'Cart',
        component: () => import('../views/back_page/Cart.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
