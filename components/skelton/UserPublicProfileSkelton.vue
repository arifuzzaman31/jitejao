<template>
  <div class="bg-profile clearfix">
    <div class="Profile-bg">
      <b-skeleton-img no-aspect height="132px"></b-skeleton-img>
    </div>
    <b-container>
      <b-row class="pt-20 pb-20 text-center">
        <div class="col-md-12 text-center">
          <div class="buyer-public-profile text-center">
            <div class="buyer-public-img">
              <b-skeleton type="avatar"></b-skeleton>
            </div>
            <div class="buyer-public-content">
              <b-skeleton width="20%"></b-skeleton>
              <div class="rating">
                <StarsRatings
                  :value="0"
                  :star-size="12"
                  :ssr="false"
                  :increment="0.2"
                  :show-rating="false"
                  read-only
                />
                <NuxtLink to="#">
                  <b-skeleton type="button" width="10%"></b-skeleton
                ></NuxtLink>
              </div>
              <div class="badge p0"></div>
            </div>
            <div class="buyer-public-description">
              <b-skeleton width="100%"></b-skeleton>
              <b-skeleton width="80%"></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
              <b-skeleton width="90%"></b-skeleton>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <div class="buyer-public-list border p10 clearfix">
      <b-container>
        <div class="col-md-8">
          <div class="df">
            <ul>
              <li><b-skeleton type="button"></b-skeleton></li>
              <li><b-skeleton type="button"></b-skeleton></li>
              <li><b-skeleton type="button"></b-skeleton></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4"></div>
      </b-container>
    </div>
  </div>
</template>