<template>
<div class="hero-area d-flex h-100">
  <div class="align-self-center w-100">
    <b-container  class="mt-30-xs text-center-xs" style="background">
      <b-row>
        <div class="col-md-6 col-lg-6">
          <div class="d-flex h-100">
          <div class="title align-self-center w-xs-100">
              <h1>
                প্রতিদিন আমাদের কতশত জিনিস প্রয়োজন হয় 
              </h1>
              <h4 class="mt-10">
                নিজের প্রয়োজনীয় যে কোনো প্রোডাক্ট বা সেবা পেতে এখানে পোস্ট করুন
              </h4>

              <div class="mt-15">
                <NuxtLink
                  class="bg-white color-white btn button-small gradient-purple-secondary bid-button"
                  to="/new-post"
                  >ডিমান্ড পোস্ট করুন <i class="fas fa-long-arrow-alt-right ml-20"></i></NuxtLink>

            <div class="hero-vedio-popup clearfix  mt-xs-15"
                 v-b-modal.modal-center @click="showModal1">
                  <div class="hero-vedio-popup-image bg-red-op-10 ">
                    <img src="~/assets/images/icon/home-demand-video.svg" alt="Demand" width="40" />
                  </div>
                  <div class="content">
                    <h2>ডিমান্ড কিভাবে করবেন ? </h2>
                        <b-modal
                          id="h-video-modal1"
                          centered
                          modal-footer="No"
                          v-bind:hide-footer="true"
                          content-class="videopopup-home">
                          <iframe
                            width="100%"
                            height="500px"
                            src="https://www.youtube.com/embed/nXwsotrNQY0?autoplay=1"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </b-modal>
                    <p>
                    </p>
                  </div>
              </div>
              </div>
            </div>
             </div>
          </div>
           <div class="col-md-6 col-lg-6">
             <div class="hero-right-image text-center">
              <img src="~/assets/images/horo-image.png" class="img-fluid" alt="demand image" />
              <!-- <video  height="60%" width="80%" autoplay="autoplay" loop preload="metadata"  >
                  <source src="~/assets/images/hero-vedio.mp4" type="video/mp4" >                  
              </video> -->
             </div> 
           </div>
      </b-row>
    </b-container>
  </div>
    </div>
</template>

<script>
export default {
   methods: {
    showModal1() {
      this.$bvModal.show("h-video-modal1");
    }
}
}
</script>



<style  scoped>
.hero-area {
  /* margin-top: -174px; */
  position: relative;
}
.hero-area h1{
   line-height: 1.1;
}
.menu-custom-navbar {
  top: 0px !important;
}
.overlay-image {
  /* background: url("~assets/images/hero_area_bg-icon.svg"); */
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 87%;
  background-repeat: no-repeat;
}
.d-flex{
  display: flex !important;
}
.h-100{
  height: 100% !important;
}
.align-self-center{
  align-self: center !important;
}

.hero-vedio-popup {
    transition: 1s ease all;
    border-radius: 4px;
    display: inline-flex;
    margin-left: 20px;
}

.hero-vedio-popup .hero-vedio-popup-image {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50px;
    float: left;
    margin-right: 15px;
    /* background-color: #fff; */
}
.hero-vedio-popup h2{
  text-align: left;
  line-height: 2.1;
  font-weight: normal;
  font-size: 20px
}
.hero-vedio-popup-image.bg-purple {
  background-color: rgba(190, 99, 249, 0.1);
}
.hero-vedio-popup-image.bg-blue {
  background-color: rgba(29, 196, 217, 0.1);
}
.hero-vedio-popup-image.bg-red {
  background-color: rgba(249, 91, 91, 0.1);
}
/* .hero-vedio-popup .content { */
  /* margin-top: 30px; */
/* } */

.hero-area::before, .hero-area::after{
    content: "";
    position: absolute;
    top: 6px;
    right: 0;
    height: 300px;
    width: 300px;
    border-radius: 50px;
    filter: blur(93px);
    opacity: 0.1;
    z-index: -1;
}
.hero-area::before {
    left:0;
    background-image: linear-gradient(to right, rgba(227, 16, 110, 1), rgba(162, 11, 79, 1));
}
.hero-area::after {
    right: 0;
     background-image: linear-gradient(to right, rgba(227, 16, 110, 1), rgba(162, 11, 79, 1));
}


</style>>
