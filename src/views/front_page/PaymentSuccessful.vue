<template>
  <div>
    <section class="Paymentsuccess">
      <div class="payment-bg"></div>
      <div class="container">
        <div class="row pt-5 justify-content-between order-title">
          <div class="order-process process-undone-color col-12 col-md-3">Information</div>
          <div class="order-process process-undone-color col-12 col-md-3">Payment</div>
          <div class="order-process process-now-color col-12 col-md-3">Successful</div>
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
              <i class="fas fa-chevron-left"></i>
              <i class="fas fa-chevron-left"></i>
              <h5 class="d-inline-block font-weight-bold">繼續購物</h5>
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
        user: {}
      },
    }
  },
  methods: {
    getOrder(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$http.get(api).then(response => {
        vm.order = response.data.order;
      });
    }
  },
  created() {
    this.getOrder(this.$route.query.id);
  }
}
</script>

<style scoped>
.Paymentsuccess {
  margin-bottom: 180px;
}
.payment-bg {
  width: 100%;
  height: 100px;
  background-image: url("../../assets/frontbgimg/porductinfor.jpg");
  background-position: center;
  background-size: cover;
  z-index: -10;
}
.payment-bg:after {
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
.order-process {
  border-radius: 10px;
  width: 30%;
  padding: 5px;
  margin: 5px 0;
  color: #fff;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  font-weight: 900;
}
.process-now-color {
  background-color: #008443;
}
.process-undone-color {
  background-color: #306136;
}
.order-title {
  padding: 15px;
}
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