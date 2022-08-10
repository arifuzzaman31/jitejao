<template>
  <div class="skelton">
    <div
      class="loop-skel"
      v-for="(skl, skl_index) in skelton_array"
      :key="'prant_skel' + skl_index"
    >
      <b-row>
        <div class="col-md-12 mt-5">
          <div class="cate-heading">
            <div class="cate-title">
              <h3><b-skeleton animation="fade" width="40%"></b-skeleton></h3>
            </div>
            <div class="ca-btn float-r">
              <b-skeleton animation="fade" type="button"></b-skeleton>
            </div>
          </div>
          <hr />
        </div>
      </b-row>

      <b-row class="mb-30">
        <div
          class="col-md-3"
          v-for="(skl_item, itm_index) in skl.items"
          :key="'itm' + itm_index"
        >
          <SingleDemandSkelton />
        </div>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skelton_array: [{ items: [1, 2, 3, 4] }, { items: [1, 2, 3, 4] }],
    };
  },
};
</script>