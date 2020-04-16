<template>
  <div>
    <footer class="footer">
      <div class="footer_content">
        <div class="container">
            <div class="row">
            <div class="col-sm-3 footer-card">
              <h4 class="footer-text-color font-weight-bold footer-title">關於我們</h4>
              <p class="footer-head footer-text-color">將來世界各地的人們都更容易受到細菌和病毒的侵害，我們必須運用科技來改善人們的生活。</p>
            </div>
            <div class="col-sm-2 footer-card offset-sm-1">
              <h4 class="footer-text-color font-weight-bold footer-title">快速連結</h4>
              <div class="footer-middle footer-text-color">
                <p>
                  <router-link class="omouse footer-text-color text-color-change" to="/">首頁</router-link>
                </p>
                <p>
                  <router-link class="omouse footer-text-color text-color-change" to="/frontcoupon">最新資訊</router-link>
                </p>
                <p>
                  <router-link class="omouse footer-text-color text-color-change" to="/frontproduct">產品列表</router-link>
                </p>
              </div>
            </div>
            <div class="col-sm-5 footer-card offset-sm-1 footer-text-color">
              <h4 class="font-weight-bold footer-title">連絡我們</h4>
              <div class="row">
                <div class="col-md-7">
                  <i class="fas fa-phone-alt">&nbsp;&nbsp;Phone</i>
                  <p>
                    +886 7 933 1234
                    <br />+886 7 223 1234
                  </p>
                  <i class="fas fa-envelope">&nbsp;&nbsp;Email</i>
                  <p>virus@casebycase.com</p>
                  <i class="fas fa-map-marker-alt">&nbsp;&nbsp;address</i>
                  <p>Sanmin Dist., Kaohsiung City 807, Taiwan (R.O.C.)</p>
                </div>
                <div class="col-md-5 footer-icon text-center">
                  <a href="javascript:void(0)" class="mr-2 footer-text-color text-color-change d-inline-block d-md-block">
                    <i class="fab fa-facebook fa-2x"></i>
                    <br />
                    <br />
                  </a>
                  <a href="https://github.com/Ted808387" target="_blank" class="mr-2 footer-text-color text-color-change d-inline-block d-md-block">
                    <i class="fab fa-github fa-2x"></i>
                    <br />
                    <br />
                  </a>
                  <a href="https://www.linkedin.com/in/youmin-ke-b20024172/" target="_blank" class="mr-2 footer-text-color text-color-change d-inline-block d-md-block">
                    <i class="fab fa-linkedin fa-2x"></i>
                    <br />
                    <br />
                  </a>
                </div>
              </div>
            </div>
            <div class="footer-bottom mx-auto footer-text-color text-center">
              <p>僅做為個人學習使用，非商業用途。</p>
              <p>Copyright&nbsp;&copy;&nbsp; 2020 Ted design</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>