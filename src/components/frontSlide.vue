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
