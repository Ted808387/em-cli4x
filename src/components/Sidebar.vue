<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-heading d-flex justify-content-between align-items-center
       px-3 mt-4 mb-1 text-muted">
        <h5 class="text-black font-weight-bold">管理員</h5>
        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </div>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/Dashboard/Products">
            <i class="fas fa-archive"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/Dashboard/Order">
            <i class="far fa-file-alt"></i>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/Dashboard/Couponcode">
            <i class="fas fa-award"></i>
            優惠卷
          </router-link>
        </li>
      </ul>
      <div class="sidebar-heading d-flex justify-content-between align-items-center
       px-3 mt-4 mb-1 text-muted">
        <h5 class="text-black font-weight-bold">模擬功能</h5 >
        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </div>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/Dashboard/customer_order">
            <i class="far fa-keyboard"></i>
            測試模擬
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/Dashboard/Cart">
            <i class="fas fa-truck"></i>
            購物車
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link font-weight-bold" to="/front-home">
            <i class="fab fa-font-awesome-flag"></i>
            前台
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
