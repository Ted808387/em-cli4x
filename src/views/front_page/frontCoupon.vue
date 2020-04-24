<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="conpon page-expand">
      <div class="coupon-bg"></div>
      <div class="coupon-title">
        <h2 class="text-center font-weight-bold mt-5">最新資訊</h2>
        <div class="coupon-code mt-5">
          <div class="container">
            <div class="coupon-img d-block text-white p-3 text-center d-flex justify-content-center">
              <div class="coupon-text align-self-center text-shadow">
                <h1 class="Coupon font-weight-bold">因應Covid-19流行</h1>
                <h1 class="font-weight-bold">折扣碼</h1>
                <h1 class="couponcode">health</h1>
                <h1 class="text-center font-weight-bold">商品全面8折</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    setTimeout(() => {
      vm.isLoading = false;
    }, 800);
    $('html,body').animate({
      scrollTop: 0,
    }, 0);
  },
};
</script>
