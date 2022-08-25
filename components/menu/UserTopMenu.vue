<template >
  <div>
    <b-container fluid>

      <b-row>
        <div
          class="header-main-menu p10 xs-shadow-header pt-10  "
          toggleable="lg"
          type="light"
          :class="[
            { 'onScroll-header': !view.topOfPage },
            $route.path == '/' ? '' : 'header-bg-other',
          ]"
        >
        <div class="col-md-2 col-6">
          <NuxtLink to="/">
            <img
              src="~/assets/images/logo-footer.png"
              class="img-fluid ml-50 ml-xs-0 main-logo"
              alt="Demandear"
              style=""
          /></NuxtLink>
        </div>


          <div class="col-md-4 offset-md-2 d-none d-sm-block d-lg-block d-xl-block">
           <!-- import header search componet here  -->
           <header-search />
           <!-- import header search componet here  -->
          </div>
        <div class="col-md-4 col-6 float-r">
          <div class="float-r">
            <div class="main-menu">
              <div class="display-fl">
                <NuxtLink to="/new-post" title="New Post">
                <span class="notification-icon">
                   <a href="#" class="button button-small gradient-purple-secondary color-white bid-button mr-10">পোস্ট করুন</a>
                </span>
                </NuxtLink>
                <!-- <NuxtLink to="/post">
                  <span class=" mr-10 d-none d-sm-block">
                    সার্চ করুন
                  </span>
                </NuxtLink> -->
                <span class=" notification-icon position-relative"  v-b-toggle.sidebar-backdrop
                  >
                   <img
                  src="~/assets/images/icon/top-notification.svg"
                  class="img-fluid"
                />
                <!-- <b :class="total_page.unread > 0 ? 'btnred' : ''"></b> -->
                <span v-if="total_page.unread > 0" class="bg-red color-white notificationTopNumber">{{total_page.unread}}</span>
                </span>
                 
                 <div class="">
                <span  v-if="$auth.loggedIn"  v-b-toggle.sidebar-backdrop1
                  ><img :src="$auth.user.avatar" class="rounded-circle" style="height:30px;width:30px" :title="$auth.user.name" alt="avatar">
                  <span></span> 
                  <i class="fas fa-sort-down"></i>
                </span>
                <span v-else   v-b-toggle.sidebar-backdrop1
                  >একাউন্ট 
                  <i class="fas fa-sort-down"></i>
                </span>
              </div>
              </div>
            </div>
          </div>
         </div>
           
      <div class="col-md-12 d-block d-sm-none d-xl-none d-lg-none mt-10">
           <!-- import header search componet here  -->
           <header-search />
           <!-- import header search componet here  -->
          </div>
        </div>
        <!-- Destop -->



      </b-row>


    <b-row>
      <b-sidebar
      id="sidebar-backdrop"
      title=""
      :backdrop-variant="variant"
      backdrop
      shadow
      right
    >
    <div class="notification-main scrollNotification  "
         >
        <div class="w-100 bg-white clearfix text-left ">

            <div v-if="allNotification && allNotification.length > 0" >

               <div class="flex-column align-items-start  p10 mb-5 bg-white" v-for="(notify,index) in allNotification" :key="index">
                  <div>
                      <Notification :notificationid="notify.id" :date="notify.created_at" :detaildata="notify.data" :readunread="notify.read_at"></Notification>
                  </div>
              </div>

            </div>

            
            <div v-else  class="d-flex h-100">
              <div class="align-self-center mt-50 w-100">
                 <div class="m-auto w-90"><h6 class="text-center border-0 p10 color-purple bg-purple-op-20 br-5 ">কোনো নোটিফিকেশন পাওয়া যায়নি </h6></div>
              </div>
            </div>

            <div class="mt-3 text-center mb-30" v-if="allNotification.length > 0 && total_page.current_page < total_page.last_page">
              <b-button block class="btn button-small primary-button bid-button m-auto w-90 " v-on:click="moreNotification()">আরো লোড করুন </b-button>
            </div>

        </div>
    </div>
     </b-sidebar>
</b-row>
      <!-- <b-row>
        <div class="main-menu-auto-fixed-height clearfix"></div>
      </b-row> -->
 <div>
    <b-sidebar
      
      id="sidebar-backdrop1"
      title=""
      :backdrop-variant="variant"
      backdrop
      shadow
      right
    >
        <div
          class="menu-custom-navbar  d-flex h-100 ">
          <div class="align-self-center  w-100">
           <ul>
              <li>
                <NuxtLink v-if="!$auth.loggedIn" to="/login"> লগইন</NuxtLink>
              </li>
              <li>
                <NuxtLink v-if="!$auth.loggedIn" to="/signup">
                  রেজিস্ট্রেশন</NuxtLink
                >
              </li>
                <li>
                <NuxtLink v-if="$auth.loggedIn" to="/dashboard/mypost" class="color-purple">
                  আমার পোস্ট
                </NuxtLink>
              </li>
              <li>
                <NuxtLink v-if="$auth.loggedIn" to="/dashboard/mybid" class="color-purple">
                  আমার বিড
                </NuxtLink>
              </li>
              <hr class="menu-border" v-if="$auth.loggedIn">

              <li>
                <NuxtLink v-if="$auth.loggedIn" to="/dashboard">
                  ড্যাশবোর্ড
                </NuxtLink>
              </li>
                <li>
                <NuxtLink v-if="$auth.loggedIn" to="/category">
                  ক্যাটাগরি
                </NuxtLink>
              </li>
              <li>
                <NuxtLink v-if="$auth.loggedIn" to="/post">
                    সকল পোস্ট 
                </NuxtLink>
              </li>


              <li>
                <NuxtLink v-if="$auth.loggedIn" to="/dashboard/payment?type=subscription">
                  সাবস্ক্রিপশন  </NuxtLink
                >
              </li>
              <hr class="menu-border">
              <li>
                <NuxtLink  to="/guideline">
                  গাইডলাইন </NuxtLink
                >
              </li>
              <li>
                <NuxtLink v-if="$auth.loggedIn" to="/dashboard">
                  প্রোফাইল</NuxtLink
                >
              </li>
              <!-- <li>
                <a @click.prevent="logout()" href="" v-if="$auth.loggedIn">
                  লগ আউট</a
                >
              </li> -->
              <li>
                <div class="menu-close mt-30">
                  <i class="fas fa-times"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </b-sidebar>
  </div>
    </b-container>
  </div>
</template>


<script>
import { mapState } from "vuex";
import HeaderSearch from '../common/HeaderSearch.vue';
export default {
  components : 
  {
    'header-search' : HeaderSearch,
  },
  data() {
    return {
      variant: 'dark',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
      audio: null,
      isSticky: false,

      view: {
        topOfPage: true,
      },
      pageno : 1,
      // allNotification : [],
      // total_page: [],

      openModal() {
      this.showDetailModal = true;
      // console.log(this.showDetailModal);
    }
    };
  },

  mounted(){
    if(this.$auth.loggedIn){
      this.getNotification()
    }
  },

  // beforeMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // },

  computed: {
    ...mapState({
      allNotification: (state) => state.bid.allNotifications,
      total_page: (state) => state.bid.notifytotalpage,
    }),
  },

  watch: {
      pageno: function (value) {
        this.getNotification()
      },
    },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    // handleScroll() {
    //   if (window.pageYOffset > 150) {
    //     if (this.view.topOfPage) this.view.topOfPage = false;
    //   } else {
    //     if (!this.view.topOfPage) this.view.topOfPage = true;
    //   }
    // },

    getNotification(){
      this.$axios.$get('notification?page='+this.pageno)
      .then(response => {
        this.setNotification(response)
      })
      .catch(error => {
        console.log(error)
      })
    },

    moreNotification(){
      this.pageno += 1
    },

    setNotification(notification) {
      this.$store.commit("bid/setAllNotification", notification);
    },

  //   listen(){
  //     let token = this.$auth.strategy.token.get()
  //     let authid = this.$auth.user.id ? this.$auth.user.id : 'null'
  //     this.$echo.connector.pusher.config.auth.headers['Authorization'] = token;

  // //     // for Broadcasting
  // //     // console.log(this.$echo)
  // //   //   this.$echo.private(`new_bid_on_demand.${authid}`)
  // //   //     .listen('Notify', (e) => {
  // //     //       console.log(e)
  // //   //     })
  // //   // },

  // //   // for notification

  //     this.$echo.private(`App.Models.User.${authid}`)
  //       .notification((notification) => {
  //         this.allNotification.unshift(notification)
  //         this.audio = new Audio(require('@/assets/sounds/notification.wav'));
  //         this.audio.play();
  //       })
  //   },
  },
};
</script>

<style scoped>
.menu-border{
  width: 80%;
  margin: 20px auto;
}

.notification-icon a{
      padding: 8px 12px 8px 12px;
      font-size: 12px;
}

.b-sidebar > .b-sidebar-body::-webkit-scrollbar,
.b-sidebar > .b-sidebar-body::-moz-scrollbar {
  width: 7px !important;
  background-color: #ddd;
}

.b-sidebar > .b-sidebar-body::-webkit-scrollbar-track,
.b-sidebar > .b-sidebar-body::-moz-scrollbar-track {
  border-radius: 10px;
 
}

.b-sidebar > .b-sidebar-body::-webkit-scrollbar-thumb,
.b-sidebar > .b-sidebar-body::-moz-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  background-color: rgb(0, 129, 6) !important;
}
.b-sidebar > .b-sidebar-body::-webkit-scrollbar-button,
.b-sidebar > .b-sidebar-body::-moz-scrollbar-button {
  height: 5px;
}

.header-bg-other {
  /* background-color: rgb(185, 13, 89); */
  transition: 1s ease all;
}
.header-main-menu img.main-logo{
  /* width: 90px; */
}

.header-main-menu.onScroll-header {
  background: #fff;
  position: fixed;
  transition: 1s ease all;
}
/* .header-main-menu.onScroll-header img{
  width: 85px;
} */
/* .header-bg-other .onScroll-header {
}
 .header-main-menu { }  */

.main-menu-auto-fixed-height {
  height: 57px;
  margin-bottom: 30px;
}
.notification-icon img{
    width: 35px;
    margin-right: 6px;
}
.notification-main{
/* background: #fff; */
    /* width: 20% ;
    height: 100%;
    position: fixed;
    right: 0;
    top: 61x;
    z-index: 9999;
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
    /* max-height: 291px; */
    /* border-radius: 3px;
    -webkit-box-shadow:-5px 1px 15px 0px #e8e5e5;
    box-shadow: -5px 1px 15px 0px #e8e5e5;  */
}
.notification-main ul li{
    width: 100%;
    float: left;
    padding: 15px;
}
.notification-main ul li:nth-child(even){
     background: rgba(0,98,255,.04)!important;
}
.notification-main ul li:nth-child(odd){
    background-color: rgba(76,175,80,.04);
}
.notification-main img.author-img{
  float: left;
    margin-right: 15px;
    width: 45px;
    height: 45px;
    -o-object-fit: cover;
    object-fit: cover;
}
.notification-content{
  display:flex;
}
.notification-left-content{
    flex:1;
    line-height: 20px;
}
.notification-date i{
  font-size:11px;
}
.notification-date span{
  color: #727b9a;
  font-size:15px;
}
/* .icon-noti-circle{
    width: 10px;
    height: 10px;
    z-index: 10;
    position: absolute;
    border-radius: 10px;
    top: 5px;
    right: 71px;
} */
.btngreen {
  background: #49f32a;
}
.unreadcolor {
  background: #f7cdcd;
}
.btnred {
  background: #da2f76!important
}

.list-group-item {
    border-right: inherit;
    border-left: inherit;
}
.flex-column{
      border-bottom: 1px solid #ced4da;
}
.notificationTopNumber {
position: absolute;
    top: -5px;
    right: 7px;
    width: 19px;
    height: 19px;
    line-height: 2.2;
    text-align: center;
    border-radius: 50px;
    padding: 0;
    font-size: 9px !important;
}

</style>