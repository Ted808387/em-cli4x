<template>
    <div>
        <div class="recommend container mt-5">
            <hr>
            <h3>Recommend</h3>
            <div class="recommend-products mt-3">
                <swiper :options="swiperOptions" ref="mySwiper">
                    <swiper-slide v-for="item in products" :key="item.id">
                        <div class="card-item">
                            <div class="card-add-cart omouse" @click="addtoCar(item.id,1)">
                                <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading == item.id"></i>
                                <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
                            </div>
                            <div class="card-img">
                                <div class="product-img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                            </div>
                            <div class="card-cotnet">
                                <div class="card-category mt-3">
                                    <h5 class="mb-0">{{ item.category }}</h5>
                                </div>
                                <div class="card-title mt-1">
                                    <h4 class="font-weight-bold">{{ item.title }}</h4>
                                </div>
                                <div class="card-price">
                                    <div class="card-origin-price" v-if="!item.price">{{ item.origin_price | currency}}</div>
                                    <del class="card-origin-price" v-if="item.price">{{ item.origin_price | currency}}</del>
                                    <div>{{ item.price | currency}}</div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="fas fa-angle-left fa-3x" slot="button-next"></div>
                    <div class="fas fa-angle-right fa-3x" slot="button-prev"></div>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';


export default {
    data() {
        return {
            products: [],
            status: {
                loading: '',
            },
            swiperOptions: {
                notNextTick: true,
                direction : 'horizontal',
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                initialSlide: -1,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                mousewheelControl : true,
                observeParents: true,
                loop: true,
                debugger: true,
                touchMoveStopPropagation: true,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.fa-angle-right',
                    prevEl: '.fa-angle-left',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                    576: {
                        slidesPerView: 3,
                    },
                    420: {
                        slidesPerView: 2,
                    },
                },
            },
        };
    },
    methods: {
        Recommend() {
            const vm = this;  
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            this.$http.get(url).then((response) => {
                vm.products = response.data.products;
            });
        },
        addtoCar(id, qty = 1) {
            const vm = this;
            const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; 
            vm.status.loading = id;
            const car = {
                product_id: id,
                qty  //可直接用一個變數代替，直接將值帶進來
            };
            this.$http.post(url, { data:car }).then((response) => {
                this.$bus.$emit('message:push', response.data.message,'info');
                vm.status.loading = "";
                this.$bus.$emit('changecart');
            });
        },
    },
    created() {
        this.Recommend();
    }
}
</script>
<style scoped>
  .card-img {
      width: 100%;
      height: 250px;
  }
  .product-img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
  }
  .card-add-cart {
      position: absolute;
      top: 200px;
      right: 30px;
      color: #6eb577;
      transition: all 0.3s;
  }
  .card-add-cart:hover {
      color: #96eba2;
      transition: all 0.3s;
  }
  .omouse {
      cursor: pointer;
  }
  .fa-angle-right {
      position: absolute;
      right: 5px;
      top: 100px;
      z-index: 100;
      cursor: pointer;
      color: #6eb577;
  }
  .fa-angle-left {
      position: absolute;
      left: 5px;
      top: 100px;
      z-index: 100;
      cursor: pointer;
      color: #6eb577;
  }
</style>