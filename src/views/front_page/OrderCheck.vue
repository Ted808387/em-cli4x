<template>
  <div>
    <section class="ordercheck page-expand">
      <div class="productIn-bg"></div>
      <div class="container">
        <div class="pt-5 pb-5 d-flex justify-content-between order-title">
          <div class="order-process text-primary text-center">
            <div class="process border border-primary bg-white text-primary mx-auto">1</div>
            <h5 class="process-title font-weight-bold mt-2">訂購資料</h5>
          </div>
          <div class="order-process text-primary text-center">
            <div class="process bg-primary text-white mx-auto">2</div>
            <h5 class="process-title font-weight-bold mt-2">訂單付款</h5>
          </div>
          <div class="order-process text-primary text-center">
            <div class="process bg-primary text-white mx-auto">3</div>
            <h5 class="process-title font-weight-bold mt-2">付款成功</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 mt-5">
            <ValidationObserver class="row justify-content-center" ref="form">
              <form class="col-md-12">
                <ValidationProvider rules="required|email" v-slot="{ failed,errors }" name="email">
                  <div class="form-group">
                    <h4 class="mb-3 font-weight-bold">連繫資訊</h4>
                    <label for="useremail">Email&nbsp;<span class="text-danger font-weight-bold">*</span></label>
                    <!-- 如果無內容送出表單的話，可以在input內加上required去阻擋，Chrome會自動跳出錯誤訊息 -->
                    <input type="email" class="form-control" id="useremail" name="email" v-model="form.user.email" placeholder="請輸入 Email" :class="{'is-invalid' : failed}" required/>
                    <span class="text-danger" v-if="failed">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ failed }" name="name">
                  <div class="form-group">
                    <label for="username">姓名&nbsp;<span class="text-danger font-weight-bold">*</span></label>
                    <input type="text" class="form-control" name="name" id="username" v-model="form.user.name" placeholder="輸入姓名" :class="{ 'is-invalid' : failed }" required/>
                    <span class="text-danger" v-if="failed">姓名為必填</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ failed }" name="tel">
                  <div class="form-group">
                    <label for="usertel">電話&nbsp;<span class="text-danger font-weight-bold">*</span></label>
                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" name="tel" :class="{ 'is-invalid' : failed }" required/>
                    <span class="text-danger" v-if="failed">電話為必填</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider rules="required" v-slot="{ failed }" name="address">
                  <div class="form-group">
                    <label for="useraddress">地址&nbsp;<span class="text-danger font-weight-bold">*</span></label>
                    <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" placeholder="請輸入地址" :class="{ 'is-invalid' : failed }" required/>
                    <span class="text-danger" v-if="failed">地址欄位為必填</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ failed }" name="method">
                  <div class="form-group">
                    <label for="payment">付款方式&nbsp;<span class="text-danger font-weight-bold">*</span></label>
                    <select id="payment" class="form-control" name="payment" v-model="form.user.method" :class="{ 'is-invalid' : failed }" required>
                      <option selected disabled hidden>選擇付款方式</option>
                      <option>貨到付款</option>
                      <option>超商取貨付款</option>
                      <option>ATM轉帳</option>
                      <option>超商代碼繳費</option>
                    </select>
                    <span class="text-danger" v-if="failed">付款方式為必填</span>
                  </div>
                </ValidationProvider>
                <div class="form-group">
                  <label for="comment">其他</label>
                  <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.user.message" placeholder="留言其他建議" style="resize:none;"></textarea>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <div class="col-sm-6 mt-5" style="border-left: 1px solid #adb5bd;">
            <div class="order-card">
              <h4 class="mb-5 font-weight-bold">你的訂單</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th width="85%">產品名稱</th>
                    <th>價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in Cart.carts" :key="item.id">
                    <td>{{item.product.title}} X {{item.qty}}</td>
                    <td class="text-right">{{item.total | currency}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="font-weight-bold align-middle">
                      <h5 class="font-weight-bold">總價</h5>
                    </td>
                    <td class="text-right">
                      <h5 v-if="Cart.total === Cart.final_total">{{ Cart.total | currency }}</h5>
                      <h5 class="text-primary font-weight-bold" v-if="Cart.total !== Cart.final_total">折扣&nbsp;&nbsp;&nbsp;{{ Cart.final_total | currency }}</h5>
                    </td>
                  </tr>
                  <tr class="text-center">
                    <td colspan="2">
                      <button class="btn btn-primary mt-3 font-weight-bold" style="width:100%;" @click.prevent="createdOrder">送出訂單</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: '',
          method: '',
        },
      },
      Cart: {},
      isLoading: false,
    };
  },
  methods: {
    gettoCar() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        vm.isLoading = false;
      });
    },
    createdOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$http.post(url, { data: order }).then((response) => {
            vm.$bus.$emit('message:push', '已建立訂單', 'success');
            vm.isLoading = false;
            if (response.data.success) {
              vm.$router.push({
                name: 'OrderPayment',
                query: {
                  id: response.data.orderId,
                },
              });
            }
          });
        } else {
          vm.$bus.$emit('message:push', '欄位不完整', 'danger');
        }
      });
    },
  },
  computed: {},
  created() {
    this.gettoCar();
  },
};
</script>

<style scoped>
.order-card {
  height: 500px;
}
</style>
