<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="productIn">
      <div class="productIn-bg"></div>
      <div class="productinfo mt-5">
        <div class="container">
          <div class="productIn-position mb-3">
            <h5 class="font-weight-bold">
              <router-link to="/frontproduct" class="text-decoration-none">
                商品
              </router-link>&nbsp;/&nbsp;
              <router-link class="text-decoration-none" :to="{ name: 'frontProduct', params: { id:product.category } }">
                {{ product.category }}
              </router-link>&nbsp;/&nbsp;
              <i class="current-color text-style">{{ product.title }}</i>
            </h5>
          </div>
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
                <h5 class="card-category">{{ product.category }}</h5>
                <h3 class="font-weight-bold mb-3">{{ product.title }}</h3>
                <del class="d-inline-block">{{ product.origin_price | currency }}</del>
                <h3 class="font-weight-bold d-inline-block text-primary">{{ product.price | currency }}</h3>
                <p>{{ product.description }}</p>
                <div class="bottom-line mb-2"></div>
                <ul class="product-ul-list pl-4">
                  <li class="product-list">經實驗室測試，採軍規過濾技術可以過濾幾乎100％的污染，氣體，細菌和病毒。</li>
                  <li class="product-list">有呼吸道疾病風險、居住在空氣污染環境、工業環境作業者等高風險空氣環境者適用。</li>
                  <li class="product-list">阻隔有害氣體，異味和所有PM污染，PM2.5、PM0.3、花粉、煙霧、過敏原和病原體。</li>
                  <li class="product-list">透氣性佳、呼吸順暢、體積小、易收納，侷限空間作業佳。</li>
                  <li class="product-list">高密合性：立體剪裁設計，緊密貼合臉部，有效防止污染空氣從邊緣縫隙進入</li>
                  <li class="product-list">NIOSH核可精選呼吸防護具</li>
                </ul>
                <h5 class="text-danger">
                  <i class="fas fa-exclamation-triangle"></i>
                </h5>
                <p class="text-danger">快拆式濾罐與呼吸閥須定時清理更換，避免影響吸入之空氣品質</p>
                <div class="buyproduct mt-3">
                  <div class="select_quantity">
                    <button class="down select-outline bg-white" @click="selectdown">-</button>
                    <input class="quantity select-outline" type="number" placeholder="1" min="1" max="100" v-model.number="num" :key="num">
                    <button class="up select-outline bg-white" @click="selectup">+</button>
                  </div>
                  <button type="button" class="btn btn-primary addcart font-weight-bold" @click="addtoCar(product.id, num, product.title)">加到購物車</button>
                </div>
                <div class="product-price">
                  <div class="total-price text-muted text-nowrap mt-3">
                    <strong class="text-">NT {{ product.price*num | currency }}</strong> 元
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="question">
            <h3 class="font-weight-bold">常見問題FAQ</h3>
            <ul class="list-unstyled pl-2">
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">我已經下標商品了，請問何時出貨呢?</i><br>
                訂單成立後，現貨商品為3天內出貨，預購商品為追加期1~4週。
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">可以更改取件門市或地址嗎?</i><br>
                在商品還未寄出之前是可以的，請與我們聯絡，我們會登記幫您做更改。
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">我收到錯的商品或嚴重瑕疵商品如何處理?</i><br>
                請於收到商品後3天內拍照與我們聯絡，逾期不受理唷!
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">訂單成立後可以取消訂單嗎?</i><br>
                訂單成立後就會幫您追加商品囉，故無法取消訂單，若超過追加期間1~4週，您可以聯絡我們先幫您拆單寄出，運費會由我們承擔
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">請問需要付運費嗎?</i><br>
                現階段為促銷期間，商品通通免運費喔
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">如欲訂購數量較多的產品，可直接向公司訂購嗎？</i><br>
                需大量訂購時，請您直接與我們連絡。
              </li>
              <li class="product-list">
                <i class="text-style text-primary font-weight-bold">如何計算七天鑑賞期</i><br>
                根據消費者保護法之規定，您享有商品到貨的七日鑑賞期權益，是由消費者收到商品的隔日開始算起至第7天止，為七日鑑賞期限。<br>
                如有以下狀況則無法辦理退貨：<br>
                • 如有化妝請特別小心，商品沾染到粉妝時，請恕無法接受退貨。<br>
                • 非正常損壞痕跡<br>
                • 商品配件不全<br>
                • 超過七天鑑賞期
              </li>
            </ul>
            <h5 class="font-weight-bold"><i class="fas fa-exclamation-circle text-primary"></i>疫情的防護</h5>
            <p class="pl-2">
              健康民眾則不需要戴N95口罩，一般外科口罩就有足夠的防護力。防範嚴重特殊傳染性肺炎最有效的方法為勤洗手，可以用肥皂濕洗手或乾洗手，正確的乾洗手使用量只要2至5CC即可，不需要過多。
            </p>
          </div>
        </div>
      </div>
    </section>
    <recommend :cardproduct="itemcategory" @turn="getproduct" @addcart="addtoCar"></recommend>
  </div>
</template>

<script>
import recommend from '../../components/Recommend.vue';

export default {
  data() {
    return {
      num: 1,
      isLoading: false,
      product: {},
      itemcategory: '',
      status: {
        loading: {},
      },
      Cart: [],
    };
  },
  components: {
    recommend,
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
    getproduct(id, category) {
      const vm = this;
      vm.itemcategory = category;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 0;
        vm.isLoading = false;
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
        if (qty !== 0) {
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
            vm.$bus.$emit('message:push', data.data.message, 'info');
            vm.status.loading = '';
            vm.$bus.$emit('changecart');
          });
        } else {
          vm.$bus.$emit('message:push', '請輸入數量', 'danger');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getproduct(vm.$route.query.id, vm.$route.query.category);
  },
};
</script>

<style scoped>
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
.buyproduct {
  display: flex;
  justify-content: space-between;
}
.select_quantity {
  display: flex;
  justify-content: start;
  align-items: center;
}
.select-outline:focus {
  outline-color: #8bcc8c;
  box-shadow: 0px 0px 5px #8bcc8c;
  transition: all 0.2s;
  border: 1px solid #8bcc8c;
}
.quantity {
  max-width: 60px;
  width: 60%;
  height: 50px;
  line-height: 46px;
  border: 1px solid gray;
  display: inline-block;
  text-align: center;
  font-size: 20px;
}
.down {
  display: inline-block;
  border: 1px solid gray;
  font-size: 18px;
  width: 30%;
  height: 50px;
  border-right: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.up {
  display: inline-block;
  border: 1px solid gray;
  font-size: 18px;
  /* min-width: 16px; */
  width: 30%;
  height: 50px;
  border-left: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.total-price {
  font-size: 24px;
  float: right;
}
.addcart {
  height: 50px;
  width: 120px;
  font-size: 1rem;
}
</style>
