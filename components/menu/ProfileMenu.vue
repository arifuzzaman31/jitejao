<template>
  <b-row>
    <div class="col-md-12">
      <nav class="bashboard-top-menu mt-30 mb-30 d-none d-sm-block clearfix bg-blue-gray">
        <ul>
          <li :class="$nuxt.$route.path == '/dashboard' ? 'active' : ''">
            <NuxtLink to="/dashboard"
              ><img
                src="~/assets/images/icon/menu-dashboard.svg"
                class="img-fluid"
              />
              ড্যাশবোর্ড
            </NuxtLink>
          </li>

          <li :class="$nuxt.$route.path == '/dashboard/mypost' ? 'active' : ''">
            <NuxtLink to="/dashboard/mypost"
              ><img
                src="~/assets/images/icon/menu-demand.svg"
                class="img-fluid"
              />
              আমার পোস্ট
            </NuxtLink>
          </li>
          
          <li
            v-if="$auth.user.is_seller"
            :class="$nuxt.$route.path == '/dashboard/mybid' ? 'active' : ''"
          >
            <NuxtLink to="/dashboard/mybid"
              ><img
                src="~/assets/images/icon/dashboard-nilam.svg"
                class="img-fluid"
              />
              আমার বিড
            </NuxtLink>
          </li>
          
          <!-- <li
            :class="
              $nuxt.$route.path == '/dashboard/point' ||
              $nuxt.$route.path == '/dashboard/point/add'
                ? 'active'
                : ''
            "
          >
            <NuxtLink to="/dashboard/payment?type=point"
              ><img src="~/assets/images/icon/menu-bid.svg" class="img-fluid" />
              পয়েন্ট
            </NuxtLink>
          </li> -->

          <li
            v-if="$auth.user.is_seller"
            :class="$nuxt.$route.path == '/dashboard/payment' ? 'active' : ''"
          >
          <!-- /dashboard/payment?type=subscription for previous subscription mood -->
            <NuxtLink to="/dashboard/payment?type=subscription"
              ><img src="~/assets/images/icon/payment.svg" class="img-fluid" />
                সাবস্ক্রিপশন 
            </NuxtLink>
          </li>

          <!-- <li>
            <NuxtLink to="/category"
              ><img
                src="~/assets/images/icon/list-menu-dashboard.svg"
                class="img-fluid"
              />
               ক্যাটাগরি
            </NuxtLink>
          </li> -->

          <li>
            <NuxtLink to="/new-post"
              ><img
                src="~/assets/images/icon/add-demand.svg"
                class="img-fluid"
              />
              পোস্ট করুন
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </b-row>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
nav.bashboard-top-menu {
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  /* width: 80%; */
}

nav.bashboard-top-menu ul li {
  float: left;
  text-align: center;
  transition: 1s ease all;
  cursor: pointer;
      padding: 6px;
    width: 20%;
  /* border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd; */
}
nav.bashboard-top-menu ul li.active, 
nav.bashboard-top-menu ul li:hover {
  background-color: rgba(218, 47, 118, 0.2);
}
/*nav.bashboard-top-menu ul li:last-child {
   border-right: 1px solid #ddd; 
}*/
nav.bashboard-top-menu ul li a {
  padding: 21px 40px;
  font-weight: 500;
}
nav.bashboard-top-menu ul li img {
  width: 50px;
  /* display: block; */
  text-align: center;
}

nav.bashboard-top-menu ul li:hover a {
  color: #727b9a;
}
.card-gradient-red {
  background: linear-gradient(to right, #f3466c, #fb7636);
}
</style>