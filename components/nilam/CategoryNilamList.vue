<template>
  <b-container>
    <b-row>
      <div class="col-md-12 clearfix d-xl-none d-xxl-block">
        <div class="category-form mb-30">
          <!-- <a
            href=""
            class="button button-sm color-black color-red bg-red-op-10 w-xs-100"
            @click.prevent="switchFilter()"
            ><span v-if="!show_filter">ফিল্টার</span>
            <span v-else>হাইড ফিল্টার</span></a
          > -->
          <b-form inline v-if="show_filter">
            <div class="col-md-5 mb-xs-15">
              <multiselect
                v-model="area"
                :options="areas"
                :custom-label="customAreaLabel"
                placeholder="লোকেশন দিয়ে ফিল্টার করুন"
                label="area_name"
                track-by="id"
                class="select"
                @input="filterChanged()"
              ></multiselect>
            </div>
            <div class="col-md-5 mb-xs-15">
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="পণ্যের টাইটেল দিয়ে সার্চ করুন"
              />
            </div>
            <div class="col-md-2 mb-xs-15 w-xs-100">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                class="
                  button button-sm
                  color-black color-green
                  bg-green-op-10
                  w-xs-100
                "
                >সার্চ ক্লিয়ার করুন</a
              >
            </div>
          </b-form>
          <div class="col-md-2 mb-xs-15">
            <a
              href=""
              class="button button-sm color-white bg-purple w-xs-100"
              @click.prevent="switchFilter()"
              ><span v-if="!show_filter" class="color-white">সার্চ করুন</span>
              <span v-else class="color-white">সার্চ হাইড করুন</span></a
            >
          </div>
        </div>
      </div>
    </b-row>
    <!-- mobile device  -->

    <b-row>
      <div class="col-md-12 d-none d-sm-block">
        <div class="category-form mt-30 mb-30 clearfix bg-white">
          <b-form inline>
            <div class="col-md-5">
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
            <div class="col-md-5">
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="টাইটেল"
              />
            </div>
            <div class="col-md-2">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                class="
                  button button-sm
                  color-black color-green
                  bg-green-op-10
                  w-xs-100 w-100
                "
                >ক্লিয়ার ফিল্টার</a
              >
            </div>
          </b-form>
        </div>
      </div>
    </b-row>
    <!-- dasktop device  -->

    <b-row v-if="nilamList.meta && nilamList.meta.total > 0">
      <div class="col-md-12">
        <div class="category-search-title mt-20 mb-20">
          <span class="title">
            <b class="bg-purple-op-20 color-purple br-5" v-if="nilamList.meta"
              >{{ replaceNumbersE2B(nilamList.meta.total) }} টি
            </b>
            <b class="bg-blue-op-20 color-blue br-5 ml-5" v-if="category">
              " {{ category.name }}"</b
            >
            ডিমান্ড পাওয়া গেছে
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

    <b-row v-if="!$fetchState.pending && nilamList.data.length <= 0">
      <NotFound>
        <template v-slot:head-title>
          <span v-if="category">{{ category.name }}</span> ক্যাটেগরিতে কোন নিলাম
          পাওয়া যায়নি !
        </template>
        <template v-slot:subhead-title>
          সকল ক্যাটেগরির নিলাম দেখার জন্যে সকল নিলাম দেখুন বাটনে ক্লিক করুন ।
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/post?find=nilam"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>সকল নিলাম দেখুন</span>
          </NuxtLink>
        </template>
      </NotFound>
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
  props: ["category"],
  components: { Multiselect },
  data() {
    return {
      nilamList: [],
      current_page: 1,
      area: {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "Location",
      },
      keyword: "",
      areas: [],
      show_filter: false,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "nilam-list?page=" +
        this.current_page +
        "&category=" +
        this.$route.params.id +
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
  },

  methods: {
    getAreaList() {
      this.$axios
        .$get("area-list?no_pagination=yes&status=1")
        .then((response) => {
          this.areas = response;
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
      return `${area_name} — (${area_english_name})`;
    },

    clearFilterChange() {
      this.area = {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "",
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style>
.category-form {
  padding: 20px 0px;
  border-radius: 5px;
}
</style>