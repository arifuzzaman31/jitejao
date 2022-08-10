<template>
  <div>
    <b-container>
      <ProfileMenu />
      <!-- <b-row>
  
        <div class="col-md-12 mt-2">
          <div class="bg-white mb-30 dashboard-demand-nilam-tab br-5">
            <NuxtLink
              class="button button-sm dashboard-demand-tab"
              :class="this.$route.query.type != 'point' ? 'demand-active' : ''"
              to="/dashboard/payment?type=subscription"
            >
              সাবস্ক্রিপশন
            </NuxtLink>
            <NuxtLink
              class="button button-sm dashboard-nilam-tab"
              :class="this.$route.query.type == 'point' ? 'nilam-active' : ''"
              to="/dashboard/payment?type=point"
            >
              পয়েন্ট
            </NuxtLink>
          </div>
        </div>
      </b-row> -->
      <PaymentList v-if="this.$route.query.type != 'point'" />
      <!-- <PointPaymentList  /> -->
    </b-container>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: "auth",

  methods: {
    
  },
};
</script>
