<template>
  <div class="container">
    <div class="row">
      <div
        class="seller-de w-100 bg-white"
        v-for="(item, index) in skelton_array"
        :key="'bid_skelton' + index"
      >
        <div class="col-md-4">
          <div class="seller p20">
            <a href="#" >
              <b-skeleton animation="fade" type="avatar"></b-skeleton>
            </a>
            <div class="content">
              <h3 class="name">
                <b-skeleton animation="fade" width="85%"></b-skeleton>
              </h3>
              <div class="rating">
                <StarsRatings
                  :value="0"
                  :star-size="12"
                  :ssr="false"
                  :increment="0.2"
                  :show-rating="false"
                  read-only
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="seller-info p20 ml-20">
            <b-skeleton animation="fade" width="55%"></b-skeleton>
            <b-skeleton animation="fade" width="75%"></b-skeleton>
            <b-skeleton animation="fade" width="55%"></b-skeleton>
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <div class="bid-offer mt-5">
              <p><b-skeleton animation="fade" width="100%"></b-skeleton></p>
              <span class="text-bold"
                ><b-skeleton animation="fade" width="55%"></b-skeleton
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skelton_array: [1, 2, 3, 4],
    };
  },
};
</script>