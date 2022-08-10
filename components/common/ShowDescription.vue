<template>
  <div>
    <h3 class="" v-if="more">
      <p v-if="description && description.length > strlength">
        <span v-html="description.substring(0, strlength)"></span>
        <a href="javascript:void(0)" class="text-success" @click="showHide()"
          >...View more</a
        >
      </p>
      <p v-else v-html="description"></p>
    </h3>
    <h3 v-else>
      <p v-html="description"></p>
    </h3>
  </div>
</template>
<script>
export default {
  props: ["description", "strlength"],
  data() {
    return {
      more: true,
    };
  },

  methods: {
    showHide() {
      this.more = !this.more;
    },
  },
};
</script>