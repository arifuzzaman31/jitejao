<template>
  <b-container>
    <b-row id="seller-review">
      <div class="col-md-12">
        <div class="dashboard-title mt-30 mb-20">
          <h2>রিভিউ</h2>
        </div>
      </div>
      <div class="col-md-12" v-if="ratingList.data">
        <div class="bg-white p10">
          <div
            class="buyer-review-profile clearfix mb-15"
            v-for="rating in ratingList.data"
            :key="'seller_rating' + rating.id"
          >
            <div class="buyer-review-img">
              <NuxtLink
                :to="`/user-profile/${rating.reviewer.id}?view_as=buyer`"
              >
                <img
                  :src="rating.reviewer.avatar"
                  :alt="rating.reviewer.name"
                  class="img-fluid mb-10 avatar rounded-circle"
                />
              </NuxtLink>
            </div>
            <div class="buyer-review-content mt-15">
              <NuxtLink
                :to="'/demand/' + rating.demand.id + '/' + rating.demand.slug"
              >
                <h3>{{ rating.demand.title }}</h3>
              </NuxtLink>
              <div class="rating">
                <StarsRatings
                  v-model="rating.ratings"
                  :star-size="12"
                  :show-rating="false"
                  :increment="0.5"
                  :ssr="false"
                  read-only
                />
                <span class="ml-15">{{ rating.reviewed_at }}</span>
              </div>
            </div>
            <div class="buyer-review-content">
              <p>
                {{ rating.review }}
              </p>
            </div>
            <hr />
          </div>
          <!-- review end  -->
        </div>

        <!-- skelton  -->
        <ReviewListSkelton v-if="$fetchState.pending" />
        <!-- skelton  -->
      </div>
    </b-row>
    <b-row>
      <div class="col-md-12">
      <div class="mt-30 clearfix" v-if="ratingList.meta">
        <div
          class=" text-center"
          v-if="ratingList.meta && ratingList.meta.last_page != current_page"
        >
          <button
            @click.prevent="onLoadMore()"
            class="btn button-small primary-button bid-button"
          >
            <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
            <span v-else>আরো লোড করুন</span>
          </button>
        </div>
      </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      ratingList: [],
      current_page: 1,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/user-review-as-seller/" +
        this.$route.params.user_id +
        "?page=" +
        this.current_page
    );
    this.setRatings(response);
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  methods: {
    setRatings(ratings) {
      if (ratings.meta) {
        if (ratings.meta.current_page != 1) {
          if (ratings.data.length > 0) {
            ratings.data.forEach((bid) => {
              this.ratingList.data.push(bid);
            });
          }
        } else {
          this.ratingList = ratings;
        }
      }
    },

    onLoadMore() {
      this.current_page += 1;
    },
  },
};
</script>

<style scoped>
</style>