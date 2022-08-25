<template>
  <b-row>
    <div class="col-md-12">
      <div class="dashboard-title mb-20">
        <h3>প্রোফাইল</h3>
      </div>
    </div>
    <div class="col-md-10 ">
      <div
        class="user-profile-view profile-update p10"
        v-if="!$fetchState.pending"
      >
        <div class="info table-responsive overflow-hidden">
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
                      <img
                        :src="user.avatar"
                        :alt="user.name"
                        class="img-fluid mb-10 avatar"
                      />
                      <span>
                        <NuxtLink to="/dashboard/update-profile">
                          <i class="fas fa-pencil-alt color-purple"></i>
                        </NuxtLink>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="row">
                  <h4>নামঃ</h4>
                </td>
                <td>
                  <p>
                    {{ user.name }}
                  </p>
                </td>
              </tr>
              <tr>
                <td scope="row">
                  <h4>ইমেইল আইডিঃ</h4>
                </td>
                <td>
                  <p>{{ user.email }}</p>
                </td>
              </tr>
              <tr>
                <td scope="row">
                  <h4>মোবাইল নাম্বারঃ</h4>
                </td>
                <td>
                  <p>{{ user.mobile_no }}</p>
                </td>
              </tr>
              <!-- <tr v-if="user.is_seller == 1">
                <td scope="row">
                  <h4>ক্যাটেগরিঃ</h4>
                </td>
                <td>
                  <div class="catagory-list-view">
                    <span
                      class="bg-gray mb-10"
                      v-for="(category, index) in user.category"
                      :key="index"
                      >{{ category.name }} — ({{ category.english_name }})</span
                    >
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td scope="row">
                  <h4>সেলারঃ</h4>
                </td>
                <td>
                  <div class="catagory-list-view">
                    <span class="bg-warning">
                      <NuxtLink :to="'dashboard/update-profile'">
                        সেলার হোন
                      </NuxtLink></span
                    >
                  </div>
                </td>
              </tr> -->
              <tr>
                <td scope="row ">
                  <h4>আপনার সম্পর্কেঃ</h4>
                </td>
                <td>
                  <p class="about-view" v-if="user.user_information">
                    {{ user.user_information.bio }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="profile-btn md-15">
            <NuxtLink
              to="/dashboard/update-profile"
              class="btn button-small primary-button bid-button w-xs-100 "
            >
              এডিট করুন
            </NuxtLink>
                        <NuxtLink
              to=""
              class="btn button-small gradient-purple-secondary color-white bid-button ml-5"
            >
              লগ আউট
            </NuxtLink>
          </div>
        </div>
      </div>

      <DashboardProfileSkelton
        v-if="$fetchState.pending"
      ></DashboardProfileSkelton>
    </div>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },

  async fetch() {
    await this.$axios
      .$get("user/profile")
      .then((response) => (this.user = response.data));
  },
};
</script>