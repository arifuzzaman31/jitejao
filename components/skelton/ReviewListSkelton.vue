<template>
  <div class="bg-white p10">
    <div
      class="buyer-review-profile clearfix mt-15"
      v-for="value in 5"
      :key="'reiview-list' + value"
    >
      <div class="buyer-review-img">
        <b-skeleton type="avatar"></b-skeleton>
      </div>
      <div class="buyer-review-content mt-15">
        <NuxtLink to="">
          <h3><b-skeleton></b-skeleton></h3>
        </NuxtLink>
        <div class="rating">
          <StarsRatings
            :value="0"
            :star-size="12"
            :ssr="false"
            :increment="0.2"
            :show-rating="false"
            read-only
          />
          <span class="ml-15"><b-skeleton></b-skeleton></span>
        </div>
      </div>
      <div class="buyer-review-content">
        <b-skeleton></b-skeleton>
      </div>
    </div>
  </div>
</template>
