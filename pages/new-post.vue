<template>
  <div>
    <b-container fluid>


      <div class="display-table">
        <div class="display-table-cell">
          <b-row class="bido-form-main bido-form-post-demand">
            <!-- demand start  -->
            <div
              class="col-md-3 d-none d-sm-block pl-0 position-relative post-demand-main "
              v-if="this.$route.query.type != 'nilam'"
            >
              <div class="bg-left">
                <div class="content p20">
                  <NuxtLink to="/"
                    ><img
                      src="~/assets/images/logo-footer.png"
                      class="img-fluid mt-5 mb-20"
                      width="100"
                    />
                  </NuxtLink>
                  <h4 class="mb-20">
                    আপনার জন্য অপেক্ষা করছে শতাধিক বিক্রেতা
                  </h4>
                </div>
                <div class="step-post-demand text-center">
                  <ul>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/demand-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h4>ডিমান্ড</h4>
                    </li>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/shortlist-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h4>বাছাই</h4>
                    </li>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/confirm-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h4> বিজয়ী</h4>
                    </li>
                  </ul>
                </div>

                <div class="img">
                  <img
                    src="~/assets/images/others/post-demand.svg"
                    class="img-fluid mt-5 img-bg"
                  />
                </div>
              </div>
            </div>
            <!-- demain end -->

            
             <!-- nilam start -->
            <div
              class="col-md-3 d-none d-sm-block pl-0 position-relative post-demand-main bg-nilam-gradient-purple"
              v-else
            >
              <div class="bg-left">
                <div class="content p20">
                  <NuxtLink to="/"
                    ><img
                      src="~/assets/images/bido-nilam-logo-new-post.png"
                      class="img-fluid mt-5 mb-20"
                    />
                  </NuxtLink>
                  <h3 class="color-white mb-20">
                    আপনার জন্য অপেক্ষা করছে শতাধিক ক্রেতা
                  </h3>
                </div>
                <div class="step-post-demand text-center">
                  <ul>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/bit-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h2>বিড</h2>
                    </li>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/confirm-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h2>কনফার্ম</h2>
                    </li>
                    <li>
                      <div class="img-icon">
                        <img
                          src="~/assets/images/icon/delivery-post-deamnd.svg"
                          class="img-fluid"
                          alt="icon"
                        />
                      </div>
                      <h2>ডেলিভারি</h2>
                    </li>
                  </ul>
                </div>

                <div class="img">
                  <img
                    src="~/assets/images/others/post-demand.svg"
                    class="img-fluid mt-5 img-bg"
                  />
                </div>
              </div>
            </div>
            <!-- nilam end -->

            <div
              class="col-md-4 col-lg-4 col-sm-5 mt-5 offset-md-2 align-self-center clearfix justify-margin-center-95"
            >
                  <div class="position-relative">
                    <div class="shapes-container">
                      <div class="bg-box-rectangle-signup"></div>
                    </div>
                  </div>

              <div class="logo-form text-center mb-15 mt-15">
                <NuxtLink to="/"
                  ><img
                    src="~/assets/images/logo-footer.png"
                    class="img-fluid  mb-20"
                    width="100"
                /></NuxtLink>
              </div>

              <!-- <div class="text-center demand-nilam-tab">
                <NuxtLink
                  class="button button-sm demand-tab br-50"
                  :class="
                    this.$route.query.type != 'nilam' ? 'demand-ative' : ''
                  "
                  to="new-post?type=demand"
                >
                  ডিমান্ড
                </NuxtLink>
                <NuxtLink
                  class="button button-sm nilam-tab br-50"
                  :class="
                    this.$route.query.type == 'nilam' ? 'nilam-ative' : ''
                  "
                  to="new-post?type=nilam"
                >
                  নিলাম
                </NuxtLink>
              </div> -->

              <div class="form-tab-post ">
                <!-- <NilamPost v-if="this.$route.query.type == 'nilam'" /> -->
                <DemandPost  />
              </div>
            </div>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  layout: "nomenu",
};
</script>

<style>
.demand-nilam-tab {
  background: #f7f7f7;
  width: 225px;
  margin: 0 auto;
  border-radius: 50px;
  border: 1px solid #dfdfdf;
  padding: 7px;
}
.form-demand-post .progress-bar{
  background-image: linear-gradient(90deg,#e3106e,#a20b4f) !important;
}
.form-nilam-post .progress-bar{
      background-image: linear-gradient(90deg,#25aae1,#4481eb,#04befe,#3f86ed)!important;
}

/* tab  */

/* .bg-box-rectangle-signup {
  background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -webkit-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -moz-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -ms-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  width: 665px;
  height: 664px;
  border-radius: 120px;
  transform: translate(-8px, 13px) rotate(36deg);
  -webkit-transform: translate(-8px, 13px) rotate(36deg);
  -moz-transform: translate(-8px, 13px) rotate(36deg);
  -ms-transform: translate(-8px, 13px) rotate(36deg);
} */

.bido-form-main.bido-form-post-demand {
  height: 100%;
  position: absolute !important;
  width: 100%;
}
.post-demand-main{
  background-image: linear-gradient( to top, rgb(240, 220, 229), rgb(247, 226, 235) ) !important;
}
.post-demand-main::before {
  width: 129px;
  height: auto;
  background-image: url("~assets/images/post-demand-bg.svg");
  top: 0;
  position: absolute;
  background-repeat: no-repeat;
  content: "";
}

.bido-form-main .bg-left .content h3 {
  font-size: 25px;
}

.bido-form-main .bg-left .content p {
  width: 79%;
  margin: 0 auto;
}

.bido-form-main .bg-left img.img-bg {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.step-post-demand ul {
  position: relative;
}
.step-post-demand ul::before {
  content: "";
  background: #fff;
  height: 3px;
  width: 66%;
  position: absolute;
  top: 20px;
  left: 62px;
}
.step-post-demand ul li {
  margin-bottom: 30px;
  transition: 1s ease all;
  -webkit-transition: 1s ease all;
  -moz-transition: 1s ease all;
  -ms-transition: 1s ease all;
}
.step-post-demand ul li.active i {
  /* background: chocolate; */
  box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255), 0 0 60px #ffffff,
    0 0 70px #ffffff, 0 0 80px #ffffff;
  -webkit-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  -moz-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  -ms-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  color: #000;
  opacity: 0.5;
}
.step-post-demand ul li {
  color: #fff;
  font-weight: 500;
  font-size: 21px;
  width: 32%;
  display: inline-block;
  text-align: center;
}
.step-post-demand ul li .img-icon {
  /* display: block; */
  background-color: #fff;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  color: #007bff;
  border-radius: 50px;
  line-height: 40px;
  margin-bottom: 20px;
  font-size: 16px;
}
.step-post-demand ul li h4 {
  font-weight: normal;
}
.step-post-demand ul::before {
}

.step-post-demand ul li:nth-child(1) .img-icon {
  animation-delay: -3s;
  -webkit-animation-delay: -3s;
  -moz-animation-delay: -3s;
  -ms-animation-delay: -3s;
}
.step-post-demand ul li:nth-child(2) .img-icon {
  animation-delay: -1s;
  -webkit-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -ms-animation-delay: -1s;
}
.step-post-demand ul li:nth-child(3) .img-icon {
  animation-delay: -0.7s;
  -webkit-animation-delay: -0.7s;
  -moz-animation-delay: -0.7s;
  -ms-animation-delay: -0.7s;
}

.step-post-demand ul li .img-icon {
  animation: animate 1.7s ease-in-out infinite;
  -webkit-animation: animate 1.7s ease-in-out infinite;
  -moz-animation: animate 1.7s ease-in-out infinite;
  -ms-animation: animate 1.7s ease-in-out infinite;
}
@keyframes animate {
  0%,
  40%,
  100% {
    transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
  }
  20% {
    transform: scale(1.5, 1.5);
    -webkit-transform: scale(1.5, 1.5);
    -moz-transform: scale(1.5, 1.5);
    -ms-transform: scale(1.5, 1.5);
  }
}
.bg-demand-gradient-blue{
  background-image: linear-gradient(
    to top,
    rgba(227, 16, 110, 1),
    rgba(162, 11, 79, 1)
  ) !important;
}
.bg-nilam-gradient-purple{
   background-image: linear-gradient(to top, #25aae1, #4481eb);
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>