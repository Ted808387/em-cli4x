<template>
  <div>
    <section class="Cart">
      <div class="cart-bg"></div>
      <!-- Cart -->
      <div class="container">
        <h2 class="text-center mt-3 mb-5 font-weight-bold">Shopping Cart</h2>
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
                  <th class="align-middle">Product</th>
                  <th width="150" class="text-center align-middle">Price</th>
                  <th width="200" class="text-center align-middle">Quantity</th>
                  <th width="100" class="align-middle">Total</th>
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
                      <img :src="item.product.imageUrl" alt class="img-fluid d-block" style="width: 100%; height: 100%; background-size: cover;background-position: center;"/>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success font-weight-bold" v-if="item.coupon">Discounted</div>
                  </td>
                  <td class="text-center align-middle">{{ item.product.price | currency }}</td>
                  <td class="align-middle text-center">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="text-right align-middle">{{ item.total | currency }}</td>
                </tr>
              </tbody>
              <tfoot class="font-weight-bold">
                <tr>
                  <td class="productimg"></td>
                  <td colspan="4" class="text-right">Total</td>
                  <td class="text-right">{{ Cart.total | currency }}</td>
                </tr>
                <tr class="text-primary" v-if="Cart.final_total !== Cart.total">
                  <td class="productimg"></td>
                  <td colspan="4" class="text-right">Discounted price</td>
                  <td class="text-right">{{ Cart.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="col-sm-12">
            <table class="coupon table float-md-right mx-sm-auto" v-if="Cart.total !== 0">
              <div class="input-group mb-3 input-group-md">
                <input type="text" class="coupon-code form-control" placeholder="請輸入優惠碼" aria-describedby="basic-addon2" v-model="couponcode">
                <div class="input-group-append">
                  <button class="input-group-text btn btn-outline-primary font-weight-bold" id="basic-addon2" @click="addCouponCode">
                    <i class="fa fa-spinner fa-spin mr-1" v-if="status.loading === true"></i>
                    加入優惠卷
                  </button>
                </div>
              </div>
              <button class="btn btn-outline-success font-weight-bold float-right" @click="toOrdercheck" style="width: 100%;">
                購物車結算
              </button>
            </table>
          </div>
        </div>
      </div>
    </section>
    <recommend></recommend>
  </div>
</template>

<script>
import $ from "jquery";
import recommend from "../../components/Recommend";

export default {
  data() {
    return {
      status: {
        loading: {}
      },
      Cart: {},
      Cartitem: [],
      couponcode: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      status: {
        loading: false
      }
    };
  },
  components: {
    recommend
  },
  methods: {
    gettoCar() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        vm.Cart = response.data.data;
      });
    },
    deleteCar(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.status.loading = true;
      vm.$http.delete(url).then(response => {
        vm.status.loading = false;
        vm.$bus.$emit("message:push", response.data.message, "danger");
        vm.gettoCar(); 
        vm.$bus.$emit("changecart");
      });
    },
    deleteall() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        response.data.data.carts.forEach(item => {
          const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
          vm.$http.delete(api).then(response => {
            vm.gettoCar();
            vm.$bus.$emit("changecart");
          });
        });
        if (response) {
          vm.$bus.$emit("message:push", "清空購物車", "danger");
        }
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponcode
      };
      vm.status.loading = true;
      vm.$http.post(url, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.gettoCar();
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
        vm.status.loading = false;
      });
    },
    toOrdercheck() {
      this.$router.push({
        name: "OrderCheck"
      });
    }
  },
  created() {
    const vm = this;
    vm.gettoCar();
    vm.$bus.$on("changecart", vm.gettoCar);
  }
};
</script>

<style scoped>
.cart-bg {
  width: 100%;
  height: 100px;
  background-image: url("../../assets/frontbgimg/porductinfor.jpg");
  background-position: center;
  background-size: cover;
  z-index: -10;
}
.cart-bg:after {
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
.cart-img {
  width: 50px;
}
.coupon-code {
  transition: all 0.3s;
}
.coupon-code:focus {
  height: 50px;
  transition: all 0.3s;
}
.coupon {
  width: 300px;
}
@media (max-width: 768px) {
  .coupon {
    width: 100%;
  }
  .productimg {
    display: none;
  }
}
</style>