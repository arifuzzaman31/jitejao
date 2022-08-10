<template>
  <b-container>
    <b-row>
        <div class="col-md-12 mt-30">
          <div class="cate-heading">
            <div class="cate-title">
              <h3>ক্যাটাগরি</h3>
            </div>
            <div class="ca-btn float-r">
              <NuxtLink to="/category" ><h4>সব দেখুন</h4></NuxtLink>
            </div>
          </div>
        </div>
      </b-row>
<!-- d-none d-sm-block -->
    <b-row>
      <div class="w-100 ">
        <div class="CategoryHome clearfix" v-if="!$fetchState.pending">
          <div >
            <div v-for="cat in categories" :key="'categor' + cat.id" class=" col-6 col-lg-2 col-sm-4 col-xs-4 col-md-4 mb-xs-15 mb-30">
              <NuxtLink
                class="cagegorylInk clearfix text-center"
                :to="'/post?cat='+cat.id+'&category='+cat.slug"
                :title="cat.name"
              >
                <div class="categoryhome-name bg-blue-gray">
                  <div class="icon">
                  <img
                    :src="cat.icon"
                    class="img-fluid category-icon"
                    :alt="cat.name"
                  />
                  </div>
                  <p class="mt-15">{{ cat.name }}</p>
                </div>
              </NuxtLink>
            </div>
            <!-- category list -->
            <!-- <div>
              <NuxtLink class="cagegorylInk" to="/category">
                <div class="categoryhome-name">
                  <img
                    src="~/assets/images/icon/categoryicon/all-category.svg"
                    class="img-fluid category-icon animationcategory"
                    alt="icon"
                  />
                  <p>সকল ক্যাটেগরি</p>
                </div>
              </NuxtLink>
            </div> -->
            <!-- category list -->
          </div>
        </div>
        <IconCategorySkelton v-else></IconCategorySkelton>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },

  async fetch() {
    const response = await this.$axios.$get(
      "category-list?no_pagination=yes&status=1&take_only=6"
    );
    this.categories = response.data;
  },
};
</script>

<style >

.CategoryHome {
  margin-top: 20px;
  z-index: 99;
}
.categoryhome-name{
    border-radius: 5px;
    padding: 30px 10px;
}

.categoryhome-name .icon img{
   width:55px;
}
.categoryhome-name .icon{
  margin-bottom: 25px;
}
.categoryhome-name, .categoryhome-name .icon, .categoryhome-name h3  {
  
  transition: 1s ease all;
  -webkit-transition: 1s ease all;
  -moz-transition: 1s ease all;
  -ms-transition: 1s ease all;
  /* filter: grayscale(0.2); */
}
.categoryhome-name:hover,
.categoryhome-name:hover .icon,
.categoryhome-name:hover h3{
  transform: scale(1.1, 1.1);
   /* filter: grayscale(0); */
}
.categoryhome-name h5{
  font-weight: normal;
}

</style>