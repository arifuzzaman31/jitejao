<template>
  <b-container>
    <b-row>
      <div class="col-md-12 ">
        <!-- <div class="bg-white br-5 clearfix p10">
            <div 
                    class="custom-tab-demand" 
                    @click="selected = 1" 
                    :class="{highlight:selected == 1}">
        <NuxtLink
          class="btn btn-default  div1"
          :class="this.$route.query.find != 'nilam' ? 'demand-ative' : ''"
          to="post?find=dimand"
        >
          ডিমান্ড লিস্ট 
        </NuxtLink>
            </div>
              <div 
                    class="custom-tab-nilam" 
                    @click="selected = 2" 
                    :class="{highlight:selected == 2}">
        <NuxtLink
          class="btn btn-default  div2"
          :class="this.$route.query.find == 'nilam' ? 'nilam-ative' : ''"
          to="post?find=nilam"
        >
          নিলাম লিস্ট
        </NuxtLink>
            </div>
        </div> -->
      </div>
    </b-row>


<!-- nilam or demand classification  -->
      <!-- <b-row>
      <div class="col-md-12">
        <div class="br-5 clearfix ">
            <div>
        <NuxtLink
          class="button button-sm demand-tab  border float-l mr-10"
          :class="this.$route.query.find != 'nilam' ? 'demand-ative' : ''"
          to="post?find=dimand"
        >
          ডিমান্ড লিস্ট 
        </NuxtLink>
            </div>
              <div>
        <NuxtLink
          class="button button-sm nilam-tab  border  div2"
          :class="this.$route.query.find == 'nilam' ? 'nilam-ative' : ''"
          to="post?find=nilam"
        >
          নিলাম লিস্ট
        </NuxtLink>
            </div>
        </div>
      </div>
    </b-row> -->

    <b-row>
      <div class="category-tab-list w-100">
        <!-- <AllNilamList v-if="this.$route.query.find == 'nilam'" /> -->
        <AllDemandList  />
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      // currentState: "demand",
    };
  },
};
</script>
<style>
/* .vue-star-rating {
    display: flex !important;
} */
</style>