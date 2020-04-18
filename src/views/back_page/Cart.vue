<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4 mx-auto" style="width: 500px;" v-if="Cart.total !== 0">
      <thead style="width: 500px;">
        <tr>
          <th width="100"></th>
          <th>品名</th>
          <th width="100">數量</th>
          <th width="100">價格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Cart.carts" :key="item.id">
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
          </td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="text-right">{{ item.final_total | currency }}</td>
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
    <table class="table mx-auto" style="width: 500px; font-size: 14px" v-if="Cart.total !== 0">
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" aria-describedby="basic-addon2" v-model="couponcode"/>
        <div class="input-group-append">
          <button class="input-group-text btn btn-outline-secondary" id="basic-addon2" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </table>
    <!-- Order -->
    <ValidationObserver class="my-5 row justify-content-center" ref="form">
      <form class="col-md-6" @submit.prevent="createdOrder">
        <ValidationProvider rules="required|email" v-slot="{ failed,errors }" name="email">
          <div class="form-group">
            <label for="useremail">Email</label>
            <!-- 如果無內容送出表單的話，可以在input內加上required去阻擋，Chrome會自動跳出錯誤訊息 -->
            <input type="email" class="form-control" id="useremail" name="email" v-model="form.user.email" placeholder="請輸入 Email" :class="{ 'is-invalid' : failed }" required/>
            <span class="text-danger" v-if="failed">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ failed }" name="name">
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username" v-model="form.user.name" placeholder="輸入姓名" :class="{ 'is-invalid' : failed }" required/>
            <span class="text-danger" v-if="failed">姓名錯誤</span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ failed }" name="tel">
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" name="tel" :class="{ 'is-invalid' : failed }" required/>
            <span v-if="failed" class="text-danger">電話錯誤</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ failed }" name="address">
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" placeholder="請輸入地址" :class="{ 'is-invalid' : failed }" required/>
            <span class="text-danger" v-if="failed">地址欄位不得留空</span>
          </div>
        </ValidationProvider>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name='' id="comment" class="form-control form_textarea" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      status: {
        loading: {},
      },
      isLoading: false,
      Cart: {},
      couponcode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    addtoCar(id, qty) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loading = id;
      const car = {
        product_id: id,
        qty, // 可直接用一個變數代替，直接將值帶進來
      };
      vm.$http.post(url, { data: car }).then(() => {
        vm.status.loading = '';
        $('#productModal').modal('hide');
        vm.gettoCar();
      });
    },
    gettoCar() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        vm.isLoading = false;
      });
    },
    deleteCar(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        vm.gettoCar();
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponcode,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then(() => {
        vm.isLoading = false;
        vm.gettoCar();
      });
    },
    createdOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$http.post(url, { data: order }).then((response) => {
            // 將form傳到api
            vm.$bus.$emit('message:push', '訂單建立成功', 'success');
            if (response.data.success) {
              vm.$router.push(
                `/Dashboard/Customer_checkout/${response.data.orderId}`,
              ); // 成功後轉到結帳頁面
            }
          });
        } else {
          vm.$bus.$emit('message:push', '欄位不完整', 'danger');
        }
      });
    },
  },
  created() {
    this.gettoCar();
  },
};
</script>
