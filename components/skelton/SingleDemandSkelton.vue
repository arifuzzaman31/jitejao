<template>
  <div class="category-list mb-xs-30">
    <div class="post-author">
      <a href="#">
        <b-skeleton animation="fade" type="avatar" class="mb-5"></b-skeleton>
        <b-skeleton></b-skeleton>
      </a>
    </div>
    <!-- end author -->
    <div class="post-image">
      <b-skeleton-img height="170px"></b-skeleton-img>
    </div>
    <!-- post image -->
    <div class="content clearfix">
      <div class="title">
        <h3>
          <b-skeleton animation="fade" width="85%"></b-skeleton>
          <b-skeleton animation="fade" width="55%"></b-skeleton>
        </h3>
      </div>
      <div class="price-item">
        <span class="">
          <b-skeleton animation="fade" width="20%"></b-skeleton>
        </span>
      </div>
      <div class="cate-btn">
        <b-skeleton animation="fade" type="button" width="100%"></b-skeleton>
      </div>
    </div>
  </div>
</template>