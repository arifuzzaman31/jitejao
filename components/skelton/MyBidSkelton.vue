<template>
  <b-row>

      <div class="col-md-4 " v-for="(bid, index) in 6" :key="'m-bid-skelton' + index">
        <div class="my-demand-post-list  mb-30 mb-xs-0 mt-30-xs bg-shadow-card skelton">
          <div  class="demand-post-list p15 border-0">
            <div class="img float-l mr-15 br-5">
               <b-skeleton-img class="br-5" height="65px"></b-skeleton-img>
            </div>
            <div class="content">
              <h6>
                <a to="" >
                  <h4 class="title color-white">
                    <b-skeleton></b-skeleton>
                  </h4>
                </a>
              </h6>
              <p  class="color-white">
                <b-skeleton width="50%"></b-skeleton>
              </p>
              <div class="date ">
                <p class="date mt-10 ">
                  <span class="float-l mr-10 mt-5 color-white" style="width:34%"> <b-skeleton ></b-skeleton> </span>
                </p>
              </div>
            </div>
          </div>
          <div class="my-demand-post-btn p10 pl-10 pr-10 bg-blue-gray-op-20">
            <div class="my-demand-post-bid w-100">
              <span class="color-white "><b-skeleton class="mb-15"></b-skeleton></span>
               <b-skeleton type="button" width="30%" height="30%"   class="float-l mt-10"></b-skeleton>
                <b-skeleton   class="float-r" type="avatar"></b-skeleton>
               <b-skeleton class="float-r mr-10" type="avatar"></b-skeleton>
            </div>
            <div class="">
             
            </div>
          </div>

        </div>
      </div>
      <!-- end -->
    
  </b-row>



</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
  
.my-demand-post-list .demand-post-list {
    height: 95px;
}

</style>