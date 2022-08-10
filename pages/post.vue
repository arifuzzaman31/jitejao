<template>
  <div>
    <AllPost />
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: "বিডো ।  সকল পোস্ট",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "বিডো ।  সকল ডিমান্ড",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "বিডো ।  সকল ডিমান্ড",
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

<style>
</style>

