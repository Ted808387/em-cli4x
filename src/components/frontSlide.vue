<template>
  <div>
    <swiper :options="swiperOptions" ref="mySwiper">
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image" :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1584020961222-f72484ed4d9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }">
              <router-link to="/frontproduct" class="product-show">
                <h2 class="swiper-text">全商品</h2>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image" :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1580281780460-82d277b0e3f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }">
              <router-link class="product-show" :to="{ name: 'frontProduct', params: { id:'口罩' } }">
                <h2 class="swiper-text">口罩</h2>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image" :style="{ backgroundImage:'url(https://priestsheetmetal.co.nz/wp-content/uploads/2019/05/priest_sheetmetal-welding-sheetmetal-christchurch_new_zealand-3840.jpg)' }">
              <router-link class="product-show" :to="{ name: 'frontProduct', params: { id:'面罩' } }">
                <h2 class="swiper-text">面罩</h2>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image" :style="{ backgroundImage:'url(https://www.manuremanager.com/wp-content/uploads/2019/09/a0ad274371d8c5d818f6646bbedbce84-1024x683.jpg)' }">
              <router-link class="product-show" :to="{ name: 'frontProduct', params: { id:'防毒面具' } }">
                <h2 class="swiper-text">面具</h2>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "carrousel",
  data() {
    return {
      swiperOptions: {
        notNextTick: true,
        autoplay: {
          delay: 3000
        },
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        initialSlide: -1,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,
        debugger: true,
        touchMoveStopPropagation: true,
        spaceBetween: 20,
        breakpoints: {
          768: {
            slidesPerView: 3
          },
          576: {
            slidesPerView: 2
          },
          420: {
            slidesPerView: 1
          }
        }
      }
    };
  },
};
</script>

<style>
/* image */
.image {
  width: 100%;
  display: block;
}
.image:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  background-color: rgba(256, 256, 256, 0);
  transform: translateY(50px);
  transition: all 0.4s;
}
.image:hover:after {
  height: 100%;
  top: 0%;
  transform: translateY(0px);
  background-color: rgba(256, 256, 256, 0.6);
}
/* Imgbox
    ------------------*/
.imgbox {
  width: 100%;
  overflow: hidden;
}
.imgbox__inner {
  width: 100%;
  padding-top: 100%;
  position: relative;
}
.imgbox__inner.imgbox__inner-4-3 {
  padding-top: 75%;
}
.imgbox__inner .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.product-show {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 20%;
  display: flex;
  justify-content: center;
  color: rgb(10, 10, 10);
  padding: 3%;
  background-color: #fff;
  transition: all 0.4s;
  z-index: 10;
  opacity: 1;
}
.product-show:hover {
  text-decoration: none;
  color: #fff;
  background-color: #094D2B;
}
.swiper-text {
  display: flex;
  font-weight: 700;
  align-self: center;
  font-size: 2vw;
  margin-bottom: 0;
}
@media (max-width: 575px) {
  .swiper-text {
    font-size: 8vw;
  }
}
</style>