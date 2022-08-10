<template>
  <b-container>
    <b-row>
      <div class="col-md-12 d-none d-sm-block">
        <div class="category-form mt-30 mb-30 clearfix bg-white">
          <!-- <a
            href=""
            class="btn btn-danger mb-2 mt-2"
            @click.prevent="switchFilter()"
            ><span v-if="!show_filter">ফিল্টার</span>
            <span v-else>হাইড ফিল্টার</span></a> -->

          <b-form>
            <div class="col-md-3 mb-xs-15">
              <multiselect
                v-model="area"
                :options="areas"
                :custom-label="customAreaLabel"
                placeholder="লোকেশন"
                label="area_name"
                track-by="id"
                class="select"
                @input="filterChanged()"
              ></multiselect>
            </div>
            <div class="col-md-3 mb-xs-15">
              <multiselect
                v-model="category"
                :options="categories"
                :custom-label="customCategoryLabel"
                placeholder="ক্যাটাগরি"
                label="area_name"
                track-by="id"
                class="select"
                @input="filterChanged()"
              ></multiselect>
            </div>
            <div class="col-md-3 mb-xs-15">
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="কীওয়ার্ড"
              />
            </div>
            <div class="col-md-3 mb-xs-15">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                style="padding: 14px 14px"
                class="button button-sm color-black color-green bg-green-op-10 w-xs-100 w-100"
                >ক্লিয়ার ফিল্টার</a
              >
            </div>
          </b-form>
        </div>
      </div>
    </b-row>
    <!-- dasktop device -->

    <b-row>
      <!-- mobile device -->
      <div class="col-md-12 clearfix d-xl-none d-xxl-block">
        <div class="category-form mb-30">
          <!-- <a
            href=""
            class="btn btn-danger mb-2 mt-2"
            @click.prevent="switchFilter()"
            ><span v-if="!show_filter">ফিল্টার</span>
            <span v-else>হাইড ফিল্টার</span></a> -->

          <b-form inline v-if="show_filter">
            <div class="col-md-3 mb-xs-15">
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="কীওয়ার্ড"
              />
            </div>
            <div class="col-md-3 mb-xs-15">
              <multiselect
                v-model="area"
                :options="areas"
                :custom-label="customAreaLabel"
                placeholder="লোকেশন"
                label="area_name"
                track-by="id"
                class="select"
                @input="filterChanged()"
              ></multiselect>
            </div>
            <div class="col-md-3 mb-xs-15">
              <multiselect
                v-model="category"
                :options="categories"
                :custom-label="customCategoryLabel"
                placeholder="ক্যাটাগরি"
                label="area_name"
                track-by="id"
                class="select"
                @input="filterChanged()"
              ></multiselect>
            </div>
            <div class="col-md-3 mb-xs-15">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                class="button button-sm color-black color-green bg-green-op-10 w-xs-100"
                >সার্চ ক্লিয়ার করুন
              </a>
            </div>
          </b-form>
          <div class="float-r w-xs-100">
            <a
              href=""
              class="button button-sm color-red bg-purple w-xs-100"
              @click.prevent="switchFilter()"
              ><span v-if="!show_filter" class="color-white">
                <img
                  src="~/assets/images/icon/search-cate.svg"
                  style="width: 17px;"
                  class="img-fluid"
                />
                সার্চ করুন</span>
              <span v-else class="color-white">
                <img
                  src="~/assets/images/icon/search-cate.svg"
                  style="width: 17px;"
                  class="img-fluid"
                />
                সার্চ হাইড করুন</span></a
            >
          </div>
        </div>
      </div>
    </b-row>

    <b-row>
      <div class="col-md-12">
        <div class="category-search-title mt-20 mb-20">
          <span class="title">
            <b class="bg-purple-op-20 color-purple br-5" v-if="nilamList.meta"
              >{{ replaceNumbersE2B(nilamList.meta.total) }} টি
            </b>
            &nbsp; সক্রিয় নিলাম পাওয়া গেছে
          </span>
        </div>
      </div>
    </b-row>

    <b-row>
      <div
        class="col-md-3 mb-30"
        v-for="(nilam, ind) in nilamList.data"
        :key="'nilam-cat' + ind"
      >
        <SingleNilam :nilam="nilam"></SingleNilam>
      </div>
    </b-row>

    <DemandListSkelton v-if="$fetchState.pending" />

    <div class="">
      <div class="row" v-if="nilamList.meta">
        <div
          class="col-12 text-center"
          v-if="nilamList.meta && nilamList.meta.last_page != current_page"
        >
          <button
            @click.prevent="onNilamLoadMore()"
            class="btn button-small primary-button bid-button w-xs-100"
          >
            <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
            <span v-else>আরো লোড করুন</span>
          </button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      nilamList: [],
      current_page: 1,
      area: {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "",
      },
      keyword: "",
      category: {
        id: "",
        name: "ক্যাটেগরি",
        english_name: "",
      },
      areas: [],
      categories: [],
      show_filter: false,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "nilam-list?page=" +
        this.current_page +
        "&category=" +
        this.category.id +
        "&area=" +
        this.area.id +
        "&keyword=" +
        this.keyword
    );

    this.setNilamList(response);
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },

  created() {
    this.getAreaList();
    this.getCategoryList();
  },

  methods: {
    getAreaList() {
      this.$axios
        .$get("area-list?no_pagination=yes&status=1")
        .then((response) => {
          this.areas = response;
        });
    },
    getCategoryList() {
      this.$axios
        .$get("category-list?no_pagination=yes&status=1")
        .then((response) => {
          this.categories = response.data;
        });
    },
    filterChanged() {
      if (this.current_page == 1) {
        this.$fetch();
      } else {
        this.current_page = 1;
      }
    },
    onNilamLoadMore() {
      this.current_page += 1;
    },
    setNilamList(nilams) {
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
    customAreaLabel({ area_name, area_english_name }) {
      return `${area_name} — ${area_english_name}`;
    },
    customCategoryLabel({ name, english_name }) {
      return `${name} — ${english_name}`;
    },

    clearFilterChange() {
      this.area = {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "",
      };
      this.category = {
        id: "",
        name: "ক্যাটেগরি",
        english_name: "",
      };
      this.keyword = "";
      this.filterChanged();
    },

    switchFilter() {
      this.show_filter = !this.show_filter;
    },
  },
};
</script>
<style scoped>
.category-form {
  padding: 20px 0px;
  border-radius: 5px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>