<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title text-center mb-50 mt-80">
          <h2 >সকল ক্যাটাগরি</h2>
        </div>
      </b-row>

      <b-row>
        <div
          class="col-md-2 col-6"
          v-for="(category, index) in categories.data"
          :key="index"
        >
          <NuxtLink
            :to="'/post?cat='+category.id+'&category='+category.slug"
            :title="category.name"
            class="text-center  clearfix"
          >
            <div class="allcategory-list bg-blue-gray">
              <img
                :src="category.icon"
                class="img-fluid categoryimg"
                :alt="category.name"
                width="70"
              />
              <div class="overlay mt-30 mt-xs-15">
                <h5 class="mt-15 fw-normal">{{ category.name }} </h5>
              </div>
            </div>
          </NuxtLink>
        </div>
      </b-row>

      <CategoryWithImageSkelton v-if="$fetchState.pending" />
      <div
        class="mt-3"
        v-if="categories.meta && categories.meta.last_page != current_page"
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
    </b-container>
    <Footer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
      current_page: 1,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "/category-list?page=" + this.current_page + "&per_page=12"
    );
    this.setCategory(response);
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
    setCategory(response) {
      if (this.current_page > 1) {
        if (response.data.length > 0) {
          response.data.forEach((category) => {
            this.categories.data.push(category);
          });
        }
      } else {
        this.categories = response;
      }
    },
  },
  head() {
    return {
      title: "জিতে যাও । সকল ক্যাটাগরি",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "জিতে যাও । সকল ক্যাটাগরি",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "জিতে যাও । সকল ক্যাটাগরি",
        },
      ],
    };
  },
};
</script>
<style>
.allcategory-list {
  position: relative;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  padding: 30px 10px;
}
.allcategory-list .content {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
}

.allcategory-list img {
  border-radius: 4px;
  /* width:80px; */
  overflow: hidden;
}
.allcategory-list:hover,
.allcategory-list:hover h4,
.allcategory-list:hover img {
  -webkit-transform: scale(1.1, 1.1);
  transform: scale(1.1, 1.1);
}
.allcategory-list:hover .overlay {
  bottom: 10px;
}
.allcategory-list .overlay span {
  /* color: #fff; */
}
.allcategory-list,
.allcategory-list img,
.allcategory-list h4{
  -webkit-transition: all 500ms ease-in-out;
  -moz-transition: all 500ms ease-in-out;
  -ms-transition: all 500ms ease-in-out;
  -o-transition: all 500ms ease-in-out;
  transition: all 500ms ease-in-out;
}

</style>