<template>
      <b-container class="mt-70">
    <b-row>
      <div class="col-md-12 text-center">
        <h1>রিসেন্ট নিলাম  </h1>
      </div>
    </b-row>

   <b-row class="mt-30 mb-15">
        <div class="col-md-12">
          <div class="cate-heading">
            <div class="cate-title">
              <h3></h3>
            </div>
            <!-- <div class="ca-btn float-r">
              <NuxtLink
                :to="'post?find=nilam'"
                class="button button-xs bg-blue-op-10 color-blue"
                >সব দেখুন</NuxtLink>
            </div> -->
          </div>
        </div>
      </b-row>

      <b-row>
      <div class="col-md-3" v-for="(value, index) in category_post_list.data"
      :key="'nilam-post' + index">
        <div class="category-list  mb-30">
          <div class="post-author cate-heading">
            <NuxtLink to=""  style="cursor: inherit;">
              <img
                class="img-fluid rounded-circle author-img"
                :src="value.user.avatar"
                :alt="value.user.name"
              />
            </NuxtLink>
            <span>{{ value.user.name.split(" ")[0] }}</span>
            <div class="float-r">
              <img
                class="img-fluid cate-badge"
                src="~/assets/images/badge/1.png"
                v-b-tooltip.hover
                title="ভেরিফাইড বায়ার"
                alt="author badge"
              />
              <img
                v-if="value.user.seller_badge >= 2"
                class="img-fluid cate-badge"
                src="~/assets/images/badge/2.png"
                alt="author badge"
                v-b-tooltip.hover
                title="১০ এর অধিক কাজ করিয়েছেন"
              />
              <img
                v-if="value.user.seller_badge >= 3"
                class="img-fluid cate-badge"
                src="~/assets/images/badge/3.png"
                alt="author badge"
                v-b-tooltip.hover
                title="৫০  এর অধিক কাজ করিয়েছেন"
              />
            </div>
          </div>
          <!-- end author -->
          <div class="post-image bg-white">
            <NuxtLink :to="'/nilam/' + value.id + '/' + value.slug">
              <img
                v-if="value.image_one_big"
                class="img-fluid"
                lazy
                :src="value.image_one_big"
                :alt="value.title"
              />
              <img
                v-else
                class="img-fluid"
                :src="value.default_big_image"
                :alt="value.title"
              />
            </NuxtLink>
          </div>
          <!-- post image -->
          <div class="content clearfix">
            <div class="title">
              <NuxtLink :to="'/nilam/' + value.id + '/' + value.slug"
                ><h3>{{ limitTitle(value.title) }}</h3></NuxtLink
              >
            </div>
            <div class="nilam-price-cate price-item display-f">
              <div class="item color-purple bg-purple-op-20 text-center">
                <p class="color-purple">বেস প্রাইস</p>
                <p class="color-purple font-weight-bold">{{ replaceNumbersE2B(value.base_price) }} পয়েন্ট</p>
              </div>
              <div class="item color-green bg-green-op-10 text-center">
                <p class="color-green">সর্বোচ্চ বিড</p>
                <p class="color-green font-weight-bold">
                <span v-if="value.win_bid">{{ value.win_bid.bid_price }} </span>
                <span  v-else>N/A</span>
                </p>
              </div>

            </div>
            <div class="nilam-hrbid-cate price-item">
              <span class="item">
                বিডের শেষ সময়ঃ
                <b class="color-red">{{
                  replaceNumbersE2B(value.will_expired_in)
                }}</b></span
              >
              <!-- <span class="price float-r"> <b>30</b> বিড</span> -->
            </div>
            <div class="cate-btn">
              <NuxtLink
                :to="'/nilam/' + value.id + '/' + value.slug"
                class="button button-sm color-blue w-100 bg-blue-op-20"
                >বিড করুন
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
    </b-row>
     <b-row v-if="this.post_count > 7">
        <div class="col-12 text-center">
          <NuxtLink
            :to="'post?find=nilam'"
            class="btn button-small primary-button bid-button">
            <span>সকল নিলাম দেখুন </span>
          </NuxtLink>
        </div>
      </b-row>

    </b-container>
</template>
<script>
export default {
  data() {
    return {
      category_post_list: [],
      current_page: 1,
      post_count : 0,
      loadingMore: false,
    };
  },
  async fetch() {
    const response = await this.$axios.$get(
      "/get-latest-nilam"
    );
    this.category_post_list = response
    this.post_count = response.data.length
    // console.log(response)
    // this.setnilams(response);
  },
  // watch: {
  //   current_page: function (value) {
  //     this.$fetch();
  //   },
  // },
  methods: {
    onLoadMore() {
      this.current_page += 1;
    },

    setnilams(nilams) {
      if (this.current_page > 1) {
        if (nilams.data.length > 0) {
          nilams.data.forEach((category) => {
            if (category.latestNilam.length > 0) {
              this.category_post_list.data.push(category);
            }
          });
        }
      } else {
        this.category_post_list = nilams;
      }
      // [...new Set(this.category_post_list.data)]
      [...new Set(this.category_post_list.data.map(item => item.id))]
    },
  },
};
</script>