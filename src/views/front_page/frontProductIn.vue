<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="product">
      <div class="product-bg"></div>
      <div class="productinfo mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-8 pb-3">
              <div class="product-img-box">
                <div class="product-img">
                  <div :src="product.imageUrl" :style="{backgroundImage: `url(${ product.imageUrl })`}" class="product-item-img"></div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="product_content">
                <h5 class="category">{{ product.category }}</h5>
                <h3 class="font-weight-bold mb-3">{{ product.title }}</h3>
                <del class="d-inline-block">{{ product.origin_price | currency }}</del>
                <h3 class="font-weight-bold d-inline-block text-primary">{{ product.price | currency }}</h3>
                <p>{{ product.description }}</p>
                <div class="bottom-line mb-2"></div>
                <ul class="product-ul-list pl-4">
                  <li class="product-list">經實驗室測試，採軍規過濾技術可以過濾幾乎100％的污染，氣體，細菌和病毒。</li>
                  <li class="product-list">有呼吸道疾病風險、居住在空氣污染環境、工業環境作業者等高風險空氣環境者適用。</li>
                  <li class="product-list">阻隔有害氣體，異味和所有PM污染，PM2.5、PM0.3、花粉、煙霧、過敏原和病原體。</li>
                  <li class="product-list">採用快拆式濾罐，體積小、易收納，侷限空間作業佳。</li>
                  <li class="product-list">NIOSH核可精選呼吸防護具</li>
                </ul>
                <h5 class="text-danger">
                  <i class="fas fa-exclamation-triangle"></i>
                </h5>
                <p class="text-danger">快拆式濾罐與呼吸閥須定時清理更換，避免影響吸入之空氣品質</p>
                <div class="buyproduct mt-3">
                  <div class="select-quantity">
                    <input class="select-up select-outline bg-white" type="button" value="+" @click="selectup"/>
                    <input type="number" class="quantity select-outline" placeholder="0" min="0" max="100" v-model.number="num" :key="num"/>
                    <input class="select-down select-outline bg-white" type="button" value="-" @click="selectdown"/>
                  </div>
                  <button type="button" class="btn btn-primary addcart font-weight-bold" @click="addtoCar(product.id, num, product.title)">加到購物車</button>
                  <div class="product-price">
                    <div class="total-price text-muted text-nowrap mt-3">
                      <strong class="text-">NT {{ product.price*num | currency }}</strong> 元
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      num: 0,
      isLoading: false,
      product: {},
      status: {
        loading: {}
      },
      Cart: [],
    };
  },
  methods: {
    selectup() {
      if (this.num < 100) {
        this.num += 1;
      }
    },
    selectdown() {
      if (this.num > 0) {
        this.num -= 1;
      }
    },
    getproduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product;
        vm.product.num = 0;
        vm.isLoading = false;
      });
    },
    addtoCar(id, qty, title) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loading = id;
      // const car = {
      //   product_id: id,
      //   qty //可直接用一個變數代替，直接將值帶進來
      // };
      vm.$http.get(url).then(response => {
        vm.Cart = response.data.data;
        let itemId = vm.Cart.carts.find(item => {
          return item.product.title === title
        });
        let itemqty = 0;
        if (qty !== 0) {
          if(itemId) { //重覆
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${itemId.id}`;
            vm.$http.delete(url).then(response => {
              vm.$bus.$emit("changecart");
            });
            itemqty = itemqty + itemId.qty;
          }
          const car = {
            product_id: id,
            qty: itemqty + qty
          };
          vm.$http.post(url, { data: car }).then(response => {
            vm.$bus.$emit("message:push", response.data.message, "info");
            vm.status.loading = "";
            vm.$bus.$emit("changecart");
          });
        } else {
          vm.$bus.$emit("message:push", "請輸入數量", "danger");
        }
      });
    }
  },
  created() {
    const vm = this;
    vm.getproduct(vm.$route.query.id);
  }
};
</script>

<style scoped>
.product-bg {
  width: 100%;
  height: 100px;
  background-image: url("../../assets/frontbgimg/porductinfor.jpg");
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
  height: 100px;
  background: linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -moz-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -webkit-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -o-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  opacity: 0.6;
}
.product-img-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.product-img {
  width: 100%;
  padding-top: 100%;
  position: relative;
}
.product-item-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.bottom-line {
  border-bottom: solid #8bcc8c 1px;
}
.product-list {
  margin-bottom: 10px;
}
.category {
  color: rgb(135, 138, 135);
}
.select-quantity {
  display: inline-block;
}
.select-outline:focus {
  outline-color: #8bcc8c;
  box-shadow: 0px 0px 5px #8bcc8c;
  transition: all 0.2s;
  border: 1px solid #8bcc8c;
}
.quantity {
  width: 62px;
  height: 49px;
  border: 1px solid gray;
  display: inline-block;
  text-align: center;
  font-size: 20px;
}
.select-up {
  display: inline-block;
  border: 1px solid gray;
  font-size: 20px;
  width: 40px;
  height: 49px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  margin: 1px  -1px 0 0;
}
.select-down {
  display: inline-block;
  border: 1px solid gray;
  font-size: 20px;
  width: 40px;
  height: 49px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  margin: 1px  0 0 -1px;
}
.total-price {
  font-size: 24px;
  float: right;
}
.addcart {
  position: absolute;
  margin-left: 30px;
  height: 49px;
  width: 140px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
