<template>
  <b-container>
    <!-- <b-row class="mt-100 mb-100 mt-50-m mb-50-m">
      <div class="col-md-12">
        <img
          v-if="error.statusCode === 404"
          class="img-responsive"
          src="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png"
        />
        <h1 v-else>An error occurred</h1>
      </div>
    </b-row> -->

    <b-row>
      <div class="not-empty text-center m0 w-100 mt-50">
        <div class="img">
          <img
            src="~/assets/images/others/404-page-dido.svg"
            class="img-fluid"
            alt="not empty"
          />
        </div>
        <div class="not-empty-content mt-30">
          <h2>এই পেজটি খুঁজে পাওয়া যায়নি</h2>
          <!-- <p>
            বিড করার জন্যে সকল ডিমান্ড দেখুন বাটনে ক্লিক করে আপনার এক্সপারটাইস
            অনুযায়ী বিড করুন
          </p> -->
          <NuxtLink
            to="/"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>ব্যাক টু হোম পেজ </span>
          </NuxtLink>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: "default",
  props: ["error"],
};
</script>