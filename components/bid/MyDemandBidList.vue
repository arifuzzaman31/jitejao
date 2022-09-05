<template>
  <div class="div">
       <b-row class="mb-30 mb-xs-0 mt-30-xs d-md-none d-lg-none">
        <div class="col-md-12 ">
           <div class="text-center-xs">
             <h4>আমার বিড</h4>
           </div>
        </div>
      </b-row>
    <b-row class="mb-30 mb-xs-0 mt-30-xs postFilter">
      <div class="col-md-3 offset-md-3">
         <div class="text-right text-left-xs">
         <span  style="line-height: 3;">ফিল্টার করুন </span>
         </div>
      </div>
      <div class="col-md-3">
          <b-datepicker
            class="form-control mb-xs-15"
            locale="en"
            :hide-header="true"
            v-model="from_date"
            placeholder="শুরুর  তারিখ"
             style="opacity: 1; max-height: 40px !important;"
            :date-disabled-fn="dateDisabledRange"
          >
          </b-datepicker>
        </div>
      <div class="col-md-3">
          <b-datepicker
            class="form-control"
            locale="en"
            :hide-header="true"
            v-model="end_date"
            placeholder="শেষের তারিখ "
            @input="getBid()"
             style="opacity: 1; max-height: 40px !important;"
            :date-disabled-fn="dateDisabledRange"
          >
          </b-datepicker>
        </div>
    </b-row>
    <b-row>
      <div class="col-md-4 MyDemandBid-PostList" v-for="bid in bidList.data" :key="'m-bid' + bid.id">
        <div class="my-demand-post-list bg-blue-gray mb-30 mb-xs-0 mt-30-xs bg-shadow-card">
          <div  class="demand-post-list p15 border-0">
            <div class="img float-l mr-15">
              <img
                :src="
                  bid.demand.image_one_small
                    ? bid.demand.image_one_small
                    : bid.demand.default_mid_image
                  "
                alt="author"
                class="img-fluid"
                width="50"
                
              />
            </div>
            <div class="content">
              <h6>
                <NuxtLink
                  :to="'/demand/' + bid.demand.id + '/' + bid.demand.slug"
                >
                 
                    {{ bid.demand.title }}
                 
                </NuxtLink>
              </h6>
              <p v-if="bid.demand.budget_type" >
                <span >বাজেট: </span
                >{{ replaceNumbersE2B(bid.demand.minimum_budget) }} -
                {{ replaceNumbersE2B(bid.demand.maximum_budget) }} ৳
              </p>
              <p v-else ><span>বাজেট: </span>নেগেশিয়েবল</p>
              <!-- <p class="date">
                <span>ডেডলাইন:</span> {{ bid.demand.expire_date_text }}
              </p> -->
              <div class="date " v-if="bid.bid_rating != null">
                <p class="date">
                  <span class="float-l mr-10"> আমাকে দেওয়া রেটিং: </span>
                  <StarsRatings
                    v-model="bid.bid_rating.ratings"
                    :star-size="12"
                    :show-rating="false"
                    :increment="0.5"
                    :ssr="false"
                    read-only
                   style="margin-top:-2px;"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="my-demand-post-btn p10 pl-10 pr-10 bg-blue-op-10 br-0">
            <div class="my-demand-post-bid w-100">
              <!-- <span class="fw-600">আমার বিড:</span> -->
              <span >আমার অফার: <b class="">{{ replaceNumbersE2B(bid.offer_amount) }}৳</b></span>
              <!-- <span>ডেলিভারির: {{ bid.delivery_date_text }}</span> -->
              <!-- <span class="bg-blue-op-20 color-blue btn-my-bid">Details</span> -->
              <button class="bg-gray2-op-20  btn-my-bid border-0 float-r" @click.prevent="Detail(bid)">ডিটেইলস </button>
              <button v-if="bid.is_buyer_reviewed && bid.bid_rating && bid.demand && !bid.demand.demand_rating" 
                class="bg-yellow color-white btn-my-bid border-0 float-r mr-5" 
                @click.prevent="ReviewToBuyer(bid)">রেটিং </button>
            </div>
          </div>
          <div class="my-demand-post-btn p10 pl-10 pr-10  bg-blue-op-20">
            <div class="my-demand-post-status">
              <!-- <span class=" bg-green-op-10 color-green post-status">Progress</span> -->
              <span class="post-status color-white bg-green" v-if="bid.demand.bid_status && !bid.is_confirmed"
                >কমপ্লিট</span>
              <span v-else class="post-status color-white" :class="bid.state_of_bid"
                >{{ makebidState(bid.state_of_bid) }}</span>
            </div>
            <div class="my-demand-post-manage-btn">
              <a 
                 href="javascript:void(0)"              
                v-if="!bid.is_confirmed && !bid.is_shortlisted"
                @click="EditBid(bid)"
                class="bg-gray color-blue edit-delete-manage border-0"
              >
               এডিট <i class="fas fa-edit"></i> 
              </a>
              <a 
               href="javascript:void(0)"
                v-if="!bid.is_confirmed && !bid.is_shortlisted"
                class="bg-gray color-red edit-delete-manage border-0"
                @click.prevent="bidToTrash(bid.id)"
              >
               ডিলিট  <i class="fas fa-trash-alt "></i> 
              </a>
              <a
               href="javascript:void(0)"
                v-if="bid.is_confirmed || bid.is_shortlisted"
                class="bg-gray color-green edit-delete-manage border-0"
                @click.prevent="getContact(bid)"
              >
                যোগাযোগ <i class="fas fa-phone"></i>
              </a>
              <a 
               href="javascript:void(0)"
                v-if="bid.is_confirmed"
                class="bg-purple color-white edit-delete-manage border-0"
                @click.prevent="winDemand(bid)"
              >
                বিজয়ী <i class="fas fa-trophy"></i>
              </a>
              <!-- <span v-if="!bid.is_confirmed" class="bg-gray color-dark"  v-b-tooltip.hover title="এডিট "><i class="fas fa-edit"></i></span> -->
              <!-- <span v-if="!bid.is_confirmed" class="bg-gray color-dark"  v-b-tooltip.hover title="ডিলিট"><i class="fas fa-trash"></i></span> -->
              <!-- <span class="bg-gray color-dark"  v-b-tooltip.hover title="ম্যানেজ"><i class="fas fa-list"></i></span> -->
              <!-- <span v-if="bid.is_shortlisted" class="bg-gray color-dark" v-b-tooltip.hover title="আপনি শর্টলিস্টেড হয়েছেন । সেলারের সাথে যোগাযোগ করুন"><i class="fas fa-phone"></i></span> -->
              <!-- <span v-if="bid.is_confirmed" class="bg-purple color-white" v-b-tooltip.hover title="আপনি এই বিডটি উইন করেছেন" v-b-modal.modal-center1><i class="fas fa-trophy"></i></span> -->
            </div>
          </div>
        </div>
      </div>
      <!-- end -->
    </b-row>

    <b-row v-if="!$fetchState.pending && bidList.data.length <= 0">
    <!-- <b-row v-if="!$fetchState.pending"> -->
        <div style="width:80%; margin:0 auto;" class="text-center mt-30">
          <b-alert show dismissible>
            বিড করার পদ্ধতি জানতে
              <b><i class="fas fa-long-arrow-alt-right ml-20 mr-20"></i></b>
              <NuxtLink
                    to="#"
                    class="color-red "
                    style="line-height: 1.1;font-weight: bold;"
                  >ক্লিক করুন 
              </NuxtLink>
          </b-alert>
        </div>
      <NotFound>
        <template v-slot:head-title> আপনি এখনো কোন বিড করেননি </template>
        <template v-slot:subhead-title>
          বিড করার জন্যে ডিমান্ড বাটন এ ক্লিক করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/post"
            class="btn button-small gradient-purple-secondary bid-button mt-15"
          >
            <span>সকল ডিমান্ড দেখুন </span>
          </NuxtLink>
        </template>
      </NotFound>
    </b-row>

    <MyBidSkelton v-if="$fetchState.pending"></MyBidSkelton>

    <div
      class="row"
      v-if="bidList.meta && bidList.meta.last_page != current_page"
    >
      <div class="col-12 text-center mt-30">
        <button
          @click.prevent="onLoadMore()"
          class="btn button-small primary-button bid-button"
        >
          <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
          <span v-else>আরো লোড করুন</span>
        </button>
      </div>
    </div>

    <b-row>
      <b-modal
        id="contactModal"
        centered
        title="বায়ারের সাথে যোগাযোগ করুন"
        hide-footer
      >
        <b-row v-if="demander">
          <div class="col-md-12 text-center p20">
            <div class="contact-image">
              <UserAuthor :user="demander" :badge="demander.buyer_badge" />
            </div>
            <div class="user-rating" style="text-align: center !important">
              <StarsRatings
                v-model="demander.average_buying_rating"
                :star-size="12"
                :ssr="false"
                :increment="0.2"
                :show-rating="false"
                read-only
              />
            </div>
            <div class="contact-name mt-20">

        <div class=" col-md-12">
          <div class="bg-blue-gray p10 mb-15">

              <h6><i class="fas fa-phone-alt fa-xs"></i> মোবাইল নম্বর </h6>

               <a :href="`tel:${demander.mobile_no}`"
                ><p class="color-green fw-600 br-50 pl-10 pr-10">
                  {{ demander.mobile_no }}</p>
               </a>
          </div>
        </div>  

              <a v-if="demander.email" :href="`mailto:${demander.email}`">
                 <div class=" col-md-12">
                    <div class="bg-blue-gray p10 mb-15">
                 <h6> <i class="fas fa-envelope"></i> ইমেইল</h6>
                  <p
                  class="color-green fw-600 br-50 pl-10 pr-10">
                 {{ demander.email }}</p>
                        </div>
                  </div>
                 </a>

            </div>
          </div>
        </b-row>
      </b-modal>
    </b-row>
    <ReviewToBuyer></ReviewToBuyer>
    <b-row>
      <b-modal id="EditBidModal" top title="ইডিট করুন" hide-footer>
        <b-row>
          <div class="col-md-12">
            <form action="" @submit.prevent="bidUpdate()" class="mt-15">
              <div class="error" v-if="validation_errors">
                <ul>
                  <li
                    class="text-danger"
                    v-for="error in validation_errors"
                    :key="error[0]"
                  >
                    {{ error[0] }}
                  </li>
                </ul>
              </div>
              <div class="form-group">
                <label class="font-600 mb-5" for=""
                  >আপনার অফার এমাউন্ট উল্লেখ করুন *</label
                >
                <input
                  type="text"
                  placeholder="অফার এমাউন্ট"
                  name=""
                  v-model="bid_update.offer_amount"
                  class="form-control input-form"
                />
              </div>
              <div class="form-group">
                <label class="font-600 mb-5" for=""
                  > সম্ভাব্য ডেলিভারি তারিখ
                </label>
                <b-datepicker
                  class="form-control"
                  locale="en"
                  :hide-header="true"
                  v-model="bid_update.delivery_date"
                  placeholder="ডেট সিলেক্ট করুন "
                  style="line-height: 40px; opacity: 1"
                  :date-disabled-fn="dateDisabled"
                >
                </b-datepicker>
              </div>
              <div class="form-group">
                <label class="font-600 mb-5" for=""
                  >বিড সংক্রান্ত নোট/(বর্ণনা) লিখুন *
                </label>
                <textarea
                  class="form-control"
                  placeholder="বিড সংক্রান্ত নোট লিখুন"
                  v-model="bid_update.proposal"
                ></textarea>
              </div>
              <div class="form-group text-right">
                <button
                  type="submit"
                  class="btn button-small primary-button bid-button w-50"
                >
                  <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                  <span v-else> আপডেট করুন</span>
                </button>
              </div>
            </form>
          </div>
        </b-row>
      </b-modal>
    </b-row>

    <div>
      <b-modal id="winBidModal" centered title="আপনি এই বিডটি বিজয়ী হয়েছেন" hide-footer>
        <b-row>
          <div class="col-md-12" v-if="win_bid">
            <div class="nilam-title w-100 ">
              <div class="nilam-winner w-100 bg-white p20 clearfix">
                <div class="winner-name text-center">
                  <div class="content mt-10 clearfix">

                     <div class="m-auto">

                      <div class=" col-md-12">
                        <div class="text-center">
                                <img
                                    src="~/assets/images/badge/winner.svg"
                                    class="img-fluid img-badge mb-30"
                                    width="150"
                                    alt="badge"
                                  />
                                  <h2 class="mb-10 fw-600 color-purple">অভিনন্দন</h2>
                                  <h5>আপনি এই বিডটি বিজয়ী হয়েছেন</h5>
                        </div>
                       </div>

                  </div>
                  </div>
                  <!-- <div class="demand-rating">
                       <h4 class="fw-600 mt-10"> আমার রেটিং</h4>
                      st
                  </div> -->
                  <div>
                    <div v-if="win_bid.demand && win_bid.demand.demand_rating">
                    <h6 class="fw-600 mt-20">বায়ার রেটিং</h6>
                      <StarsRatings
                        v-model="win_bid.demand.demand_rating.ratings"
                        :star-size="12"
                        :show-rating="false"
                        :increment="0.5"
                        :ssr="false"
                        read-only
                      />
                    </div>
                    <!-- <div v-else>
                      <button
                        v-if="
                          win_bid.is_done_from_buyer &&
                          !win_bid.is_done_from_seller
                        "
                        class="
                          button button-sm
                          color-yellow
                          bg-yellow-op-20
                          mt-2
                        "
                        @click="ReviewToBuyer(win_bid)"
                      >
                        বায়ারকে কে রিভিউ দিন
                      </button>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-row>
      </b-modal>
      <b-modal id="BidDetails" centered title="বিড ডিটেইলস" hide-footer size="lg">
        <b-row>
          <div class="col-md-12" v-if="details">
            <div
              class="nilam-title w-100" >

              <div class="nilam-winner w-100 bg-white p20 clearfix">
                  <div class="winner-name text-center">
                    <div class="">
                      <img v-if="details.bid_image_big"
                        class="img-fluid author-img winner-img text-center" 
                        :src="details.bid_image_big"
                      />
                    </div>
                    <div class="content mt-30">
                        <h6 class="fw-600 mb-10 color-purple"> বিড ডিটেইলস </h6>
                        <div class="m-auto">

                          <div class=" col-md-6">
                             <div class="bg-blue-gray p10 mb-15">
                           <h6 class="">আমার অফার </h6> 
                           <p>{{ replaceNumbersE2B(Number(details.offer_amount)) }} ৳</p>
                          </div>
                           </div>

                           <div class=" col-md-6">
                              <div class="bg-blue-gray p10 mb-15">
                              <h6 class="">সম্ভাব্য ডেলিভারির তারিখ</h6> 
                             <p> {{ details.delivery_date_text }}</p>
                          </div>
                           </div>

                          <div class=" col-md-12" v-if="details.proposal">
                             <div class="bg-blue-gray p10 mb-15">
                          <h6 class="">বিস্তারিত </h6>
                          <p><ShowDescription :description="details.proposal" :strlength="200" /></p>
                          </div>
                           </div>

                        </div>
                    </div>
                    <div class="">
                      <div v-if="details.demand && details.demand.demand_rating">
                      <h6 class="fw-600 mt-10">বায়ার রেটিং</h6>
                        <StarsRatings
                          v-model="details.demand.demand_rating.ratings"
                          :star-size="12"
                          :show-rating="false"
                          :increment="0.5"
                          :ssr="false"
                          read-only
                        />
                      </div>
                      <!-- <div v-else>
                        <button
                          v-if="
                            details.is_done_from_buyer &&
                            !details.is_done_from_seller
                          "
                          class="
                            button button-sm
                            color-yellow
                            bg-yellow-op-20
                            mt-2
                          "
                          @click="ReviewToBuyer(details)"
                        >
                          বায়ারকে কে রিভিউ দিন
                        </button>
                      </div> -->
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
        </b-row>
    </b-modal>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      bidList: [],
      current_page: 1,
      is_shortlisted: "",
      is_confirmed: "",
      is_done: "",
      demander: null,
      from_date: '',
      end_date: '',
      formSubmiting: false,
      validation_errors: {},
      win_bid: {},
      details: {},
      bid_update: {
        id: "",
        proposal: "",
        delivery_date: "",
        offer_amount: "",
      },
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/my-bids?page=" +
        this.current_page +
        "&is_shortlisted=" +
        this.is_shortlisted +
        "&is_confirmed=" +
        this.is_confirmed +
        "&is_done=" +
        this.is_done +
        "&from_date=" +
        this.from_date +
        "&end_date=" +
        this.end_date
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

    dateDisabledRange(ymd, date) {
      // return false
      return ymd > this.ymdDate();
    },

    getBid(){
      if(this.from_date != ''){
          this.$fetch();
      } else {
        alert('select start date')
      }
    },
    getContact(bid) {
      this.demander = bid.demand.user;
      this.$bvModal.show("contactModal");
    },

    makebidState(bid_status){
      var state_name = 'পেন্ডিং';
      switch(bid_status){
        case 'done':
          state_name = 'কমপ্লিট';
          break;
        case 'confirmed':
          state_name = 'কমপ্লিট';
          break;
        case 'shortlisted':
          state_name = 'শর্টলিস্ট';
          break;
        case 'completed':
          state_name = 'কমপ্লিট';
          break;
        default: 
          state_name = 'পেন্ডিং';
      }
      return state_name;
    },

    ReviewToBuyer(bid) {
      this.$store.commit("bid/setSellerReviewBid", bid);
      this.$bvModal.hide("winBidModal");
      this.$bvModal.show("sellerReviewModal");
    },

    winDemand(bid) {
      this.win_bid = bid;
      this.$bvModal.show("winBidModal");
    },

    Detail(bid) {
      this.details = {};
      this.details = bid;
      this.$bvModal.show("BidDetails");
    },

    EditBid(bid) {
      this.bid_update.id = bid.id;
      this.bid_update.proposal = bid.proposal;
      this.bid_update.delivery_date = bid.delivery_date;
      this.bid_update.offer_amount = bid.offer_amount;

      this.$bvModal.show("EditBidModal");
    },

    bidUpdate() {
      this.formSubmiting = true;
      this.$nuxt.$loading.start();
      this.$axios
        .$post("/update/bid", this.bid_update)
        .then((response) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (response.status == "success") {
            this.clearField();
            this.toastMessage(response);
            this.$bvModal.hide("EditBidModal");
            $nuxt.$emit("buyer-review-done");
          }
        })
        .catch((error) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },

    dateDisabled(ymd, date) {
      return ymd < this.ymdDate();
    },

    bidToTrash(id) {
      Swal.fire(
        {
          title: "আপনি কি নিশ্চিত ?",
          text: "ভবিষ্যতে এই তথ্য ফিরে পাবেন না!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
           cancelButtonText: "না!",
          confirmButtonText: "হ্যাঁ, ডিলেট করুন!",
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

<style>
/* body {
  background-color: #f2f3f9;
} */
.done .confirmed .completed{
  background-color:rgb(76, 175, 80);
}

.completed{
  background-color:rgb(76, 175, 80);
}

.confirmed {
  background-color:rgb(76, 175, 80);
}

.shortlisted {
  background-color:rgba(0, 98, 255, 0.80);
}

.abroad {
  background-color:rgba(37,44,83,.35);
}
.pending {
  background-color:rgba(37,44,83,.35);
}

.bidder-name span {
  color: #252c53 !important;
}
 .postFilter .b-form-btn-label-control.form-control > .btn {
  font-size: 10px !important;
}
 .postFilter .form-control  label {
  line-height: 29px !important;
}
</style>