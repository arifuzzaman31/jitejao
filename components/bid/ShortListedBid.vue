<template>
  <div class="row">
    <NotFound v-if="!$fetchState.pending && wincounter <= 0 && bids.data && bids.data.length <= 0">
      <template v-slot:head-title> কোন শর্টলিস্ট  বিড পাওয়া যায়নি </template>
      <template v-slot:subhead-title>
        শর্টলিস্ট  করার আইকন <i class="far fa-bookmark"></i> এ ক্লিক করে বিড
        লিস্ট থেকে পছন্দ অনুযায়ী বিড শর্টলিস্ট করুন
      </template>
    </NotFound>
    <NotFound v-if="bids.data && bids.data.length <= 0 && wincounter > 0">
      <template v-slot:head-title>
         বিজয়ীতে দেখুন
      </template>
    </NotFound>

    <div
      class="seller-de seller-list w-100 bg-white p20"
      v-for="bid in bids.data"
      :key="bid.id"
    >
      <div class="col-md-4">
        <div class="seller">
          <NuxtLink :to="`/user-profile/${bid.user.id}?view_as=seller`">
            <img
              class="img-fluid rounded-circle author-img"
              :src="bid.user.avatar"
              :alt="bid.user.name"
            />
          </NuxtLink>
          <div class="content">
            <NuxtLink
              class="fw-500"
              :to="`/user-profile/${bid.user.id}?view_as=seller`"
              >{{ bid.user.name }}</NuxtLink
            >
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
                v-if="bid.user.seller_badge >= 2"
              />
              <img
                v-b-tooltip.hover
                title="৫০ এর অধিক কাজ করেছেন"
                src="~/assets/images/badge/3.svg"
                class="img-fluid img-badge"
                v-if="bid.user.seller_badge >= 3"
                alt="badge"
              />
            </div>
            <div
              class="rating"
              v-b-tooltip.hover
              :title="bid.user.average_selling_rating"
            >
              <StarsRatings
                v-model="bid.user.average_selling_rating"
                :star-size="12"
                :ssr="false"
                :increment="0.2"
                :show-rating="false"
                read-only
              />
            </div>
            <div class="">
              <span style="color: #727b9a; font-size: 16px">
                <i class="fas fa-clock"></i> {{ bid.created_at }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="seller-info ml-20 mt-20 ml-xs-0 text-center ">
          <div class="win-bid" v-if="bid.is_confirmed">
            <!-- <a v-b-tooltip.hover :title="`${bid.user.name} বিডটি জিতেছেন`"> -->
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

        <!-- <div class="seller-info ml-20 text-center">
          <a
            v-if="
              bid.bid_image_small &&
              demanderId &&
              $auth.loggedIn &&
              demanderId == $auth.user.id
            "
            href=""
            @click.prevent="showImageModal(bid.bid_image_big)"
          >
            <img
              :src="bid.bid_image_small"
              class="img-fluid seller-post-img mt-15"
              alt="post image"
              v-b-modal.modal-center
              width="100"
              height="100"
            />
          </a>
        </div> -->
      </div>

      <div class="col-md-4">
        <div class="text-center">
          <div class="bid-offer mt-5 mb-10 mb-xs-0">
            <h2 class="text-bold ">{{  replaceNumbersE2B(bid.offer_amount) }} ৳</h2>
          </div>
          <div class="bid-action " style="display: inline-block;">
            <!-- <a
              href=""
              class="button button-sm color-red bg-red-op-20"
              v-b-tooltip.hover
              title="এই বিডটি  শর্টলিস্ট  থেকে রিমোভ করুন"
              @click.prevent="removeShortlisted(bid.id)"
              >অনির্বাচিত করুন <i class="far fa-bookmark"></i
            ></a> -->
            <button
              @click.prevent="showDetails(bid)"
              type="button"
              class="button button-small bg-purple bid-button color-white mt-xs-15"

            >
              <i class="fas fa-list pr-5"></i> বিস্তারিত
            </button>
            <a
              href=""
              class="button button-sm color-blue bg-blue-op-10 ml-5 mt-xs-15"
              @click.prevent="getContact(bid.id,'contactuser')"
              > <i class="fas fa-mobile-alt pr-5"></i
            > যোগাযোগ  </a>
            <a
              href=""
              class="button button-sm color-green bg-green-op-10 ml-5 mt-xs-15"
              @click.prevent="getContact(bid.id,'winner')"
              ><i class="far fa-check-circle pr-5"></i
            >কনফার্ম  </a>
          </div>
        </div>
        <!-- <div v-else>
          <p>শুদু ডিমান্ডকরি বিড সংক্ৰান্ত তথ্য দেখবেন</p>
        </div> -->
      </div>
    </div>

    <div class="seller-de w-100 bg-white" v-if="bids.meta">
      <div
        class="col-12 text-center"
        v-if="bids.meta && bids.meta.last_page != current_page"
      >
        <button
          @click.prevent="onBidLoadMore()"
          class="btn button-small primary-button bid-button w-xs-100"
        >
          <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
          <span v-else>আরো লোড করুন</span>
        </button>
      </div>
    </div>
    <!-- <UserContactModal></UserContactModal> -->
    <ContactUser></ContactUser>
    <WinnerUser></WinnerUser>
    <BidDetails :bid_details="bid_details"></BidDetails>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["demanderId"],
  data() {
    return {
      current_page: 1,
      current_modal_image: "",
      bid_details: null,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      `bid-list/${this.$route.params.id}?not_confirm=yes&only_short_listed=1&page=` +
        this.current_page
    );

    this.setShortlistedBid(response);
  },
  
  beforeMount(){
    this.$fetch()
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  methods: {
    setShortlistedBid(bids) {
      this.$store.commit("bid/setShortlistedBid", bids);
    },
    onBidLoadMore() {
      this.current_page += 1;
    },

    removeShortlisted(bid_id) {
      // this.$store.commit("bid/changeShortlistedBidStatus", bid_id);
      this.$axios.$post("/bid-shortlist/" + bid_id).then((response) => {
        this.$store.commit("bid/setBidCounter", 'icr');
        // this.$store.commit("bid/setShortlistBidCounter", 'dcr');
        this.toastMessage(response);
      });
    },
    getContact(bid_id,modalname) {
      this.$axios.get("user-contact/" + bid_id).then((response) => {
        this.$store.commit("bid/setUserContact", response.data.data);
      });
      if(modalname == 'winner'){
        this.$bvModal.show("winnerUserModal");
      }else{
        this.$bvModal.show("contactUserModal");
      }
    },

    showImageModal(image) {
      this.current_modal_image = image;
      this.$bvModal.show("ImageModal");
    },
    showDetails(bid) {
      this.bid_details = bid;
      this.$bvModal.show("modal-BidDetails");
    },
  },

  computed: {
    ...mapState({
      bids: (state) => state.bid.shortListedBid,
      wincounter: (state) => state.bid.winner_counter,
    }),
  },
};
</script>

<style >
.de-preview-image .modal-header {
  background: #fff !important;
  border: 0 !important;
  padding: 0.3rem 0.5rem !important;
}
.modal-body {
  padding-top: 0;
}
</style>