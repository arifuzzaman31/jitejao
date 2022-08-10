<template>
  <!-- skeleton -->
  <div class="user-profile-view profile-update p10">
    <div class="info table-responsive">
      <table class="table">
        <!-- <thead>
        <tr>
            <th scope="col" colspan="2"></th>
        </tr>
        </thead> -->
        <tbody>
          <tr>
            <td scope="row"></td>
            <td>
              <div class="from-group mb-15">
                <div class="user-avatar-icon">
                  <b-skeleton
                    class="img-fluid mb-10 avatar"
                    type="avatar"
                  ></b-skeleton>
                  <span>
                    <NuxtLink to="#">
                      <i class="fas fa-pencil-alt color-purple"></i>
                    </NuxtLink>
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <b-skeleton width="50%"></b-skeleton>
            </td>
            <td>
              <p>
                <b-skeleton width="60%"></b-skeleton>
              </p>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <b-skeleton width="50%"></b-skeleton>
            </td>
            <td>
              <b-skeleton width="60%"></b-skeleton>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <b-skeleton width="50%"></b-skeleton>
            </td>
            <td>
              <b-skeleton width="60%"></b-skeleton>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <b-skeleton width="50%"></b-skeleton>
            </td>
            <td>
              <div class="catagory-list-view">
                <span class="bg-gray mb-10"><b-skeleton></b-skeleton></span>
                <span class="bg-gray mb-10"><b-skeleton></b-skeleton></span>
                <span class="bg-gray mb-10"><b-skeleton></b-skeleton></span>
                <span class="bg-gray mb-10"><b-skeleton></b-skeleton></span>
                <span class="bg-gray mb-10"><b-skeleton></b-skeleton></span>
              </div>
            </td>
          </tr>

          <tr>
            <td scope="row ">
              <b-skeleton width="50%"></b-skeleton>
            </td>
            <td>
              <b-skeleton></b-skeleton>
              <b-skeleton></b-skeleton>
              <b-skeleton></b-skeleton>
              <b-skeleton width="70%"></b-skeleton>
              <b-skeleton></b-skeleton>
              <b-skeleton width="40%"></b-skeleton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="profile-btn md-15">
        <b-skeleton type="button"></b-skeleton>
      </div>
    </div>
  </div>
  <!-- skeleton -->
</template>