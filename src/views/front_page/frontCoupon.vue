<template>
  <div>
    <section class="conpon page-expand">
      <div class="conpon-bg"></div>
      <div class="coupon-title">
        <h2 class="text-center font-weight-bold mt-5">最新優惠</h2>
        <div class="coupon-code mt-5">
          <div class="container coupon-shadow">
            <div class="coupon-img d-block text-white p-3 text-center">
              <h2 class="Coupon font-weight-bold">因應Covid-19流行</h2>
              <h3 class="font-weight-bold">折扣碼</h3>
              <h2 class="couponcode text-withe">health</h2>
              <h1 class="text-center font-weight-bold">商品全面8折</h1>
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
  created() {
    $('html,body').animate({
      scrollTop: 0,
    }, 0);
  },
};
</script>
