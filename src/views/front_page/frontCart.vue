<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="Cart">
      <div class="cart-bg"></div>
      <!-- Cart -->
      <div class="container">
        <h2 class="text-center mt-3 mb-5 font-weight-bold">購物車</h2>
        <div class="Nothing text-center" v-if="Cart.total === 0">
          <h3 class="font-weight-bold mb-5">－&nbsp;購物車無物品&nbsp;－</h3>
          <router-link to="/frontproduct">
            <button class="btn btn-success btn-lg">Shopping now</button>
          </router-link>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <table class="table mt-4" v-if="Cart.total !== 0">
              <thead style="width: 500px;">
                <tr>
                  <th width="100">
                    <button type="buttom" class="btn btn-outline-danger" @click.stop="deleteall">
                      Clear
                    </button>
                  </th>
                  <th class="productimg" width="150"></th>
                  <th class="align-middle">產品名稱</th>
                  <th width="150" class="text-center align-middle">單價</th>
                  <th width="200" class="text-center align-middle">數量</th>
                  <th width="100" class="align-middle">價格</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in Cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
                      <i class="fa fa-spinner fa-spin" v-if="status.loading === true"></i>
                      <i class="far fa-trash-alt" v-if="status.loading === false"></i>
                    </button>
                  </td>
                  <td class="productimg">
                    <div class="cart-img">
                      <img :src="item.product.imageUrl"
                       alt class="img-fluid d-block"
                        style="width: 100%; height: 100%;
                         background-size: cover;
                         background-position: center;"/>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success font-weight-bold" v-if="item.coupon">Discounted</div>
                  </td>
                  <td class="text-center align-middle">{{ item.product.price | currency }}</td>
                  <td class="text-center align-middle">
                    <div class="select-quantity">
                      <input class="select-up select-outline bg-white"
                       type="button" value="-"
                       @click="select(item.product.id, -1, item.product.title)">
                      <input type="number"
                       class="quantity select-outline"
                       placeholder="1" min="1" max="100"
                       v-model.number="item.qty"
                       @keyup.13="change(item.product.id, item.qty, item.product.title)">
                      <input class="select-down select-outline bg-white"
                       type="button" value="+"
                       @click="select(item.product.id, 1, item.product.title)">
                    </div>
                  </td>
                  <td class="text-right align-middle">{{ item.total | currency }}</td>
                </tr>
              </tbody>
              <tfoot class="font-weight-bold">
                <tr>
                  <td class="productimg"></td>
                  <td colspan="4" class="text-right">總價</td>
                  <td class="text-right">{{ Cart.total | currency }}</td>
                </tr>
                <tr class="text-primary" v-if="Cart.final_total !== Cart.total">
                  <td class="productimg"></td>
                  <td colspan="4" class="text-right">折扣價</td>
                  <td class="text-right">{{ Cart.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="col-sm-12">
            <table class="coupon table float-md-right mx-sm-auto" v-if="Cart.total !== 0">
              <div class="input-group mb-3 input-group-md">
                <input type="text" class="coupon-code form-control"
                 placeholder="請輸入優惠碼"
                 aria-describedby="basic-addon2"
                 v-model="couponcode">
                <div class="input-group-append">
                  <button class="input-group-text btn btn-outline-primary font-weight-bold"
                   id="basic-addon2" @click="addCouponCode">
                    <i class="fa fa-spinner fa-spin mr-1" v-if="status.loading === true"></i>
                    加入優惠卷
                  </button>
                </div>
              </div>
              <button class="btn btn-outline-success font-weight-bold float-right"
               @click="toOrdercheck"
               style="width: 100%;">
                購物車結算
              </button>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Cart: {},
      couponcode: '',
      isLoading: false,
      status: {
        loading: false,
      },
    };
  },
  methods: {
    gettoCar() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        vm.Cart.carts.sort((a, b) => a.product.price - b.product.price);
        vm.Cart.carts.forEach((item) => {
          if (item.qty < 1) {
            const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
            vm.$http.delete(api).then(() => {
              vm.gettoCar();
            });
          }
        });
        vm.isLoading = false;
      });
    },
    deleteCar(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.status.loading = true;
      vm.$http.delete(url).then((response) => {
        vm.status.loading = false;
        vm.$bus.$emit('message:push', response.data.message, 'danger');
        vm.gettoCar();
        vm.$bus.$emit('changecart');
      });
    },
    deleteall() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        response.data.data.carts.forEach((item) => {
          const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
          vm.$http.delete(api).then(() => {
            vm.gettoCar();
            vm.$bus.$emit('changecart');
          });
        });
        if (response) {
          vm.$bus.$emit('message:push', '清空購物車', 'danger');
        }
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponcode,
      };
      vm.status.loading = true;
      vm.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.gettoCar();
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
        vm.status.loading = false;
      });
    },
    select(id, qty, title) {
      const vm = this;
      vm.$bus.$emit('addtocart', id, qty, title);
    },
    change(id, qty, title) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      console.log(qty);
      vm.$http.get(url).then((response) => {
        const currentproduct = response.data.data.carts.filter((product) => title === product.product.title);
        const currentValue = qty - currentproduct[0].qty;
        vm.$bus.$emit('addtocart', id, currentValue, title);
      });
    },
    toOrdercheck() {
      this.$router.push({
        name: 'OrderCheck',
      });
    },
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    vm.gettoCar();
    vm.$bus.$on('changecart', vm.gettoCar);
  },
};
</script>
