<template>
   <div>
     <img v-if="user.avatar"
        class="img-fluid author-img winner-img text-center rounded-circle" width="50"
        :src="user.avatar"
      />
      <h6 class="fw-500 mt-5">{{user.name}}
      <span class="">
        <img
          class="img-fluid cate-badge"
          src="~/assets/images/badge/1.png"
          v-b-tooltip.hover
          title="ভেরিফাইড বায়ার"
          alt="author badge" width="16"
        />
        <img
          v-if="badge >= 2"
          class="img-fluid cate-badge" width="16"
          src="~/assets/images/badge/2.png"
          alt="author badge"
          v-b-tooltip.hover
          title="১০ এর অধিক কাজ করিয়েছেন"
        />
        <img
          v-if="badge >= 3"
          class="img-fluid cate-badge" width="16"
          src="~/assets/images/badge/3.png"
          alt="author badge"
          v-b-tooltip.hover
          title="৫০  এর অধিক কাজ করিয়েছেন"
        />
      </span>
       </h6>
    </div>
</template>
<script>
export default {
  props: ["user","badge"],
  data() {
    return {
    };
  }
};
</script>