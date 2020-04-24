<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="product">
      <div class="product-bg"></div>
      <div class="allproducts mt-5">
        <div class="row">
          <div class="col-sm-3">
            <div class="itemlist">
              <div class="text-primary itemtitle pl-4 font-weight-bold">
                <div>產品列表</div>
              </div>
              <ul class="pl-0 font-weight-bold list-ul list-unstyled">
                <li class="list-li omouse" :class="{ 'list-li-focus':displayitem === '全商品' }" @click="displayitem = '全商品', getpages()">
                  <div>全款商品</div>
                </li>
                <li class="list-li omouse" :class="{ 'list-li-focus':displayitem === '面罩' }" @click="changeitem">
                  <div>面罩</div>
                </li>
                <li class="list-li omouse" :class="{ 'list-li-focus':displayitem === '口罩' }" @click="changeitem">
                  <div>口罩</div>
                </li>
                <li class="list-li omouse" :class="{ 'list-li-focus':displayitem === '防毒面具' }" @click="changeitem">
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
                <div class="card-item omouse">
                  <div class="card-add-item">
                    <div class="card-add-favorite btn btn-primary" @click.stop="addtoFavorite(item)">
                      <i class="fas fa-heart fa-2x text-black" v-if="markfavorite(item)"></i>
                      <i class="fas fa-heart fa-2x" v-else></i>
                    </div>
                    <div class="card-add-cart btn btn-primary" @click.stop="addtoCar(item.id,1,item.title)">
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
            <frontpagination :getpagination="pagination" @userpage="getpages" v-if="displaypage"></frontpagination>
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
      pagesproducts: [],
      displaypage: false,
      pagination: {},
      isLoading: false,
      status: {
        loading: {},
        display: false,
      },
      search: '',
      searchitem: [],
      find: true,
      displayitem: '',
      Cart: [],
      favorites: [],
    };
  },
  components: {
    frontpagination,
  },
  methods: {
    changeitem(e) {
      this.displayitem = e.target.innerText;
    },
    getpages(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.pagesproducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.scrollTop();
      });
    },
    getproducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then((response) => {
        vm.allproducts = response.data.products;
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
        vm.find = vm.allproducts.every((item) => String(item.title).indexOf(vm.search) === -1 && String(item.category).indexOf(vm.search) === -1);
        if (!vm.find) {
          vm.searchitem = vm.allproducts.filter((item) => String(item.title).indexOf(vm.search) > -1 || String(item.category).indexOf(vm.search) > -1);
        } else if (vm.find) {
          vm.$bus.$emit('message:push', `找不到符合搜尋「${vm.search}」，請重新搜尋`, 'danger');
        }
        vm.status.display = false;
        vm.displaypage = false;
      } else {
        vm.displayitem = '全商品';
        vm.status.display = false;
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
  computed: {
    products() {
      const vm = this;
      vm.isLoading = false;
      vm.displaypage = false;
      let filter = [];
      if (vm.allproducts.length > 10) {
        if (vm.displayitem === '全商品') {
          filter = vm.pagesproducts;
          vm.displaypage = true;
        } else if (vm.displayitem === vm.search && !vm.find) {
          filter = vm.searchitem;
        } else {
          filter = vm.allproducts.filter((item) => item.category === vm.displayitem);
        }
      } else if (vm.allproducts.length < 10) {
        if (vm.displayitem === '全商品') {
          filter = vm.allproducts;
          vm.displaypage = true;
        } else if (vm.displayitem === vm.search && !vm.find) {
          filter = vm.searchitem;
        } else {
          filter = vm.allproducts.filter((item) => item.category === vm.displayitem);
        }
      }
      return filter;
    },
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    vm.getproducts();
    vm.getpages();
    if (vm.$route.params.id) {
      vm.displayitem = vm.$route.params.id;
    } else {
      vm.displayitem = '全商品';
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
  .card-item:hover .card-add-favorite,
  .card-item:hover .card-add-cart {
    opacity: 1;
    transition: all 0.4s;
  }
  .card-add-favorite:hover,
  .card-add-cart:hover {
    transition: all 0.5s;
    text-decoration: none;
  }
  .card-add-item {
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 100;
  }
.card-add-favorite {
  position: absolute;
  top: 30px;
  left: 25%;
  width: 25%;
  text-align: center;
  padding: 12px 15px;
  opacity: 0;
  transition: all 0.4s;
  margin-right: 5px;
}
.card-add-cart {
  position: absolute;
  top: 30px;
  left: 65%;
  width: 25%;
  text-align: center;
  padding: 12px 15px;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.4s;
  margin-left: 5px;
}
</style>
