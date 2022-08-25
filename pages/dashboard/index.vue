<template>
  <div>
    <b-container class="dashboard">
      <ProfileMenu />

      <b-row class="mt-30-xs" v-if="!$fetchState.pending">
        <div class="col-lg-4 col-sm-6 xs-mb15 mb-15">
          <div class="dashboard-card-list card-gradient-blue p20 clearfix br-5">
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/amar-post-icon.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h2 class="title color-white" v-if="user.user_information">
                {{ replaceNumbersE2B(postCount.totalPost) }}
              </h2>
              <NuxtLink to="/dashboard/mypost">
                <span class="color-white">আমার পোস্ট </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 xs-mb15 mb-15" v-if="user.is_seller">
          <div class="dashboard-card-list card-gradient-red p20 clearfix br-5">
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/amar-bid-icon.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h2 class="title color-white" v-if="user.user_information">
                {{ replaceNumbersE2B(postCount.totalBid) }}
              </h2>
              <NuxtLink to="/dashboard/mybid">
                <span class="color-white">আমার বিড</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 xs-mb15 mb-15">
          <div class="dashboard-card-list card-gradient-purple p20 clearfix br-5">
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/payment-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h2 class="title color-white" v-if="user">
                 মেয়াদ : {{ user.subscription_expired_at_text }}
              </h2>
              <NuxtLink to="/dashboard/mypost">
                <span class="color-white">আমার সাবস্ক্রিপশন</span>
              </NuxtLink>
            </div>
          </div>
        </div>


        <!-- <div class="col-lg-4 col-sm-6 xs-mb15 mb-30" v-if="user.is_seller">
          <div
            class="dashboard-card-list card-gradient-purple p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/dashboard-bid.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h1 class="title color-white">
                {{ replaceNumbersE2B(user.current_point) }}
              </h1>
              <NuxtLink to="/dashboard/payment/new-payment">
                <span class="color-white">কারেন্ট ব্যালেন্স</span>
              </NuxtLink>
            </div>
          </div>
        </div> -->
<!--         
        <div class="col-lg-4 col-sm-6 xs-mb15 mb-30" v-if="user.is_seller">
          <div
            class="dashboard-card-list card-gradient-purple p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/rating-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              
              <div class="float-r mb-15">
                  <img
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/1.png"
                    v-b-tooltip.hover
                    title="ভেরিফাইড সেলার "
                    alt="author badge"
                  />
                  <img :class="user.seller_badge >= 2 ? '' : 'opacity-4'"
                  
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/2.png"
                    alt="author badge"
                    v-b-tooltip.hover
                    :title="user.seller_badge >= 2 ? '১০ এর অধিক কাজ করিয়েছেন' : '১০ এর অধিক কাজ করলে এই ব্যাজ পাবেন'"
                  />
                  <img :class="user.seller_badge >= 3 ? '' : 'opacity-4'"
                   
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/3.png"
                    alt="author badge"
                    v-b-tooltip.hover
                    :title="user.seller_badge >= 3 ? '৫০  এর অধিক কাজ করিয়েছেন' : '৫০ এর অধিক কাজ করলে এই ব্যাজ পাবেন'"
                  />
              </div>


              <br>
                <span class="color-white" 
                 v-b-tooltip.hover
                title="সেলার হিসেবে আপনি কতগুলো কাজ সম্পূর্ণ করছেন"
                style="cursor:pointer">
                সেলার স্ট্যাটাস <i class="fas fa-question-circle"></i></span>
            </div>
          </div>
        </div> -->
        
        <!-- <div class="col-lg-4 col-sm-6 xs-mb15 mb-30">
          <div
            class="dashboard-card-list card-gradient-purple p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/rating-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              
              <div class="float-r mb-15">
                  <img
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/1.png"
                    v-b-tooltip.hover
                    title="ভেরিফাইড বায়ার"
                    alt="author badge"
                  />
                  <img :class="user.buyer_badge >= 2 ? '' : 'opacity-4'"
                  
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/2.png"
                    alt="author badge"
                    v-b-tooltip.hover
                    :title="user.buyer_badge >= 2 ? '১০ এর অধিক কাজ করিয়েছেন' : '১০ এর অধিক কাজ করলে এই ব্যাজ পাবেন'"
                  />
                  <img :class="user.buyer_badge >= 3 ? '' : 'opacity-4'"
                   
                    class="img-fluid cate-badge"
                    src="~/assets/images/badge/3.png"
                    alt="author badge"
                    v-b-tooltip.hover
                    :title="user.buyer_badge >= 3 ? '৫০  এর অধিক কাজ করিয়েছেন' : '৫০ এর অধিক কাজ করলে এই ব্যাজ পাবেন'"
                  />
              </div>


              <br>
             
                <span class="color-white"
                 v-b-tooltip.hover
                 title="বায়ার হিসেবে আপনি কতগুলো কাজ সম্পূর্ণ করছেন"
                 style="cursor:pointer">
                 বায়ার স্ট্যাটাস 
                 <i class="fas fa-question-circle"></i></span>
             
            </div>
          </div>
        </div> -->

           <!-- <div class="col-lg-4 col-sm-6 xs-mb15 mb-30" v-if="user.is_seller">
          <div
            class="dashboard-card-list card-gradient-purple p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/payment-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h1 class="title color-white">
                {{ user.subscription_expired_at_text }}
              </h1>
              <NuxtLink to="/dashboard/payment/new-payment">
                <span class="color-white">সাবস্ক্রিপশন এক্সপায়ার</span>
              </NuxtLink>
            </div>
          </div>
        </div> -->

      </b-row>
      <!-- skelton  -->
      <b-row class="" v-if="$fetchState.pending">
        <div class="col-md-4 mb-0 ">
          <b-skeleton-img  height="150px"></b-skeleton-img>
        </div>
        <div class="col-md-4 mb-0">
          <b-skeleton-img height="150px"></b-skeleton-img>
        </div>
        <div class="col-md-4">
          <b-skeleton-img height="150px"></b-skeleton-img>
        </div>
        <!-- <div class="col-md-4">
          <b-skeleton-img height="150px"></b-skeleton-img>
        </div>
        <div class="col-md-4">
          <b-skeleton-img height="150px"></b-skeleton-img>
        </div>
        <div class="col-md-4">
          <b-skeleton-img height="150px"></b-skeleton-img>
        </div> -->
      </b-row>
      <!-- end skelton  -->
      <!-- dashboard card end -->

      <UserProfile />
    </b-container>
    <Footer />
  </div>
</template>


<script>
import profile from "../profile.vue";
export default {
  components: { profile },
  middleware: ["auth"],
  data() {
    return {
      user: [],
      postCount: {
        totalPost: 0,
        totalBid: 0,
      },
      last_seven_day:{
        recent_post: 0,
        recent_bid: 0,
      },
      today:'',
      end_day:''
    };
  },

  async fetch() {
    await this.$axios
      .$get("user/profile")
      .then((response) => (this.user = response.data));

    await this.$axios
      .$get("dasboard-count")
      .then((res) => {
        this.postCount.totalPost = res.totalPost
        this.postCount.totalBid = res.totalBid
        this.last_seven_day.recent_post = res.sevendaysDemand
        this.last_seven_day.recent_bid = res.sevendaysBid
      });
  },

  methods: {},

  computed: {
    // getUser() {
    //   return this.$store.state.auth.user;
    // },
  },

  head() {
    return {
      title: "জিতে যাও । ড্যাশবোর্ড",
    };
  },
};
</script>
<style>
</style>
