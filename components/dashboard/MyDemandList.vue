<template>
  <div>

      <b-row class="mb-30 mb-xs-0 mt-30-xs d-md-none d-lg-none">
        <div class="col-md-12">
           <div class="text-center-xs">
             <h4>আমার পোস্ট</h4>
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
            :date-disabled-fn="dateDisabled"
          >
          </b-datepicker>
        </div>
      <div class="col-md-3">
          <b-datepicker
            class="form-control"
            locale="en"
            :hide-header="true"
            v-model="end_date"
            placeholder="শেষের  তারিখ "
            @input="getDemand()"
           style="opacity: 1; max-height: 40px !important;"
            :date-disabled-fn="dateDisabled"
          >
          </b-datepicker>
        </div>
    </b-row>

    <b-row>
      <div
        class="col-md-4 MyDemand-PostList"
        v-for="demand in demandList.data"
        :key="'demand' + demand.id"
      >
        <div class="my-demand-post-list bg-blue-gray mb-30 mb-xs-0 mt-30-xs bg-shadow-card">
          <div class="demand-post-list p15">
            <div class="img float-l mr-15">
              <img
                :src="
                  demand.image_one_small
                    ? demand.image_one_small
                    : demand.default_mid_image
                "
                alt="author"
                class="img-fluid"
                width="50"
              />
            </div>
            <div class="content">
              <h6>
                <NuxtLink
                  :to="'/demand/' + demand.id + '/' + demand.slug"
                  >{{ demand.title }}</NuxtLink
                >
              </h6>
              <p v-if="demand.budget_type" >
                <span>বাজেট: </span
                >{{ replaceNumbersE2B(demand.minimum_budget) }} -
                {{ replaceNumbersE2B(demand.maximum_budget) }} ৳
              </p>
              <p v-else ><span >বাজেট: </span> নেগোশিয়েবল</p>
              <!-- <p class="date">
                <span>ডেডলাইন:</span> {{ demand.expire_date_text }}
              </p> -->
              <div class="date " v-if="demand.demand_rating">
                <p class="date mt-10">
                  <span class="float-l mr-10 mt-5" style="line-height: 1.1;"> আমাকে দেওয়া  রেটিং: </span>
                  <StarsRatings
                    v-model="demand.demand_rating.ratings"
                    :star-size="12"
                    :show-rating="false"
                    :increment="0.5"
                    :ssr="false"
                    read-only
                   style="margin-top:-10px;"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="my-demand-post-btn p10 pl-10 pr-10 bg-blue-op-20">
            <div class="my-demand-post-status">
              <span
                v-if="demand.is_done"
                class="color-white post-status bg-green"
                >কমপ্লিট </span
              >
              <span v-else class="color-white post-status bg-gray2-op-30"
                >চলছে</span
              >
            </div>
             <div
              class="my-demand-post-manage-btn">
            <a v-if="demand.win_bid && !demand.win_bid.bid_rating" 
                href="javascript:void(0)"
                class="bg-yellow color-white edit-delete-manage  float-r mr-5" 
                @click.prevent="markAsDone(demand.win_bid)">রেটিং <i class="fas fa-star fa-xs pr-5"></i> </a>
             </div>
           
            <div
              class="my-demand-post-manage-btn"
              v-if="demand.bid_status == false"
            >
              <a
                v-if="demand.total_bid < 1"
                class="bg-gray color-blue edit-delete-manage"
                href="javascript:void(0)"
                @click.prevent="demandEdit(demand)"
                >এডিট <i class="fas fa-edit"></i>
              </a>
              <a
                v-if="demand.total_bid < 1"
                @click.prevent="demandToTrash(demand)"
                class="bg-gray color-red edit-delete-manage"
                style="cursor: pointer;"
              >
                ডিলিট <i class="fas fa-trash"></i>
              </a>
              <!-- <span class="bg-gray color-dark"  v-b-tooltip.hover title="ম্যানেজ"><i class="fas fa-list"></i></span> -->
              <span class="" v-if="!demand.win_bid">
                <NuxtLink
                  :to="'/demand/' + demand.id + '/' + demand.slug"
                  class="bg-gray color-dark edit-delete-manage"
                >
                  ম্যানেজ <i class="fas fa-list"></i>
                  <span v-if=" demand.total_bid > 0" class="badge-number bg-red color-white edit-delete-manage">{{
                    demand.total_bid
                  }}</span>
                </NuxtLink>
              </span>
            </div>
            <div class="my-demand-post-manage-btn" v-else>
              
              <button
                @click="showWinner(demand)"
                class="bg-purple color-white button-0 edit-delete-manage"
                > বিজয়ী  <i class="fas fa-trophy"></i>
              </button>

            </div>
          </div>
        </div>
      </div>
    </b-row>

    <b-row v-if="!$fetchState.pending && demandList.data.length <= 0">
    <!-- <b-row v-if="!$fetchState.pending"> -->

        <div style="width:80%; margin:0 auto;" class="text-center mt-30">
                  <b-alert show dismissible>
                    পোস্ট করার পদ্ধতি জানতে
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
          <template v-slot:button>
                
                <NuxtLink
                  to="new-post?type=demand"
                  class="btn button-small gradient-purple-secondary bid-button mt-15"
                >
                  <span>ডিমান্ড করুন</span>
                </NuxtLink>
        </template>


        <template v-slot:head-title> আপনি এখনো কোন ডিমান্ড করেননি </template>
        <template v-slot:subhead-title>
          আপনার প্রয়োজনীয় জিনিস খুজে পেতে এখনি ডিমান্ড বাটনে ক্লিক করুন
        </template>

      </NotFound>
    </b-row>

    <MyBidSkelton v-if="$fetchState.pending"></MyBidSkelton>
    <div
      class="row"
      v-if="demandList.meta && demandList.meta.last_page != current_page"
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
    <BidDoneModal></BidDoneModal>

    <BidWinModal></BidWinModal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      demandList: [],
      current_page: 1,
      is_confirmed: "",
      is_done: "",
      demander: null,
      from_date: '',
      end_date: ''
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
        this.is_done +
        "&from_date=" +
        this.from_date +
        "&end_date=" +
        this.end_date
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
    dateDisabled(ymd, date) {
      return ymd > this.ymdDate();
    },
    showWinner(demand) {
      // console.log(demand)
      this.$store.commit("demand/setDemandwinuser", demand);
      this.$bvModal.show("bidWinModal");
    },

    setDemands(demands) {
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

    getDemand(){
      if(this.from_date != ''){
          this.$fetch();
      } else {
        alert('select start date')
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
          this.$axios
            .$delete("demand/" + demand.id + "/destroy")
            .then((response) => {
              this.$fetch();
              this.toastMessage(response.data);
            });
        }
      });
    },
  },
};
</script>

<style >
.my-rating {
  display: initial !important;
}
 .postFilter .b-form-btn-label-control.form-control > .btn {
  font-size: 10px !important;
}
 .postFilter .form-control  label {
  line-height: 29px !important;
}
</style>