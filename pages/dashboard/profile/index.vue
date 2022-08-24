<template>
  <div>
    <b-container class="dashboard">
      <ProfileMenu />

      <!-- dashboard card end -->

      <UserProfile />
    </b-container>
    <Footer />
  </div>
</template>


<script>
import profile from "../../profile.vue";
export default {
  components: { profile },
  middleware: ["auth"],
  data() {
    return {
      user: []
    };
  },

  async fetch() {
    await this.$axios
      .$get("user/profile")
      .then((response) => (this.user = response.data));
  },

  methods: {},

  computed: {
    // getUser() {
    //   return this.$store.state.auth.user;
    // },
  },

  head() {
    return {
      title: "জিতে যাও । প্রোফাইল",
    };
  },
};
</script>
<style>
</style>
