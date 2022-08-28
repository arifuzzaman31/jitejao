<template>
  <div>
    <b-container class="">
      <DemandDetailsSkelton v-if="$fetchState.pending"></DemandDetailsSkelton>
      <b-row v-else class="mt-30">
        <div class="col-md-12">

        </div>
        <div class="col-md-6">
          <div class="cate-details-left clearfix display-table">
            <div class="display-table-cell">
              <div class="big-image">
                <img
                  class="img-fluid br-5"
                  :src="current_image"
                  :alt="demand.title"
                />
              </div>
              <!-- <bg-image -->
              <div
                class="small-image mt-15 br-5"
                v-if="
                  demand.image_one_big &&
                  (demand.image_two_big || demand.image_three_big)
                "
              >
                <div class="img" v-if="demand.image_one_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(demand.image_one_big)"
                  >
                    <img
                      class="img-fluid br-5"
                      :class="
                        current_image === demand.image_one_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="demand.image_one_small"
                      alt="product"
                    />
                  </a>
                </div>
                <div class="img" v-if="demand.image_two_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(demand.image_two_big)"
                  >
                    <img
                      class="img-fluid"
                      :class="
                        current_image === demand.image_two_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="demand.image_two_small"
                      alt="product"
                    />
                  </a>
                </div>
                <div class="img" v-if="demand.image_three_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(demand.image_three_big)"
                  >
                    <img
                      class="img-fluid"
                      :class="
                        current_image === demand.image_three_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="demand.image_three_small"
                      alt="product"
                    />
                  </a>
                </div>
              </div>
              <!-- small image -->
            </div>
          </div>
        </div>
        <!-- left slider -->
        <div class="col-md-6">
          <div class="cate-details-right">

                                  <!-- buyer profile start -->
            <div class="buyer-profile-short bg-blue-gray clearfix mb-10 p10 mt-30-xs br-5 ">
              <div class="">

                <!--<NuxtLink :to="`/user-profile/${demand.user.id}?view_as=buyer`">-->

                <NuxtLink to=""  style="cursor: inherit;">
                  <img
                    class="img-fluid rounded-circle author-img"
                    :src="demand.user.avatar"
                    alt="User Avatar"
                  />
                </NuxtLink>
                <div class="content">
                  <!--<NuxtLink :to="`/user-profile/${demand.user.id}?view_as=buyer`" -->
                  <NuxtLink to=""  style="cursor: inherit;"
                    ><span class="name text-bold">{{ demand.user.name }}</span></NuxtLink
                  >
                  <div class="badge details-profile-badge">
                    <img
                      src="~/assets/images/badge/1.png"
                      class="img-fluid badge"
                      v-b-tooltip.hover
                      title="ভেরিফাইড বায়ার"
                      alt="badge "
                    />
                    <img
                      src="~/assets/images/badge/2.png"
                      class="img-fluid badge"
                      v-b-tooltip.hover
                      title="১০টির অধিক কাজ করিয়েছেন"
                      alt="badge"
                      v-if="demand.user.buyer_badge >= 2"
                    />
                    <img
                      src="~/assets/images/badge/3.png"
                      class="img-fluid badge"
                      v-b-tooltip.hover
                      title="৫০ এর অধিক কাজ করিয়েছেন"
                      alt="badge"
                      v-if="demand.user.buyer_badge >= 3"
                    />
                  </div>
                  <div class="rating">
                    <StarsRatings
                      v-model="demand.user.average_buying_rating"
                      :star-size="12"
                      :show-rating="false"
                      :increment="0.2"
                      :ssr="false"
                      read-only
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- buyer profile end -->


            <div class="item mt-5" v-if="demand.category">
              <h3>
                <span class="bg-green-op-20 color-dark">
                  {{ demand.category.name }}
                </span>
              </h3>
            </div>
            <!--item-->
            <div class="title mt-15">
              <h4>{{ demand.title }}</h4>
            </div>
            <!-- title -->

            <div class="price mt-10">
              <h4>
                বাজেট:
                <span class="color-purple" v-if="demand.budget_type">
                  {{ replaceNumbersE2B(demand.minimum_budget) }} -
                  {{ replaceNumbersE2B(demand.maximum_budget) }} ৳</span
                >
                <span class="bg-purple-op-20 color-purple" v-else>
                  নেগোশিয়েবল
                </span>
              </h4>
            </div>
            <!-- price -->
            <div class="item mt-10">
              <h4>
                পরিমাণ:
                <span class="color-blue" v-if="demand.quantity_unit"
                  >{{ demand.quantity }} {{ demand.quantity_unit.name }}</span
                >
              </h4>
            </div>
            <!--item-->
            <div class="content mt-20" v-if="demand.description">
              <ShowDescription :strlength="400" :description="demand.description" />
            </div>

            <!-- details content -->

            <div class="item mt-10" v-if="demand.area">
              <b class="location-dateline">
                লোকেশন:
                <span class="color-green">
                  {{ demand.area.area_name }}
                </span>
              </b>
              <b class="location-dateline">
                ডেডলাইন:
                <span class="color-red">
                  {{ demand.expire_date_text }}
                </span>
              </b>
            </div>

            <div class="de-btn mt-10" v-if="$auth.loggedIn">
              <div v-if="$auth.user.id != demand.user.id">
                <a
                  href="#"
                  @click.prevent="bid()"
                  v-if="!demand.bid_status"
                  class="btn button-small primary-button bid-button mt-2 w-xs-100"
                  >বিড করুন</a
                >
                <a
                  href="#"
                  v-else
                  class="btn button-small primary-button bid-button w-50 mt-2 w-xs-100"
                  >এই ডিমান্ডটি কনফার্ম হয়ে গেছে
                </a>
              </div>
            </div>
            <!--item-->
            <div class="de-btn" v-else>
              <NuxtLink
                to="/login"
                class="btn button-small primary-button bid-button w-50 mt-2 w-xs-100 mt-30-xs mt-15"
                >বিড করতে লগিন করুন
              </NuxtLink>
            </div>
            <!-- button -->

            <div class="social-icon mt-20">
              <ul>
                <li>
                  <a
                    target="_blank"
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${this.share_url}`"
                  >
                    <i class="fb fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    :href="`https://twitter.com/intent/tweet?text=${this.share_url}`"
                  >
                    <i class="tw fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- right slider -->
        </div>
      </b-row>
      <!-- product end -->

      <BidList :demanderId="demand.user_id"></BidList>
      <b-row>
        <BidForm></BidForm>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      current_image: "",
      bids: {},
      share_url: this.$route
        ? process.env.baseUrl + this.$route.path
        : process.env.baseUrl,
    };
  },
  
  beforeMount(){
    this.$fetch();
  },

  async fetch() {
    const response = await this.$axios.$get(`demand/${this.$route.params.id}`);
    this.setCurrentDemand(response.data);
    if (response.data.image_one_big) {
      this.current_image = response.data.image_one_big;
    } else {
      this.current_image = response.data.default_big_image;
    }
  },

  methods: {
    setCurrentImage(image) {
      this.current_image = image;
    },
    setCurrentDemand(demand) {
      this.$store.commit("demand/setCurrentDemand", demand);
    },

    bid() {
      this.$axios
        .$get(`check-bid/${this.$route.params.id}`)
        .then((response) => {
          console.log(response)
          if(response.status=='success'){
            this.$bvModal.show("bidModal");
          }
        })
        .catch((error) => {
          if (error.response.status == 'error') {
            this.validation_errors = error.response.data;
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
  },

  computed: {
    ...mapState({
      demand: (state) => state.demand.demand,
    }),
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: this.demand.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.demand.description,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.demand.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.demand.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.demand.image_one_big,
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: current_url
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.demand.title,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.demand.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.demand.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.demand.image_one_big,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.demand.title,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: current_url,
        },
      ],
    };
  },
};
</script>

<style>
.details-profile-badge{
  position: relative;
    top: 5px;
    left: 5px;
}
.details-profile-badge img:first-child{
  margin-left: 0;
}
.details-profile-badge img{
  margin-left: 3px;
}
.cate-details-right .social-icon ul li {
  float: left;
  margin-right: 15px;
}
.cate-details-right .social-icon ul li i {
  background-color: rgba(59, 89, 152, 0.1);
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
}
.active-small-image {
  border: 1px solid rgb(217, 217, 217);
  opacity: 0.3;
}
.location-dateline {
  color: #252c53;
  font-weight: 50;
  font-size: 1.1111rem;
}
  .ql-toolbar .ql-formats .ql-image {
    display: none !important;
  }

</style>