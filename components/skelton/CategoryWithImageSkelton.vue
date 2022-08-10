<template>
  <b-row>
    <div class="col-md-2 col-6" v-for="(category, index) in 12" :key="index">
      <NuxtLink to="#">
        <div class="allcategory-list">
          <b-skeleton-img></b-skeleton-img>
          <div class="overlay">
            <span><b-skeleton></b-skeleton></span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </b-row>
</template>