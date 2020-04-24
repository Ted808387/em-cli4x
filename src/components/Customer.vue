<template>
  <div>
    <h2 class="text-center mb-5 font-weight-bold">顧客回饋</h2>
    <div class="row no-gutters">
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://i.pinimg.com/originals/87/ba/ef/87baef67d4ec8b4a4c552d7bbd3246e9.jpg');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment1.rating }}
                </p>
                <p class="customer_comment_text">{{ comment1.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://images.unsplash.com/photo-1537467696134-5ad98b5c12af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment2.rating }}
                </p>
                <p class="customer_comment_text">{{ comment2.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://cdn.shopify.com/s/files/1/0307/8601/articles/bagus-renaldy-472858-unsplash.jpg?v=1549021347');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment3.rating }}
                </p>
                <p class="customer_comment_text">{{ comment3.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c144.0.1066.1066a/s640x640/83984370_186474759081453_6399856911404758233_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=dQ2CpTOPlV8AX_sCBcl&oh=21a6c204f13d2ad3356b094b1175f332&oe=5EC9043B');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment4.rating }}
                </p>
                <p class="customer_comment_text">{{ comment4.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://accuria.be/wp-content/uploads/2019/09/Staelens-nieuwsbrief.jpg');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment5.rating }}
                </p>
                <p class="customer_comment_text">{{ comment5.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://kreatives-unternehmertum.com/media/pages/gemeinsam-foerdern/impuls-stipendium/4052560342-1580198220/ku-macherstipendium-02-600x400.jpg');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment2.rating }}
                </p>
                <p class="customer_comment_text">{{ comment2.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://www.publishersweekly.com/images/cached/ARTICLE_PHOTO/photo/000/000/068/68771-v1-600x.JPG');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment4.rating }}
                </p>
                <p class="customer_comment_text">{{ comment4.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="customerimgbox">
          <div class="customerimgbox-inner">
            <div class="customerimg omouse" style="background-image:url('https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.106.853.853a/s640x640/37617302_2139513476264923_6148583384617582592_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=DVFPim1X9tUAX82H_ej&oh=b8cb810ce3f52bc4e3d13b7383f5d80c&oe=5EA73B6C');">
              <div class="customer_comment text-white">
                <p>
                  <i class="far fa-star"></i>
                  &nbsp;{{ comment1.rating }}
                </p>
                <p class="customer_comment_text">{{ comment1.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: [],
      comment1: {},
      comment2: {},
      comment3: {},
      comment4: {},
      comment5: {},
    };
  },
  methods: {
    getid() {
      // https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJH38xRaIEbjQRDWJcNbVlHi8&language=zh-TW&fields=name,url,rating,reviews&key=AIzaSyAy9wlaxPGkp3yJJGKzWDjwCAEIj56I-gw
      const vm = this;
      const client = [
        {
          rating: 5,
          text: '作為奧客的我，也覺得這裏的服務態度太好了',
        },
        {
          rating: 3,
          text: '有口罩可買嗎？',
        },
        {
          rating: 5,
          text: '你要的醫療產品盡在這裡哦！',
        },
        {
          rating: 4,
          text: '門市人員很親切！',
        },
        {
          rating: 5,
          text: '專業，價格公道，人員細心的解說',
        },
        {
          rating: 5,
          text: '作為奧客的我，也覺得這裏的服務態度太好了，有問必答：訂貨前問企業員工大約10多條問題他們亦沒有變面，仍然保持優質服務態度，兵貴神速：出貨速度很有效率，下午下單後第二天就可以出貨',
        },
      ];
      vm.customer = client;
      [vm.comment1, vm.comment2, vm.comment3, vm.comment4, vm.comment5] = vm.customer;
    },
  },
  created() {
    this.getid();
  },
};
</script>
