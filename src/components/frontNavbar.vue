<template>
  <div>
    <loading :active.sync="isLoading"></loading> 
    <div class="scrolltop omouse" @click="scrollTop" v-if="scrolltop">
      <i class="fas fa-angle-double-up fa-3x"></i>
    </div>
    <div id="popup-overlay" class="menu-popup" :class="{ popupClose : menu }" @click.stop="menu = true">
      <div class="omouse popup-close" @click.stop="menu = !menu">
        <i class="fas fa-times menu-close"></i>
      </div>
      <ul class="menu-side pl-0 mt-3">
        <li class="mb-4">
          <router-link to="/" class="menu-title">
            <h4 @click.stop="menu = !menu">HOME</h4>
          </router-link>
        </li>
        <li class="mb-4">
          <router-link to="/frontcoupon" class="menu-title">
            <h4 @click.stop="menu = !menu">NEWS</h4>
          </router-link>
        </li>
        <li class="mb-4">
          <router-link to="/frontproduct" class="menu-title">
            <h4 @click.stop="menu = !menu">PRODUCTS</h4>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="header" :class="{headercolor : headerchange}">
      <div class="container">
        <header class="navbar navbar-expand-sm navbar-light justify-content-between">
          <div class="omouse menu-toggle" @click.stop="menu = !menu" v-if="displaymenu">
            <span class="menu-line" :class="{ bgcolor : headerchange }"></span>
            <span class="menu-line" :class="{ bgcolor : headerchange }"></span>
            <span class="menu-line" :class="{ bgcolor : headerchange }"></span>
          </div>
            <router-link class="nav-link pt-0 pb-0" to="/">
              <div class="mask-logo">
                <div class="mask-logo_img" :class="{ imgcolor : headerchange }"></div>
                <h5 class="mask-logo_text" :class="{ fontcolor : headerchange }">Wear Mask</h5>
              </div>
            </router-link>
            <ul class="navbar-nav mx-auto" v-if="!displaymenu">
              <li class="nav-item">
                <router-link class="nav-link text-white font-weight-bold nav-text-color" to="/" :class="{ fontcolor : headerchange }">
                HOME
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white font-weight-bold nav-text-color" to="/frontcoupon" :class="{ fontcolor : headerchange }">
                NEWS
                </router-link>
              </li>
              <li class="nav-item">
              <router-link class="nav-link text-white font-weight-bold nav-text-color" to="/frontproduct" :class="{ fontcolor : headerchange }">
                PRODUCTS
                </router-link>
              </li>
            </ul>
            <router-link class="nav-link text-white font-weight-bold nav-text-color" to="/login" :class="{ fontcolor : headerchange }">
                LOGIN
            </router-link>
            <ul class="navbar-nav float-right">
              <li class="nav-item">
                <div class="shopping-cart nav-link">
                  <i class="fas fa-shopping-basket fa-2x text-white nav-text-color omouse" :class="{ fontcolor : headerchange }" @click.stop="cart = !cart"></i>
                  <div class="product-quantity bg-primary" v-if="Cart.carts !== undefined && Cart.carts.length > 0">{{ Cart.carts.length}}</div>
                </div>
              </li>
            </ul>
            <!-- cart -->
            <div calss="productModal">
              <div class="modal-cart" :class="{'opacity-cart' : cart}" @click.stop="cart = true">
                <div class="cart-alert text-center mt-2 mb-3" v-if="Cart.total === 0">－&nbsp;購物車無商品，請選購&nbsp;－</div>
                <p class="mb-0 text-center" v-if="Cart.total !== 0">你的購物車</p>
                <table class="table mt-1 mx-auto" v-if="Cart.total !== 0">
                  <tbody>
                    <tr v-for="item in Cart.carts" :key="item.id">
                      <td>
                        <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
                          <i class="fas fa-spinner fa-spin" v-if="status.loading == item.id"></i>
                          <i class="far fa-trash-alt" v-if="status.loading !== item.id"></i>
                        </button>
                      </td>
                      <td>
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                          已套用優惠卷
                        </div>
                      </td>
                      <td width="80">{{ item.qty }}/{{ item.product.unit }}</td>
                      <td class="text-right">
                        {{ item.final_total | currency }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總計</td>
                      <td class="text-right">{{ Cart.total }}</td>
                    </tr>
                    <tr class="text-primary" v-if="Cart.final_total !== Cart.total">
                      <td colspan="3" class="text-right">折扣價</td>
                      <td class="text-right">{{ Cart.final_total }}</td>
                    </tr>
                  </tfoot>
                </table>
                <router-link to="/frontcart" v-if="Cart.total !== 0">
                  <button type="button" class="shop-btn btn btn-primary float-right font-weight-bold" style="width: 100%;" @click.stop="cart = !cart">
                    Checkout
                  </button>
                </router-link>
                <router-link to="/frontproduct" v-if="Cart.total === 0">
                  <button type="button" class="shop-btn btn btn-primary font-weight-bold" style="width: 100%;" @click.stop="cart = !cart">
                    shop now
                  </button>
                </router-link>
              </div>
            </div>
        </header>
      </div>
    </div>   
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data () {
    return {
      isLoading: false,
      menu: false,
      headerchange: false,
      cart: false,
      displaymenu: false,
      Cart: {},
      status: {
          loading: {},
      },
      scrolltop: false,
    };
  },
  methods: {
    gettoCart() {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const vm = this;  
        this.$http.get(url).then((response) => {
            vm.Cart = response.data.data;
        });
    },
    deleteCar(id) { 
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;  
      vm.status.loading = id;
      this.$http.delete(url).then((response) => {
      vm.status.loading = '';
      this.$bus.$emit('message:push', '已刪除訂單','danger');
      this.$bus.$emit('changecart');
      this.gettoCart(); 
      });
    },
    scrollTop() {
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    },
  },
  created() {
    const vm = this;
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop ||
      document.body.scrollTop;
      if (scrollTop > 100) {
        vm.headerchange = true;
      } 
      else if (scrollTop < 100) {
        vm.headerchange = false;
      }
      if (scrollTop > 500) {
        vm.scrolltop = true;
      } 
      else if (scrollTop < 500) {
        vm.scrolltop = false;
      }
    }, true);
    window.addEventListener('resize', () => { 
       if(document.body.clientWidth < 768) {
         vm.displaymenu = true;
       } else {
         vm.displaymenu = false;
       }
    }, false);
    document.addEventListener('click',(e) => {
        if(e.target.className !== 'model-cart') {
          vm.cart = false;
        }
        if(e.target.className !== 'popup-overlay') {
          vm.menu = false;
        }
    });
    vm.isLoading = false;
    vm.gettoCart();
    vm.$bus.$on('changecart',vm.gettoCart);
  },
};

</script>

<style>
  .scrolltop {
      position: fixed;
      top: 80%;
      right: 20px;
      color: #094D2B;
      z-index: 1000;
      transition: all 0.3s;
  }
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 500;
    transition: all 0.4s;
  }
  .headercolor{
	  background-color: #fefefe;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    transition: all 0.4s;
  }
  .mask-logo {
    text-align: center;
  }
  .mask-logo_img {
    width: 85px;
    height: 50px;
    display: inline-block;
    background-color: #ffffff;
    -webkit-mask: url('../assets/frontimg/mask-log.png') no-repeat;
    mask: url('../assets/frontimg/mask-log.png') no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
  .mask-logo_text {
    color: #fefefe;
    margin: -4px 0;
  }
  .imgcolor {
    background-color: #094D2B;
  }
  .fontcolor {
    color: #094D2B !important;
  }
  .menu-toggle .bgcolor {
    background-color: #008443;
  }
  .text-white {
    transition: color 0.4s;
  }
  .menu-toggle {
    margin-right: 10px;
  }
  .menu-line {
    display: block;
    width: 32px;
    height: 3px;
    background-color: #fff;
    margin-bottom: 8px;
    margin-top: 8px;
    transition: all 0.4s;
  }
  .menu-toggle:hover .menu-line{
  background-color: #008443;
  transition: all 0.4s;
  }
  .menu-toggle:hover .menu-line:nth-child(1){
	transform: translateX(-20%);
  }
  .menu-toggle:hover .menu-line:nth-child(3){
	transform: translateX(20%);
  }
  .menu-popup {
    display: inline-block;
    position: fixed;
    width: 0%;
    height: 100%;
    background-color: #fff;
    transition: all 0.4s;
    z-index: 1000;
  }
  .popupClose.menu-popup {
    width: 300px;
    transition: all 0.4s;
    box-shadow: 2px 0 3px -1px rgba(0,0,0,0.5);
  }
  .popupClose .popup-close {
    display: block;
    width: 100%;
    height: 60px;
    background-color: #fefefe;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    text-decoration: none;
    transition: all 0.4s;
  }
  .popup-close {
    display: block;
    width: 100%;
    height: 60px;
    background-color: #fefefe;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    transition: all 0.4s;
  }
  .menu-close {
    display: none;
    visibility: hidden;
  }
  .popupClose .menu-close:hover {
    color: #008443;
  }
  .popupClose .menu-close {
    display: block;
    text-align: center;
    font-size: 40px;
    padding-top: 10px;
    color: #000;
    visibility: visible;
    transition: all 0.4s;
  }
  .menu-side {
    visibility: hidden;
    text-align: center;
    opacity: 0;
    transition: all 0.4s;
  }
  .popupClose .menu-side {
    list-style: none;
    text-align: center;
    opacity: 1;
    transition: all 0.4s;
    visibility: visible;
  }
  .menu-title {
    color: #000;
    transition: all 0.4s;
  }
  .menu-title:hover {
    color: #008443;
    text-decoration: none;
    transition: all 0.4s;
  }
  .nav-text-color:hover {
    color: #008443 !important;
    transition: color 0.4s;
  }
  .modal-cart {
    position: absolute;
    top: 70px;
    right: 50px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 6px 6px 5px rgba(0, 0, 0, 0.2);
    visibility: hidden;
  }
  .opacity-cart {
    visibility: visible;
  }
  .product-quantity {
    float: right;
    width: 15px;
    text-align: center;
    padding: 1px;
    color: #fff;
    border-radius: 7.5px;
    transform: translate(5px,10%);
  }
</style>
