<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title text-center mb-70 mt-30">
          <h2 class="mb-10">গাইডলাইন</h2>
          <p>বিডও কিভাবে ব্যবহার করবেন</p>
        </div>
      </b-row>

      <b-row>
        <div class="col-md-3 mb-xs-30">
            <div class="user-guideline">
                <ul>
                    <li><a href="#bidoguide1">বিডও  কি </a></li>
                    <li><a href="#bidoguide2">কিভাবে কাজ করে ?</a></li>
                    <li><a href="#bidoguide3">কিভাবে  ডিমান্ড করবেন ?</a></li>
                    <li><a href="#bidoguide4">কিভাবে  বিড করবেন</a></li>
                    <li><a href="#bidoguide5">কিভাবে ব্যাজ (badge) পাবেন ?</a></li>
                </ul>
            </div>
        </div>

        <div class="col-md-8 offset-md-1">

            <div id="bidoguide1" class="clearfix" ></div>
          <div  style="height: 700px">1</div>
          <!-- end 1 -->

          <div id="bidoguide2" class="clearfix"></div>
          <div  style="height: 500px">
              fdsa
              dsf
              dsffds
              af
              dsffds<br>
              dsffds<br>
              dsffds<br>
              dsffds<br>
              dsffds<br>
                dsffds<br>
              dsffds<br>
              dsffds<br>
          </div>
          <!-- end 2 -->

           <div id="bidoguide3" class="clearfix"></div>
          <div style="height: 500px">3</div>
          <!-- end 3 -->

        </div>

      </b-row>
    </b-container>
  </div>
</template>

<style scoped>

.user-guideline{
    background: #F1F6FF;
    position: fixed;
    width: 15%;
}
.user-guideline ul li{
    border: 1px solid #ced4da;
    border-bottom: 0;
}
.user-guideline ul li:last-child{
    border-bottom: 1px solid #ced4da;
}
.user-guideline ul li a{
    padding: 10px;
    display: block;
}
@media only screen and (min-width: 320px) and (max-width:767px) {

.user-guideline{
    position: inherit !important;
      width: 100% !important;
}

}

</style>