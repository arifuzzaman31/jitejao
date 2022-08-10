<template>
  <b-row class="mt-80">
    <div class="col-md-6">
      <div class="cate-details-left clearfix">
        <div class="big-image">
          <b-skeleton-img height="470px" animation="fade"></b-skeleton-img>
        </div>
        <!-- <bg-image -->
        <div class="row mt-2">
          <div class="col-md-3 col-3">
            <b-skeleton-img height="70px"></b-skeleton-img>
          </div>
          <div class="col-md-3 col-3">
            <b-skeleton-img height="70px"></b-skeleton-img>
          </div>
          <div class="col-md-3 col-3">
            <b-skeleton-img height="70px"></b-skeleton-img>
          </div>
        </div>
        <!-- small image -->
      </div>
    </div>
    <!-- left slider -->
    <div class="col-md-6">
      <div class="cate-details-right">
        <div class="title">
          <h2><b-skeleton animation="fade" width="100%"></b-skeleton></h2>
        </div>
        <!-- title -->
        <div class="price mt-20">
          <span>
            <span>
              <b-skeleton animation="fade" width="50%"></b-skeleton>
            </span>
          </span>
        </div>
        <!-- price -->
        <div class="item mt-25">
          <span><b-skeleton animation="fade" width="40%"></b-skeleton></span>
        </div>
        <!--item-->
        <div class="content mt-20">
          <b-skeleton animation="fade" width="100%"></b-skeleton>
          <b-skeleton animation="fade" width="90%"></b-skeleton>
          <b-skeleton animation="fade" width="100%"></b-skeleton>
          <b-skeleton animation="fade" width="70%"></b-skeleton>
          <b-skeleton animation="fade" width="30%"></b-skeleton>
        </div>
        <!-- details content -->
        <div class="de-btn">
          <b-skeleton animation="fade" type="button"></b-skeleton>
        </div>
        <!-- button -->
        <div class="social-icon mt-20">
          <ul>
            <li>
              <a href="#">
                <i class="fb fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="tw fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- right slider -->
    </div>
  </b-row>
</template>