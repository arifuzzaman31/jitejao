<template>
  <b-container>
    <div class="row">
      <div class="seller-de w-100 mt-30 bg-white">
        <div
          class="title"
          v-if="demanderId && $auth.loggedIn && demanderId == $auth.user.id"
        >
          <button
            class="button button-sm color-black br-0"
            :class="current_tab == 1 ? 'active_button' : ''"
            @click="setCurrentTab(1)"
          >
            বিড ({{ bid_counter }})
          </button>
          <button
            class="button button-sm color-black br-0"
            :class="current_tab == 2 ? 'active_button' : ''"
            @click="setCurrentTab(2)"
          >
            শর্টলিস্ট  ({{ shbid_counter }})
          </button>
          <button
            class="button button-sm color-black br-0"
            :class="current_tab == 3 ? 'active_button' : ''"
            @click="setCurrentTab(3)"
          >
            কনফার্ম  ({{ winner_counter }})
          </button>

           <button
            class="button button-sm color-black br-0"
            :class="current_tab == 4 ? 'active_button' : ''"
            @click="setCurrentTab(4)"
          >
           গাইডলাইন
          </button>

        </div>
        <div class="title p10" v-else>
          <h3>বিড লিস্ট</h3>
        </div>
      </div>
    </div>
    <!-- buyer -->
    <!-- all bids  -->
    <AllBidList
      :demanderId="demanderId"
      v-if="
        current_tab == 1 ||
        ($auth.loggedIn && demanderId != $auth.user.id) ||
        $auth.loggedIn == false
      "
    >
    </AllBidList>
    <ShortListedBid
      :demanderId="demanderId"
      v-if="
        current_tab == 2 &&
        demanderId &&
        $auth.loggedIn &&
        demanderId == $auth.user.id
      "
    >
    </ShortListedBid>
    <ConfirmBid
      :demanderId="demanderId"
      v-if="
        current_tab == 3 &&
        demanderId &&
        $auth.loggedIn &&
        demanderId == $auth.user.id
      "
    >
    </ConfirmBid>
    <!-- all bids  -->

      <div
       class="guideline"
        v-if="
        current_tab == 4">
       <div class="p10 mt-20">

         <div class="mb-30">
           <h5> </h5>
           <div class="content">
             <ul>
               <li><i class="fas fa-check mr-15 color-purple"></i> 
                এখানে যতগুলো বিড পড়বে, সেগুলো থেকে আপনার প্রয়োজনীয় কিছু বিডকে শর্টলিস্ট করুন। 
               </li>
                <li><i class="fas fa-check mr-15 color-purple"></i> 
                  শর্টলিস্ট করার পর আপনি সেলারের ফোন নাম্বার পাবেন। 
               </li>
                <li><i class="fas fa-check mr-15 color-purple"></i> 
                  সেলারও আপনার ফোন নাম্বার পাবে। ফোনে বিস্তারিত কথা বলার পর যে কোনো একজনকে কনফার্ম করে বিজয়ী করুন।
               </li>
             </ul>
         </div>
         </div>
         <!-- end of guideline -->



       </div>
      </div>


    <!-- buyer -->
  </b-container>
  <!-- bid  -->
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["demanderId"],
  data() {
    return {
    };
  },

  beforeMount(){
    this.$fetch();
  },

  async fetch() {
    const response = await this.$axios.$get(`count-bid-on-demand/${this.$route.params.id}`);
    this.$store.commit("bid/setBidCounter", Number(response.remain_bid));
    this.$store.commit("bid/setShortlistBidCounter", Number(response.shlist_bid));
    this.$store.commit("bid/setWinnerCounter", Number(response.winner_bid));
  },

  methods: {
    setCurrentTab(tab) {
      this.$store.commit("bid/setCurrentTab", tab);
    },
  },

  computed: {
    ...mapState({
      current_tab: (state) => state.bid.current_tab,
      bid_counter: (state) => state.bid.bid_counter,
      shbid_counter: (state) => state.bid.shbid_counter,
      winner_counter: (state) => state.bid.winner_counter,
    }),
  },
};
</script>

<style scoped>
.active_button {
  border-bottom: 3px solid #da2d75;
  border-radius: 5px;
}
.guideline .content ul li i{
    font-size: 12px;
}
.guideline .content ul li{
    margin-bottom: 5px;
}
</style>>
