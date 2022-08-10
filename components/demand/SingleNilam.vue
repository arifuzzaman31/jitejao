<template>
  <div class="category-list">
    <div class="post-author cate-heading">
      <NuxtLink to="" style="cursor: inherit;">
        <img
          class="img-fluid rounded-circle author-img"
          :src="nilam.user.avatar"
          :alt="nilam.user.name"
        />
      </NuxtLink>
      <span>{{ nilam.user.name.split(" ")[0] }}</span>
      <div class="float-r">
        <img
          class="img-fluid cate-badge"
          src="~/assets/images/badge/1.png"
          v-b-tooltip.hover
          title="ভেরিফাইড বায়ার"
          alt="author badge"
        />
        <img
          v-if="nilam.user.seller_badge >= 2"
          class="img-fluid cate-badge"
          src="~/assets/images/badge/2.png"
          alt="author badge"
          v-b-tooltip.hover
          title="১০ এর অধিক কাজ করিয়েছেন"
        />
        <img
          v-if="nilam.user.seller_badge >= 3"
          class="img-fluid cate-badge"
          src="~/assets/images/badge/3.png"
          alt="author badge"
          v-b-tooltip.hover
          title="৫০  এর অধিক কাজ করিয়েছেন"
        />
      </div>
    </div>
    <!-- end author -->
    <div class="post-image bg-white">
      <NuxtLink :to="'/nilam/' + nilam.id + '/' + nilam.slug">
        <img
          v-if="nilam.image_one_big"
          class="img-fluid"
          lazy
          :src="nilam.image_one_big"
          :alt="nilam.title"
        />
        <img
          v-else
          class="img-fluid"
          :src="nilam.default_big_image"
          :alt="nilam.title"
        />
      </NuxtLink>
    </div>
    <!-- post image -->

    <div class="content clearfix">
      <div class="title">
        <NuxtLink :to="'/nilam/' + nilam.id + '/' + nilam.slug"
          ><h3>{{ limitTitle(nilam.title) }}</h3></NuxtLink
        >
      </div>
      <div class="nilam-price-cate price-item display-f">
        <div class="item color-purple bg-purple-op-20 text-center">
          <p class="color-purple">বেস পয়েন্ট</p>
          <p class="color-purple font-weight-bold">
            {{ replaceNumbersE2B(nilam.base_price) }}
          </p>
        </div>

        <div class="item color-green bg-green-op-10 text-center">
          <p class="color-green">সর্বোচ্চ বিড</p>
          <p class="color-green font-weight-bold">
            <span v-if="nilam.win_bid">{{ nilam.win_bid.bid_price }} </span>
            <span v-else>N/A</span>
          </p>
        </div>
      </div>
      <div class="nilam-hrbid-cate price-item">
        <span class="item">
          বিডের শেষ সময়ঃ
          <b class="color-red">{{
            replaceNumbersE2B(nilam.will_expired_in)
          }}</b></span
        >
        <!-- <span class="price float-r"> <b>30</b> বিড</span> -->
      </div>
      <div class="cate-btn">
        <NuxtLink
          :to="'/nilam/' + nilam.id + '/' + nilam.slug"
          class="button button-sm color-blue w-100 bg-blue-op-20"
          >বিড করুন
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nilam"],
};
</script>

<style >
.nilam-price-cate {
  display: flex;
  height: 73px !important;
}
.nilam-price-cate .item {
  width: 50%;
}
.nilam-price-cate .item:first-child {
  margin-right: 10px;
}
.nilam-hrbid-cate span.item {
  font-size: 15px !important;
}
</style>