<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="product">
      <div class="product-bg"></div>
      <div class="allproducts mt-5">
        <div class="row">
          <div class="col-sm-3">
            <div class="itemlist">
              <div class="itemtitle pl-4 font-weight-bold">
                <div>產品列表</div>
              </div>
              <ul class="pl-0 font-weight-bold list-ul list-unstyled">
                <li class="list-li" @click="getproducts" :class="{ 'list-li-focus':displayitem === '全商品' }">
                  <div>全款商品</div>
                </li>
                <li class="list-li" @click="selectmask('面罩')" :class="{ 'list-li-focus':displayitem === '面罩' }">
                  <div>面罩</div>
                </li>
                <li class="list-li" @click="selectmask('口罩')" :class="{ 'list-li-focus':displayitem === '口罩' }">
                  <div>口罩</div>
                </li>
                <li class="list-li" @click="selectmask('防毒面具')" :class="{ 'list-li-focus':displayitem === '防毒面具' }">
                  <div>防毒面具</div>
                </li>
              </ul>
              <div class="form-group has-search">
                <input type="text" class="search_box" placeholder="Search" v-model="search" @keyup.13="searchprodust"/>
                <span class="fa fa-search search_icon omouse" @click="searchprodust" v-if="!status.display"></span>
                <span class="fas fa-spinner fa-spin wait_icon" v-if="status.display"></span>
              </div>
            </div>
          </div>
          <!-- products -->
          <div class="col-sm-9">
            <div class="row">
              <div class="mb-3 pb-5 col-xl-4 col-md-6" v-for="item in products" :key="item.id" @click="turnproduct(item.id, item.category)">
                <div class="card-item">
                  <div class="card_favorite-cart">
                    <div class="favorite" @click.stop="addtoFavorite(item)">
                      <i class="fas fa-heart fa-2x card-favorite mark" v-if="markfavorite(item)"></i>
                      <i class="fas fa-heart fa-2x card-favorite" v-else></i>
                    </div>
                    <div class="card-add-cart" @click.stop="addtoCar(item.id,1,item.title)">
                      <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading === item.id"></i>
                      <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
                    </div>
                    </div>
                    <div class="card-img">
                      <div class="product-img" :style="{backgroundImage: `url(${ item.imageUrl })`}"></div>
                    </div>
                    <div class="card-cotnet">
                    <div class="card-category mt-3 text-center">
                      <h5 class="mb-0 card-category_item">{{ item.category }}</h5>
                    </div>
                    <div class="card-title mt-1 text-center">
                      <h4 class="font-weight-bold">{{ item.title }}</h4>
                    </div>
                    <div class="card-price text-center">
                      <div class="card-origin-price" v-if="!item.price">{{ item.origin_price | currency }}</div>
                      <del class="card-origin-price" v-if="item.price">{{ item.origin_price | currency }}</del>
                      <div>{{ item.price | currency }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <frontpagination :getpagination="pagination" @userpage="getproducts" v-if="displaypage"></frontpagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';
import frontpagination from '../../components/Pagination.vue';

export default {
  data() {
    return {
      allproducts: [],
      displaypage: false,
      products: [],
      pagination: {},
      isLoading: false,
      status: {
        loading: {},
        display: false,
      },
      search: '',
      displayitem: '',
      Cart: [],
      favorites: [],
    };
  },
  components: {
    frontpagination,
  },
  methods: {
    getproducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.allproducts = response.data.products;
        vm.products = vm.allproducts;
        vm.displaypage = true;
        vm.pagination = response.data.pagination;
        vm.displayitem = '全商品';
        vm.isLoading = false;
        vm.scrollTop();
      });
    },
    selectmask(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then((response) => {
        vm.allproducts = response.data.products;
        vm.products = vm.allproducts.filter((item) => {
          vm.displayitem = id;
          return item.category === id;
        });
        vm.displaypage = false;
        vm.scrollTop();
        vm.isLoading = false;
      });
    },
    turnproduct(id, category) {
      this.$router.push({
        name: 'frontProductIn',
        query: {
          id,
          category,
        },
      });
    },
    addtoCar(id, qty, title) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loading = id;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        const itemId = vm.Cart.carts.find((item) => item.product.title === title);
        let itemqty = 0;
        if (itemId) {
          const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${itemId.id}`;
          vm.$http.delete(api).then(() => {
            vm.$bus.$emit('changecart');
          });
          itemqty = +itemId.qty;
        }
        const car = {
          product_id: id,
          qty: itemqty + qty,
        };
        vm.$http.post(url, { data: car }).then((data) => {
          if (qty === 1) {
            vm.$bus.$emit('message:push', data.data.message, 'info');
          }
          vm.status.loading = '';
          vm.$bus.$emit('changecart');
        });
      });
    },
    searchprodust() {
      const vm = this;
      vm.displayitem = '';
      vm.status.display = true;
      if (vm.search) {
        vm.displayitem = vm.search;
        const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        vm.$http.get(url).then((response) => {
          vm.allproducts = response.data.products;
          const find = vm.allproducts.every((item) => String(item.title).indexOf(vm.search) === -1 && String(item.category).indexOf(vm.search) === -1);
          if (!find) {
            vm.products = vm.allproducts.filter((item) => String(item.title).indexOf(vm.search) > -1 || String(item.category).indexOf(vm.search) > -1);
          } else if (find) {
            vm.$bus.$emit('message:push', '未搜尋到物品，請重新搜尋', 'danger');
          }
          vm.status.display = false;
        });
        vm.displaypage = false;
      } else {
        const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${1}`;
        vm.$http.get(url).then((response) => {
          vm.products = response.data.products;
          vm.displaypage = true;
          vm.pagination = response.data.pagination;
          vm.status.display = false;
          vm.displayitem = '全商品';
        });
      }
    },
    gettoFavorite() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    },
    addtoFavorite(item) {
      const vm = this;
      if (vm.favorites.length > 0) {
        const currentValue = vm.favorites.find((product) => item.id === product.id);
        if (!currentValue) {
          vm.favorites.push(item);
        } else {
          vm.$bus.$emit('message:push', '此商品已收藏', 'warning');
        }
      } else {
        vm.favorites.push(item);
      }
      localStorage.setItem('Favorites', JSON.stringify(vm.favorites));
      vm.$bus.$emit('changeFavorites');
    },
    scrollTop() {
      $('html,body').animate({
        scrollTop: 0,
      }, 0);
    },
    markfavorite(item) {
      return this.favorites.some((product) => item.id === product.id);
    },
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    if (vm.$route.params.id) {
      vm.selectmask(vm.$route.params.id);
    } else {
      vm.getproducts();
    }
    vm.gettoFavorite();
    vm.$bus.$off('addtocart');
    vm.$bus.$on('deletefavorites', vm.gettoFavorite);
    vm.$bus.$on('addtocart', (id, qty, title) => {
      vm.addtoCar(id, qty, title);
    });
  },
};
</script>

<style scoped>
  .card-item:hover .card-favorite,
  .card-item:hover .card-add-cart {
    opacity: 1;
    transition: all 0.4s;
  }
  .card-favorite:hover,
  .card-add-cart:hover,
  .card-favorite.mark {
    background-color: #306136;
    color: #fff !important;
    transition: all 0.5s;
    text-decoration: none;
  }
  .card_favorite-cart {
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 100;
  }
.card-favorite {
  position: absolute;
  top: 30px;
  left: 25%;
  width: 25%;
  color: black !important;
  text-align: center;
  padding: 12px 15px;
  background-color: #6eb577;
  opacity: 0;
  transition: all 0.4s;
  margin-right: 5px;
}
.card-add-cart {
  position: absolute;
  top: 30px;
  left: 65%;
  width: 25%;
  color: black !important;
  text-align: center;
  padding: 11px 10px;
  transform: translateX(-50%);
  background-color: #6eb577;
  opacity: 0;
  transition: all 0.4s;
  margin-left: 5px;
}
@media (max-width: 992px) {
  .card-favorite {
    font-size: 120%;
  }
  .card-add-cart {
    font-size: 60%;
  }
}
</style>
