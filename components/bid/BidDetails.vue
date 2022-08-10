<template>
        <b-modal
      id="modal-BidDetails"
    size="lg"
    centered
    title=" বিড ডিটেইলস"
    hide-footer
    >
      <div class="text-center mt-30" v-if="bid_details">
        <!-- <div class="win-bid" v-if="bid_details.is_confirmed">
                      <a v-b-tooltip.hover :title="`${bid_details.user.name} বিডটি জিতেছেন`"
                        ><i style="color: #e3106e" class="fas fa-crown fa-2x"></i
                      ></a>
                    </div> -->
        <img
          v-if="bid_details.bid_image_big"
          :src="bid_details.bid_image_big"
          alt="বিড ডিটেইলস ইমেজ"
          width="400"
          class="p30 text-center img-fluid"
        />
              <div class="bid-popup-details">
                 <div class="m-auto">
                <div class=" col-md-6 offset-md-3">
                        <div class="bg-blue-gray p10 mb-15">
                          
                            <p> অফার এমাউন্ট</p>
                            <h2> {{ bid_details.offer_amount }} ৳</h2>

                    </div>
                 </div>
                      <div class=" col-md-6 offset-md-3">
                        <div class="bg-blue-gray p10 mb-15">
                            <h6> সম্ভাব্য ডেলিভারি তারিখ</h6>
                            <p>{{ bid_details.delivery_date_text }}</p>
                    </div>
                 </div>

                  <div class=" col-md-12" v-if="bid_details.proposal">
                        <div class="bg-blue-gray p10 mb-15">
                           <h6>বিস্তারিত</h6>
                           <ShowDescription  :strlength="200" :description="bid_details.proposal"></ShowDescription>
            </div>
               </div>

                 </div>
              </div>
      </div>
    </b-modal>
</template>
<script>

export default {
    props: ["bid_details"],
};
</script>

<style  scoped>
.vue-star-rating {
  display: inline-block;
}
</style>
