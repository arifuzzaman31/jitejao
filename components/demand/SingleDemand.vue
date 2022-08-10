<template>
  <div class="category-list bg-shadow">
    <div class="post-author cate-heading">
      <NuxtLink to=""  style="cursor: inherit;">
        <img
          class="img-fluid rounded-circle author-img"
          :src="demand.user.avatar"
          :alt="demand.user.name"
        />
      </NuxtLink>
      <span>{{ demand.user.name.split(" ")[0] }}</span>
      <div class="float-r">
        <img
          class="img-fluid cate-badge"
          src="~/assets/images/badge/1.png"
          v-b-tooltip.hover
          title="ভেরিফাইড বায়ার"
          alt="author badge"
        />
        <img
          v-if="demand.user.buyer_badge >= 2"
          class="img-fluid cate-badge"
          src="~/assets/images/badge/2.png"
          alt="author badge"
          v-b-tooltip.hover
          title="১০ এর অধিক কাজ করিয়েছেন"
        />
        <img
          v-if="demand.user.buyer_badge >= 3"
          class="img-fluid cate-badge"
          src="~/assets/images/badge/3.png"
          alt="author badge"
          v-b-tooltip.hover
          title="৫০  এর অধিক কাজ করিয়েছেন"
        />
      </div>
    </div>
    <!-- end author -->
    <div class="post-image ">
      <NuxtLink :to="'/demand/' + demand.id + '/' + demand.slug">
        <img
          v-if="demand.image_one_big"
          class="img-fluid"
          lazy
          :src="demand.image_one_big"
          :alt="demand.title"
        />
        <img
          v-else
          class="img-fluid"
          :src="demand.default_big_image"
          :alt="demand.title"
        />
      </NuxtLink>
    </div>
    <!-- post image -->
    <div class="content clearfix">
      <!-- <div class="post-category mt-10 p10">
        <NuxtLink to="#">
          <span
            class="bg-green-op-20 color-green category"
            style="padding: 0px 12px"
            >ইলেক্ট্রনিক্স</span
          >
        </NuxtLink>
        <p class="float-r time">২ মিনিট</p>
      </div> -->
      <div class="title">
        <NuxtLink :to="'/demand/' + demand.id + '/' + demand.slug"
          ><h3>{{ limitTitle(demand.title) }}</h3></NuxtLink
        >
      </div>
      <div class="price-item">
        <span class="item color-green bg-green-op-10">
          {{ replaceNumbersE2B(demand.quantity) }}
          {{ demand.quantity_unit.name }}</span
        >
        <span
          class="price float-r color-purple bg-purple-op-20"
          v-if="demand.budget_type"
        >
          {{ replaceNumbersE2B(demand.minimum_budget) }} -
          {{ replaceNumbersE2B(demand.maximum_budget) }} ৳</span
        >
        <span class="price float-r color-purple bg-purple-op-20" v-else>
          নেগোশিয়েবল
        </span>
      </div>
      <div class="cate-btn">
        <NuxtLink
          :to="'/demand/' + demand.id + '/' + demand.slug"
          class="button button-sm color-blue w-100 bg-blue-op-20"
          >বিড করুন
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["demand"],
};
</script>