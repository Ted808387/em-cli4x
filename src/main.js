import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import DateFilter from './filters/Date';
import { ValidationProvider ,ValidationObserver,extend ,localize} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import { required, email } from 'vee-validate/dist/rules';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

axios.defaults.withCredentials = false;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('Date', DateFilter);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
localize('zh_TW', TW);
Vue.use(VueAwesomeSwiper);


extend('required', required);
extend('email', email);

export default {
  components: {
    ValidationProvider,
  },
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
