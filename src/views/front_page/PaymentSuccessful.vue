<template>
  <div>
    <section class="Paymentsuccess page-expand">
      <div class="productIn-bg"></div>
      <div class="container">
        <div class="pt-5 pb-5 d-flex justify-content-between order-title">
          <div class="order-process text-primary text-center">
            <div class="process bg-primary text-white mx-auto">1</div>
            <h5 class="process-title font-weight-bold mt-2">訂購資料</h5>
          </div>
          <div class="order-process text-primary text-center">
            <div class="process bg-primary text-white mx-auto">2</div>
            <h5 class="process-title font-weight-bold mt-2">訂單付款</h5>
          </div>
          <div class="order-process text-primary text-center">
            <div class="process border border-primary bg-white text-primary mx-auto">3</div>
            <h5 class="process-title font-weight-bold mt-2">付款成功</h5>
          </div>
        </div>
        <div class="successful justify-content-center">
          <h1 class="successful-title mt-5 text-info text-center"><i class="far fa-check-circle"></i></h1>
          <h4 class="mt-3 text-center">嗨!&nbsp;{{ order.user.name }}，恭喜你</h4>
          <h1 class="mt-3 text-info font-weight-bold text-center">付款成功!</h1>
          <h3 class="mt-3 text-center">付款總金額 : NT.&nbsp;{{ order.total }}</h3>
          <div class="information">
            <h4 class="text-left text-info font-weight-bold">訂單資訊 : </h4>
            <ul class="list-unstyled pl-1 mt-3">
              <li>收件人&nbsp;:&nbsp;&nbsp;<p>{{ order.user.name }}</p></li>
              <li>收件人電話&nbsp;:&nbsp;&nbsp;<p>{{ order.user.tel }}</p></li>
              <li>收件人Email&nbsp;:&nbsp;&nbsp;<p>{{ order.user.email }}</p></li>
              <li>收件人地址&nbsp;:&nbsp;&nbsp;<p>{{ order.user.address }}</p></li>
              <li>付款時間&nbsp;:&nbsp;&nbsp;<p>{{ order.paid_date |  date}}</p></li>
            </ul>

          </div>
          <div class="mt-5 text-center">
            <router-link to="/frontproduct">
              <button class="btn btn-primary">
                <i class="fas fa-chevron-left"></i>
                <i class="fas fa-chevron-left"></i>
                <h5 class="d-inline-block font-weight-bold">繼續購物</h5>
              </button>
            </router-link>
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
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrder(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order;
      });
    },
  },
  created() {
    this.getOrder(this.$route.query.id);
  },
};
</script>

<style scoped>
.successful-title {
  font-size: 80px;
}
.information {
  width: 300px;
  margin: 50px auto 0;
}
li {
  margin-bottom: 10px;
}
p {
  display: inline-block;
  margin-bottom: 0;
}
</style>
