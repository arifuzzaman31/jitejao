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
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="ডিমান্ড"
              />
            </div>
            <div class="col-md-5 mb-xs-15">
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
              <input
                type="text"
                v-model="keyword"
                @keyup="filterChanged()"
                class="input-form form-control"
                placeholder="টাইটেল"
              />
            </div>
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

    <b-row v-if="demandList.meta && demandList.meta.total > 0">
      <div class="col-md-12">
        <div class="category-search-title mt-20 mb-20">
          <span class="title">
            <b class="bg-purple-op-20 color-purple br-5" v-if="demandList.meta"
              >{{ replaceNumbersE2B(demandList.meta.total) }} টি
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
        v-for="(demand, ind) in demandList.data"
        :key="'demand-cat' + ind"
      >
        <SingleDemand :demand="demand"></SingleDemand>
      </div>
    </b-row>

    <b-row v-if="!$fetchState.pending && demandList.data.length <= 0">
      <NotFound>
        <template v-slot:head-title>
          <span v-if="category">{{ category.name }}</span> ক্যাটেগরিতে কোন
          ডিমান্ড পাওয়া যায়নি
        </template>
        <template v-slot:subhead-title>
          সকল ক্যাটেগরির ডিমান্ড দেখার জন্যে সকল ডিমান্ড দেখুন বাটনে ক্লিক করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/post"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>সকল ডিমান্ড দেখুন</span>
          </NuxtLink>
        </template>
      </NotFound>
    </b-row>

    <DemandListSkelton v-if="$fetchState.pending" />

    <div class="">
      <div class="row" v-if="demandList.meta">
        <div
          class="col-12 text-center"
          v-if="demandList.meta && demandList.meta.last_page != current_page"
        >
          <button
            @click.prevent="onDemandLoadMore()"
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
      demandList: [],
      current_page: 1,
      area: {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "Location",
      },
      keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
      category: {
        id: this.$route.query.cat ? this.$route.query.cat : '',
        name: this.$route.query.category?this.$route.query.category:'All Category',
        english_name: "",
      },
      areas: [],
      show_filter: false,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "demand-list?page=" +
        this.current_page +
        "&category=" +
        this.$route.params.id +
        "&area=" +
        this.area.id +
        "&keyword=" +
        this.keyword
    );

    this.setDemandList(response);
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
          this.categories.unshift({id:  '',
            name: 'All Category',
            english_name: "",});
          });
    },
    filterChanged() {
      if (this.current_page == 1) {
        this.$fetch();
      } else {
        this.current_page = 1;
      }
    },

    keywordChanged(){
      if(this.keyword != '' && this.keyword != null)
        {
        this.$router.replace({name: 'post', query: {...this.$route.query, keyword: this.keyword}})
        }
        else
        {
          let query = Object.assign({},this.$route.query);
          delete query.keyword;
          this.$router.replace({name: 'post', query: {...query}})
        }
        this.filterChanged();
    },

    onCategoryChange()
    {
        // this.$route.query = {...this.$route.query, cat: this.category.id};
        if(this.category.id != '' && this.category.id != null)
        {
        this.$router.replace({name: 'post', query: {...this.$route.query, cat: this.category.id , category : this.category.slug}})
        }
        else
        {
          let query = Object.assign({},this.$route.query);
          delete query.category;
          delete query.cat
          this.$router.replace({name: 'post', query: {...query}})
        }
        this.filterChanged();
    },

    locationChanged()
    {
        if(this.area.id != '' && this.area.id != null)
        {
          this.$router.replace({name: 'post', query: {...this.$route.query, area: this.area.id, areaname : this.area.area_name}})
        }
        else
        {
          let query = Object.assign({},this.$route.query);
          delete query.area;
          delete query.areaname;
          this.$router.replace({name: 'post', query: {...query}})
        }
        this.filterChanged();
    },
    onDemandLoadMore() {
      this.current_page += 1;
    },
    setDemandList(demands) {
      if (demands.meta) {
        if (demands.meta.current_page != 1) {
          if (demands.data.length > 0) {
            demands.data.forEach((bid) => {
              this.demandList.data.push(bid);
            });
          }
        } else {
          this.demandList = demands;
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
      this.category = {
        id: "",
        name: "ক্যাটেগরি",
        english_name: "",
      };
      this.keyword = "";
      this.$router.replace({name: 'post',});
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