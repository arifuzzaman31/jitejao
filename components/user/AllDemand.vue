<template>
<b-container>
    <b-row>
        <div class="card-columns">
          <div
            class="card"
            v-for="demand in demandList.data"
            :key="'demand' + demand.id"
          >
            <div class="demand-profile-list clearfix">
              <div class="display-table w-100">
                <div
                  class="display-table-cell img"
                  :class="dynamicClass[Math.floor(Math.random() * 5)]"
                >
                  <img
                    class="img-fluid"
                    :src="
                      demand.image_one_big
                        ? demand.image_one_big
                        : demand.default_mid_image
                    "
                    alt="post image"
                  />
                </div>
              </div>
              <div class="demand-buyer-profile-list p10">
                <NuxtLink :to="'/demand/' + demand.id + '/' + demand.slug">
                  <h2 class="title">
                    {{ demand.title }}
                  </h2>
                </NuxtLink>

                <p class="color-black" v-if="demand.budget_type">
                  বাজেটঃ {{ replaceNumbersE2B(demand.minimum_budget) }} -
                  {{ replaceNumbersE2B(demand.maximum_budget) }} ৳
                </p>
                <p class="color-black" v-else>বাজেটঃ নেগোশিয়েবল</p>
                <span>ডেডলাইনঃ {{ demand.expire_date_text }}</span>
                <!-- start rating    -->
                <div class="my-rating" v-if="demand.demand_rating">
                  <p>আমাকে দেওয়া রেটিং</p>
                  <StarsRatings
                    v-model="demand.demand_rating.ratings"
                    :star-size="12"
                    :show-rating="false"
                    :increment="0.5"
                    :ssr="false"
                    read-only
                  />
                </div>
                <!-- end rating -->
              </div>
              <div class="demand-profile-list-message-btn">
                <ul>
                  <li v-b-tooltip.hover title="ইডিট">
                    <a @click.prevent="demandEdit(demand)" class="bg-purple">
                      <i class="fas fa-edit color-white"></i>
                    </a>
                    <!-- <NuxtLink
                    :to="
                      '/dashboard/update-demand/' +
                      demand.id +
                      '/' +
                      demand.slug
                    "
                    class="bg-purple"
                  >
                    <i class="fas fa-edit color-white"></i>
                  </NuxtLink> -->
                    <span>ইডিট</span>
                  </li>
                  <li v-b-tooltip.hover title="ম্যানেজ">
                    <NuxtLink
                      :to="'/demand/' + demand.id + '/' + demand.slug"
                      class="bg-purple"
                    >
                      <i class="fas fa-trophy color-white"></i>
                    </NuxtLink>
                    <span>ম্যানেজ</span>
                  </li>
                  <li v-b-tooltip.hover title="ডিলিট">
                    <a @click.prevent="demandToTrash(demand)" class="bg-purple">
                      <i class="fas fa-trash color-white"></i>
                    </a>
                    <span> ডিলিট </span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="demand-profile-list-content clearfix">
              <div v-if="demand.bid_status">
                <div class="p10">
                  <ShowDescription
                    v-if="demand.win_bid.proposal"
                    :description="demand.win_bid.proposal"
                    :strlength="70"
                  ></ShowDescription>
                  <p>
                    অফার এমাউন্টঃ
                    <span class="color-purple">
                      {{ demand.win_bid.offer_amount }}৳
                    </span>
                  </p>
                  <p>
                    সম্ভাব্য ডেলিভারি তারিখঃ
                    <span class="color-purple">
                      {{ demand.win_bid.delivery_date }}
                    </span>
                  </p>
                </div>

                <div class="p10">
                  <!-- winner profile start -->
                  <div class="winner-profile">
                    <div class="buyer-profile-short bg-gray-op-50 clearfix">
                      <div class="p20">
                        <NuxtLink
                          :to="`/user-profile/${demand.win_bid.user.id}?view_as=seller`"
                          title="View Profile"
                        >
                          <img
                            class="img-fluid rounded-circle author-img"
                            :src="demand.win_bid.user.avatar"
                            style="
                              float: left;
                              margin-right: 16px;
                              width: 60px;
                              height: 60px;
                            "
                            alt="User Avatar"
                          />
                        </NuxtLink>
                        <div class="content">
                          <NuxtLink
                            :to="`/user-profile/${demand.win_bid.user.id}?view_as=seller`"
                            title="View Profile"
                            class="name"
                          >
                            {{ demand.win_bid.user.name }}</NuxtLink
                          >
                          <p>
                            যোগাযোগঃ
                            <a :href="`tel:${demand.win_bid.user.mobile_no}`">
                              {{ demand.win_bid.user.mobile_no }}
                            </a>
                          </p>
                          <div
                            class="rating text-center"
                            v-if="demand.win_bid.bid_rating"
                          >
                            <StarsRatings
                              v-model="demand.win_bid.bid_rating.ratings"
                              :star-size="12"
                              :show-rating="false"
                              :increment="0.5"
                              :ssr="false"
                              read-only
                            />
                            <p v-if="demand.win_bid.done_at">
                              <i class="far fa-clock"></i>
                              {{ demand.win_bid.done_at }}
                            </p>
                          </div>
                          <div v-else>
                            <button
                              @click="markAsDone(demand.win_bid)"
                              class="button button-sm color-yellow bg-yellow-op-20 mt-2"
                            >
                              কাজ শেষ নিশ্চিত করুন
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="demand-not p10" v-else>
                <h3>
                  টোটাল {{ replaceNumbersE2B(demand.total_bid) }} বিড এর মধ্যে
                  আপনি এখনো কোন বিড কনফার্ম করেননি বিড কনফার্ম করার জন্যে
                  ম্যানেজ বাটনে ক্লিক করুন
                </h3>
              </div>
            </div>
          </div>
          <!-- END demand -->
        </div>
      </b-row>

      <b-row v-if="!$fetchState.pending && demandList.data.length <= 0">
        <NotFound>
          <template v-slot:head-title>
            আপনি এখনো কোন ডিমান্ড করেন নি !
          </template>
          <template v-slot:subhead-title>
            আপনার প্রয়োজনিয় জিনিস খুজে পেতে এখনি ডিমান্ড করুন বাটনে ক্লিক করুন
          </template>
          <template v-slot:button>
            <NuxtLink
              to="/post-demand"
              class="btn button-small primary-button bid-button mt-15"
            >
              <span>ডিমান্ড করুন</span>
            </NuxtLink>
          </template>
        </NotFound>
      </b-row>

      <MyBidSkelton v-if="$fetchState.pending"></MyBidSkelton>
      <div
        class="row"
        v-if="demandList.meta && demandList.meta.last_page != current_page"
      >
        <div class="col-12 text-center mb-3">
          <button
            @click.prevent="onLoadMore()"
            class="btn button-small primary-button bid-button"
          >
            <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
            <span v-else>আরো লোড করুন</span>
          </button>
        </div>
      </div>

    </b-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      dynamicClass: [
        "ColorGradient1",
        "ColorGradient2",
        "ColorGradient3",
        "ColorGradient4",
        "ColorGradient5",
        "ColorGradient6",
        "ColorGradient7",
        "ColorGradient8",
        "ColorGradient9",
        "ColorGradient10",
        "ColorGradient11",
        "ColorGradient12",
        "ColorGradient12",
        "ColorGradient14",
        "ColorGradient15",
        "ColorGradient16",
        "ColorGradient17",
        "ColorGradient18",
      ],
      demandList: [],
      current_page: 1,
      is_confirmed: "",
      is_done: "",
      demander: null,
    };
  },
  created() {
    this.$nuxt.$on("bid-done", () => {
      this.current_page = 1;
      this.$fetch();
    });
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/my-demands?page=" +
        this.current_page +
        "&is_shortlisted=" +
        this.is_shortlisted +
        "&is_confirmed=" +
        this.is_confirmed +
        "&is_done=" +
        this.is_done
    );
    this.setDemands(response);
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  methods: {
    markAsDone(bid) {
      this.$store.commit("bid/setConfirmBid", bid);
      this.$store.commit("bid/setBidRatingStatus", "panel");
      this.$bvModal.show("bidDoneModal");
    },

    setDemands(demands) {
      console.log(demands)
      if (demands.meta) {
        if (demands.meta.current_page != 1) {
          if (demands.data.length > 0) {
            demands.data.forEach((bid) => {
              this.demandList.data.push(bid);
            });
          }
        } else {
          this.demandList = demands;
        }
      }
    },

    demandEdit(demand) {
      var message = "";
      if (demand.total_bid > 0) {
        message = {
          status: "error",
          message: "এই ডিমান্ড ইডিট করা সম্ভব নয় !",
        };
        this.modalMessage(message);
        return;
      } else {
        this.$router.push(
          "/dashboard/update-demand/" + demand.id + "/" + demand.slug
        );
      }
    },

    onLoadMore() {
      this.current_page += 1;
    },

    demandToTrash(demand) {
      var message = "";
      if (demand.total_bid > 0) {
        message = {
          status: "error",
          message: "এই ডিমান্ড ডিলেট করা সম্ভব নয় !",
        };
        this.modalMessage(message);
        return;
      }

      Swal.fire(
        {
          title: "Are you sure ?",
          text: "The Data will be removed!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        },
        () => {}
      ).then((result) => {
        if (result.value) {
          this.$axios
            .$delete("demand/" + demand.id + "/destroy")
            .then((response) => {
              this.$fetch();
              this.toastMessage(res.data);
            });
        }
      });
    },
  },
  head() {
    return {
      title: "বিডো । আমার ডিমান্ডসমুহ",
    };
  },
};
</script>