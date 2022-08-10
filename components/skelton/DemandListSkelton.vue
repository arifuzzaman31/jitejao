<template>
  <b-row>
    <div
      class="col-md-3"
      v-for="(value, index) in 8"
      :key="'demand-skelton' + index"
    >
      <SingleDemandSkelton />
    </div>
  </b-row>
</template>