<template>
  <div class="features-content  pt-30 pb-30">
    <b-container>
      <b-row class="mt-30 pb-100 pb-xs-50  h-testimonial">

        <div class="position-relative">
          <div class="shapes-container">
            <div class="bg-box-rectangle">

            </div>
          </div>
        </div>

      <div class="col-lg-12 col-sm-12 ">
        <div class="author-heading text-center">
          <h2>আপনি যখন কাষ্টমার</h2>
          <p>কাষ্টমার হিসেবে আপনার সুবিধা</p>
        </div>
      </div>
    </b-row>
      <b-row class="">
        <div class=" col-lg-5 col-sm-12 col-xs-12 col-md-5  order-2 order-md-6">
            <div class="position-relative">
              <div class="shapes-container">
                <div class="pattern-dots pattern-dots-left">
                </div>
              </div>
            </div>
            <div class="image  text-center">
               <img src="~/assets/images/customer-banner.svg" class="img-fluid" alt="buyer content"  />
            </div>
          </div><!--end grid-->
          <div class=" col-lg-6 col-sm-12 col-xs-12 col-md-6 offset-lg-1 order-1 order-md-6">
            <div class="content mb-30">
                <div class="icon bg-gradient-blue ">1</div>
                <div class="des">
                    <h3>পোস্ট করুন যখন তখন</h3>
                    <p>আপনার যা কিছুই লাগুক না কেনো, জাস্ট একটা পোস্ট দিন। সঙ্গে সঙ্গে আপনার পোস্টে বিড করবে সেলাররা।</p>
                </div>
            </div> <!--end content-->
            <div class="content mb-30">
                <div class="icon bg-gradient-purple ">2</div>
                <div class="des">
                    <h3>সিলেক্ট করুন সেরা ডিল</h3>
                    <p>বিড করা সেলারদের থেকে যাদের প্রোডাক্ট বা সার্ভিস আপনার পছন্দ হয়, তাদেরকে শর্ট লিস্ট করুন এবং পরে একজনকে কনফার্ম করুন।</p>
                </div>
            </div> <!--end content-->
            <div class="content mb-30">
                <div class="icon bg-gradient-pink">3</div>
                <div class="des">
                    <h3>বুঝে নিন আপনার প্রোডাক্ট</h3>
                    <p>যে প্রোডাক্টের সেলারকে কনফার্ম করেছেন, তার কাছ থেকে প্রোডাক্টটি দেখে-শুনে-বুঝে নিন। রিভিউ দিন। পরের পোস্টের জন্য রেডি হয়ে যান। </p>
                </div>
            </div> <!--end content-->
          </div><!--end grid-->
      </b-row> <!--end row-->
    </b-container>
  </div>
</template>


<style scoped>
/* .features-content .content::before{
    content: "";
    background-color: #e7e7e7;
    width: 2px;
    height: 69%;
    position: absolute;
    left: 34px;
    bottom: 0;
    top: 0;
    z-index: -1;
} */
.features-content .content .des{
  display: table-cell;
}
.features-content .content .icon{
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 2.5;
    border-radius: 30px;
    font-weight: 600;
    float: left;
    margin-right: 15px;
    color: #fff;
}

.features-content .content p{
    display: flex;
    width: 70%;
    margin-top: 10px;
}

</style>