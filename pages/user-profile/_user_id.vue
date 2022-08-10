<template>
  <div>
    <UserPublicProfileSkelton v-if="$fetchState.pending" />
    <div class="bg-profile clearfix" v-if="!$fetchState.pending">
      <div class="Profile-bg">
        <!-- <img src="~/assets/images/" class="bg img-fluid" /> -->
      </div>
      <b-container>
        <b-row class="pt-20 pb-20">
          <div class="col-md-12 text-center">
            <div class="buyer-public-profile text-center">
              <div class="buyer-public-img">
                <img
                  :src="user.avatar"
                  alt="Customers"
                  class="img-fluid avatar rounded-circle"
                />
              </div>
              <div class="buyer-public-content">
                <h2 class="name">
                  {{ user.name }}
                  <b class="color-purple br-5"> ({{ user.id }})</b>
                </h2>
                <div
                  class="rating text-center"
                  v-if="this.$route.query.view_as == 'seller'"
                >
                  <StarsRatings
                    v-model="user.average_selling_rating"
                    :star-size="12"
                    :show-rating="false"
                    :increment="0.5"
                    :ssr="false"
                    read-only
                  />
                  <a href="#seller-review"> <span>(মোডঃ সেলার)</span></a>
                </div>
                <div class="rating text-center" v-else>
                  <StarsRatings
                    v-model="user.average_buying_rating"
                    :star-size="12"
                    :show-rating="false"
                    :increment="0.5"
                    :ssr="false"
                    read-only
                  />
                  <a href="#buyer-review"> <span>(মোডঃ বায়ার)</span></a>
                </div>
                <div
                  class="badge p0"
                  v-if="this.$route.query.view_as == 'seller'"
                >
                  <img
                    src="~/assets/images/badge/1.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="ভেরিফাইড সেলার"
                    alt="badge "
                  />
                  <img
                    src="~/assets/images/badge/2.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="১০টির অধিক কাজ করেছেন"
                    alt="badge"
                    v-if="user.seller_badge >= 2"
                  />
                  <img
                    src="~/assets/images/badge/3.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="৫০ এর অধিক কাজ করেছেন"
                    alt="badge"
                    v-if="user.seller_badge >= 3"
                  />
                </div>
                <div class="badge p0" v-else>
                  <img
                    src="~/assets/images/badge/1.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="ভেরিফাইড বায়ার"
                    alt="badge "
                  />
                  <img
                    src="~/assets/images/badge/2.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="১০টির অধিক কাজ করিয়েছেন"
                    alt="badge"
                    v-if="user.buyer_badge >= 2"
                  />
                  <img
                    src="~/assets/images/badge/3.svg"
                    class="img-fluid badge mr-5"
                    v-b-tooltip.hover
                    title="৫০ এর অধিক কাজ করিয়েছেন"
                    alt="badge"
                    v-if="user.buyer_badge >= 3"
                  />
                </div>
              </div>
              <div
                class="buyer-public-description"
                v-if="user.user_information"
              >
                <div
                  v-if="user.user_information.bio"
                  v-html="user.user_information.bio"
                ></div>
                <div v-if="user.user_information.address">
                  ঠিকানাঃ {{ user.user_information.address }}
                </div>
              </div>
            </div>
          </div>
        </b-row>
      </b-container>
      <div class="buyer-public-list border p10 clearfix">
        <b-container v-if="user.area">
          <div class="col-md-8">
            <div class="df">
              <ul>
                <li>
                  <p>
                    <b>{{ user.area.area_name }}</b>
                  </p>
                  <p>লোকেশন</p>
                </li>
                <li>
                  <p>
                    <b>{{ user.joined_at }}</b>
                  </p>
                  <p>জয়েন করেছেন</p>
                </li>
                <li v-if="this.$route.query.view_as == 'seller'">
                  <p v-if="user.user_information.total_completed_work > 0">
                    <b
                      >{{
                        replaceNumbersE2B(
                          user.user_information.total_completed_work
                        )
                      }}টি </b
                    >কাজ শেষ করেছেন
                  </p>

                  <p v-else><b>এখনো কোন কাজ করেননি</b></p>
                </li>

                <li v-else>
                  <p v-if="user.user_information.total_worker_hired > 0">
                    <b
                      >{{
                        replaceNumbersE2B(
                          user.user_information.total_worker_hired
                        )
                      }}
                      টি </b
                    >কাজ করিয়েছেন
                  </p>
                  <p v-else><b>এখনো কোন কাজ করান নি</b></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4"></div>
        </b-container>
      </div>
    </div>

    <!-- end profile -->
    <SellerReviewList v-if="this.$route.query.view_as == 'seller'" />
    <BuyerReviewList v-else />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/user-public-information/" + this.$route.params.user_id
    );
    this.user = response.data;
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: "বিডো । প্রোফাইল - " + this.user.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.user.title,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.user.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.user.title,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.user.avatar,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.user.title,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.user.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.user.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.user.avatar,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.user.name,
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
.vue-star-rating {
  display: inline-block !important;
}
.Profile-bg {
  margin-top: -31px;
}
</style>  