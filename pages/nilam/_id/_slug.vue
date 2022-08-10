<template>
  <div>
    <b-container class="">
      <DemandDetailsSkelton v-if="$fetchState.pending"></DemandDetailsSkelton>
      <b-row v-else class="mt-30">
        <div class="col-md-12">
          <!-- buyer profile start -->
          <div class="buyer-profile-short bg-white clearfix mb-30 mt-15-xs">
            <div class="p20">
              <!--<NuxtLink :to="`/user-profile/${nilam.user.id}?view_as=seller`"> -->
              <NuxtLink to=""  style="cursor: inherit;">
                <img
                  class="img-fluid rounded-circle author-img"
                  :src="nilam.user.avatar"
                  alt="User Avatar"
                />
              </NuxtLink>
              <div class="content">
                <!--<NuxtLink :to="`/user-profile/${nilam.user.id}?view_as=seller`" -->
                <NuxtLink to="" style="cursor: inherit;"
                  ><span class="name text-bold">{{
                    nilam.user.name
                  }}</span>
                  </NuxtLink>
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
                    v-if="nilam.user.buyer_badge >= 2"
                  />
                  <img
                    src="~/assets/images/badge/3.png"
                    class="img-fluid badge"
                    v-b-tooltip.hover
                    title="৫০ এর অধিক কাজ করিয়েছেন"
                    alt="badge"
                    v-if="nilam.user.buyer_badge >= 3"
                  />
                </div>
                <div class="rating">
                  <StarsRatings
                    v-model="nilam.user.average_buying_rating"
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
        </div>
        <div class="col-md-6">
          <div class="cate-details-left clearfix display-table bg-white">
            <div class="display-table-cell">
              <div class="big-image">
                <img
                  class="img-fluid"
                  :src="current_image"
                  :alt="nilam.title"
                />
              </div>
              <!-- <bg-image -->
              <div
                class="small-image mt-15"
                v-if="
                  nilam.image_one_big &&
                  (nilam.image_two_big || nilam.image_three_big)
                "
              >
                <div class="img" v-if="nilam.image_one_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(nilam.image_one_big)"
                  >
                    <img
                      class="img-fluid"
                      :class="
                        current_image === nilam.image_one_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="nilam.image_one_small"
                      alt="product"
                    />
                  </a>
                </div>
                <div class="img" v-if="nilam.image_two_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(nilam.image_two_big)"
                  >
                    <img
                      class="img-fluid"
                      :class="
                        current_image === nilam.image_two_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="nilam.image_two_small"
                      alt="product"
                    />
                  </a>
                </div>
                <div class="img" v-if="nilam.image_three_big">
                  <a
                    href=""
                    @click.prevent="setCurrentImage(nilam.image_three_big)"
                  >
                    <img
                      class="img-fluid"
                      :class="
                        current_image === nilam.image_three_big
                          ? 'active-small-image'
                          : ''
                      "
                      :src="nilam.image_three_small"
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
            <div class="item mt-10" v-if="nilam.category">
              <h3>
                <span class="bg-green-op-20 color-dark">
                  {{ nilam.category.name }}
                </span>
              </h3>
            </div>
            <!--item-->
            <div class="title mt-15">
              <h2>{{ nilam.title }}</h2>
            </div>
            <!-- title -->
            <div class="price mt-10">
              <h3>
                প্রোডাক্টের ধরণ:
                <span class="color-green">
                  {{ nilam.product_condition }}
                </span>
              </h3>
            </div>
            <!-- price -->
            <div class="price mt-10">
              <h3>
                বেস প্রাইস:
                <span class="color-purple" v-if="nilam.base_price">
                  {{ replaceNumbersE2B(nilam.base_price) }} পয়েন্ট
                </span>
                ( ১ পয়েন্ট = ১ টাকা )
              </h3>
            </div>
            <!-- price -->
            <div class="item mt-10">
              <h3>
                পরিমাণ:
                <span class="color-blue" v-if="nilam.quantity_unit"
                  >{{ replaceNumbersE2B(nilam.quantity) }}
                  {{ nilam.quantity_unit.name }}</span
                >
              </h3>
            </div>
            <!--item-->
            <div class="content mt-20" v-if="nilam.description" v-html="nilam.description">
            </div>

            <!-- details content -->

            <div class="item mt-10" v-if="nilam.area">
              <b class="location-dateline">
                লোকেশন:
                <span class="color-green">
                  {{ nilam.area.area_name }}
                </span>
              </b>
              <!-- <b class="location-dateline" style="display:flex;">
                ডেডলাইন:
                <span class="color-red">
                  {{ nilam.expire_date_text }}
                </span>
              </b> -->
            </div>

            <div class="mt-15">
              <no-ssr>
                <!-- ডেডলাইন: -->
                <flip-countdown
                  :deadline="nilam.expire_date"
                  @timeElapsed="timeElapsedHandler"
                >
                  <!-- <slot name="day">din</slot> -->
                </flip-countdown>
              </no-ssr>
            </div>

            <div class="de-btn mt-10" v-if="$auth.loggedIn">
              <div v-if="$auth.user.id != nilam.user.id">
                <a
                  href="#"
                  @click.prevent="bid()"
                  v-if="!nilam.is_expired"
                  class="
                    btn
                    button-small
                    primary-button
                    bid-button
                    mt-2
                    w-xs-100
                  "
                  >বিড করুন</a
                >
                <!-- <a
                  href="#"
                  v-else
                  class="btn button-small primary-button bid-button w-50 mt-2 w-xs-100"
                  >এই নিলামটি সম্প্র
                </a> -->
              </div>
            </div>
            <!--item-->
            <div class="de-btn" v-else>
              <NuxtLink
                to="/login"
                class="
                  btn
                  button-small
                  primary-button
                  bid-button
                  w-50
                  mt-2
                  w-xs-100
                "
                >বিড করতে লগইন করুন
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
      
      <b-row>
        <div class="col-md-12">
          <div
            class="nilam-title w-100 mt-30"
            v-if="nilam.is_expired && nilam.win_bid"
          >
            <div class="title p10 text-center bg-purple-op-10">
              <h3 class="color-purple">নিলামটিতে জয়ী হয়েছেন</h3>
            </div>

            <div class="nilam-winner w-100 bg-white p20 clearfix">
              <div class="col-md-6">
                <div class="winner-name text-center">
                  <NuxtLink to="">
                    <img
                      class="img-fluid author-img winner-img"
                      :src="nilam.win_bid.bid_user.avatar"
                    />
                    <h2 class="text-bold mt-10">
                      {{ nilam.win_bid.bid_user.name }}
                    </h2>
                  </NuxtLink>
                  <div class="content mt-15">
                    <NuxtLink to="">
                      <span>উইনিং পয়েন্ট </span>
                      <h2 class="text-bold">
                        {{ replaceNumbersE2B(nilam.win_bid.bid_price) }} পয়েন্ট
                      </h2>
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="col-md-3 offset-md-2">
                <div class="winner-badge text-center">
                  <img
                    class="img-fluid winner-badge"
                    src="~/assets/images/badge/winner.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>

      <NilamBidUser :nilam_item="nilam"></NilamBidUser>

      <b-row>
        <NilamBid :nilambaseprise="nilam.base_price"></NilamBid>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
export default {
  components: { FlipCountdown },
  data() {
    return {
      current_image: "",
      share_url: this.$route
        ? process.env.baseUrl + this.$route.path
        : process.env.baseUrl,
    };
  },
  async fetch() {
    const response = await this.$axios.$get(`nilam/${this.$route.params.id}`);
    this.setCurrentNilam(response.data);
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
    setCurrentNilam(nilam) {
      this.$store.commit("nilam/setCurrentNilam", nilam);
    },

    bid() {
      this.$bvModal.show("nilamBidModal");
    },

    timeElapsedHandler() {
      let _this = this;
      setTimeout(function () {
        _this.$fetch();
      }, 1000);
    },
  },

  computed: {
    ...mapState({
      nilam: (state) => state.nilam.nilam,
    }),
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: this.nilam.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.nilam.description,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.nilam.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.nilam.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.nilam.image_one_big,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.nilam.title,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.nilam.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.nilam.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.nilam.image_one_big,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.nilam.title,
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
.details-profile-badge {
  position: relative;
  top: 5px;
  left: 5px;
}
.details-bidlist-profile-badge {
  position: relative;
  top: -5px;
  left: 5px;
}
.nilam-winner .winner-name .winner-img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
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
.flip-clock {
  text-align: left !important;
  margin-left: -20px !important;
}
.flip-clock__piece {
  text-align: center;
}
.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before {
  border-top: solid 1px #ececec !important;
  background: #ececec !important;
  font-weight: normal !important;
  color: rgba(218, 47, 118) !important;
}
.flip-card {
  font-size: 2rem !important;
}
.flip-clock__slot {
  font-size: 1rem !important;
  margin-top: 5px;
}
</style>