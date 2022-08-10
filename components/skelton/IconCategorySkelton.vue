<template>
  <div class="CategoryHome clearfix">
    <div v-for="value in 6" :key="'categorrsklyo' + value" class=" col-6 col-lg-2 col-sm-4 col-xs-4 col-md-4 mb-xs-15 mb-30">
              <NuxtLink
                class="cagegorylInk clearfix text-center"
                to="#"
              >
                <div class="categoryhome-name bg-blue-gray">
                  <div class="icon">
            <b-skeleton
              animation="fade"
              type="avatar"
              class="my-custom-skeleton"
            ></b-skeleton>
                  </div>
                  <h5 class="mt-15"><b-skeleton animation="fade"></b-skeleton></h5>
                </div>
              </NuxtLink>
            </div>
  </div>
</template>

<style scoped>
.my-custom-skeleton {
  margin: 0 auto;
}
</style>