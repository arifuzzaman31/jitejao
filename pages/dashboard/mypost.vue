<template>
  <div>
    <b-container>
      <ProfileMenu />
      
      <!-- <b-row>
        <div class="col-md-12 mt-2">
          <div class="bg-white mb-30 dashboard-demand-nilam-tab br-5">
          <NuxtLink
            class="button button-sm  dashboard-demand-tab"
            :class="this.$route.query.type != 'nilam' ? 'demand-active' : ''"
            to="mypost?type=dimand"
          >
            আমার ডিমান্ড
          </NuxtLink>
          <NuxtLink
            class="button button-sm dashboard-nilam-tab"
            :class="this.$route.query.type == 'nilam' ? 'nilam-active' : ''"
            to="mypost?type=nilam"
          >
            আমার নিলাম
          </NuxtLink>
        </div>
        </div>
      </b-row> -->

      <MyDemandList  />
      <!-- <MyNilamList  /> -->
    </b-container>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: "auth",

  head() {
    return {
      title: "বিডো । আমার ডিমান্ডসমুহ",
    };
  },
};
</script>

<style >
.text-success {
  color: #80c380 !important;
}
.dashboard-demand-nilam-tab{
  padding: 10px;
}
.dashboard-demand-tab,
.dashboard-nilam-tab{
  border: 1px solid #dee2e6 !important;
}
.dashboard-demand-tab.demand-active,
.dashboard-nilam-tab.nilam-active{
    color: #fff;
    border: 0 !important;
}
.dashboard-demand-tab.demand-active{
    background-image: linear-gradient( to right, rgba(227, 16, 110, 1), rgba(162, 11, 79, 1) );
}
.dashboard-nilam-tab.nilam-active{
    background-image: linear-gradient(to right, rgb(6, 192, 254), rgb(63, 134, 237));
}

</style>