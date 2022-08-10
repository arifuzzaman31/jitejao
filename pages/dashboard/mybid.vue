<template>
  <div>
    <b-container>
      <ProfileMenu />
      <!-- <b-row>
        <div class="col-md-12 mt-2">
          <div class="bg-white mb-30 dashboard-demand-nilam-tab br-5">
            <NuxtLink
              class="button button-sm dashboard-demand-tab"
              :class="this.$route.query.type != 'nilam' ? 'demand-active' : ''"
              to="mybid?type=dimand"
            >
              ডিমান্ড বিড
            </NuxtLink>
            <NuxtLink
              class="button button-sm dashboard-nilam-tab"
              :class="this.$route.query.type == 'nilam' ? 'nilam-active' : ''"
              to="mybid?type=nilam"
            >
              নিলাম বিড
            </NuxtLink>
          </div>
        </div>
      </b-row> -->
      <MyDemandBidList />
      <!-- <MyNilamBidList v-if="this.$route.query.type == 'nilam'" /> -->
    </b-container>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  head() {
    return {
      title: "বিডো । আমার বিডসমূহ",
    };
  },
};
</script>

<style>
.bg-purple i {
  color: #fff !important;
}
.status-title {
  font-size: 12px;
}
.vue-star-rating {
  display: inline-block;
}
.text-success {
  color: #80c380 !important;
}
</style>