<template>
  <b-row>
    <div class="col-md-12">
      <div
        class="seller-de w-100 mt-30 bg-white"
        v-if="bids.data && bids.data.length > 0"
      >
        <div class="title p10">
          <h3>বিড লিস্ট</h3>
        </div>

        <div
          class="nilam-winnder seller-de seller-list w-100 bg-white p20 clearfix"
          v-for="bid in bids.data"
          :key="bid.id"
        >
          <div class="col-md-4">
            <div class="seller">
              <NuxtLink to="">
                <img
                  v-if="bid.bid_user.avatar"
                  class="img-fluid rounded-circle author-img"
                  :src="bid.bid_user.avatar"
                />
              </NuxtLink>
              <div class="content">
                <NuxtLink to="">
                  <h3 class="name">{{ bid.bid_user.name }}</h3>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="seller-info ml-20 ml-xs-0 mt-xs-15">
              <i class="fas fa-clock"></i><span> {{ bid.created_at }}</span>
              <i class="fas fa-map-marker-alt"></i
              ><span> {{ bid.bid_user.area.area_name }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="text-center text-xs-left">
              <div>
                <div class="bid-offer mt-5 mb-15">
                  <h2 class="text-bold">
                    {{ replaceNumbersE2B(bid.bid_price) }} পয়েন্ট
                  </h2>
                  <p
                    class="mt-5"
                    v-b-tooltip.hover
                    title=" সম্ভাব্য ডেলিভারি তারিখ"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NilamBidSkelton v-if="$fetchState.pending"></NilamBidSkelton>
      </div>
    </div>

    <div class="w-100 mt-2" v-if="bids.meta">
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
  </b-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      winner: null,
      current_page: 1,
      orderBy: "",
      current_modal_image: "",
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      `nilam-bid-list/${this.$route.params.id}?orderBy=${this.orderBy}&page=` +
        this.current_page
    );
    this.setBidsInState(response);
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  methods: {
    setBidsInState(bids) {
      this.$store.commit("nilam/setBid", bids);
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
    addToShortList(bid_id) {
      this.$store.commit("bid/changeBidStatus", bid_id);
      this.$axios.$post("/bid-shortlist/" + bid_id).then((response) => {
        this.toastMessage(response);
      });
    },
    getContact($bid_id) {
      this.$axios.get("user-contact/" + $bid_id).then((response) => {
        this.$store.commit("bid/setUserContact", response.data.data);
        this.$bvModal.show("contactModal");
      });
    },
    showImageModal(image) {
      this.current_modal_image = image;
      this.$bvModal.show("ImageModal");
    },
  },

  computed: {
    ...mapState({
      bids: (state) => state.nilam.nilamBidList,
    }),
  },
};
</script>

<style>
</style>