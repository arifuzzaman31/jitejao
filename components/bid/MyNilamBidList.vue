<template>
  <div class="div">
    <!--  class gradient color set  -->
    <b-row>
      <div class="card-columns">
        <div class="card" v-for="bid in bidList.data" :key="'m-bid' + bid.id">
          <div class="bider-profile-list bider-list clearfix">
            <div class="display-table w-100">
              <div
                class="display-table-cell img"
                :class="dynamicClass[Math.floor(Math.random() * 5)]"
              >
                <img
                  class="img-fluid"
                  :src="
                    bid.nilam.image_one_big
                      ? bid.nilam.image_one_big
                      : bid.nilam.default_mid_image
                  "
                  alt="post image"
                />
              </div>
            </div>
            <div class="bider-buyer-profile-list p10">
              <NuxtLink :to="'/nilam/' + bid.nilam.id + '/' + bid.nilam.slug">
                <h2 class="title">
                  {{ bid.nilam.title }}
                </h2>
              </NuxtLink>
              <p class="color-black">
                বেস প্রাইসঃ {{ replaceNumbersE2B(bid.nilam.base_price) }}
              </p>
              <span
                >ডেডলাইনঃ
                {{ replaceNumbersE2B(bid.nilam.will_expired_in) }}</span
              >

              <h3
                class="
                  bider-profile-list-author-name
                  bg-gray-op-20
                  color-white
                  mt-0
                "
              >
                পোস্ট করেছেনঃ
                <!-- <NuxtLink :to="`/user-profile/${bid.nilam.user.id}?view_as=seller`" -->
                <NuxtLink to="" style="cursor: inherit;" 
                  class="color-black"
                >
                  {{ bid.nilam.user.name }}</NuxtLink
                >
              </h3>
            </div>
            <!-- end biding content -->
            <div class="bider-message-btn">
              <ul>
                <li
                  v-b-tooltip.hover
                  :title="
                    bid.nilam.win_bid.bider_id == bid.bider_id
                      ? 'আপনি সর্বোচ্চ বিডকারী'
                      : 'বিজয়ী করতে আরো বাড়িয়ে বিড করুন'
                  "
                >
                  <NuxtLink
                    :to="'/nilam/' + bid.nilam.id + '/' + bid.nilam.slug"
                    :class="
                      bid.nilam.win_bid.bider_id == bid.bider_id
                        ? 'bg-purple'
                        : ''
                    "
                    ><i class="fas fa-trophy"></i>
                  </NuxtLink>
                  <span
                    class="status-title"
                    v-if="bid.nilam.win_bid.bider_id == bid.bider_id"
                  >
                    <b v-if="bid.nilam.is_expired">আপনি জিতেছেন</b>
                    <b v-else>আপনি সর্বোচ্চ</b>
                  </span>
                  <span class="status-title" v-else> আবার বিড করুন </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="bider-content clearfix">
            <div class="p10">
              <p>
                <span class="text-secondary" v-if="bid.nilam.is_expired">আমার বিজয়ী প্রাইসঃ</span>
                <span class="text-secondary" v-else>আমার বিড প্রাইসঃ</span>
                <span class="color-purple">
                  <b>{{ replaceNumbersE2B(bid.bid_price) }} ৳</b>
                </span>
              </p>
              <p v-if="bid.delivery_charge > 0">
                টোটাল প্রাইসঃ
                <span class="color-purple">
                  <b>{{ replaceNumbersE2B(bid.total_price) }} ৳</b><small> ( ডেলিভারি চার্জঃ  {{ replaceNumbersE2B(bid.delivery_charge) }} ৳)</small>
                </span>
              </p>
              <p v-if="bid.nilam.delivery_address">
                ডেলিভারি স্টাটাসঃ
                <span class="color-purple">
                  <b>{{ bid.nilam.delivery_status_text }} </b></span
                >
              </p>
            </div>
          </div>
          <div class="p10" v-if="bid.nilam.delivery_address">
            <p>
              ডেলিভারি ঠিকানাঃ
              <span class="color-black">
                {{ bid.nilam.delivery_address }}
              </span>
            </p>
          </div>
          <div class="bider-rating clearfix mb-15 p10" v-else>
            <!-- <div class="content p10">
              <h4 class="name"></h4>
            </div> -->
            <div
              class="bider-cate-btn"
              v-if="
                bid.nilam.is_expired &&
                bid.nilam.win_bid.bider_id == bid.bider_id
              "
            >
              <h3>ডেলিভারির ঠিকানা দিন</h3>
              <button
                @click="updateAddress(bid.nilam_id)"
                v-b-modal="'addressAddModal'"
                class="button button-sm color-black color-green bg-green-op-10"
              >
                <i class="far fa-edit"></i> ডেলিভারি ঠিকানা দিন
              </button>
            </div>
          </div>
        </div>
        <!-- END biding -->
      </div>
    </b-row>

    <b-row v-if="!$fetchState.pending && bidList.data.length <= 0">
      <NotFound>
        <template v-slot:head-title> আপনি এখনো কোন নিলামে বিড করেননি </template>
        <template v-slot:subhead-title>
          বিড করার জন্যে নিলাম বাটন এ ক্লিক করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/post?find=nilam"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>সকল নিলাম দেখুন </span>
          </NuxtLink>
        </template>
      </NotFound>
    </b-row>

    <MyBidSkelton v-if="$fetchState.pending"></MyBidSkelton>

    <div
      class="row"
      v-if="bidList.meta && bidList.meta.last_page != current_page"
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

    <b-modal id="addressAddModal" centered title="ঠিকানা লিখুন" hide-footer>
      <b-row>
        <div class="col-md-12">
          <form action="" @submit.prevent="updateDeliveryAddress()">
            <div class="form-group mt-15">
              <label class="font-600 mb-5" for=""
                >আপনার ঠিকানা উল্লেখ করুন *</label
              >
              <textarea
                type="text"
                placeholder="ঠিকানা লিখুন"
                name=""
                v-model="delivery_address.address"
                class="form-control input-form"
              ></textarea>
            </div>

            <div class="form-group text-right">
              <button
                type="submit"
                class="btn button-small primary-button bid-button"
              >
                <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                <span v-else>আপডেট করুন</span>
              </button>
            </div>
          </form>
        </div>
      </b-row>
    </b-modal>
  </div>
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
      bidList: [],
      current_page: 1,
      is_shortlisted: "",
      is_confirmed: "",
      is_done: "",
      demander: null,
      delivery_address: { id: "", address: "" },
      formSubmiting: false,
      validation_errors: {},
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/my-nilam-bid?page=" + this.current_page
    );

    this.setbidList(response);
  },
  created() {
    this.$nuxt.$on("buyer-review-done", () => {
      this.current_page = 1;
      this.$fetch();
    });
  },
  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },
  methods: {
    setbidList(bids) {
      if (bids.meta) {
        if (bids.meta.current_page != 1) {
          if (bids.data.length > 0) {
            bids.data.forEach((bid) => {
              this.bidList.data.push(bid);
            });
          }
        } else {
          this.bidList = bids;
        }
      }
    },

    onLoadMore() {
      this.current_page += 1;
    },

    updateAddress(id) {
      this.delivery_address.id = id;
      // this.$bvModal.show("addressAddModal");
    },

    updateDeliveryAddress() {
      this.$axios
        .$post("update/nilam/delivery/address", this.delivery_address)
        .then((response) => {
          this.toastMessage(response);
          this.$fetch();
          this.$bvModal.hide("addressAddModal");
        });
    },

    bidToTrash(id) {
      Swal.fire(
        {
          title: "Are you sure ?",
          text: "The Bid will be removed!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        },
        () => {}
      ).then((result) => {
        if (result.value) {
          this.$axios.delete("bid/" + id + "/destroy").then((response) => {
            this.toastMessage(response.data);
            $nuxt.$emit("buyer-review-done");
          });
        }
      });
    },

    clearField() {
      this.bid_form = {
        id: "",
        proposal: "",
        delivery_date: "",
        offer_amount: "",
      };
    },
  },
};
</script>