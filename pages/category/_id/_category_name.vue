<template>
  <div>
    <!-- <b-container>
      <b-row>
        <div class="col-md-12 mt-30">
          <div class="bg-white br-5 clearfix p10">
            <div>
              <NuxtLink
                class="button button-sm demand-tab border float-l mr-5"
                :class="this.$route.query.type != 'nilam' ? 'demand-ative' : ''"
                to="?type=dimand"
              >
                ডিমান্ড লিস্ট
              </NuxtLink>
            </div>
            <div>
              <NuxtLink
                class="button button-sm nilam-tab border div2"
                :class="this.$route.query.type == 'nilam' ? 'nilam-ative' : ''"
                to="?type=nilam"
              >
                নিলাম লিস্ট
              </NuxtLink>
            </div>
          </div>
        </div>
      </b-row>
    </b-container> -->
    <CategoryDemandList v-if="this.$route.query.type != 'nilam'" />
    <CategoryNilamList v-else />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // currentState: "demand",
    };
  },

  async fetch() {
    const response = await this.$axios.get(`category/${this.$route.params.id}`);
    this.$store.commit("demand/setCategory", response.data.data);
  },
  methods: {},

  computed: {
    ...mapState({
      category: (state) => state.demand.category,
    }),
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: `জিতে যাও ।  ${this.category.name}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.category.name,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.category.name,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.category.name,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.category.image,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.category.name,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.category.name,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.category.name,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.category.image,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.category.name,
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

