<template>
  <div>
    <b-row>
      <div class="card-columns">
        <div
          class="card"
          v-for="nilam in nilamList.data"
          :key="'nilam' + nilam.id"
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
                    nilam.image_one_big
                      ? nilam.image_one_big
                      : nilam.default_mid_image
                  "
                  alt="post image"
                />
              </div>
            </div>
            <div class="demand-buyer-profile-list p10">
              <NuxtLink :to="'/nilam/' + nilam.id + '/' + nilam.slug">
                <h2 class="title">
                  {{ nilam.title }}
                </h2>
              </NuxtLink>

              <p class="color-black">
                বেজ প্রাইসঃ {{ replaceNumbersE2B(nilam.base_price) }} - পয়েন্ট
              </p>
              <span>সময় বাকি আছেঃ {{ nilam.will_expired_in }}</span>
            </div>
            <div class="demand-profile-list-message-btn">
              <ul>
                <li v-b-tooltip.hover title="ম্যানেজ">
                  <NuxtLink
                    :to="'/nilam/' + nilam.id + '/' + nilam.slug"
                    class="bg-purple"
                  >
                    <i class="fas fa-tasks color-white"></i>
                  </NuxtLink>
                  <span>বিস্তারিত</span>
                </li>
                <li v-b-tooltip.hover title="ডিলিট" v-if="!nilam.win_bid">
                  <a @click.prevent="nilamToTrash(nilam)" class="bg-purple">
                    <i class="fas fa-trash color-white"></i>
                  </a>
                  <span> ডিলিট </span>
                </li>
              </ul>
            </div>
          </div>

          <div class="demand-profile-list-content clearfix">
            <div v-if="nilam.win_bid">
              <div class="p10">
                <!-- winner profile start -->
                <div class="winner-profile">
                  <div class="buyer-profile-short bg-gray-op-50 clearfix">
                    <div class="p20">
                      <NuxtLink
                        :to="`/user-profile/${nilam.win_bid.bid_user.id}?view_as=buyer`"
                        title="View Profile"
                      >
                        <img
                          class="img-fluid rounded-circle author-img"
                          :src="nilam.win_bid.bid_user.avatar"
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
                          :to="`/user-profile/${nilam.win_bid.bid_user.id}?view_as=seller`"
                          title="View Profile"
                          class="name"
                        >
                          {{ nilam.win_bid.bid_user.name }}</NuxtLink
                        >
                        <p>
                          যোগাযোগঃ
                          <a :href="`tel:${nilam.win_bid.bid_user.mobile_no}`">
                            {{ nilam.win_bid.bid_user.mobile_no }}
                          </a>
                        </p>
                        <div class="pt-5 display-in">
                          <p>
                            প্রাইসঃ
                            <span class="color-purple">
                             <b> {{ nilam.win_bid.bid_price }} পয়েন্ট</b>
                            </span>
                          </p>
                          <p>
                            ডেলিভারি স্টাটাসঃ
                            <span class="color-purple"> <b> {{ nilam.delivery_status_text }}</b> </span>
                          </p>
                          <div class="pt-5 rating">
                            <!-- <p>
                              <i class="far fa-clock"></i>
                              {{ nilam.win_bid.created_at }}
                            </p> -->
                            <button
                              class="button button-block color-yellow bg-yellow-op-20"
                              v-if="nilam.is_expired"
                            >
                              উইনার
                            </button>
                            <button
                              class="button button-sm color-green bg-green-op-20"
                              v-else
                            >
                              সর্বোচ্চ বিডার
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="demand-not p10" v-else>
              <div v-if="nilam.is_expired">
                <h3>কেউ বিড করেনি</h3>
                <button @click="updateExpireTime(nilam.id)" v-b-modal="'extendTimeModal'" 
                class="button button-sm color-green bg-green-op-20">বিড টাইম বাড়িয়ে দিন</button>
              </div>
              <div v-else>
                <h3>এখনো কোন বিড পাওয়া যায়নি</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- END nilam -->
      </div>
    </b-row>

    <b-row v-if="!$fetchState.pending && nilamList.data.length <= 0">
      <NotFound>
        <template v-slot:head-title>
          আপনি এখনো কোন নিলাম পোস্ট করেননি 
        </template>
        <template v-slot:subhead-title>
          যেকোনো জিনিস বিক্রি করতে এখুনি পোস্ট বাটনে ক্লিক করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/new-post?type=nilam"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>পোস্ট করুন</span>
          </NuxtLink>
        </template>
      </NotFound>
    </b-row>

    <MyBidSkelton v-if="$fetchState.pending"></MyBidSkelton>
    <div
      class="row"
      v-if="nilamList.meta && nilamList.meta.last_page != current_page"
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
    <BidDoneModal></BidDoneModal>
        <b-modal id="extendTimeModal" centered title="নিলাম এর সময় বর্ধিত করুন" hide-footer>
          <b-row>
            <div class="col-md-12">
              <form action="" @submit.prevent="updateExtendTime()">
                <div class="form-group clearfix">
                  <div class="col-md-12 pl-0  mb-5">
                    <label class="font-600 my-1" for="">নিলাম এর শেষ তারিখ </label>
                    <b-datepicker
                      class="form-control"
                      locale="bn"
                      :hide-header="true"
                      v-model="extend_time.expire_date"
                      placeholder="ডেট সিলেক্ট করুন "
                      style="line-height: 40px; opacity: 1"
                      :date-disabled-fn="dateDisabled"
                    >
                    </b-datepicker>
                  </div>
                  <!-- <div class="text-danger" v-if="$v.form.expire_date.$error">
                    নিলাম এর শেষ তারিখ উল্লেখ করুন
                  </div> -->
                </div>
                <div class="form-group clearfix">
                  <div class="col-md-12 pl-0 mb-5">
                    <label class="font-600 mb-5" for="">নিলাম এর শেষ সময়</label>
                    <b-form-timepicker
                      class="form-control"
                      locale="bn"
                      :hide-header="true"
                      v-model="extend_time.expire_time"
                      placeholder="টাইম সিলেক্ট"
                      style="line-height: 40px; opacity: 1"
                    >
                    </b-form-timepicker>
                  </div>
                  <!-- <div class="text-danger" v-if="$v.form.expire_time.$error">
                    নিলাম এর শেষ সময় উল্লেখ করুন
                  </div> -->
                </div>

                <div class="form-group text-right">
                  <button
                    type="submit"
                    class="btn button-small primary-button bid-button"
                  >
                    <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                    <span v-else>এক্সটেন্ড করুন</span>
                  </button>
                </div>
              </form>
            </div>
          </b-row>
        </b-modal>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
  middleware: ["auth"],
  // mixins: [validationMixin],
  components: {
    Multiselect,
  },
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
      nilamList: [],
      current_page: 1,
      is_confirmed: "",
      is_done: "",
      nilamer: null,
      formSubmiting: false,
      extend_time : {id: "", expire_date: "", expire_time: ""},
      validation_errors: {},
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
      "/mynilam?page=" +
        this.current_page +
        "&is_shortlisted=" +
        this.is_shortlisted +
        "&is_confirmed=" +
        this.is_confirmed +
        "&is_done=" +
        this.is_done
    );
    this.setNilams(response);
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

    setNilams(nilams) {
      if (nilams.meta) {
        if (nilams.meta.current_page != 1) {
          if (nilams.data.length > 0) {
            nilams.data.forEach((bid) => {
              this.nilamList.data.push(bid);
            });
          }
        } else {
          this.nilamList = nilams;
        }
      }
    },

    dateDisabled(ymd, date) {
      return ymd < this.ymdDate();
    },

    updateExpireTime(id){
      this.extend_time.id = id
    },

    updateExtendTime(){
      this.formSubmiting = true
      this.$axios.$post("update/nilam/expire/time",this.extend_time)
        .then(response => {
            this.formSubmiting = false
            this.$fetch();
            this.toastMessage(response)
            this.$bvModal.hide("extendTimeModal");
        })
    },

    // nilamEdit(nilam) {
    //   var message = "";
    //   if (nilam.total_bid > 0) {
    //     message = {
    //       status: "error",
    //       message: "এই ডিমান্ড ইডিট করা সম্ভব নয় !",
    //     };
    //     this.modalMessage(message);
    //     return;
    //   } else {
    //     this.$router.push(
    //       "/dashboard/update-nilam/" + nilam.id + "/" + nilam.slug
    //     );
    //   }
    // },

    onLoadMore() {
      this.current_page += 1;
    },

    nilamToTrash(nilam) {
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
          this.$axios.$delete("nilam/" + nilam.id).then((response) => {
            this.$fetch();
            this.toastMessage(response.data);
          });
        }
      });
    },
  },
};
</script>