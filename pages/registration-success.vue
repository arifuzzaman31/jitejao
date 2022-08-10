<template>
  <div>
    <!-- import hero-area  -->
    <b-container fluid class="hero-area">
  <b-row>
      <div class="col-md-12 text-center" style="">
        <div class="display-table">
          <div class="display-middle">
            <h1 class="color-white">
              <strong>অভিনন্দন ! শাখাওয়াত হোসেন </strong>
            </h1>
            <h3 class="color-gray">
              আপনার রেজিস্ট্রেশন সফল হয়েছে ধন্যবাদ আমাদের সাথে থাকুন
            </h3>
            <div class="mt-5">
              <NuxtLink
                class="btn button-small primary-button bg-white color-black"
                to="/post-demand"
                >ডিমান্ড করুন</NuxtLink
              >
              <NuxtLink
                class="btn button-small primary-button bg-white color-black"
                to="/dashboard"
              >
                প্রোফাইল দেখুন</NuxtLink>
              <NuxtLink
                class="btn button-small primary-button bg-white color-black"
                to="/"
              >
                হোম পেজ</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>
<style >
.header-main-menu {
  display: none;
}
</style>
