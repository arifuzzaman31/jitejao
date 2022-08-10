<template>
  <transition name="modal">
    <b-modal id="errorModal">
      <div class="error">
        <ul>
          <li class="color-red text-center p20 pb-0" v-for="error in errors" :key="error[0]">
            <h2 class="color-red">{{ error[0] }}</h2>
          </li>
        </ul>
      </div>
    </b-modal>
  </transition>
</template>
<script>
export default {
  props: ["errors"],
};
</script>