<template>
  <div>
    <UserTopMenu />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      seo_setting: {},
    };
  },
};
</script>

<script>
export default {
  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title:
        "বিডো ।  bido | বিডো বাংলাদেশের প্রথম এবং এক মাত্র ডিমান্ড এবং নিলাম বেসড মার্কেটপ্লেস",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "বিডো বাংলাদেশের প্রথম এবং এক মাত্র ডিমান্ড এবং নিলাম বেসড মার্কেটপ্লেস | bido first demand and nilam based website in bangladesh",
        },

        {
          hid: "keyword",
          name: "keyword",
          content:
            "bido,demand,bid,custom demand,t-shirt,electronics,event,budget,transport,bid bangladeshl",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "বিডো । bido",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "bid > shortlisted > confirmed ",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: process.env.metaUrl,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "বিডো । bido",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "বিডো । bido",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "bid > shortlisted > confirmed ",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: process.env.metaUrl,
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

<style  >
</style>