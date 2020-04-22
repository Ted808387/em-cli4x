<template>
  <div>
    <swiper :options="swiperOptions" ref="mySwiper">
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image"
             :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1586033591296-bfed1f5f20c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1550&q=80)' }">
              <button class="product-show btn btn-primary border-none">
                <h2 class="swiper-text">全商品</h2>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image"
             :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1586975949231-9374052a0d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }">
              <button class="product-show btn btn-primary border-none">
                <h2 class="swiper-text">口罩</h2>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image"
             :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1485881922961-fbe39329af2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)' }">
              <button class="product-show btn btn-primary border-none">
                <h2 class="swiper-text">面罩</h2>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="imgbox">
          <div class="imgbox__inner imgbox__inner-4-3">
            <div class="image"
             :style="{ backgroundImage:'url(https://images.unsplash.com/photo-1582178538120-06a684adaec5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=624&q=80)' }">
              <button class="product-show btn btn-primary border-none">
                <h2 class="swiper-text">面具</h2>
              </button>
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
import 'swiper/css/swiper.css';

let vm = null; // 給swiperOptions.on裡面的click使用，去觸發methods裡的toproducts

export default {
  name: 'carrousel',
  data() {
    return {
      swiperOptions: {
        notNextTick: true,
        autoplay: {
          delay: 3000,
        },
        preventClicksPropagation: false,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        initialSlide: -1,
        observer: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,
        on: {
          click(e) {
            vm.toproducts(e.target.textContent);
          },
        },
        debugger: true,
        touchMoveStopPropagation: true,
        spaceBetween: 20,
        breakpoints: {
          768: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 2,
          },
          420: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  methods: {
    toproducts(kind) {
      if (kind === '全商品') {
        this.$router.push({ path: 'frontproduct' });
      } else if (kind === '面具') {
        this.$router.push({
          name: 'frontProduct',
          params: { id: '防毒面具' },
        });
      } else {
        this.$router.push({
          name: 'frontProduct',
          params: { id: kind },
        });
      }
    },
  },
  created() {
    vm = this;
  },
};
</script>
