<template>
  <div class="pt-50  ">
    <div class="clearfix  p50 bg-blue-gray">
       <b-container>
         <div class="col-md-6">
           <div class="app-download">
               <div class="content text-center-xs">
                 <h2> ডাউনলোড করুন 'JiteJao' এপ্স আর উপভোগ করুন দারুন সব ফিচার </h2>
                 <!-- <p class="mt-10">এপ্লাই কুপন  <span class="coupon-appdownload bg-purple color-white">DigitalBangladesh</span></p> -->
               </div>
           </div>
         </div>
           <div class="col-md-6">
                <div class="app-icon mt-30 text-right text-center-xs">
                        <NuxtLink to="#"><img src="~/assets/images/play-store.png" class="img-fluid" alt="play-store" width="150"></NuxtLink>
                        <!-- <NuxtLink to="/"><img src="~/assets/images/app-store.png" class="img-fluid ml-15" alt="play-store" width="150"></NuxtLink> -->
               </div>
           </div>

      </b-container>
    </div>
    
    <footer class="clearfix">
      <div class="footer-bg"></div>
      <div class="primary-footer">
        <b-container>
          <b-row>
            <div class="pb-40 pt-50 w-100">
              <div class="col-md-5">
                <div class="f-about-us mt-30-xs">
                  <NuxtLink to="/">
                    <img
                      src="~/assets/images/logo-footer-gray.svg"
                      class="img-fluid"
                      alt="logo"
                      width="30%"
                    />
                  </NuxtLink>

                  <p class="des">
                    জিতে যাও বাংলাদেশের প্রথম এবং একমাত্র ডিমান্ড বেসড মার্কেটপ্লেস।
                  </p>

                  <div class="f-social">
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/JiteJaocom-105374625610977" target="_blank" ><i class="fb fab fa-facebook-f"></i></a>
                      </li>
                        <!--<li>
                        <a href="#"><i class="tw fab fa-twitter"></i></a>
                      </li> -->
                      <li>
                        <a href="#" target="_blank" ><i class="yt fab fa-youtube"></i></a>
                      </li>
                      <!--<li>
                        <a href="#"><i class="ir fab fa-instagram"></i></a>
                      </li>-->
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-2">
                <div class="footer-menu footer-menu-list mt-30-xs">
                  <h4>গুরুত্বপূর্ণ লিংক</h4>
                  <ul>
                    <!-- <li>
                      <NuxtLink to="/pricing"
                        ><i class="fas fa-angle-right"></i> প্রাইসিং
                      </NuxtLink>
                    </li> -->

                    <!-- <li>
                      <NuxtLink to="JavaScript:void(0)">
                        <i class="fas fa-angle-right"></i>
                        এবাউট
                      </NuxtLink>
                    </li> -->
                        <li>
                      <NuxtLink to="/guideline">
                        <i class="fas fa-angle-right"></i> গাইডলাইন</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink to="/faq">
                        <i class="fas fa-angle-right"></i> এফএকিও</NuxtLink
                      >
                    </li>

                    <li>
                      <NuxtLink to="/terms"
                        ><i class="fas fa-angle-right"></i> টার্মস এন্ড কন্ডিশন
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-2">
                <div class="footer-menu footer-menu-list mt-30-xs">
                  <h4>অন্যান্য পেজ</h4>
                  <ul>
                    <li>
                      <NuxtLink to="/"
                        ><i class="fas fa-angle-right"></i> হোম
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/new-post">
                        <i class="fas fa-angle-right"></i> ডিমান্ড করুন
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/category"
                        ><i class="fas fa-angle-right"></i> ক্যাটাগরি
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/post"
                        ><i class="fas fa-angle-right"></i> সকল ডিমান্ড
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3">
                <div class="footer-menu mt-30-xs">
                  <h4>ইনফো</h4>
                  <ul>
                    <!-- <li>
                      <p>
                        <b><i class="fas fa-mobile-alt"></i></b>&nbsp;
                        +880131 244 7767
                      </p>
                    </li> -->
                    <li>
                      <p>
                        <b><i class="fas fa-envelope"></i></b>&nbsp;
                        support@jitejao.com
                      </p>
                    </li>
                     <li>
                      <p>
                        <b><i class="fas fa-envelope"></i></b>&nbsp;
                        complain@jitejao.com
                      </p>
                    </li>
                   <!-- <li>
                      <p class="display-fl">
                        <b><i class="fas fa-map-marker-alt"></i></b> &nbsp;

                      </p>
                    </li>-->
                  </ul>
                </div>
              </div>
            </div>
          </b-row>

          <!-- <b-row>
            <div class="payment-gatway-footer">
              <img
                src="~/assets/images/payment-gateway.png"
                class="img-fluid"
                alt="payment gatwaw"
              />
            </div>
          </b-row> -->

          <b-row>
            <div class="col-md-12">
              <div class="secondary-footer text-center pt-30 pb-30 color-white">
                {{ replaceNumbersE2B(new Date().getFullYear()) }} | একটি
                <a
                  href="https://automation.limmexbd.com/"
                  title="Limmex Automation"
                  target="_blank"
                >
                  লিমেক্স অটোমেশন
                </a>
                সার্ভিস
              </div>
            </div>
          </b-row>
        </b-container>
        <transition name="fade">
          <div
            id="pagetop"
            class="scroll-top"
            v-show="scY > 300"
            @click="toTop"
          >
            <i class="fas fa-angle-up"></i>
          </div>
        </transition>
      </div>
    </footer>
    <UserBottomMenu />
  </div>
</template>


<script>
export default {
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.scroll-top {
  background: #b90d59;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  position: fixed;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
  background-clip: content-box;
  margin: 5px;
  border: 3px solid #b90d59;
  padding: 4px;
  font-size: 14px;
}
.app-download .content .coupon-appdownload{
  padding: 0px 15px;
  border-radius: 5px;
  margin-left: 10px;
}
.app-download .content  p{
  font-size: 22px;
}


footer {
  position: relative;
  bottom: 0;
  /* background: #e7effa; */
}
footer::before {
  /* background-image: url("~assets/images/footer-bg-opacity-lg-top.svg"); */
  height: 81px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  z-index: -10;
  width: 100%;
  margin-top: -81px;
}
footer .primary-footer {
  background-color: #252c53;
  width: 100%;
  margin: 0 auto;
  position: relative;
  bottom: 10px;
  left: 0;
  right: 0;
  top: 0;
  /* z-index: 10; */
  /* border-radius: 4px; */
}
footer .primary-footer .footer-menu h4 {
  margin-bottom: 10px;
  color: #fff;
  font-weight: normal;
  font-size: 20px;
}
footer .primary-footer .footer-menu.footer-menu-list ul li i {
  transition: 500ms ease all;
  /* visibility: hidden; */
  margin-right: 2px;
  font-size: 13px;
}
footer .primary-footer .footer-menu.footer-menu-list ul li a:hover{
  color: #fff;
}
footer .primary-footer .footer-menu.footer-menu-list ul li:hover i {
  visibility: visible;
  margin-right: 10px;
}
footer .primary-footer .f-about-us p {
  width: 70%;
}
footer .primary-footer .f-about-us img {
  margin-bottom: 10px;
}

footer .primary-footer .f-social ul li {
    float: left;
    margin-top: 10px;
    margin-right: 15px;
    border: 1px solid #727B9A;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 2.5;
    border-radius: 30px;
    transition: 500ms ease all;
}
footer .primary-footer .f-social ul li:hover{
   transform: scale(1.1);
}
footer .primary-footer .f-social ul li i{
  font-size: 13px;
  color: #727B9A;
}

footer .primary-footer .f-social ul li:hover i.fb{
       color: #3b5998;
}
footer .primary-footer .f-social ul li:hover i.yt{
   color: #ff0000;
}
footer .primary-footer .f-social ul li:nth-child(1):hover{
       border: 1px solid #3b5998;
}
footer .primary-footer .f-social ul li:nth-child(2):hover{
       border: 1px solid #ff0000;
}

footer .secondary-footer {
}
.payment-gatway-footer {
  text-align: center;
  margin: 0 auto;
}


</style>
