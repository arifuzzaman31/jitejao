<template>
          
                <div class="position-relative ">
            <form @submit.prevent="search()" v-if="$nuxt.$route.name != 'post'">
                <input
                @keyup="search()"
                type="text"
                class="input-form form-control  form-control-h40 top-header-searchbar"
                placeholder="tshirt, furniture, food …"
                v-model="keyword"
              />
              <button type="submit"  class="button-0 top-header-search-button" :class="keyword ? 'active-search' : ''" >
                <i class="fas fa-search"></i>
              </button>
            </form>

            </div>
</template>

<script>

export default  {
     data()
     {
         return {
             keyword : '',
         }
     },

     methods : {
         search()
         {
             if(this.keyword === '' || this.keyword.length < 3)
             {
               return ;
             }

             this.$router.push({ name : 'post' , query : {keyword : this.keyword} });
             this.keyword = '';
         }
     }


}
</script>

<style scoped>
.top-header-searchbar{
  border-radius: 20px;
}
.top-header-search-button{
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 10px;
    line-height: 13px;
    background: #f2f6fd;
    transition: 1s;
}
.top-header-search-button i{
    color: #727B9A;
}
.advanced-search{
  cursor: pointer;
}
  .active-search {
     background-color: rgba(227, 16, 110, 1) !important;
     color: #fff;
     transition: 1s;
  }
  .active-search i{
    color: #fff;
  }

</style>
