<template>
  <div>
    <b-container fluid>
      <div class="position-relative">
        <div class="shapes-container">
          <div class="bg-box-rectangle-signup"></div>
        </div>
      </div>

      <div class="display-table">
        <div class="display-table-cell">
          <b-row class="bido-form-main">
            <div
              class="col-md-3 d-none d-sm-block pl-0 position-relative"
              style="
                background-image: linear-gradient(to top, #25aae1, #4481eb);
              "
            >
              <div class="bg-left">
                <div class="content p20 text-center">
                  <NuxtLink to="/"
                    ><img
                      src="~/assets/images/logo-footer.png"
                      class="img-fluid mt-5 mb-50"
                      width="100"
                  /></NuxtLink>
                  <h2 class="color-white mb-20">খুলে যাক ব্যবসার সকল দুয়ার</h2>
                  <p class="color-white">
                  </p>
                </div>
                <div class="img">
                  <img
                    src="~/assets/images/others/signup.svg"
                    class="img-fluid mt-5 img-bg"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-md-5 col-lg-4 col-sm-6 mt-5 offset-md-2 offset-lg-2 align-self-center justify-margin-center-95"
            >
              <div class="logo-form text-center mb-30">
                <NuxtLink to="/"
                  ><img
                    src="~/assets/images/logo-footer.png"
                    class="img-fluid mt-5 mb-20"
                    width="100"
                /></NuxtLink>
              </div>
              <div class="title text-center">
                <h2 class="text-black ">রেজিস্ট্রেশন</h2>
                <p></p>
              </div>
              <hr class="w-90 m-auto mt-10" />
              <div class="step-progress mt-30 mb-40">
                <b-progress :max="max">
                  <b-progress-bar
                    :value="currentStep"
                    :label="`${replaceNumbersE2B(
                      ((currentStep / max) * 100).toFixed(0)
                    )}%`"
                  ></b-progress-bar>
                </b-progress>
              </div>

              <div class="step step1 mt-30" v-if="currentStep == 1">
                <div class="form-group">
                  <label class="font-600 mb-5" for="">আপনার নাম / কোম্পানি নাম  *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="input-form form-control"
                    placeholder="আপনার নাম / কোম্পানি"
                  />
                  <div class="text-danger mt-5" v-if="$v.form.name.$error">
                    আপনার নাম লিখুন 
                  </div>
                </div>
                <div class="form-group">
                  <label class="font-600 mb-5" for=""
                    >আপনার লোকেশন সিলেক্ট করুন *</label
                  >
                  <multiselect
                    v-model="form.area"
                    :options="areas"
                    :custom-label="customAreaLabel"
                    placeholder="আপনার লোকেশন সিলেক্ট করুন"
                    label="area_name"
                    track-by="id"
                    class="select"
                  ></multiselect>
                  <div class="text-danger mt-5" v-if="$v.form.area.$error">
                    আপনার লোকেশন সিলেক্ট করুন 
                  </div>
                </div>
                <!-- <div class="form-group">
                  <label class="font-600 mb-5" for=""
                    >ক্রেতার পাশাপাশি আপনি কি বিক্রিতা ও হতে চান ?</label
                  >
                  <br />
                  <b-form-checkbox
                    v-model="form.is_seller"
                    name="check-button"
                    switch
                  >
                    <b v-if="form.is_seller">হ্যাঁ</b>
                    <b v-else>না </b>
                  </b-form-checkbox>
                </div> -->

                <!-- <div class="form-group">
                  <label class="font-600 mb-5" for=""
                    >আপনি কোন ক্যাটেগরিতে সেল / কিনতে আগ্রহী ?</label
                  >
                  <multiselect
                    v-model="form.category"
                    :options="categories"
                    :multiple="true"
                    :max="5"
                    :custom-label="customCategoryLabel"
                    placeholder="আপনি কোন ক্যাটেগরিতে সেল / কিনতে আগ্রহী"
                    selectedLabel="নির্বাচিত"
                    track-by="id"
                  > -->
                    <!-- <slot name="maxElements"> </slot> -->
                    <!-- <span slot="maxElements"
                      >আপনি সর্বোচ্চ ৫ টি ক্যাটাগরিতে সেল  পারবেন</span
                    >
                  </multiselect>
                  <div class="text-danger mt-5" v-if="$v.form.category.$error">
                    সর্বনিম্ন একটি ক্যাটাগরি হলেও সিলেক্ট করুন 
                  </div>
                </div> -->
              </div>

              <div class="step step1" v-if="currentStep == 2">
                <div class="form-group">
                  <label class="font-600 mb-5" for=""
                    >আপনার মোবাইল নাম্বার দিন *</label
                  >
                  <input
                    v-model="form.mobile_no"
                    type="text"
                    class="input-form form-control"
                    placeholder="আপনার মোবাইল নাম্বার দিন  "
                    @keypress.enter="goToStepThree()"
                  />
                  <span class="text-danger" v-if="validation_errors && validation_errors.mobile_no">
                    {{validation_errors.mobile_no[0]}}
                  </span>
                  <div class="text-danger" v-if="$v.form.mobile_no.$error">
                    সঠিক বাংলাদেশি মোবাইল নাম্বার দিন 
                  </div>
                </div>
              </div>

              <div class="step step1 text-center" v-if="currentStep == 3">
                <div class="form-group">
                  <p class="mb-10" for="">
                    আপনার মোবাইল নম্বরে পাঠানো ওটিপি কোড দিন *
                  </p>
                  <v-otp-input
                    ref="otpInput"
                    input-classes="form-control otp-control m5 text-center"
                    separator="-"
                    :num-inputs="4"
                    :should-auto-focus="true"
                    :is-input-num="true"
                    @on-complete="setOtpCode"
                    style="display: inline-flex"
                  />
                </div>
                <div class="form-group">
                  <a href="" v-if="countDown > 0">
                    {{ replaceNumbersE2B(countDown) }} সেকেন্ডের মধ্যে কোড দিন
                  </a>
                  <a href="" v-else>আবার কোড পাঠান </a>
                  <p class="mt-10">
                    <a
                      class="color-dark-blue text-underline"
                      href=""
                      @click.prevent="otpStatus = 0"
                      >অথবা মোবাইল নাম্বার পৰিবৰ্তন করুন
                    </a>
                  </p>
                </div>
              </div>

              <div class="form-group mt-30">
                <a
                  v-if="currentStep > 1"
                  class="btn button-small gradient-purple-secondary yallo-primary w-50 color-white"
                  @click.prevent="previousStep"
                 
                >
                  আগের ধাপ
                </a>
                <!-- step 1 button  -->
                <a
                  v-if="currentStep == 1"
                  class="btn button-small primary-button bid-button w-100"
                  @click.prevent="goToStepTwo()"
                >
                  কন্টিনিউ
                </a>
                <a
                  v-if="currentStep == 2"
                  class="btn button-small primary-button bid-button w-50"
                  @click.prevent="goToStepThree()"
                   style="margin-left: 1px"
                >
                  কন্টিনিউ
                </a>
                <!-- step 1 button  -->
                <button
                  v-if="currentStep == 3"
                  @click="register"
                  class="btn button-small primary-button bid-button w-50"
                >
                  কন্টিনিউ
                </button>
              </div>
              <div class="text-center mb-xs-100">
                <NuxtLink
                  class="color-dark-blue text-underline"
                  to="/login"
                  @click.prevent="otpStatus = 0"
                  >লগইন করুন
                </NuxtLink>
              </div>
            </div>
          </b-row>
        </div>
      </div>
      <!-- <ErrorModal :errors="validation_errors"></ErrorModal> -->
    </b-container>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { validationMixin } from "vuelidate";
const { required, requiredIf, minLength } = require("vuelidate/lib/validators");
const phoneNumber = (value) => {
  return /(01)[0-9]{9}/.test(value);
};

export default {
  mixins: [validationMixin],
  components: { Multiselect },
  middleware: "auth",
  auth: "guest",
  layout: "nomenu",

  data() {
    return {
      form: {
        name: "",
        mobile_no: "",
        is_seller: false,
        otp_code: "",
        area: null,
        category: null,
      },
      registering: false,
      sending_otp: false,
      countDown: 120,
      currentStep: 1,
      max: 3,
      areas: [],
      categories: [],
      validation_errors: null,
    };
  },

  validations: {
    form: {
      name: { required },
      mobile_no: { required, phoneNumber },
      area: { required },
      otp_code: { required, minLength: minLength(4) },
      // category: {
      //   required: requiredIf(function () {
      //     return this.form.is_seller;
      //   }),
      // },
    },
  },
  mounted() {
    this.getCategoryList();
    this.getAreaList();
  },
  methods: {
    getCategoryList() {
      this.$axios
        .$get("category-list?no_pagination=yes&status=1")
        .then((response) => {
          this.categories = response.data;
        });
    },
    getAreaList() {
      this.$axios
        .$get("area-list?no_pagination=yes&status=1")
        .then((response) => {
          this.areas = response;
        });
    },
    goToStepTwo() {
      // this.$v.form.category.$touch();
      this.$v.form.area.$touch();
      this.$v.form.name.$touch();
      if (
        // this.$v.form.category.$invalid ||
        this.$v.form.area.$invalid ||
        this.$v.form.name.$invalid
      ) {
        return;
      }
      this.currentStep = 2;
    },

    goToStepThree() {
      this.$v.form.mobile_no.$touch();
      if (this.$v.form.mobile_no.$invalid) {
        return;
      }
      this.sending_otp = true;
      this.$axios
        .$post("/register/otp", this.form)
        .then((response) => {
          this.sending_otp = false;
         
          // if (response.status === "success") {
          this.currentStep = 3;
          this.countDown = 120;
          this.countDownTimer();
          this.form.otp_code = "";
          this.countDownTimer();
          // }
        })
        .catch((error) => {
          this.sending_otp = false;
          if (error.response.status == 422) {
            // this.modalMessage();
            this.validation_errors = error.response.data.errors;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
      }
    },
    customAreaLabel({ area_name, area_english_name }) {
      return `${area_name} — (${area_english_name})`;
    },
    customCategoryLabel({ name, english_name }) {
      return `${name} — (${english_name})`;
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    setOtpCode(code) {
      this.form.otp_code = code;
    },

    register() {
      this.$v.form.otp_code.$touch();
      if (this.$v.form.otp_code.$invalid) {
        return;
      }
      this.registering = true;
      this.$axios
        .$post("/register", this.form)
        .then((response) => {
          this.registering = false;
          if (response.status === "success") {
            this.$auth.setUserToken(response.token);
            this.$auth.setUser(response.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.registering = false;
            // this.modalMessage();
            this.validation_errors = error.response.data.errors;
            // this.$bvModal.show("errorModal");
            this.modalMessage(error.response.data);
          }
        });
    },
    clearField() {
      this.form = {
        name: "",
        mobile_no: "",
        is_seller: false,
        otp_code: "",
        area: null,
        category: null,
      };
      this.registering = false;
      this.sending_otp = false;
      this.countDown = 120;
      this.currentStep = 1;
      this.validationError = null;
    },
  },
  head: {
    title: "রেজিষ্ট্রেশন - বিড বাজার ",
  },
};
</script>

<style  scoped>
.bido-form-main {
  height: 100%;
  position: fixed;
  width: 100%;
}

.bido-form-main .bg-left .content h3 {
  font-size: 25px;
}

.bido-form-main .bg-left .content p {
  width: 79%;
  margin: 0 auto;
}

.bido-form-main .bg-left img.img-bg {
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.shapes-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
}
.bg-box-rectangle-signup {
  /* transform: translate3d(-55%, 21%, 0) rotate(54deg);
  -webkit-transform: translate3d(-55%, 21%, 0) rotate(54deg);
  -moz-transform: translate3d(-55%, 21%, 0) rotate(54deg);
  -ms-transform: translate3d(-55%, 21%, 0) rotate(54deg);
  background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -webkit-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -moz-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -ms-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  width: 665px;
  height: 664px;
  border-radius: 120px;
  position: absolute;
  right: 11px; */
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>