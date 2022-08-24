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
      title: "জিতে যাও ।  সকল পোস্ট",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "জিতে যাও ।  সকল ডিমান্ড",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "জিতে যাও ।  সকল ডিমান্ড",
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

