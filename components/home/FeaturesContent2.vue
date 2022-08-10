<template>
      <div class="features-content mt-60 mb-50">

    <b-container>
         <b-row class="mt-50 pb-100 pb-xs-50">

      <div class="col-lg-12 col-sm-12 ">
        <div class="author-heading text-center">
          <h2>আপনি যখন সেলার</h2>
          <p>সেলার হিসেবে আপনার সুবিধা</p>
        </div>
      </div>
    </b-row>

        <b-row class="">
          <div class=" col-lg-6 col-sm-12 col-xs-12 col-md-6">
            <div class="content mb-30">
                <div class="icon bg-gradient-blue ">1</div>
                <div class="des">
                    <h3>বিড করুন যখন তখন</h3>
                    <p>কাস্টমারের পোস্ট সারাদিনই পাবেন আর আপনিও সেই পোস্টে বিড করতে পারবেন যখন তখন। সেল করার জন্য আর কী লাগে আপনার ! </p>
                </div>
            </div> <!--end content-->
            <div class="content mb-30">
                <div class="icon bg-gradient-purple ">2</div>
                <div class="des">
                    <h3>সেল নিশ্চিত করুন</h3>
                    <p>কাস্টমারের পোস্টে এমনভাবে বিড করবেন যেনো কাস্টমার আপনার প্রোডাক্টটি নিতে আগ্রহী হয় আর এভাবেই আপনার প্রোডাক্টটের সেল বাড়তে থাকবে । </p>
                </div>
            </div> <!--end content-->
            <div class="content mb-30">
                <div class="icon bg-gradient-pink">3</div>
                <div class="des">
                    <h3>ডেলিভারী কনফার্ম করুন</h3>
                    <p>সেল কনফার্ম হলে কাস্টমারের সাথে সব কিছু ক্লিয়ার হয়ে ডেলিভারী নিশ্চিত করুন। রিভিউ দিন আর অন্য বিড গুলো মনিটরিং করুন। </p>
                </div>
            </div> <!--end content-->
          </div><!--end grid-->
          <div class=" col-lg-5 col-sm-12 col-xs-12 col-md-5">
            <div class="position-relative">
          <div class="shapes-container">
            <div class="pattern-dots">
            </div>
          </div>
        </div>
            <div class="image  text-center-xs ">
               <img src="~/assets/images/seller-banner.svg" class="img-fluid" alt="buyer content"  />
            </div>
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