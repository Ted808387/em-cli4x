<template>
  <div>
    <section class="Payment">
      <div class="productIn-bg"></div>
      <div class="Payment_content container">
        <div class="row pt-5 justify-content-between order-title">
          <div class="order-process process-undone-color col-12 col-md-3">訂購資料</div>
          <div class="order-process process-now-color col-12 col-md-3">訂單付款</div>
          <div class="order-process process-undone-color col-12 col-md-3">付款成功</div>
        </div>
        <div class="my-5">
          <form class="form" @submit.prevent="payOrder(orderId)">
            <div class="row">
              <div class="col-md-7">
                <table class="table">
                  <thead>
                    <tr>
                      <th  colspan="2" class="text-center">
                        <h4 class="font-weight-bold">訂購資料</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th width="200">Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr class="th-height">
                      <th>付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-5">
                <table class="table">
                  <thead>
                    <th colspan="3" class="text-center">
                      <h4 class="font-weight-bold">訂購商品</h4>
                    </th>
                    <tr>
                      <td>品名</td>
                      <td width="80">數量</td>
                      <td width="50">單價</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <td class="align-middle">{{ item.product.title }}</td>
                      <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                      <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" class="text-left font-weight-bold">總計</td>
                      <td class="text-right font-weight-bold">{{ order.total }}</td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        <div class="text-right" v-if="order.is_paid === false">
                          <button class="btn btn-info" style="width:150px">確認付款去</button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrder(id) {
      const vm = this;
      vm.orderId = id;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order;
      });
    },
    payOrder(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      vm.$http.post(api).then(() => {
        vm.$router.push({
          name: 'PaymentSuccessful',
          query: {
            id,
          },
        });
      });
      vm.$bus.$emit('changecart');
    },
  },
  created() {
    this.getOrder(this.$route.query.id);
  },
};
</script>
<style scoped>
.Payment {
  margin-bottom: 300px;
}
.table {
  border: 1px solid #dee2e6;
}
.th-height {
  line-height: 38px;
}
</style>
