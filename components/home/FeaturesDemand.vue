<template>
      <b-container class="mt-20 ">
    <b-row>
      <div class="col-md-12 text-center">
        <h2>রিসেন্ট ডিমান্ড </h2>
      </div>
    </b-row>

     <b-row class="mt-30 ">
        <div class="col-md-12">
          <div class="cate-heading">
            <div class="cate-title">
              <h3></h3>
            </div>
            <!-- <div class="ca-btn float-r">
              <NuxtLink
                :to="'post'"
                class="button button-xs bg-purple-op-10 color-purple"
                >সব দেখুন</NuxtLink>
            </div> -->
          </div>
        </div>
      </b-row>

     <b-row>
      <div class="col-lg-3 col-md-4 col-sm-6" v-for="(value, index) in category_post_list.data" 
        :key="'cat-post' + index">
        <div class="category-list mb-30 bg-shadow" 
        >
          <div class="post-author cate-heading">
            <NuxtLink to=""  style="cursor: inherit;" >
              <img
                class="img-fluid rounded-circle author-img"
                :src="value.user.avatar"
                :alt="value.user.name"
              />
            </NuxtLink>
            <span>{{value.user.name.split(" ")[0]}}</span>
            <div class="float-r">
              <img
                class="img-fluid cate-badge"
                src="~/assets/images/badge/1.png"
                v-b-tooltip.hover
                title="ভেরিফাইড বায়ার"
                alt="author badge"
              />
              <img
                v-if="value.user.buyer_badge >= 2"
                class="img-fluid cate-badge"
                src="~/assets/images/badge/2.png"
                alt="author badge"
                v-b-tooltip.hover
                title="১০ এর অধিক কাজ করিয়েছেন"
              />
              <img
                v-if="value.user.buyer_badge >= 3"
                class="img-fluid cate-badge"
                src="~/assets/images/badge/3.png"
                alt="author badge"
                v-b-tooltip.hover
                title="৫০  এর অধিক কাজ করিয়েছেন"
              />
            </div>
          </div>
          <!-- end author -->
          <div class="post-image ">
            <NuxtLink :to="'/demand/' + value.id + '/' + value.slug">
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
              <NuxtLink :to="'/demand/' + value.id + '/' + value.slug"
                ><h3>{{ limitTitle(value.title) }}</h3></NuxtLink
              >
            </div>

            <div class="price-item">
              <span
                class="price  color-purple bg-purple-op-20"
                v-if="value.budget_type">
                {{ replaceNumbersE2B(value.minimum_budget) }} -
                {{ replaceNumbersE2B(value.maximum_budget) }} ৳</span>
              <span class="price  color-purple bg-purple-op-20" v-else>
                নেগোশিয়েবল
              </span>
              
              <span class="item color-green bg-green-op-10 float-r">
                {{ replaceNumbersE2B(value.quantity) }}
                {{ value.quantity_unit.name }}</span>
            </div>

            <div class="cate-btn">
              <NuxtLink
                :to="'/demand/' + value.id + '/' + value.slug"
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
            :to="'post'"
            class="button button-small gradient-purple-secondary bid-button mt-15">
            <span>সকল ডিমান্ড দেখুন </span>
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
        "/get-demand"
      );
      this.category_post_list = response
      this.post_count = response.data.length
      // this.setDemands(response);
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

      setDemands(demands) {
        if (this.current_page > 1) {
          if (demands.data.length > 0) {
            demands.data.forEach((category) => {
              if (category.latestDemand.length > 0) {
                this.category_post_list.data.push(category);
              }
            });
          }
        } else {
          this.category_post_list = demands;
        }
        // [...new Set(this.category_post_list.data)]
        [...new Set(this.category_post_list.data.map(item => item.id))]

        // console.log(this.category_post_list.data)
      },
    },
  };
</script>