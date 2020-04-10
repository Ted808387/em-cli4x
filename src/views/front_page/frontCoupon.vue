<template>
  <div>
    <section class="product">
      <div class="product-bg"></div>
      <div class="coupon-title">
        <h2 class="text-center font-weight-bold mt-5 text-primary">Latest Offers</h2>
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

<style scoped>
.product-bg {
  width: 100%;
  height: 250px;
  background-image: url("../../assets/frontbgimg/News.jpg");
  background-position: 50% 35%;
  background-size: cover;
  z-index: -10;
}
.product-bg:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -moz-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -webkit-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  background: -o-linear-gradient(360deg, #70b594 69%, #1c1c1c 100%);
  opacity: 0.3;
}
.coupon-img {
  width: 100%;
  height: 350px;
  background-image: url("../../assets/frontimg/discountImage.jpg");
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  background-position: center;
  background-size: cover;
}
.couponcode {
  font-size: 120px;
  text-align: center;
}
.coupon-shadow {
  text-shadow: black 0.1em 0.1em 0.1em;
}
@media (max-width: 576px) {
  .couponcode {
    font-size: 60px;
  }
  .couponcode-title {
    padding-left: 0;
    text-align: center;
  }
  .Coupon {
    font-size: 24px;
  }
}
</style>
