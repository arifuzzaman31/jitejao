<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title text-center mb-70 mt-30">
          <h2 class="mb-10">প্রাইসিং প্ল্যান</h2>
          <p style="line-height: 20px">
            এখনি পছন্দের সাবস্ক্রিপশন প্যাকেজ সিলেক্ট করে ব্যবসার নতুন দিগন্ত
            উম্মোচন করুন
            <span class="color-red">(শুধুমাত্র সেলারদের জন্যে)</span>
          </p>
        </div>
      </b-row>

      <!-- skelton -->
      <b-row v-if="$fetchState.pending">
        <div class="col-md-4 mt-3" v-for="value in 6" :key="'numxg' + value">
          <b-skeleton type="image" height="120px"></b-skeleton>
        </div>
      </b-row>
      <!-- skelton  -->

      <b-row>
        <div class="col-md-4" v-for="plan in plans" :key="'plans' + plan.id">
          <div
            class="dashboard-card-list p20 clearfix br-5 mb-30"
            :class="gradiantClass[Math.floor(Math.random() * 11)]"
          >
            <div class="img-icon float-r">
              <h2 class="title color-white">
                {{ replaceNumbersE2B(plan.total_month) }} মাস
              </h2>
              <span class="save-discount color-black br-50 p10 pt-0 pb-0"
                >সেভ {{ replaceNumbersE2B(plan.discount) }}৳</span
              >
            </div>
            <div class="dashboard-card-content text-right">
              <h1 class="title color-white">
                {{ replaceNumbersE2B(plan.final_amount) }}
                <b class="pryment-descount color-white">
                  <span class="color-white" v-if="plan.discount > 0"
                    >{{ replaceNumbersE2B(plan.total_amount) }}৳</span
                  >
                  <span class="color-white" v-else>0৳</span></b
                >
              </h1>
              <NuxtLink
                to="/dashboard/payment/new-payment"
                class="button button-sm color-black"
                style="text-decoration: underline"
                >Buy Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

    <script>
export default {
  data() {
    return {
      gradiantClass: [
        "card-gradient-blue",
        "card-gradient-cyan",
        "card-gradient-purple",
        "card-gradient-red",
        "card-gradient-purple-dark",
        "card-gradient-orange",
        "card-gradient-violet",
        "card-gradient-blue-violet",
        "card-gradient-light-green",
        "card-gradient-light-blue",
        "card-gradient-light-orange",
        "card-gradient-soft-violet",
      ],

      plans: [],
    };
  },

  async fetch() {
    const response = await this.$axios.$get("/subscription-plan-list");
    this.plans = response;
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: "বিডো । প্রাইসিং প্ল্যান  ",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "bido pricing plane",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "বিডো । প্রাইসিং প্ল্যান",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "বিডো । প্রাইসিং প্ল্যান",
        },

        {
          hid: "og:title",
          property: "og:title",
          content: "বিডো । প্রাইসিং প্ল্যান",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "বিডো । প্রাইসিং প্ল্যান",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "বিডো । প্রাইসিং প্ল্যান",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: current_url,
        },
      ],
    };
  },
};
</script>

    <style >
.save-discount {
  background-color: rgba(236, 233, 233, 0.787);
}
.pryment-descount {
  text-decoration: line-through;
  font-weight: 500;
}
</style>