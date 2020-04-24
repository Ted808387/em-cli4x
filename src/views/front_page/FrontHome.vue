<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="home">
      <div class="bg mb-3"></div>
      <div class="header-text text-center text-white">
        <div class="text-center text-lg font-weight-bold">MASK</div>
        <h5 class="font-weight-bold">Wear mask過濾系統結合了顆粒過濾層和軍用級碳，符合N99微粒過濾標準，高效過濾抗菌，病毒過濾可達99.9％</h5>
        <router-link to="/frontproduct">
          <button class="btn btn-lg btn-primary mt-md-5 mt-3 font-weight-bold">購物去</button>
        </router-link>
        <div class="scrolldown omouse" @click.stop="scrolldown">
          <i class="fas fa-chevron-circle-down"></i>
        </div>
      </div>
      <div class="productionitem">
        <!-- Slide -->
        <Slide></Slide>
      </div>
      <!-- Pollution Solution -->
      <div id="item1" class="Pollutionsolution">
        <div class="container">
          <h2 class="text-center mb-5 font-weight-bold">設計方案</h2>
          <div class="container-fluid">
            <div class="row pb-4">
              <div class="col-md-6">
                <div class="imgbox">
                  <div class="imgbox__inner imgbox__inner-4-3">
                    <img class="image1" src="../../assets/frontimg/istockphoto-mask.jpg" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="pt-5 pl-md-5 text-center">
                  <h4 class="pb-3 font-weight-bold">可提供近100％的微粒過濾保護</h4>
                  <p class="text-p d-block">
                    專業人員用於某些塗料噴塗，溶劑和農藥作業上，
                    除用於幫助防止某些有機蒸氣外，還提供至少95％的
                    過濾效率，可對固體和液體氣溶膠（包括油）進行過濾，
                    旨在提供性能和舒適性
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row pt-4 pb-4">
              <div class="col-md-6 order-2 order-md-1">
                <div class="text-dark pt-5 pr-md-5 text-center">
                  <h4 class="pb-3 text-center font-weight-bold">三層過濾系統</h4>
                  <p class="text-p d-block">
                    過濾系統過濾PM10，PM2.5和PM0.3等污染顆粒以及細菌和病毒，符合國家標準CNS14774規範
                    ，有3層防護。最外層是防水層，防止飛沫傳染；中間層是細菌過濾系統；皮膚接觸的內層則是親膚性纖維
                  </p>
                </div>
              </div>
              <div class="col-md-6 order-1 order-md-2">
                <div class="imgbox">
                  <div class="imgbox__inner imgbox__inner-4-3">
                    <img class="image1" src="../../assets/frontimg/PollutionSolution.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row pt-4 pb-4">
              <div class="col-md-6">
                <div class="imgbox">
                  <div class="imgbox__inner imgbox__inner-4-3">
                    <img class="image1" src="https://images.unsplash.com/photo-1522499820455-9c821da82b9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="text-dark pl-md-5 pt-5 text-center">
                  <h4 class="pb-3 font-weight-bold">均衡的設計帶來更多舒適感</h4>
                  <p class="text-p d-block">
                    適用於長時間穿戴工作場所之職業，軍用規格將防禦等級提升至最高;使用有柔軟特性的聚丙烯材質
                    ，以棉料搭配聚乙烯，增強肌膚舒適感以及提高過濾性能;防霧設計可避免眼鏡因穿戴口罩時
                    產生霧氣而影響視線。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- discount -->
      <div class="discountCode">
        <div class="coupon-img">
        </div>
        <div class="container text-center text-shadow coupon-content">
          <h1 class="text-white font-weight-bold mb-3">20% 折扣，熱門優惠中!!!</h1>
          <router-link to="/frontcoupon">
            <button class="discount-btn btn btn-primary btn-lg font-weight-bold">取得優惠碼</button>
          </router-link>
        </div>
      </div>
      <!-- Customer reviews -->
      <div class="customer">
        <Customer></Customer>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';
import Slide from '../../components/FrontSlide.vue';
import Customer from '../../components/Customer.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    Slide,
    Customer,
  },
  methods: {
    scrolldown() {
      $('html,body').animate(
        {
          scrollTop: $('#item1').offset().top - 100,
        },
        600,
      );
    },
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    setTimeout(() => {
      vm.isLoading = false;
    }, 900);
    $('html,body').animate({
      scrollTop: 0,
    }, 0);
  },
};
</script>
