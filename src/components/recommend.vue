<template>
  <div>
    <div class="recommend container mt-5">
      <hr />
      <h3>Recommend</h3>
      <div class="recommend-products mt-3">
        <swiper :options="swiperOptions" ref="mySwiper">
          <swiper-slide v-for="item in products" :key="item.id">
            <div class="card-item m-3 omouse" @click="turnproduct(item.id, item.category)">
              <div class="card-add-cart omouse" @click.stop="addtoCar(item.id, 1, item.title)">
                <i class="fas fa-spinner fa-spin fa-2x" v-if="status.loading === item.id"></i>
                <i class="fas fa-shopping-cart fa-2x" v-if="status.loading !== item.id"></i>
              </div>
              <div class="card-img">
                <div class="product-img" :style="{backgroundImage: `url(${ item.imageUrl })`}"></div>
              </div>
              <div class="card-cotnet">
                <div class="card-category mt-3">
                  <h5 class="mb-0">{{ item.category }}</h5>
                </div>
                <div class="card-title mt-1">
                  <h4 class="font-weight-bold">{{ item.title }}</h4>
                </div>
                <div class="card-price">
                  <div class="card-origin-price" v-if="!item.price">{{ item.origin_price | currency }}</div>
                  <del class="card-origin-price" v-if="item.price">{{ item.origin_price | currency }}</del>
                  <div>{{ item.price | currency }}</div>
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
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      products: [],
      status: {
        loading: ""
      },
      swiperOptions: {
        notNextTick: true,
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
        navigation: {
          nextEl: ".fa-angle-right",
          prevEl: ".fa-angle-left"
        },
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
  props: ["cardproduct"],
  methods: {
    turnproduct(id, category) {
      this.$emit("turn", id, category);
    },
    recommend() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then(response => {
         vm.products = response.data.products.filter(item => {
          let findproduct = vm.cardproduct;
          return findproduct === item.category;
        })
      });
    },
    addtoCar(id, qty, title) {
      const vm = this;
      vm.status.loading = id;
      (function() {
        vm.$emit("addcart", id, qty, title);
        setTimeout(() => {
          vm.status.loading = "";
        }, 1000);
      })();
      // setInterval(() => {
      //   this.status.loading = "";
      // }, interval);
      // const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // vm.status.loading = id;
      // const car = {
      //   product_id: id,
      //   qty
      // };
      // vm.$http.post(url, { data: car }).then(response => {
      //   vm.$bus.$emit("message:push", response.data.message, "info");
      //   vm.status.loading = "";
      //   vm.$bus.$emit("changecart");
      // });
      //  vm.$bus.$emit("addtocart",id, qty, title);
    },
  },
  created() {
    this.recommend();
  }
};
</script>
<style scoped>
.card-item {
  box-shadow: 0px 1px 3px black;
  padding: 10px 10px 0 10px;
  transition: all 0.3s;
}
.card-item:hover {
  color: #008443;
  transition: all 0.3s;
}
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
  top: 360px;
  right: 30px;
  color: #306136;
  transition: all 0.3s;
}
.card-add-cart:hover {
  color: #008443;
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
  color: #306136;
}
.fa-angle-left {
  position: absolute;
  left: 5px;
  top: 100px;
  z-index: 100;
  cursor: pointer;
  color: #306136;
}
</style>