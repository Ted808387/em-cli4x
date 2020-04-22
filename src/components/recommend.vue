<template>
  <div>
    <div class="recommend container mt-5">
      <hr />
      <h3 class="font-weight-bold">相關產品</h3>
      <div class="recommend-products mt-3">
        <swiper :options="swiperOptions" ref="mySwiper">
          <swiper-slide v-for="item in products" :key="item.id">
            <div class="card-item m-3 omouse" @click="turnproduct(item.id, item.category)">
              <div class="card-add-cart" @click.stop="addtoCar(item.id, 1, item.title)">
                <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading === item.id"></i>
                <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
              </div>
              <div class="card-img">
                <div class="product-img"
                 :style="{backgroundImage: `url(${ item.imageUrl })`}">
                </div>
              </div>
              <div class="card-cotnet">
                <div class="card-category mt-3">
                  <h5 class="mb-0">{{ item.category }}</h5>
                </div>
                <div class="card-title mt-1">
                  <h4 class="font-weight-bold">{{ item.title }}</h4>
                </div>
                <div class="card-price">
                  <div class="card-origin-price"
                   v-if="!item.price">{{ item.origin_price | currency }}
                  </div>
                  <del class="card-origin-price"
                   v-if="item.price">{{ item.origin_price | currency }}
                  </del>
                  <div>{{ item.price | currency }}</div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="fas fa-angle-left fa-3x" v-if="slidenone" slot="button-next"></div>
          <div class="fas fa-angle-right fa-3x" v-if="slidenone" slot="button-prev"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      status: {
        loading: '',
      },
      slidenone: true,
      swiperOptions: {
        notNextTick: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        initialSlide: -1,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        observer: true,
        debugger: true,
        touchMoveStopPropagation: true,
        spaceBetween: 20,
        navigation: {
          nextEl: '.fa-angle-right',
          prevEl: '.fa-angle-left',
        },
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
  props: ['cardproduct'],
  methods: {
    turnproduct(id, category) {
      this.$emit('turn', id, category);
      $('html,body').animate({
        scrollTop: 0,
      }, 0);
    },
    recommend() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products.filter((item) => {
          const findproduct = vm.cardproduct;
          return findproduct === item.category;
        });
      });
    },
    addtoCar(id, qty, title) {
      const vm = this;
      vm.status.loading = id;
      // eslint-disable-next-line func-names
      (function () {
        vm.$emit('addcart', id, qty, title);
        setTimeout(() => {
          vm.status.loading = '';
        }, 1000);
      }());
    },
  },
  created() {
    this.recommend();
    $('html,body').animate({
      scrollTop: 0,
    }, 0);
    setTimeout(() => {
      if (this.products.length <= 3) {
        this.slidenone = false;
      }
    }, 1000);
  },
};
</script>

<style scoped>
  .card-add-cart:hover {
    color: #00381c;
    transition: all 0.3s;
  }
  .card-add-cart {
    position: absolute;
    top: 360px;
    right: 30px;
  }
</style>
