<template>
  <div>
 <div
      v-for="(value, index) in category_post_list.data"
      :key="'cat-post' + index"
    >
      <b-row>
        <div class="col-md-12 mt-5">
          <div class="cate-heading">
            <div class="cate-title">
              <h3>{{ value.name }}</h3>
            </div>
            <div class="ca-btn float-r">
              <NuxtLink
                :to="'/category/' + value.id + '/' + value.slug"
                class="button button-xs bg-opacity-purple color-purple"
                >সব দেখুন</NuxtLink
              >
            </div>
          </div>
          <hr />
        </div>
      </b-row>

      <b-row class="">
        <div
          class="col-md-3 mb-xs-30"
          v-for="(demand, ind) in value.latestDemand"
          :key="'pr' + ind"
        >
          <SingleDemand :demand="demand"></SingleDemand>
        </div>
      </b-row>

    </div>

    <CategorySkelton v-if="$fetchState.pending" />

    <div
      class="mt-3"
      v-if="
        category_post_list.meta &&
        category_post_list.meta.last_page != current_page
      "
    >
      <div class="row">
        <div class="col-12 text-center">
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      category_post_list: [],
      current_page: 1,
      loadingMore: false,
    };
  },
  async fetch() {
    const response = await this.$axios.$get(
      "/category-demand?page=" + this.current_page
    );
    this.setDemands(response);
  },
  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },
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

