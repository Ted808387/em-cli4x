<template>
  <div>
    <section class="product">
      <div class="product-bg"></div>
      <div class="allproducts mt-5">
        <div class="row">
          <div class="col-sm-3">
            <div class="itemlist">
              <div class="itemtitle pl-4 font-weight-bold">
                <div>產品列表</div>
              </div>
              <ul class="pl-0 font-weight-bold list-ul">
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
              <div class="card-item col-md-4 mb-5 pb-5 col-sm-6" v-for="item in products" :key="item.id" @click="turnproduct(item.id)">
                <div class="card_detail-cart">
                  <div class="detail" @click.stop="turnproduct(item.id)">
                    <h2 class="card-detail">‧‧‧</h2>
                  </div>
                  <div class="card-add-cart" @click.stop="addtoCar(item.id,1)">
                    <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading === item.id"></i>
                    <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
                  </div>
                </div>
                <div class="card-img">
                  <div class="product-img" :style="{backgroundImage: `url(${ item.imageUrl })`}"></div>
                </div>
                <div class="card-cotnet">
                  <div class="card-category mt-3">
                    <h5 class="mb-0 card-category_item">{{ item.category }}</h5>
                  </div>
                  <div class="card-title mt-1">
                    <h4 class="font-weight-bold">{{ item.title }}</h4>
                  </div>
                  <div class="card-price">
                    <div class="card-origin-price" v-if="!item.price">{{ item.origin_price | currency }}</div>
                    <del class="card-origin-price" v-if="item.price">{{ item.origin_price | currency }}</del>
                    <div>{{ item.price | currency }}</div>
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
import $ from "jquery";
import frontpagination from "../../components/Pagination";

export default {
  data() {
    return {
      allproducts: [],
      displaypage: false,
      products: [],
      pagination: {},
      status: {
        loading: {},
        display: false
      },
      search: "",
      displayitem: ""
    };
  },
  components: {
    frontpagination
  },
  methods: {
    getproducts(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(url).then(response => {
        vm.allproducts = response.data.products;
        vm.products = vm.allproducts;
        vm.displaypage = true;
        vm.pagination = response.data.pagination;
        vm.displayitem = '全商品';
      });
    },
    selectmask(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then(response => {
        vm.allproducts = response.data.products;
        vm.products = vm.allproducts.filter(function(item) {
          vm.displayitem = id;
          return item.category ===  id;
        });
        vm.displaypage = false;
      });
    },
    turnproduct(id) {
      this.$router.push({
        name: "frontProductIn",
        query: {
          id: id
        }
      });
    },
    addtoCar(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loading = id;
      const car = {
        product_id: id,
        qty //可直接用一個變數代替，直接將值帶進來
      };
      vm.$http.post(url, { data: car }).then(response => {
        vm.$bus.$emit("message:push", response.data.message, "info");
        vm.status.loading = "";
        vm.$bus.$emit("changecart");
      });
    },
    searchprodust() {
      const vm = this;
      vm.displayitem = '';
      vm.status.display = true;
      if (vm.search) {
        vm.displayitem = vm.search;
        const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        vm.$http.get(url).then(response => {
          vm.allproducts = response.data.products;
          var find = vm.allproducts.every(item => {
            return (
              String(item.title).indexOf(vm.search) === -1 &&
              String(item.category).indexOf(vm.search) === -1
            );
          });
          if (!find) {
            vm.products = vm.allproducts.filter(function(item) {
              return (String(item.title).indexOf(vm.search) > -1 || String(item.category).indexOf(vm.search) > -1);
            });
            // vm.displayitem = vm.products.item.category;
          } else if (find) {
            vm.$bus.$emit("message:push", "未搜尋到物品，請重新搜尋", "danger");
          }
          vm.status.display = false;
        });
        vm.displaypage = false;
      } else {
        const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${1}`;
        vm.$http.get(url).then(response => {
          vm.products = response.data.products;
          vm.displaypage = true;
          vm.pagination = response.data.pagination;
          vm.status.display = false;
          vm.displayitem = '全商品';
        });
      }
    }
  },
  created() {
    const vm = this;
    if (vm.$route.params.id) {
      vm.selectmask(vm.$route.params.id);
    } else {
      vm.getproducts();
    }
  }
};
</script>

<style scoped>
.product-bg {
  width: 100%;
  height: 400px;
  background-image: url("../../assets/frontbgimg/productbg.jpg");
  background-position: center;
  background-size: cover;
  z-index: -10;
}
.product-bg:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -moz-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -webkit-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -o-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  opacity: 0.3;
}
.itemlist {
  position: sticky;
  top: 10%;
  left: 0;
}
.itemtitle {
  font-size: 24px;
  padding: 8px 24px;
  border: solid #008443 3px;
  color: #306136;
}
@media (max-width: 972px) {
  .itemtitle {
    font-size: 16px;
  }
}
.allproducts {
  margin: 0 10%;
}
ul {
  list-style: none;
}
.list-text:hover {
  text-decoration: none;
}
.list-li {
  padding: 12px 0;
  padding-left: 1.5em;
  cursor: pointer;
  color: #008443;
  border-bottom: 1px #008443 solid;
  transition: all 0.2s;
}
.list-li:hover {
  border-bottom: 3px #306136 solid;
  color: #306136;
  transition: all 0.2s;
}
.list-li-focus {
  border-bottom: 3px #306136 solid;
  color: #306136;
  transition: all 0.2s;
}
.has-search {
  position: relative;
}
.search_box {
  width: 100%;
  padding: 10px;
  padding-left: 30px;
  border: 1px solid #9e9e9e;
}
.search_box:focus {
  outline-color: #306136;
  border-color: #fff;
  box-shadow: 0 0 3px #ccc;
}
.search_icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}
.wait_icon {
  position: absolute;
  top: 30%;
  left: 5px;
  transform: translateY(-50%);
}
/* Card */
.card-item {
  position: relative;
  padding: 10px;
  border: 3px #fff solid;
  transition: all 0.6s;
  cursor: pointer;
}
.card-item:hover .card-img:after{
  background-color: rgba(0,0,0,0.5);
}
.card-item:hover .card-detail,
.card-item:hover .card-add-cart {
  opacity: 1;
  transition: all 0.4s;
}
.card-detail:hover,
.card-add-cart:hover {
  background-color: #306136;
  color: #fff !important;
  transition: all 0.5s;
  text-decoration: none;
}
.card_detail-cart {
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 100;
}
.card-detail {
  position: absolute;
  top: 30px;
  left: 25%;
  width: 25%;
  color: black !important;
  text-align: center;
  font-size: 200%;
  padding: 10px 23px;
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
  font-size: 100%;
  padding: 12px 15px;
  transform: translateX(-50%);
  background-color: #6eb577;
  opacity: 0;
  transition: all 0.4s;
  margin-left: 5px;
}
@media (max-width: 992px) {
  .card-detail {
    font-size: 120%;
  }
  .card-add-cart {
    font-size: 50%;
  }
}
.card-category {
  color: rgb(138, 138, 138);
  text-align: center;
}
.card-title {
  text-align: center;
}
.card-price {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.card-origin-price {
  font-size: 14px;
}
.card-img {
  position: relative;
  width: 100%;
  height: 250px;
}
.card-img:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0);
  transition: all 0.6s;
}
.product-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.omouse {
  cursor: pointer;
}
</style>