import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/front-home',
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/login.vue'),
  },
  {
    name: 'HelloWorld',
    path: '/front-home',
    component: () => import('../views/front_page/HelloWorld.vue'),
    children: [
      {
        name: 'frontHome',
        path: '/front-home',
        component: () => import('../views/front_page/frontHome.vue'),
      },
      {
        name: 'frontCoupon',
        path: 'frontcoupon',
        component: () => import('../views/front_page/frontCoupon.vue'),
      },
      {
        name: 'frontProduct',
        path: 'frontproduct',
        component: () => import('../views/front_page/frontProduct.vue'),
      },
      {
        name: 'frontProductIn',
        path: 'frontproductIn',
        component: () => import('../views/front_page/frontProductIn.vue'),
      },
      {
        name: 'frontCart',
        path: 'frontcart',
        component: () => import('../views/front_page/frontCart.vue'),
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
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        name: 'Products',
        path: 'Products',
        component: () => import('../views/Products.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'Order',
        path: 'Order',
        component: () => import('../views/Order.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'Couponcode',
        path: 'Couponcode',
        component: () => import('../views/Couponcode.vue'),
        meta: {
            requiresAuth: true,
        },
      },
      {
        name: 'CustomerOrder',
        path: 'customer_order',
        component: () => import('../views/CustomerOrder.vue'),
      },
      {
        name: 'CustomerCheckout',
        path: 'Customer_checkout/:orderId',
        component: () => import('../views/CustomerCheckout.vue'),
      },
      {
        name: 'Cart',
        path: 'Cart',
        component: () => import('../views/Cart.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: '/EM-vue-cli4',
  routes
})

export default router
