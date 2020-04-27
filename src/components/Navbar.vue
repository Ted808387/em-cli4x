<template>
<div>
  <nav class="navbar navbar-dark fixed-top bg-dark shadow">
    <div class="nav d-flex flex-row font-weight-bold pr-0 text-white">
      <div class="align-self-center pr-3 omouse" v-if="displaymenu" data-toggle="modal" data-target="#myModal">
        <span class="menu-line"></span>
        <span class="menu-line"></span>
        <span class="menu-line"></span>
      </div>
      <a class="navbar navbar-brand mr-0" href="#" style="min-width:190px;">Wear mask後台管理</a>
    </div>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link font-weight-bold" href="#" @click.prevent="signout">登出</a>
      </li>
    </ul>
  </nav>
  <!-- Modal -->
  <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pl-3 font-weight-bold" id="myModalLabel">
              功能列表
          </h4>
          <button type="button" class="close ml-0" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="sidebar-sticky">
            <div class="sidebar-heading d-flex justify-content-between align-items-center
            px-3 mt-2 mb-1 text-muted">
              <h5 class="text-black font-weight-bold">管理員</h5>
              <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </div>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/Dashboard/Products">
                  <i class="fas fa-archive"></i>
                  產品列表
                </router-link>
              </li>
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/Dashboard/Order">
                  <i class="far fa-file-alt"></i>
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/Dashboard/Couponcode">
                  <i class="fas fa-award"></i>
                  優惠卷
                </router-link>
              </li>
            </ul>
            <div class="sidebar-heading d-flex justify-content-between align-items-center
            px-3 mt-4 mb-1 text-muted">
              <h5 class="text-black font-weight-bold">模擬功能</h5>
              <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </div>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/Dashboard/customer_order">
                  <i class="far fa-keyboard"></i>
                  測試模擬
                </router-link>
              </li>
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/Dashboard/Cart">
                  <i class="fas fa-truck"></i>
                  購物車
                </router-link>
              </li>
              <li class="nav-item" data-toggle="modal" data-target="#myModal">
                <router-link class="nav-link font-weight-bold" to="/front-home">
                  <i class="fab fa-font-awesome-flag"></i>
                  前台
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div><!-- modal-content -->
    </div><!-- modal-dialog -->
  </div><!-- modal -->
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      displaymenu: false,
      popup: false,
    };
  },
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_API_PATH}/logout`;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
  created() {
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 768) {
        this.displaymenu = true;
      } else {
        this.displaymenu = false;
      }
    }, false);
  },
};
</script>
