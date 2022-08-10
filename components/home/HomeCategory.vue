<template>
  <b-container>
    <b-row>
  <div class="col-md-12 mt-2" :class="{fixed: isScrollOver65}">
   <div class="br-5 clearfix" >
               <div 
                    class="custom-tab-demand" 
                    @click="selected = 1" 
                    :class="{highlight:selected == 1}">
                   <button 
                        style="padding: 8px 20px;"
                        class="button button-sm  div1" 
                        :class="currentState != 'demand' ? 'demand-active' : ''" 
                        @click="currentState = 'demand', scrollMeTo('porto2');">
                       ডিমান্ড
                   </button>
               </div>
               <div 
                   
                    class="custom-tab-nilam" 
                    @click="selected = 2" 
                    :class="{highlight:selected == 2}">

                   <button 
                        style="padding: 8px 20px;"
                        class="button button-sm custom-tab-nilam div2" 
                        :class="currentState == 'nilam' ? 'nilam-active' : ''" 
                        @click="currentState = 'nilam', scrollMeTo('porto2');">
                       নিলাম
                   </button>
               </div>
           </div>

      </div>
    </b-row>
    <div ref="porto2"></div>
    <div class="category-tab-list" >
      <CategoryDemand v-if="currentState == 'demand'"  />
      <CategoryNilam v-else  />
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selected: 1,
      currentState: "demand",
       isScrollOver65: false,
      view: {
        topOfcategoryh: true,
      },
    };
  },

 mounted() {
    // Setup the event listener and execute it once in case we are already scrolled
    window.addEventListener('scroll', this.scrollHandler);
    this.scrollHandler();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },


    beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
  scrollHandler(e) {
      this.isScrollOver65 = window.pageYOffset > 1290;
    },


  scrollMeTo(refName) {
    var element = this.$refs[refName];
    var top = element.offsetTop;

    window.scrollTo(0, top);
  }
    },
};

</script>


<style>

.fixed {
  position: fixed;
  /* Original position minus scroll limit */
  top: calc(90px - 65px);
   background: rgb(255 255 255);
   position: fixed;
   transition: 1s ease all;
   top: 55px;
   width: 100%;
   left: 0;
   z-index: 1;
   padding: 10px;
   
}

.custom-tab-demand, .custom-tab-nilam{
    /* width: 75px; */
    float: left;
    margin-right: 10px;
}
.custom-tab-demand .div1,
.custom-tab-nilam .div2{
  border: 1px solid #ddd;
  width: 100%;
}
.custom-tab-demand.highlight .div1{
   background-image: linear-gradient(to right,rgba(227, 16, 110, 1),rgba(162, 11, 79, 1)) !important;
   color: #fff;
}
.custom-tab-nilam.highlight .div2{
  background-image: linear-gradient(to right, #04befe, #3f86ed) !important;
  color: #fff;
}
.onScroll-category{
    background: rgb(255 255 255);
    position: fixed;
    transition: 1s ease all;
    top: 47px;
    width: 100%;
    left: 0;
    z-index: 1;
    padding: 10px;
}

</style>