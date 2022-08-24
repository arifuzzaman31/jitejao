<template>
  <div>
    <div class="title text-center mt-30">
      <h2 class="text-black">নিলাম করুন</h2>
      <p></p>
    </div>
    <hr class="w-100" />

    <div class="step-progress mt-30 mb-30">
      <b-progress :max="3">
        <b-progress-bar
          :value="currentStep"
          :label="`${replaceNumbersE2B(((currentStep / 3) * 100).toFixed(0))}%`"
        ></b-progress-bar>
      </b-progress>
    </div>
    <div class="step step1" v-if="currentStep == 1">
      <div class="form-group clearfix">
        <div class="col-md-12 mb-xs-15 pl-0 pr-0">
          <label class="font-600 mb-5" for="">টাইপ </label>
          <select
            class="input-form form-control"
            v-model="form.product_condition"
          >
            <option value="1">নতুন</option>
            <option value="0">পুরাতন</option>
          </select>
          <div class="text-danger mt-5" v-if="$v.form.quantity.$error">
            দ্রব্যটির ধরন নির্বাচন করুন ।
          </div>
        </div>
      </div>

      <div class="form-group clearfix">
        <!-- <label class="font-600 mb-5" for=""
                    >ডিমান্ডের ছবি থাকলে আপলোড করুন</label
                  >
                  <br /> -->
        <div class="col-md-4 mb-xs-15 photo-upload pl-0">
          <label class="font-600 mb-5">ফটো ১ (অপশনাল)</label>
          <div class="files">
            <div class="file-content">
              <input
                type="file"
                class="p30"
                accept=".jpeg,.png,.PNG,.gif,.jpg,.webp,.bmp"
                @change="uploadImageOne($event)"
              />

              <img
                v-if="form.image_one"
                :src="form.image_one"
                class="img img-fluid"
              />
              <img
                v-else
                src="~/assets/images/icon/image_demo_icon.svg"
                class="img img-fluid"
              />

              <div class="file-display-table">
                <div class="file-display-table-cell">
                  <h3 v-if="form.image_one">ছবি চেঞ্জ করুন</h3>
                  <h3 v-else>ছবি যোগ করুন</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-nowrap text-danger mt-2"
            v-if="$v.form.image_one.$error"
          >
            অন্তত একটি ছবি যোগ করুন
          </div>
        </div>
        <!-- file upload -->
        <div class="col-md-4 mb-xs-15 photo-upload pl-0" v-if="form.image_one">
          <label class="font-600 mb-5">ফটো ২ (অপশনাল)</label>
          <div class="files">
            <div class="file-content">
              <input
                type="file"
                class="p30"
                accept=".jpeg,.png,.PNG,.gif,.jpg,.webp,.bmp"
                @change="uploadImageTwo($event)"
              />
              <img
                v-if="form.image_two"
                :src="form.image_two"
                class="img img-fluid"
              />
              <img
                v-else
                src="~/assets/images/icon/image_demo_icon.svg"
                class="img img-fluid"
              />
              <div class="file-display-table">
                <div class="file-display-table-cell">
                  <h3 v-if="form.image_two">ছবি চেঞ্জ করুন</h3>
                  <h3 v-else>ছবি যোগ করুন</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- file upload -->

        <div class="col-md-4 photo-upload pl-0" v-if="form.image_two">
          <label class="font-600 mb-5">ফটো ৩ (অপশনাল)</label>
          <div class="files">
            <div class="file-content">
              <input
                type="file"
                class="p30"
                @change="uploadImageThree($event)"
              />
              <img
                v-if="form.image_three"
                :src="form.image_three"
                accept=".jpeg,.png,.PNG,.gif,.jpg,.webp,.bmp"
                class="img img-fluid"
              />
              <img
                v-else
                src="~/assets/images/icon/image_demo_icon.svg"
                class="img img-fluid"
              />
              <div class="file-display-table">
                <div class="file-display-table-cell">
                  <h3 v-if="form.image_three">ছবি চেঞ্জ করুন</h3>
                  <h3 v-else>ছবি যোগ করুন</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- file upload -->
      </div>

      <div class="form-group">
        <label class="font-600 mb-5" for="">ক্যাটেগরি নির্বাচন করুন *</label>
        <multiselect
          v-model="form.category"
          :options="categories"
          :max="5"
          :loading="isCategoryLoading"
          :custom-label="customCategoryLabel"
          placeholder="ক্যাটেগরি নির্বাচন করুন"
          selectedLabel="নির্বাচিত"
          track-by="id"
          class="select"
          @input="getQuantityUnit()"
        >
        </multiselect>
        <div class="text-danger mt-5" v-if="$v.form.category.$error">
          নিলাম ক্যাটেগরি নির্বাচন করুন
        </div>
      </div>
      <div class="form-group">
        <label class="font-600 mb-5" for="">পণ্যের নাম লিখুন *</label>
        <input
          v-model="form.title"
          type="text"
          class="input-form form-control"
          placeholder="পণ্যের নাম লিখুন"
          @keypress.enter="goToStepTwo()"
        />
        <div class="text-danger mt-5" v-if="!$v.form.title.maxLength">
          সর্বোচ্ছ ১০০ অক্ষর টাইটেল লিখতে পারবেন (বিস্তারিত লিখার টেক্সটবক্স
          পরবর্তী ধাপে পাবেন )
        </div>
        <div
          class="text-danger mt-5"
          v-if="$v.form.category.$error && !$v.form.title.required"
        >
          টাইটেল লিখুন
        </div>
      </div>
    </div>
    <!-- step 1 -->
    <div v-if="currentStep == 2" class="step step2">
      <div class="form-group clearfix">
        <div class="col-md-12 mb-xs-15 pl-0 mb-15">
          <label class="font-600 mb-5" for=""
            >বেস প্রাইস ( ১ পয়েন্ট = ১ টাকা )<span class="text-danger"
              >*</span
            ></label
          >
          <input
            type="number"
            v-model="form.base_price"
            step="any"
            class="form-control input-form"
            placeholder="প্রাইস "
          />
          <div class="text-danger mt-5" v-if="$v.form.base_price.$error">
            বেস প্রাইস উল্লেখ করুন
          </div>
        </div>

        <div class="col-md-6 mb-xs-15 pl-0">
          <label class="font-600 mb-5" for="">পরিমাণ *</label>
          <input
            type="number"
            v-model="form.quantity"
            step="any"
            class="form-control input-form"
            placeholder="পরিমাণ "
          />
          <div class="text-danger mt-5" v-if="$v.form.quantity.$error">
            পরিমাণ উল্লেখ করুন
          </div>
        </div>

        <div class="col-md-6 pl-0 pr-0">
          <label class="font-600 mb-5" for="">পরিমাণের ধরণ *</label>
          <select
            v-model="form.quantity_unit"
            name=""
            id=""
            class="input-form form-control"
          >
            <option value="">পরিমাণের ধরণ</option>
            <option
              v-for="value in quantity_units"
              :value="value.id"
              :key="'qty' + value.id"
            >
              {{ form.quantity }} {{ value.name }}
            </option>
            <option value="0">অন্যান্য</option>
          </select>
          <div class="text-danger mt-5" v-if="$v.form.quantity_unit.$error">
            পরিমাণের ধরণ নির্বাচন করুন
          </div>
        </div>
      </div>
    </div>

    <div class="step step3" v-if="currentStep == 3">
      <div class="form-group clearfix">
        <div class="col-md-12 pl-0">
          <label class="font-600 mb-5" for=""
            >পণ্যটির বিস্তারিত বর্ণনা করুন (অপশনাল)</label
          >
          <vue-editor v-model="form.description"></vue-editor>
        </div>
      </div>
      <div class="form-group clearfix">
        <div class="col-md-12 pl-0">
          <label class="font-600 mb-5" for="">ভিডিও লিংক (অপশনাল)</label>
          <input
            type="text"
            v-model="form.video_link"
            class="input-form form-control"
            placeholder="ভিডিও লিংক"
          />
        </div>
      </div>
      <div class="form-group clearfix">
        <div class="col-md-12 pl-0 mb-5">
          <label class="font-600 mb-5" for="">নিলাম এর শেষ তারিখ </label>
          <b-datepicker
            class="form-control"
            locale="bn"
            :hide-header="true"
            v-model="form.expire_date"
            placeholder="ডেট সিলেক্ট করুন "
            style="line-height: 40px; opacity: 1"
            :date-disabled-fn="dateDisabled"
          >
          </b-datepicker>
        </div>
        <div class="text-danger" v-if="$v.form.expire_date.$error">
          নিলাম এর শেষ তারিখ উল্লেখ করুন
        </div>
      </div>
      <div class="form-group clearfix">
        <div class="col-md-12 pl-0 mb-5">
          <label class="font-600 mb-5" for="">নিলাম এর শেষ সময়</label>
          <b-form-timepicker
            class="form-control"
            locale="bn"
            :hide-header="true"
            v-model="form.expire_time"
            placeholder="টাইম সিলেক্ট"
            style="line-height: 40px; opacity: 1"
          >
          </b-form-timepicker>
        </div>
        <div class="text-danger" v-if="$v.form.expire_time.$error">
          নিলাম এর শেষ সময় উল্লেখ করুন
        </div>
      </div>
    </div>

    <div class="form-group mb-xs-100">
      <a
        class="
          btn
          button-small
          gradient-purple-secondary
          yallo-primary
          w-50
          color-white
        "
        @click.prevent="previousStep"
        v-if="currentStep > 1"
      >
        আগের ধাপ
      </a>
      <a
        v-if="currentStep == 1"
        class="btn button-small primary-button bid-button w-100"
        @click.prevent="goToStepTwo()"
      >
        পরবর্তী ধাপ
      </a>
      <a
        v-if="currentStep == 2"
        class="btn button-small primary-button bid-button w-50"
        @click.prevent="goToStepThree()"
      >
        পরবর্তী ধাপ
      </a>
      <button
        type="submit"
        @click.prevent="store()"
        v-if="currentStep == 3"
        style=""
        class="btn button-small primary-button bid-button w-50"
      >
        <span v-if="formSubmiting"> প্রসেসিং </span>
        <span v-else> সাবমিট করুন </span>
        <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
      </button>
    </div>
    <div class="step-progress mt-50 mb-50" v-if="formSubmiting">
      <b-progress :max="100">
        <b-progress-bar
          :value="uploadPercentage"
          :label="`${replaceNumbersE2B(uploadPercentage)}%`"
        ></b-progress-bar>
      </b-progress>
    </div>
    <!-- <p>{{ uploadPercentage }}</p> -->

    <b-row>
      <ErrorModal :errors="validation_errors"></ErrorModal>
    </b-row>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { validationMixin } from "vuelidate";
const {
  required,
  requiredIf,
  minLength,
  maxLength,
} = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  middleware: ["auth"],
  components: {
    Multiselect,
  },
  data() {
    return {
      form: {
        category: null,
        title: "",
        product_condition: 1,
        base_price: "",
        quantity: "",
        quantity_unit: "",
        video_link: "",
        description: "",
        expire_date: "",
        expire_time: "",
        image_one: "",
        image_two: "",
        image_three: "",
        image_one_name: "",
        image_two_name: "",
        image_three_name: "",
      },
      formSubmiting: false,
      imageOneUploading: false,
      imageTwoUploading: false,
      imageThreeUploading: false,
      validation_errors: null,
      currentStep: 1,
      uploadPercentage: 0,
      categories: [],
      quantity_units: [],
      isCategoryLoading: false,
    };
  },
  validations: {
    form: {
      category: { required },
      title: { required, maxLength: maxLength(100) },
      quantity: { required },
      quantity_unit: { required },
      base_price: { required },
      expire_date: { required },
      expire_time: { required },
      image_one: { required },
    },
  },
  created() {
    this.getCategoryList();
  },

  methods: {
    // upload image
    uploadImageOne(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.image_one = e.target.result;
        this.upLoadImageOneServer();
      };
      reader.readAsDataURL(file);
    },
    uploadImageTwo(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.image_two = e.target.result;
        this.upLoadImageTwoServer();
      };
      reader.readAsDataURL(file);
    },
    uploadImageThree(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.image_three = e.target.result;
        this.upLoadImageThreeServer();
      };
      reader.readAsDataURL(file);
    },

    getCategoryList() {
      this.isCategoryLoading = true;
      this.$axios
        .$get("category-list?no_pagination=yes&status=1")
        .then((response) => {
          this.categories = response.data;
          this.isCategoryLoading = false;
        });
    },

    getQuantityUnit() {
      if (this.form.category) {
        this.form.quantity_unit = "";
        this.$axios
          .$get("category-unit/" + this.form.category.id)
          .then((response) => {
            this.quantity_units = response;
          });
      }
    },

    goToStepTwo() {
      this.$v.form.category.$touch();
      this.$v.form.title.$touch();
      this.$v.form.image_one.$touch();
      if (
        this.$v.form.category.$invalid ||
        this.$v.form.title.$invalid ||
        this.$v.form.image_one.$invalid
      ) {
        return;
      }
      this.currentStep = 2;
    },
    goToStepThree() {
      this.$v.form.quantity.$touch();
      this.$v.form.quantity_unit.$touch();
      this.$v.form.base_price.$touch();

      if (
        this.$v.form.quantity.$invalid ||
        this.$v.form.quantity_unit.$invalid ||
        this.$v.form.base_price.$invalid
      ) {
        return;
      }
      this.currentStep = 3;
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
      }
    },
    store() {
      this.$v.form.expire_date.$touch();
      this.$v.form.expire_time.$touch();
      if (
        this.$v.form.expire_date.$invalid ||
        this.$v.form.expire_time.$invalid
      ) {
        return;
      }
      this.formSubmiting = true;
      this.$nuxt.$loading.start();
      this.$axios
        .$post("/nilam", this.form)
        .then((response) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (response.status == "success") {
            this.toastMessage(response);
            this.clearField();
            this.$router.push("nilam/" + response.nilam_id);
          }
        })
        .catch((error) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    upLoadImageOneServer() {
      let imageForm = { image_type: "one", image: this.form.image_one };
      this.imageOneUploading = true;
      this.$axios
        .$post("/image-upload", imageForm)
        .then((response) => {
          this.imageOneUploading = false;
          if (response.status == "success") {
            this.form.image_one = response.image_url;
            this.form.image_one_name = response.image;
          }
        })
        .catch((error) => {
          this.imageOneUploading = false;
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    upLoadImageTwoServer() {
      let imageForm = { image_type: "two", image: this.form.image_two };
      this.imageTwoUploading = true;
      this.$axios
        .$post("/image-upload", imageForm)
        .then((response) => {
          this.imageTwoUploading = false;
          if (response.status == "success") {
            this.form.image_two = response.image_url;
            this.form.image_two_name = response.image;
          }
        })
        .catch((error) => {
          this.imageTwoUploading = false;
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    upLoadImageThreeServer() {
      let imageForm = { image_type: "three", image: this.form.image_three };
      this.imageThreeUploading = true;
      this.$axios
        .$post("/image-upload", imageForm)
        .then((response) => {
          this.imageThreeUploading = false;
          if (response.status == "success") {
            this.form.image_three = response.image_url;
            this.form.image_three_name = response.image;
          }
        })
        .catch((error) => {
          this.imageThreeUploading = false;
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    clearField() {
      this.form = {
        category: null,
        title: "",
        product_condition: 1,
        base_price: "",
        quantity: "",
        quantity_unit: "",
        video_link: "",
        description: "",
        expire_date: "",
        image_one: "",
        image_two: "",
        image_three: "",
        image_one_name: "",
        image_two_name: "",
        image_three_name: "",
      };
      this.formSubmiting = false;
      this.validation_errors = null;
      this.currentStep = 1;
    },
    customCategoryLabel({ name, english_name }) {
      return `${name} — (${english_name})`;
    },

    dateDisabled(ymd, date) {
      return ymd < this.ymdDate();
    },
  },

  head() {
    const current_url = this.$route
      ? process.env.baseUrl + this.$route.path
      : process.env.baseUrl;
    return {
      title: "জিতে যাও । নতুন ডিমান্ড",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "জিতে যাও । নতুন ডিমান্ড",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "জিতে যাও । নতুন ডিমান্ড",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: current_url,
        },
      ],
    };
  },
};
</script>
