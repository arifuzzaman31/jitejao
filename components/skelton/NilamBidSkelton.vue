<template>
  <div>
    <div
      class="nilam-winnder seller-de seller-list w-100 bg-white p20 clearfix"
      v-for="(value, index) in 6"
      :key="index + 'dd'"
    >
      <div class="col-md-4">
        <div class="seller">
          <NuxtLink to="">
            <b-skeleton animation="fade" type="avatar"></b-skeleton>
          </NuxtLink>
          <div class="content">
            <NuxtLink to="">
              <b-skeleton animation="fade" width="85%"></b-skeleton>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="seller-info ml-20 ml-xs-0">
          <span> <b-skeleton animation="fade" width="40%"></b-skeleton></span>
          <span> <b-skeleton animation="fade" width="50%"></b-skeleton></span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center text-xs-left">
          <div>
            <div class="bid-offer mt-5 mb-15">
              <h2 class="text-bold">
                <b-skeleton animation="fade" width="30%"></b-skeleton>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>