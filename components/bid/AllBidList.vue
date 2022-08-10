<template>
  <div class="row">
    <div class="w-100 bg-gray-op-10" v-if="bids.data && bids.data.length > 0">
      <div class="select-box">
        <div class="float-r">
          <div class="form-group mt-2">
            <select
              name=""
              class="form-control form-control-h40"
              v-model="orderBy"
              @change="filterChanged()"
              v-if="demanderId && $auth.loggedIn && demanderId == $auth.user.id"
            >
              <option value="">সকল বিড</option>
              <option value="lowest_price">কম প্রাইস থেকে বেশি</option>
              <option value="heighest_price">বেশি প্রাইস থেকে কম</option>
              <option value="recent_bid">নতুন বিড</option>
              <option value="old_bid">পুরাতন বিড</option>
              <!-- <option value="heighest_rating">বেশি রেটিং থেকে কম</option>
              <option value="lowest_rating">কম রেটিং থেকে বেশি</option> -->
            </select>
          </div>
        </div>
      </div>
    </div>

    <NotFound v-if="!$fetchState.pending && shlistbid <= 0 && wincounter <= 0 && bids.data.length <= 0">
      <template v-slot:head-title>
        এই ডিমান্ডে এখনো কোনো বিড পাওয়া যায়নি
      </template>
      <template v-slot:subhead-title>
        <!-- <span
          v-if="demanderId && $auth.loggedIn && demanderId == $auth.user.id"
        >
          বিড পাওয়া গেলে বিড লিস্ট থেকে প্রাথমিক বাছাই <i class="fas fa-mobile-alt color-blue"></i>
           এবং বিজয়ী করুন <i class="far fa-check-circle color-green"></i>
        </span> -->
        <span v-if="demanderId && $auth.loggedIn && demanderId !== $auth.user.id">প্রথম বিডার হিসেবে প্রাধান্য পেতে এখনি বিড করুন</span>
      </template>
    </NotFound>

    <div
      class="seller-de seller-list w-100 bg-white p20"
      v-for="bid in bids.data"
      :key="bid.id">
      <div class="col-md-4">
        <div class="seller">
          <NuxtLink to="">
            <img
              class="img-fluid rounded-circle author-img"
              :src="bid.user.avatar"
              :alt="bid.user.name"
            />
          </NuxtLink>
          <div class="content">
            <NuxtLink
              class="fw-500"
              to=""
            >
              {{ bid.user.name }}
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
              <span style="color: #727b9a; font-size: 16px"
                ><i class="fas fa-clock"></i> {{ bid.created_at }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        &nbsp;  &nbsp;
        <div class="seller-info   text-center" >
          <!-- <i class="fas fa-map-marker-alt"></i><span> {{ bid.user.area.area_name }}</span> -->
          <!-- <i class="fas fa-bell"></i><span> ২০টি কাজ শেষ করেছেন </span> -->
          <!-- <i class="fas fa-clock"></i><span> {{ bid.created_at }}</span> -->
          <div class="win-bid" v-if="bid.is_confirmed">
            <!-- <a v-b-tooltip.hover :title="`${bid.user.name} বিডটি জিতেছেন`" -->
             <a>
               <img
                      src="~/assets/images/badge/winner.svg"
                      class="img-fluid img-badge mt-xs-0 allbid-winner-image"
                      width="105"
                      alt="badge"
                      style="margin-top: -35px;"
              />
              
              </a>
              
          </div>

          <!-- <a
            v-if="
              bid.bid_image_small &&
              demanderId &&
              $auth.loggedIn &&
              (demanderId === $auth.user.id ||
              bid.user_id ===  $auth.user.id)
            "
            href=""
            @click.prevent="showImageModal(bid.bid_image_big)"
          >
            <img
              :src="bid.bid_image_small"
              class="img-fluid seller-post-img mt-15"
              alt="post image"
              width="100"
              height="100"
            />
          </a> -->
        </div>
      </div>

      <div class="col-md-4">
        <div
          class="text-center"
          v-if="demanderId && $auth.loggedIn"
        >
          <div
            v-if="demanderId == $auth.user.id || bid.user_id == $auth.user.id"
          >
            <div class="bid-offer mt-5 mb-10">
              <h2 class="text-bold">
                {{ replaceNumbersE2B(bid.offer_amount) }} ৳
              </h2>
            </div>
            <div class="bid-action" style="display: inline-flex;">
              <button
                @click.prevent="showDetails(bid)"
                type="button"
                class="button button-small bg-purple bid-button color-white"
              >
                <i class="fas fa-list"></i> বিস্তারিত 
              </button>
              <p class="color-purple p-2 ml-2 bg-purple-op-20 br-5 pl-10 pr-10" v-if="bid.user_id == $auth.user.id && bid.is_shortlisted && !bid.is_confirmed">
                  <i class="far fa-bookmark pr-5"></i> প্রাথমিক বাছাইকৃত
                </p>
           <div  v-if="demanderId == $auth.user.id">
              <a
                href=""
                class="button ml-10 button-small"
                :class="
                  bid.is_shortlisted
                    ? ' color-red bg-red-op-20'
                    : 'color-black bg-gray-op-50'
                "
                v-b-tooltip.hover
                :title="
                  bid.is_shortlisted
                    ? 'এই বিডটি  প্রাথমিক বাছাই থেকে রিমোভ করুন'
                    : 'এই বিডটি  প্রাথমিক বাছাই করুন'
                "
                @click.prevent="addToShortList(bid)"
                ><i class="far fa-bookmark pr-5"></i
              > বাছাই করুন</a>
              <!-- <a
                href=""
                class="button button-sm color-blue bg-blue-op-10"
                v-b-tooltip.hover
                title="সেলারের সাথে যোগাযোগ করুন"
                @click.prevent="getContact(bid.id)"
                ><i class="fas fa-mobile-alt"></i></a> -->
              <!-- <a
                href=""
                class="button button-sm color-green bg-green-op-10"
                v-b-tooltip.hover
                title="এই বিডটি কনফার্ম করুন "
                @click.prevent="getContact(bid.id)"
                ><i class="far fa-check-circle"></i
              ></a> -->
            </div>
              <!-- <p
                class="mt-5"
                v-b-tooltip.hover
                title=" সম্ভাব্য ডেলিভারি তারিখ"
              >
                <i class="far fa-calendar-alt"></i> ডেলিভারি তারিখঃ
                {{ bid.delivery_date_text }}
              </p>
              <ShowDescription :description="bid.proposal" :strlength="90" /> -->
            </div>

 
          </div>

          <div v-else>
            <p v-if="bid.is_shortlisted && !bid.is_confirmed">
                <span class="color-purple p-2 ml-2 bg-purple-op-20 br-5 pl-10 pr-10">
                   <i class="far fa-bookmark pr-5"></i> প্রাথমিক বাছাইকৃত
                </span></p>
            <p v-else>শুধুমাত্র ডিমান্ডকারী বিড সংক্ৰান্ত তথ্য দেখতে পারবে</p>
          </div>
        </div>
        <div v-else>
          <p>শুধুমাত্র ডিমান্ডকারী বিড সংক্ৰান্ত তথ্য দেখতে পারবে</p>
           <span class="color-purple p-2 ml-2 bg-purple-op-20 br-5 pl-10 pr-10" v-if="bid.is_shortlisted">   <i class="far fa-bookmark pr-5"></i> প্রাথমিক বাছাইকৃত</span>
        </div>
      </div>
    </div>

    <BidlistSkelton v-if="$fetchState.pending"></BidlistSkelton>

    <div class="seller-de w-100 bg-white mt-4" v-if="bids.meta">
      <div
        class="col-12 text-center"
        v-if="bids.meta && bids.meta.last_page != current_page"
      >
        <button
          @click.prevent="onBidLoadMore()"
          class="btn button-small primary-button bid-button"
        >
          <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
          <span v-else>আরো লোড করুন</span>
        </button>
      </div>
    </div>

    <UserContactModal></UserContactModal>
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
      orderBy: "",
      current_modal_image: "",
      bid_details: null,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      // `bid-list/${this.$route.params.id}?not_short_listed=yes&orderBy=${this.orderBy}&page=` +
      `bid-list/${this.$route.params.id}?orderBy=${this.orderBy}&page=` +
        this.current_page
    );
    // console.log(this.demanderId)
    this.setBidsInState(response);
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  methods: {
    setBidsInState(bids) {
      this.$store.commit("bid/setBid", bids);
    },
    filterChanged() {
      if (this.current_page == 1) {
        this.$fetch();
      } else {
        this.current_page = 1;
      }
    },
    onBidLoadMore() {
      this.current_page += 1;
    },
    addToShortList(bid) {
      this.$store.commit("bid/changeBidStatus", bid.id);
      this.$axios.$post("/bid-shortlist/" + bid.id).then((response) => {
        if(bid.is_shortlisted){
          this.$store.commit("bid/setShortlistBidCounter", 'icr');
        }else{
          this.$store.commit("bid/setShortlistBidCounter", 'dcr');
        }
        this.toastMessage(response);
      });
    },
    getContact(bid_id) {
      this.$axios.get("user-contact/" + bid_id).then((response) => {
        this.$store.commit("bid/setUserContact", response.data.data);
        this.$bvModal.show("contactModal");
      });
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
      bids: (state) => state.bid.bidList,
      shlistbid: (state) => state.bid.shbid_counter,
      wincounter: (state) => state.bid.winner_counter,
    }),
  },
};
</script>

<style>
.de-preview-image .modal-header {
  background: #fff !important;
  border: 0 !important;
  padding: 0.3rem 0.5rem !important;
}
.modal-body {
  padding-top: 0;
}
.details-profile-badge-biding {
  position: relative;
  top: -4px;
  left: 5px;
}
</style>