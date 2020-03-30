<template>
  <div>
      <section class="product">
        <div class="product-bg">
        </div>
        <div class="allproducts mt-5">
            <div class="row">
                <div class="col-sm-3">
                    <div class="itemlist">
                        <div class="itemtitle pl-4 font-weight-bold">
                            <div>產品列表</div>
                        </div>
                        <ul class="pl-0 font-weight-bold list-ul">
                                <li @click="getproducts">
                                    <div>全款商品</div>
                                </li>
                                <li @click="selectmask">
                                        <div>面罩</div>
                                </li>
                                <li @click="selectMedical">
                                        <div>口罩</div>
                                </li>
                                <li @click="selectgazmask">
                                        <div>防毒面具</div>
                                </li>
                        </ul>
                        <div class="form-group has-search">
                            <input type="text" class="form-control search_box" placeholder="Search" v-model="search" @keyup.13="searchprodust">
                            <span class="fa fa-search search_icon omouse" @click="searchprodust" v-if="!status.display"></span>
                            <span class="fas fa-spinner fa-spin wait_icon" v-if="status.display"></span>
                        </div>
                    </div>
                </div>
                <!-- products -->
                <div class="col-sm-9">
                    <div class="row">
                        <div class="card-item col-md-4 mb-5 pb-5 col-sm-6" v-for="item in products" :key="item.id">
                            <div class="card_detail-cart">
                                <div class="detail" @click="turnproduct(item.id)">
                                    <h2 class="card-detail">‧‧‧</h2>
                                </div>
                                <div class="card-add-cart" @click="addtoCar(item.id,1)">
                                    <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading == item.id"></i>
                                    <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
                                </div>
                            </div>
                            <div class="card-img" @click.stop="turnproduct(item.id)">
                                <div class="product-img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                            </div>
                            <div class="card-cotnet">
                                <div class="card-category mt-3">
                                    <h5 class="mb-0 card-category_item">{{ item.category }}</h5>
                                </div>
                                <div class="card-title mt-1">
                                    <h4 class="font-weight-bold">{{ item.title }}</h4>
                                </div>
                                <div class="card-price">
                                    <div class="card-origin-price" v-if="!item.price">{{ item.origin_price | currency}}</div>
                                    <del class="card-origin-price" v-if="item.price">{{ item.origin_price | currency}}</del>
                                    <div>{{ item.price | currency}}</div>
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
import frontpagination from '../../components/pagination';

export default {
    data() {
        return {
            allproducts: [],
            displaypage: false,
            products: [],  
            pagination: {},
            status: {
                loading: {},
                display: false,
            },
            search: '',
        };
    },
    components: {
        frontpagination,
    },
    methods: {
        getproducts(page) {
            const vm = this;  
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
            this.$http.get(url).then((response) => {
                vm.allproducts = response.data.products;
                vm.products = vm.allproducts;
                vm.displaypage = true;
                vm.pagination = response.data.pagination;
            });
        },
        selectmask() {
            const vm = this;
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            this.$http.get(url).then((response) => {
                vm.allproducts = response.data.products;
                vm.products = vm.allproducts.filter(function(item) {
                    return item.category == '面罩';
                });
                vm.displaypage = false;
            });
        },
        selectMedical() {
            const vm = this;
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            this.$http.get(url).then((response) => {
                vm.allproducts = response.data.products;
                vm.products = vm.allproducts.filter(function(item) {
                    return item.category == '口罩';
                });
                vm.displaypage = false;
            });
        },
        selectgazmask() {
            const vm = this;
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            this.$http.get(url).then((response) => {
                vm.allproducts = response.data.products;
                vm.products = vm.allproducts.filter(function(item) {
                    return item.category == '防毒面具';
                });
                vm.displaypage = false;
            });
        },
        turnproduct(id) {
            this.$router.push({
                name: 'frontProductIn',
                query: {
                    id: id,
                }, 
            });
        },
        addtoCar(id, qty = 1) {
            const vm = this;
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; 
            vm.status.loading = id;
            const car = {
                product_id: id,
                qty  //可直接用一個變數代替，直接將值帶進來
            };
            this.$http.post(url, { data:car }).then((response) => {
                this.$bus.$emit('message:push', response.data.message,'info');
                vm.status.loading = "";
                this.$bus.$emit('changecart');
            });
        },
        searchprodust() {
            const vm = this;
            vm.status.display = true;
            if(this.search) {
                const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
                this.$http.get(url).then((response) => {
                    vm.allproducts = response.data.products;
                    var find = vm.allproducts.every((item) => {
                        return String(item.title).indexOf(vm.search) === -1 && String(item.category).indexOf(vm.search) === -1;
                    });
                    if(!find) {
                        vm.products = vm.allproducts.filter(function(item) {
                            return String(item.title).indexOf(vm.search) > -1 || String(item.category).indexOf(vm.search) > -1;
                        });
                    } else if(find) {
                        this.$bus.$emit('message:push', '未搜尋到物品，請重新搜尋','danger');
                    }
                    vm.status.display = false;
                });
                vm.displaypage = false;
            }else {
                const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${1}`;
                this.$http.get(url).then((response) => {
                    vm.products = response.data.products;
                    vm.displaypage = true;
                    vm.pagination = response.data.pagination;
                    vm.status.display = false;
                });
            }
        }
    },
    created() {
        const vm = this;
        this.getproducts();
    },
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
        background: linear-gradient(360deg, #70B594 69%, #1C1C1C 100%);
        background: -moz-linear-gradient(360deg, #70B594 69%, #1C1C1C 100%);
        background: -webkit-linear-gradient(360deg, #70B594 69%, #1C1C1C 100%);
        background: -o-linear-gradient(360deg, #70B594 69%, #1C1C1C 100%);
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
      border: solid #8BCC8C 3px;
      color: #306136;
  }
  @media (max-width: 972px){
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
  li {
      padding: 12px 0;
      padding-left: 1.5em;
      cursor: pointer;
      color: #6eb577;
      border-bottom: 1px #6eb577 solid;
      transition: all 0.2s;
  }
  li:hover {
      border-bottom: 3px #306136 solid;
      color: #306136;
      transition: all 0.2s;
  }
  .has-search {
      position: relative;
  }
  .search_box {
      padding-left: 25px;
  }
  .search_icon {
      position: absolute;
      top: 50%;
      left: 5px;
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
      padding: 10px;
      border: 3px #fff solid;
      transition: all 0.6s;
      cursor: pointer;
  }
  .card-item:hover {
      border: 3px #6eb577 solid;
      transition: all 0.6s;
  }
  .card-item:hover .card-detail,
  .card-item:hover .card-add-cart{
      opacity: 1;
      transition: all 0.4s;
  }
  .card-detail:hover,
  .card-add-cart:hover {
      background-color: #8BCC8C;
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
    @media (max-width: 992px){
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
      width: 100%;
      height: 250px;
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