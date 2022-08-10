<template>
<div v-if="demand_winner && demand_winner.win_bid && demand_winner.win_bid.user">
  <b-modal 
      id="bidWinModal" 
      centered hide-footer
      size="lg"
      :title="`আপনি ${demand_winner.win_bid.user.name} কে বিজয়ী করেছেন`"
  >
      <b-row>
        <div class="col-md-12">
          <div
            class="nilam-title w-100 " >

            <div class="nilam-winner w-100 bg-white p20 clearfix">
                <div class="winner-name text-center">
                  <div class="">
                     <UserAuthor :user="demand_winner.win_bid.user" :badge="demand_winner.win_bid.user.seller_badge" />
                            <div class="user-rating text-center">
                              <StarsRatings
                                v-model="demand_winner.win_bid.user.average_selling_rating"
                                :star-size="12"
                                :ssr="false"
                                :increment="0.2"
                                :show-rating="false"
                                read-only
                              />
                            </div>

                    <div class=" col-md-6 offset-md-3 mt-15">
                       <div class="bg-blue-gray p10 mb-15">
                         <h6 class=""> যোগাযোগ</h6>
                           <p><a  :href="'tel:'+ demand_winner.win_bid.user.mobile_no"
                               class="color-green">
                             {{demand_winner.win_bid.user.mobile_no}}</a>
                           </p>
                       </div>
                     </div>
                     <div class="col-md-3"></div>
                  </div>

                  <div class="content mt-10 ">
                       <div class=" col-md-12 mt-15">
                      <h6 class="fw-600 mb-10 color-purple">বিড ডিটেইলস </h6>
                       </div>
                      <div class=" col-md-6">
                        <div class="bg-blue-gray p10 mb-15">
                          <h6 class="">অফার প্রাইস </h6> 
                          <p>{{ replaceNumbersE2B(demand_winner.win_bid.offer_amount) }}৳</p>
                        </div>
                      </div>

                      <div class="col-md-6">
                         <div class="bg-blue-gray p10 mb-15">

                        <h6  class="">ডেলিভারি ডেট </h6> 
                        <p>{{ demand_winner.win_bid.delivery_date_text }}</p>

                        </div>
                      </div>
                      <div class="col-md-12" v-if="demand_winner.win_bid.proposal">
                       <div class="bg-blue-gray p10">

                        <h6  class="">ডিটেইলস </h6>
                        
                        <ShowDescription :description="demand_winner.win_bid.proposal" :strlength="200" />
                      </div>
                      </div>
                  
                  </div>
                  <div class="col-md-12 mt-10">
                  <!-- <div class="demand-rating" v-if="demand_winner.demand_rating && demand_winner.demand_rating.ratings">
                       <h4 class="fw-600 mt-10"> আমাকে দেওয়া রেটিং</h4>
                      <StarsRatings
                        v-model="demand_winner.demand_rating.ratings"
                        :star-size="12"
                        :show-rating="false"
                        :increment="0.5"
                        :ssr="false"
                        read-only
                        />
                  </div> -->
                  <!-- <div class="" v-if="demand_winner.bid_rating"> -->
                      <!-- <button data-v-bd97be92="" class="button button-sm color-yellow bg-yellow-op-20 mt-2">
                         সেলার কে রিভিউ দিন
                        </button> -->
                        <div v-if="demand_winner.win_bid && demand_winner.win_bid.bid_rating">
                          <h6 class="fw-600 mt-10 color-purple"> সেলার রেটিং</h6>
                            <StarsRatings
                            v-model="demand_winner.win_bid.bid_rating.ratings"
                            :star-size="12"
                            :show-rating="false"
                            :increment="0.5"
                            :ssr="false"
                            read-only
                            />
                        </div>
                          <!-- <div v-else>
                            <button class="button button-sm color-yellow bg-yellow-op-20 mt-2" @click="sellerReview(demand_winner.win_bid)">
                            সেলার কে রিভিউ দিন
                            </button>
                          </div> -->
                        </div>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <BidDoneModal />
      </b-row>
  </b-modal>
</div>
</template>

<script>

import { mapState } from "vuex";
export default {
  data() {
    return {
      bid_done_form: {
        ratings: 0,
        review: "",
      },
      validation_errors: {},
      formSubmiting: false,
    };
  },
  computed: {
    ...mapState({
      demand_winner: (state) => state.demand.demandwinuser,
    //   get demand_winner() {
    //     return this._demand_winner;
    //   },
    //   set demand_winner(value) {
    //     this._demand_winner=value;
    //   },
    }),
  },
  methods: {
      sellerReview(bid){
        this.$store.commit("bid/setConfirmBid", bid);
        this.$store.commit("bid/setBidRatingStatus", "panel");
        // this.$bvModal.hide("bidWinModal");
        this.$bvModal.show("bidDoneModal");
      }
  },
};
</script>