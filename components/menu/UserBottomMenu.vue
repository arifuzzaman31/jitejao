<template>
  <b-container>
    <b-row>
      <div class="mobile-bottom-menu d-block d-sm-none">
        <div class="clearfix">
          <ul>
            <li>
              <NuxtLink to="/post">
                <img
                  src="~/assets/images/icon/add-search-mobile.svg"
                  class="img-fluid mobile-icon"
                />
                <span>সার্চ</span>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/category">
                <img
                  src="~/assets/images/icon/category-bottom-mobile.svg"
                  class="img-fluid mobile-icon"
                />
                <span>ক্যাটাগরি</span>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/">
                <img
                  src="~/assets/images/icon/bido-icon-mobile.svg"
                  class="img-fluid bido-icon mobile-icon"
                  style="width: 48px"
                />

                <!-- <span
                  class="mobile-notification-icon badge badge-light animation"
                  ></span> -->
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/new-post">
                <img
                  src="~/assets/images/icon/add-demand-mobile.svg"
                  class="img-fluid mobile-icon"
                />
                <span>পোস্ট </span>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/dashboard">
                <img
                  src="~/assets/images/icon/user-mobile.svg"
                  class="img-fluid mobile-icon"
                />
                <span v-if="$auth.loggedIn">প্রোফাইল</span>
                <span v-else>লগইন</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </b-row>
  </b-container>
</template>


<style >
.mobile-bottom-menu {
  position: relative;
  background: #fff;
  padding: 5px 0px;
}
.mobile-bottom-menu ul {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  z-index: 99;
  text-align: center;
  padding: 5px 0px;
  box-shadow: 0px 1px 15px 0px #e8e5e5;
}
.mobile-bottom-menu ul li {
  float: left;
  width: 20%;
}
.mobile-bottom-menu ul li img.mobile-icon {
  width: 25px;
  margin-bottom: 5px;
  display: block;
  margin: 8px auto;
}
.mobile-bottom-menu ul li span {
  font-size: 14px;
}
.mobile-notification-icon {
  /* position: absolute;
  top: 27px;
  border-radius: 50%;
  background: #da2f76;
  color: #fff;
  margin-left: -13px;
  height: 25px;
  width: 25px;
  line-height: 20px;
  font-weight: normal; */
}
.mobile-notification-icon.animation {
  animation: mousemove 3.9s linear infinite;
  -webkit-animation: mousemove 3.9s linear infinite;
  -moz-animation: mousemove 3.9s linear infinite;
  -ms-animation: mousemove 3.9s linear infinite;
  color: #da2f76;
}

@keyframes mousemove {
  0% {
    transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    -moz-transform: scale(0.8, 0.8);
    -ms-transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1.2, 1.2);
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    -moz-transform: scale(0.8, 0.8);
    -ms-transform: scale(0.8, 0.8);
  }
}
</style>