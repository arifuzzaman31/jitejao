<template>
  <div class="row">
    <div class="seller-de p10 w-100 p20 bg-white" v-if="confirmBid">
      <div class="col-md-4">
        <div class="seller">
          <NuxtLink :to="`/user-profile/${confirmBid.user.id}?view_as=seller`">
            <img
              class="img-fluid rounded-circle author-img"
              :src="confirmBid.user.avatar"
              :alt="confirmBid.user.name"
              style=""
            />
          </NuxtLink>
          <div class="content">
            <NuxtLink
              class="fw-500"
              :to="`/user-profile/${confirmBid.user.id}?view_as=seller`">
              {{ confirmBid.user.name }}
            </NuxtLink>
              <div class="badge details-profile-badge-biding">
              <img
                v-b-tooltip.hover
                title="ভেরিফাইড সেলার"
                src="~/assets/images/badge/1.svg"
                class="img-fluid img-badge"
                alt="badge"
              />
              <img
                v-b-tooltip.hover
                title="১০টির অধিক কাজ করেছেন"
                src="~/assets/images/badge/2.svg"
                class="img-fluid img-badge"
                alt="badge"
                v-if="confirmBid.user.seller_badge >= 2"
              />
              <img
                v-b-tooltip.hover
                title="৫০ এর অধিক কাজ করেছেন"
                src="~/assets/images/badge/3.svg"
                class="img-fluid img-badge"
                v-if="confirmBid.user.seller_badge >= 3"
                alt="badge"
              />
            </div>
            <div
              class="rating"
              v-b-tooltip.hover
              :title="confirmBid.user.average_selling_rating"
            >
              <StarsRatings
                v-model="confirmBid.user.average_selling_rating"
                :star-size="12"
                :ssr="false"
                :increment="0.2"
                :show-rating="false"
                read-only
              />
            </div>
            <div class="">
              <span style="color: #727b9a; font-size: 16px"
                ><i class="fas fa-clock"></i> {{ confirmBid.created_at }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">

             <div class="seller-info ml-20 mt-20 ml-xs-0 text-center ">
          <div class="win-bid" v-if="confirmBid.is_confirmed">
            <!-- <a v-b-tooltip.hover :title="`${confirmBid.user.name} বিডটি জিতেছেন`" -->
            <a>
               <img
                      src="~/assets/images/badge/winner.svg"
                      class="img-fluid img-badge"
                      width="105"
                      alt="badge"
                 />
              
              </a>
          </div>
        </div>

      </div>

      <div class="col-md-4">
        <div class="buyer-review text-center mt-10">
          <div class="price mt-10">
            <h2 class="text-bold  mb-10">
              {{ replaceNumbersE2B(confirmBid.offer_amount) }} ৳
            </h2>
              <div class="bid-action " style="display: inline-block;">
                    <button  @click.prevent="showDetails(confirmBid)" type="button" class="button button-small bg-purple bid-button  color-white">
                      <i class="fas fa-list pr-5"></i> বিস্তারিত 
                    </button>
                    <button v-show="!confirmBid.is_buyer_reviewed"  @click.prevent="showRatingDetails(confirmBid)"  type="button" class="button button-small bg-yellow-op-20 bid-button  color-yellow">
                      <i class="fas fa-star pr-5"></i> রেটিং দিন 
                    </button>
              </div>
          </div>

        </div>
      </div>
    </div>


  <b-modal
    id="showConfirmRating"
    size="lg"
    centered
    title="রেটিং দিন"
    hide-footer
  >
    <b-row v-if="rating_details">
      <div class="col-md-12 text-center mt-15">
              <div class=" col-md-6 offset-md-3">
                <div class="bg-blue-gray p10 mb-15">
                  <h6 v-if="rating_details.confirmed_at" >বিড কনফার্ম তারিখ</h6>
                <p> {{ rating_details.confirmed_at }}</p>
                </div>
              </div>   

          <div class="rating mt-10 mt-xs-15" v-if="rating_details.bid_rating">
             <div class="col-md-6 offset-md-3">
               <div class="bg-blue-gray p10 mb-15">
            <h6 class="fw-500">আমার দেওয়া রেটিং</h6>
            <StarsRatings
              v-model="rating_details.bid_rating.ratings"
              :star-size="12"
              :show-rating="false"
              :increment="0.5"
              :ssr="false"
              read-only
            />
               </div>
             </div>
             <div class=" col-md-12" v-if="rating_details.bid_rating.review">
                <div class="bg-blue-gray p10 mb-15">
                 <h6 class="fw-500"> বিস্তারিত: </h6>
                 <ShowDescription :strlength="400" :description="rating_details.bid_rating.review" />
                </div>
<!-- 
               <div class=" col-md-6 offset-md-3">
                <div class="bg-blue-gray p10 mb-15">
                  <p v-if="rating_details.done_at">
                    <i class="far fa-clock"></i> {{ rating_details.done_at }}
                  </p>
                </div>
               </div> -->

          </div>
          </div>

          <div v-else class="col-md-6 offset-md-3">
            <div class="">
            <button
              @click="markAsDone()"
              class="btn btn-warning  mt-2"
            >
              কাজ শেষে নিশ্চিত করুন
            </button>
            </div>
          </div>  


        
      </div>
    </b-row>
  </b-modal>





    <NotFound v-if="!$fetchState.pending && !confirmBid">
      <template v-slot:head-title> এখনো কোন বিড কনফার্ম করেননি </template>
      <template v-slot:subhead-title>
        বিড কনফার্ম করার জন্যে বিডলিস্ট থেকে বিডারের  সাথে যোগাযোগ করে কনফার্ম
        আইকন <i class="far fa-check-circle color-green"></i> এ ক্লিক করে কনফার্ম করুন
      </template>
    </NotFound>
    <BidDoneModal></BidDoneModal>
    <BidDetails :bid_details="bid_details"></BidDetails>


  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
       bid_details : null,
       rating_details : null
    };
  },
  created() {
    this.$nuxt.$on("bid-done", () => {
      this.current_page = 1;
      this.$fetch();
    });
  },
  async fetch() {
    const bid = await this.$axios.$get(
      "confirmed-bid/" + this.$route.params.id
    );

    this.setConfirmBid(bid);
  },

  methods: {
    setConfirmBid(bid) {
      this.$store.commit("bid/setConfirmBid", bid.data ? bid.data : null);
    },
    markAsDone() {
      this.$bvModal.hide("showConfirmRating");
      this.$bvModal.show("bidDoneModal");
    },
    showDetails(bid) {
      this.bid_details = bid;
      this.$bvModal.show("modal-BidDetails");
    },
    showRatingDetails(bid) {
      this.rating_details = bid;
      this.$bvModal.show("showConfirmRating");
    },
  },

  computed: {
    ...mapState({
      confirmBid: (state) => state.bid.confirmBid,
    }),
  },
};
</script>

<style >
.vue-star-rating {
  display: inline-block;
}
.de-preview-image .modal-header {
  background: #fff !important;
  border: 0 !important;
  padding: 0.3rem 0.5rem !important;
}
.modal-body {
  padding-top: 0;
}
</style>