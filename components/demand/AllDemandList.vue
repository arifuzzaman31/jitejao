<template>
  <b-container>

    <b-row>
      <div class="col-md-12  d-none d-sm-block">
        <div class="category-form mt-30  clearfix bg-gray-op-50">
          <!-- <a
            href=""
            class="btn btn-danger mb-2 mt-2"
            @click.prevent="switchFilter()"
            ><span v-if="!show_filter">ফিল্টার</span>
            <span v-else>হাইড ফিল্টার</span></a> -->

          <b-form class="">
            <div class="col-md-4 mb-xs-15">
              <div class="position-relative">
              <input
                ref="searchbar"
                id="searchbar"
                type="text"
                v-model="keyword"
                @keyup="keywordChanged()"
                class="input-form form-control form-control-h40"
                placeholder="tshirt, furniture, food …"
                autofocus="autofocus"
              />
                <img
                  src="~/assets/images/icon/add-search-mobile.svg"
                  class="img-fluid search-mobile-icon"
                />
             </div>
            </div>

            <div class="col-md-4 mb-xs-15">
              <multiselect
                v-model="area"
                :options="areas"
                :custom-label="customAreaLabel"
                placeholder="লোকেশন"
                label="area_name"
                track-by="id"
                class="select"
                @input="locationChanged()"
              ></multiselect>
            </div>
            <div class="col-md-4 mb-xs-15">
              <multiselect
                v-model="category"
                :options="categories"
                :custom-label="customCategoryLabel"
                placeholder="ক্যাটাগরি"
                label="name"
                track-by="id"
                class="select"
                @input="onCategoryChange()"
              ></multiselect>
            </div>
 
            <!-- <div class="col-md-3 mb-xs-15">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                style="padding: 14px 14px"
                class="button button-sm color-black color-green bg-green-op-20 w-xs-100 w-100"
                >ক্লিয়ার ফিল্টার</a
              >
            </div> -->
          </b-form>
        </div>
      </div>
    </b-row>
    <!-- dasktop device -->
    <div class="d-block d-sm-none float-left" v-on:click="isHide = !isHide">
      <a href="#"><i class="fas fa-filter"></i></a>
    </div>

    <b-row>
      <div class="col-md-12 " v-if="!isHide">
        <div class="category-form mt-30  clearfix bg-gray-op-50">
          <!-- <a
            href=""
            class="btn btn-danger mb-2 mt-2"
            @click.prevent="switchFilter()"
            ><span v-if="!show_filter">ফিল্টার</span>
            <span v-else>হাইড ফিল্টার</span></a> -->

          <b-form class="">
            <div class="col-md-4 mb-xs-15">
              <div class="position-relative">
              <input
                ref="searchbar"
                id="searchbar"
                type="text"
                v-model="keyword"
                @keyup="keywordChanged()"
                class="input-form form-control form-control-h40"
                placeholder="tshirt, furniture, food …"
                autofocus="autofocus"
              />
                <img
                  src="~/assets/images/icon/add-search-mobile.svg"
                  class="img-fluid search-mobile-icon"
                />
             </div>
            </div>

            <div class="col-md-4 mb-xs-15">
              <multiselect
                v-model="area"
                :options="areas"
                :custom-label="customAreaLabel"
                placeholder="লোকেশন"
                label="area_name"
                track-by="id"
                class="select"
                @input="locationChanged()"
              ></multiselect>
            </div>
            <div class="col-md-4 mb-xs-15">
              <multiselect
                v-model="category"
                :options="categories"
                :custom-label="customCategoryLabel"
                placeholder="ক্যাটাগরি"
                label="name"
                track-by="id"
                class="select"
                @input="onCategoryChange()"
              ></multiselect>
            </div>
 
            <!-- <div class="col-md-3 mb-xs-15">
              <a
                href=""
                @click.prevent="clearFilterChange()"
                style="padding: 14px 14px"
                class="button button-sm color-black color-green bg-green-op-20 w-xs-100 w-100"
                >ক্লিয়ার ফিল্টার</a
              >
            </div> -->
          </b-form>
        </div>
      </div>
    </b-row>
    <!-- dasktop device -->

  

    <b-row>
      <div class="col-md-12">
        <div class="category-search-title mt-20 mb-20">
          <span class="title">
            <b class="bg-purple-op-20 color-purple br-5" v-if="demandList.meta"
              >{{ replaceNumbersE2B(demandList.meta.total) }} টি
            </b>
            &nbsp; সক্রিয় ডিমান্ড পাওয়া গেছে
          </span>
        </div>
      </div>
    </b-row>
 <DemandListSkelton v-if="$fetchState.pending && current_page <= 1" />
    <b-row>
     
      <div
        class="col-lg-3 col-md-4 col-sm-6 mb-30"
        v-for="(demand, ind) in demandList.data"
        :key="'demand-cat' + ind"
      >
        <SingleDemand :demand="demand"></SingleDemand>
      </div>
    </b-row>

    <DemandListSkelton v-if="$fetchState.pending && current_page > 1" />

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
  components: { Multiselect },
  data() {
    return {
      isHide: true,
      AdvanchSearchHideShow: false,
      demandList: [],
      current_page: 1,
      area: {
        id: "",
        area_name: "লোকেশন",
        area_english_name: "",
      },
      keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
      category: {
        id: this.$route.query.cat ? this.$route.query.cat : '',
        name: this.$route.query.category?this.$route.query.category:'All Category',
        english_name: "",
      },
      areas: [],
      categories: [],
      show_filter: false,
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "demand-list?page=" +
        this.current_page +
        "&category=" +
        this.category.id+
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
          this.areas.unshift({id:  '',
            area_name: 'Everywhere',
            area_english_name: "",});
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
      // if(this.keyword.length < 3) return ;
      if(this.keyword != '' && this.keyword != null)
        {
          this.$router.replace({name: 'post', query: {...this.$route.query, keyword: this.keyword}})
          // this.$refs.searchbar.focus(); 
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
      this.$router.replace({name: 'post',});
      this.filterChanged();
    },

    switchFilter() {
      this.show_filter = !this.show_filter;
    },
  },
};
</script>
<style>
.category-form {
  padding: 20px 0px;
  border-radius: 5px;
}
.category-form .multiselect__select{
      padding: 13px 5px !important;
}
.category-form .multiselect__tags{
  min-height: 40px !important;
  padding: 4px 30px 0 7px !important;
}
.xs-none-search{
  display: none !important;
}
.search-mobile-icon{
  position: absolute;
right: 11px;
top: 11px;
width: 17px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>