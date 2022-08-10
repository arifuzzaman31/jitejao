<template>
  <div>
    <b-container fluid>

      <div class="display-table">
        <div class="display-table-cell">
      <b-row class="bido-form-main bido-form-post-demand">
        <div
          class="col-md-3 d-none d-sm-block pl-0 position-relative post-demand-main post-demand-main"
        >
          <div class="bg-left">
            <div class="content p20">
              <NuxtLink to="/"
                ><img
                  src="~/assets/images/logo-footer.png"
                  class="img-fluid  mb-20"
                  width="100"
              /></NuxtLink> 
              <h4 class="mb-20">
                আপনার জন্য অপেক্ষা করছে শতাধিক বিক্রেতা
              </h4>
            </div>
            <div class="step-post-demand text-center">
              <ul>
                <li>
                  <div class="img-icon">
                    <img
                      src="~/assets/images/icon/demand-post-deamnd.svg"
                      class="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <h4>ডিমান্ড</h4>
                </li>
                <li>
                  <div class="img-icon">
                    <img
                      src="~/assets/images/icon/shortlist-post-deamnd.svg"
                      class="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <h4>বাছাই</h4>
                </li>
                <li>
                  <div class="img-icon">
                    <img
                      src="~/assets/images/icon/confirm-post-deamnd.svg"
                      class="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <h4>বিজয়ী</h4>
                </li>
              </ul>
            </div>

            <div class="img">
              <img
                src="~/assets/images/others/post-demand.svg"
                class="img-fluid mt-5 img-bg"
              />
            </div>
          </div>
        </div>

        <div
          class="col-md-4 col-lg-4 col-sm-5 mt-5 offset-md-2 align-self-center clearfix justify-margin-center-95"
        >
          <div class="logo-form text-center mb-15 mt-15">
            <NuxtLink to="/"
              ><img
                src="~/assets/images/logo-footer.png"
                class="img-fluid mt-5 mb-20"
                width="100"
            /></NuxtLink>
          </div>
          <div class="title text-center">
            <h3 class="text-black">ডিমান্ড আপডেট করুন</h3>
            <p></p>
          </div>

          <div class="step-progress mt-30 mb-30 form-demand-post">
            <b-progress :max="3">
              <b-progress-bar
                :value="currentStep"
                :label="`${replaceNumbersE2B(
                  ((currentStep / 3) * 100).toFixed(0)
                )}%`"
              ></b-progress-bar>
            </b-progress>
          </div>
          <div class="step step1" v-if="currentStep == 1">
            <div class="form-group clearfix">
                <div class="col-lg-4 col-md-12 mb-xs-15 photo-upload pl-0">
                  <label class="font-600 mb-5">ফটো ১ (অপশনাল)</label>
                  <div class="files">
                    <div class="file-content">
                      <input 
                        type="file"
                        class="p30"
                        @change="uploadImageOne($event)"
                      />
                      <img
                        v-if="form.new_image_one"
                        :src="form.new_image_one"
                        class="img img-fluid"
                      />
                      <img
                        v-else-if="form.image_one"
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
                </div>
                <!-- file upload -->
                <div class="col-md-4 mb-xs-15 photo-upload pl-0">
                  <label class="font-600 mb-5">ফটো ২ (অপশনাল)</label>
                  <div class="files">
                    <div class="file-content">
                      <input
                        type="file"
                        class="p30"
                        @change="uploadImageTwo($event)"
                      />
                      <img
                        v-if="form.new_image_two"
                        :src="form.new_image_two"
                        class="img img-fluid"
                      />
                      <img
                        v-else-if="form.image_two"
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
                <div class="col-md-4 photo-upload pl-0">
                  <label class="font-600 mb-5">ফটো ৩ (অপশনাল)</label>
                  <div class="files">
                    <div class="file-content">
                      <input
                        type="file"
                        class="p30"
                        @change="uploadImageThree($event)"
                      />
                      <img
                        v-if="form.new_image_three"
                        :src="form.new_image_three"
                        class="img img-fluid"
                      />
                      <img
                        v-else-if="form.image_three"
                        :src="form.image_three"
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
              <label class="font-600 mb-5" for=""
                >ক্যাটেগরি নির্বাচন করুন *</label
              >
              <multiselect
                v-model="form.category"
                :options="categories"
                :max="5"
                :custom-label="customCategoryLabel"
                placeholder="ক্যাটেগরি নির্বাচন করুন"
                selectedLabel="নির্বাচিত"
                track-by="id"
                class="select"
                @input="getQuantityUnit()"
              >
              </multiselect>
              <div class="text-danger" v-if="$v.form.category.$error">
                ডিমান্ড ক্যাটেগরি নির্বাচন করুন
              </div>
            </div>
            <div class="form-group">
              <label class="font-600 mb-5" for=""
                >আপনার প্রয়োজন সংক্ষেপে (টাইটেল) লিখুন *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="input-form form-control"
                placeholder="আমার ১০০ পিস টিশার্ট লাগবে..."
              />
              <div class="text-danger" v-if="!$v.form.title.maxLength">
                সর্বোচ্ছ ১০০ অক্ষর টাইটেল লিখতে পারবেন (বিস্তারিত লিখার
                টেক্সটবক্স পরবর্তী ধাপে পাবেন ) 
              </div>
              <div
                class="text-danger"
                v-if="$v.form.category.$error && !$v.form.title.required"
              >
                টাইটেল লিখুন 
              </div>
            </div>
          </div>
          <!-- step 1 -->
          <div v-if="currentStep == 2" class="step step2">
            <div class="form-group clearfix">
                <div class="col-md-6 mb-xs-15 pl-0 ">
                  <label class="font-600 mb-5" for="">পরিমাণ *</label>
                  <input
                    type="number"
                    v-model="form.quantity"
                    step="any"
                    class="form-control input-form"
                    placeholder="পরিমাণ"
                  />
                  <div class="text-danger mt-5" v-if="$v.form.quantity.$error">
                    পরিমাণ উল্লেখ করুন 
                  </div>
                </div>
                <div class="col-md-6 pl-0 pr-0">
                  <label class="font-600 mb-5" for="">পরিমাণের ধরণ *</label>
                  <select
                    v-model="form.quantity_unit"
                    :name="form.quantity_unit"
                    id=""
                    class="input-form form-control"
                  >
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
                    পরিমাণের ধরণ সিলেক্ট করুন 
                  </div>
                </div>
            </div>
            <div class="form-group clearfix">
              <div class="col-md-12 pl-0">
              <label class="font-600 mb-5" for="">বাজেট ? *</label>
              <br />
              <b-form-checkbox
                v-model="form.budget_type"
                name="check-button"
                switch
              >
                <b v-if="form.budget_type">হ্যাঁ</b>
                <b v-else>নেগেশিয়েবল</b>
              </b-form-checkbox>
            </div>
            </div>
            <div v-if="form.budget_type" class="form-group clearfix">
                <div class="col-md-6 mb-xs-15 pl-0">
                  <label class="font-600 mb-5" for="">সর্বনিম্ন বাজেট *</label>
                  <input
                    type="number"
                    step="any"
                    class="form-control input-form"
                    placeholder="সর্বনিম্ন  বাজেট"
                    v-model="form.minimum_budget"
                  />
                  <div class="text-danger mt-5" v-if="$v.form.minimum_budget.$error">
                    সর্বনিম্ন বাজেট উল্লেখ করুন 
                  </div>
                </div>

                <div class="col-md-6 pr-0 pl-0">
                  <label class="font-600 mb-5" for="">সর্বোচ্চ বাজেট *</label>
                  <input
                    type="number"
                    step="any"
                    class="form-control input-form"
                    placeholder="সর্বোচ্চ বাজেট"
                    v-model="form.maximum_budget"
                  />
                  <div class="text-danger mt-5" v-if="$v.form.maximum_budget.$error">
                    সর্বোচ্চ বাজেট উল্লেখ করুন 
                  </div>
                </div>
              </div>
          </div>

          <div class="step step3" v-if="currentStep == 3">
            <div class="form-group">
              <label class="font-600 mb-5" for=""
                >বিস্তারিত বর্ণনা করুন (অপশনাল)</label
              >
             <vue-editor v-model="form.description"></vue-editor>
               
              <!--<textarea
                v-model="form.description"
                class="form-control"
                style="height: 200px"
              ></textarea>-->

            </div>
            <div class="form-group">
              <label class="font-600 mb-5" for="">ডিমান্ড ডেডলাইন</label>
              <b-datepicker
                class="form-control"
                locale="en"
                :hide-header="true"
                v-model="form.expire_date"
                placeholder="ডেট সিলেক্ট করুন "
                style="line-height: 40px; opacity: 1"
                :date-disabled-fn="dateDisabled"
              >
              </b-datepicker>
            </div>
          </div>

          <div class="form-group mb-xs-100">
            <a
              class="btn button-small gradient-purple-secondary yallo-primary w-50 color-white"
              @click.prevent="previousStep"
              v-if="currentStep > 1"
            >
              আগের ধাপ
            </a>
            <a
              v-if="currentStep == 1"
              class="btn button-small gradient-purple-secondary bid-button w-100 color-white"
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
              @click.prevent="update()"
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
        </div>
      </b-row>
        </div>
      </div>
      <b-row>
        <ErrorModal :errors="validation_errors"></ErrorModal>
      </b-row>
    </b-container>
  </div>
</template>

<script>
let VueEditor;

if (process.client) {
  VueEditor = require("vue2-editor").VueEditor;
}
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
  layout: "nomenu",
  components: {
    VueEditor,
    Multiselect,
  },
  data() {
    return {
      form: {
        id: "",
        category: null,
        title: "",
        quantity: "",
        quantity_unit: "",
        minimum_budget: "",
        maximum_budget: "",
        total_price: "",
        budget_type: true,
        description: "",
        expire_date: "",
        image_one: "",
        image_two: "",
        image_three: "",
        new_image_one: "",
        new_image_two: "",
        new_image_three: "",
      },
      formSubmiting: false,
      validation_errors: null,
      currentStep: 1,
      uploadPercentage: 0,
      categories: [],
      quantity_units: [],
    };
  },
  validations: {
    form: {
      category: { required },
      title: { required, maxLength: maxLength(100) },
      quantity: { required },
      quantity_unit: { required },
      minimum_budget: {
        required: requiredIf(function () {
          return this.form.budget_type;
        }),
      },
      maximum_budget: {
        required: requiredIf(function () {
          return this.form.budget_type;
        }),
      },
    },
  },

  mounted() {
    this.getCategoryList();
    this.getDemandById();
  },

  methods: {
    getDemandById() {
      this.$axios
        .$get(
          "demand/" + this.$route.params.id + "/edit/" + this.$route.params.slug
        )
        .then((response) => {
          this.form.id = response.data.id;
          this.quantity_units = new Array(response.data.quantity_unit);
          this.form.category = response.data.category;
          this.form.title = response.data.title;
          this.form.quantity = response.data.quantity;
          this.form.quantity_unit = response.data.quantity_unit_id;
          this.form.minimum_budget = response.data.minimum_budget;
          this.form.maximum_budget = response.data.maximum_budget;
          // this.form.total_price = response.data.
          this.form.budget_type = response.data.budget_type;
          this.form.description = response.data.description;
          this.form.expire_date = response.data.expire_date;
          this.form.image_one = response.data.image_one_small;
          this.form.image_two = response.data.image_two_small;
          this.form.image_three = response.data.image_three_small;
        });
    },
    // upload image
    uploadImageOne(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.new_image_one = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImageTwo(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.new_image_two = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImageThree(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.new_image_three = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    getCategoryList() {
      this.$axios
        .$get("category-list?no_pagination=yes&status=1")
        .then((response) => {
          this.categories = response.data;
        });
    },

    getQuantityUnit() {
      if (this.form.category) {
        this.form.quantity_unit = "";
        this.$axios
          .$get("category-unit/" + this.form.category.id)
          .then((response) => {
            this.quantity_units = response;
            // console.log(response)
          });
      }
    },

    goToStepTwo() {
      this.$v.form.category.$touch();
      this.$v.form.title.$touch();
      if (this.$v.form.category.$invalid || this.$v.form.title.$invalid) {
        return;
      }
      this.currentStep = 2;
    },
    goToStepThree() {
      this.$v.form.quantity.$touch();
      this.$v.form.quantity_unit.$touch();
      this.$v.form.minimum_budget.$touch();
      this.$v.form.maximum_budget.$touch();
      if (
        this.$v.form.quantity.$invalid ||
        this.$v.form.quantity_unit.$invalid ||
        this.$v.form.minimum_budget.$invalid ||
        this.$v.form.maximum_budget.$invalid
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
    update() {
      this.formSubmiting = true;
      this.$nuxt.$loading.start();
      this.$axios
        .$post("/demand/update", this.form)
        .then((response) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (response.status == "success") {
            this.clearField();
            this.toastMessage(response);
            this.$router.push("/demand/" + response.demand_id );
          }
        })
        .catch((error) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
            console.log(error.response.data);
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
        quantity: "",
        quantity_unit: "",
        minimum_budget: "",
        maximum_budget: "",
        total_price: "",
        budget_type: true,
        description: "",
        expire_date: "",
        image_one: "",
        image_two: "",
        image_three: "",
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
};
</script>


<style scoped>

.bido-form-main.bido-form-post-demand {
  height: 100%;
  position: absolute !important;
  width: 100%;
}

/* .progress-bar {
  background-image: linear-gradient(to right, #fb589c, #b3034c);
} */
.post-demand-main{
  background-image: linear-gradient( to top, rgb(240, 220, 229), rgb(247, 226, 235) ) !important;
}
.post-demand-main::before {
  width: 129px;
  height: auto;
  background-image: url("~assets/images/post-demand-bg.svg");
  top: 0;
  position: absolute;
  background-repeat: no-repeat;
  content: "";
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
.step-post-demand ul {
  position: relative;
}
.step-post-demand ul::before {
  content: "";
  background: #fff;
  height: 3px;
  width: 66%;
  position: absolute;
  top: 20px;
  left: 62px;
}
.step-post-demand ul li {
  margin-bottom: 30px;
  transition: 1s ease all;
}
.step-post-demand ul li.active i {
  /* background: chocolate; */
  box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255), 0 0 60px #ffffff,
    0 0 70px #ffffff, 0 0 80px #ffffff;
  -webkit-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  -moz-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  -ms-box-shadow: 0 0 40px #ffffff, 0 0 50px rgb(255, 255, 255),
    0 0 60px #ffffff, 0 0 70px #ffffff, 0 0 80px #ffffff;
  color: #000;
  opacity: 0.5;
}
.step-post-demand ul li {
  color: #fff;
  font-weight: 500;
  font-size: 21px;
  width: 32%;
  display: inline-block;
  text-align: center;
}
.step-post-demand ul li .img-icon {
  /* display: block; */
  background-color: #fff;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  color: #007bff;
  border-radius: 50px;
  line-height: 40px;
  margin-bottom: 20px;
  font-size: 16px;
}
.step-post-demand ul li h2 {
  font-weight: 500;
  color: #fff;
}
/* .step-post-demand ul::before {
} */

.step-post-demand ul li:nth-child(1) .img-icon {
  animation-delay: -3s;
  -webkit-animation-delay: -3s;
  -moz-animation-delay: -3s;
  -ms-animation-delay: -3s;
}
.step-post-demand ul li:nth-child(2) .img-icon {
  animation-delay: -1s;
  -webkit-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -ms-animation-delay: -1s;
}
.step-post-demand ul li:nth-child(3) .img-icon {
  animation-delay: -0.7s;
  -webkit-animation-delay: -0.7s;
  -moz-animation-delay: -0.7s;
  -ms-animation-delay: -0.7s;
}

.step-post-demand ul li .img-icon {
  animation: animate 1.7s ease-in-out infinite;
  -webkit-animation: animate 1.7s ease-in-out infinite;
  -moz-animation: animate 1.7s ease-in-out infinite;
  -ms-animation: animate 1.7s ease-in-out infinite;
}
@keyframes animate {
  0%,
  40%,
  100% {
    transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
  }
  20% {
    transform: scale(1.5, 1.5);
    -webkit-transform: scale(1.5, 1.5);
    -moz-transform: scale(1.5, 1.5);
    -ms-transform: scale(1.5, 1.5);
  }
}
.form-demand-post .progress-bar {
    background-image: linear-gradient(90deg,#e3106e,#a20b4f) !important;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>