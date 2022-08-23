<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title mb-20 mt-30">
          <h3>এক্সটেন্ড সাবস্ক্রিপশন</h3>
        </div>
      </b-row>

      <!-- skeleton  -->
      <b-row v-if="isPriceLoading">
        <div class="col-md-4 mt-3" v-for="value in 6" :key="'numxg' + value">
          <b-skeleton type="image" height="100px"></b-skeleton>
        </div>
      </b-row>
      <!-- skeleton  -->

      <b-row v-if="step == 0">
        <div class="col-md-4" v-for="plan in plans" :key="'plan' + plan.id">
          <div
            class="dashboard-card-list bg-blue-gray p20 clearfix br-5 mb-30"
            @click="selectPackage(plan)"
            :class="{ paymentcardactive: form.package_id == plan.id }"
          >
            <div class="img-icon float-r">
              <h2 class="title">
                {{ replaceNumbersE2B(plan.total_month) }} মাস
              </h2>
              <span class="save-discount color-black br-50 p10 pt-0 pb-0"
                >সেভ {{ replaceNumbersE2B(plan.discount) }}৳</span
              >
            </div>
            <div class="dashboard-card-content text-right">
              <h1 class="title">{{ replaceNumbersE2B(plan.final_amount) }}৳</h1>
              <h2 class="pryment-descount">
                <span v-if="plan.discount > 0"
                  >{{ replaceNumbersE2B(plan.total_amount) }}৳</span
                >
                <span v-else>0৳</span>
              </h2>
            </div>
          </div>
        </div>
        <!-- pricing 1 -->

        <div class="col-md-12">
          <div class="profile-btn md-15 w-100">
            <a
              href=""
              @click.prevent="goStepTwo()"
              class="btn button-small primary-button bid-button w-xs-100 float-r"
            >
              পরবর্তী ধাপ
            </a>
          </div>
        </div>
      </b-row>

      <b-row v-if="step == 1">
        <div class="col-md-6 offset-md-3">
          <div
            class="info table-responsive bg-blue-gray p20 payment-order-table br-5"
          >
            <div class="payment-order-id mb-30">
              <h3>পেমেন্টের তথ্য</h3>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td scope="row">
                    <h4>মাস</h4>
                  </td>
                  <td>
                    <h4 class="fw-600">
                      {{ replaceNumbersE2B(Number(form.month)) }}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <h4>সাবটোটাল</h4>
                  </td>
                  <td>
                    <h4 class="fw-600">
                      {{
                        replaceNumbersE2B(Number(form.before_coupon_amount))
                      }}৳
                    </h4>
                  </td>
                </tr>

                <tr v-if="is_coupon">
                  <td scope="row">
                    <h4>কুপন কোড</h4>
                  </td>
                  <td>
                    <h4 class="fw-600">
                      <span>{{
                        replaceNumbersE2B(
                          Number(form.coupon_discount) + couponDiscount
                        )
                      }}</span
                      >৳
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td scope="row">
                    <h4>টোটাল</h4>
                  </td>
                  <td>
                    <h3 class="fw-600">
                      <input
                        type="hidden"
                        :value="
                          (form.final_amount =
                            form.before_coupon_amount - form.coupon_discount)
                        "
                      />
                      {{
                        replaceNumbersE2B(
                          Number(form.final_amount) - couponDiscount
                        )
                      }}৳
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td v-if="!is_coupon">
                    <div
                      class="text-danger"
                      v-if="$v.coupon_form.coupon_code.$error"
                    >
                      একটি কুপন কোড দিন 
                    </div>
                    <div class="coupon-apply">
                      <input
                        type="text"
                        class="form-control input-form"
                        placeholder="কুপন কোড"
                        v-model="coupon_form.coupon_code"
                      />
                      <button
                        type="submit"
                        @click.prevent="applyCoupon()"
                        class="button button-sm bg-blue-op-20 color-blue w-xs-100 ml-10 w-50"
                      >
                        এপ্লাই 
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-12">
            <div class="profile-btn">
              <a
                href=""
                @click.prevent="step = 0"
                class="btn button-small primary-button bid-button w-xs-50 float-l"
              >
                আগের ধাপ
              </a>
              <a
                href=""
                @click.prevent="save()"
                class="btn button-small primary-button bid-button w-xs-50 float-r"
              >
                পরবর্তী ধাপ
              </a>
            </div>
          </div>
        </div>
      </b-row>
      <b-row v-if="step == 2">
        <div class="col-md-6 offset-md-3">
          <div
            class="info table-responsive bg-white p20 payment-order-table br-5"
          >
            <div class="payment-order-id mb-30">
              <h3>
                আপনার পেমেন্ট আইডি
                <span class="badge bg-green-op-20 color-green"
                  >{{ payment.id }}
                </span>
              </h3>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td scope="row">
                    <h4>মাস</h4>
                  </td>
                  <td>
                    <h4 class="fw-600">
                      {{ replaceNumbersE2B(Number(payment.total_month)) }}
                    </h4>
                  </td>
                </tr>

                <!-- <tr>
                <td scope="row">
                  <h3>সাবটোটাল</h3>
                </td>
                <td>
                  <h3 class="fw-600">
                    {{ replaceNumbersE2B(Number(payment.total_month)) }}৳
                  </h3>
                </td>
              </tr>
              <tr>
                <td scope="row">
                  <h3>কুপন কোড</h3>
                </td>
                <td>
                  <h3 class="fw-600">
                    {{ replaceNumbersE2B(Number(form.coupon_discount)) }}৳
                  </h3>
                </td>
              </tr> -->

                <tr>
                  <td scope="row">
                    <h4>টোটাল</h4>
                  </td>
                  <td>
                    <h4 class="fw-600">
                      {{ replaceNumbersE2B(Number(payment.final_amount)) }}৳
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-12">
            <div class="profile-btn">
              <a
                href=""
                class="btn button-small primary-button bid-button w-xs-100 float-r"
                @click.prevent="PayNow()"
              >
                অনলাইন পেমেন্ট
              </a>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>
​
<script>
import { SSLPayment } from "~/plugins/ssl.js";
import { validationMixin } from "vuelidate";
const { required, requiredIf } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  middleware: "auth",
  data() {
    return {
      formSubmiting: false,
      selected: undefined,
      form: {
        package_id: "",
        coupon_id: "",
        coupon_code: "",
        charge_per_month: 0,
        total_charge: 0,
        month: 0,
        primary_discount: 0,
        coupon_discount: 0,
        before_coupon_amount: 0,
        final_amount: 0,
      },

      payment_setting: {},
      payment: {},
      step: 0,
      payment_url: null,
      validation_errors: null,
      plans: [],
      is_coupon: false,
      coupon_form: {
        coupon_code: "",
      },
      coupon_errors: {},
      applied_coupon: {
        amount: 0,
        amount_type: 1,
        coupon_code: "",
        max_amount_limit: 0,
      },
      isPriceLoading: false,
    };
  },
  created() {
    // this.getPaymentSetting();
    this.getPaymentPlan();
    this.getAppliedCoupon();
  },

  validations: {
    coupon_form: {
      coupon_code: { required },
    },
  },

  computed: {
    couponDiscount() {
      if (this.is_coupon) {
        //  if discount type is amount
        if (this.applied_coupon.amount_type == 1) {
          return this.applied_coupon.amount;
        } else {
          //  discount type is percentage
          let percentageAmount =
            (this.form.before_coupon_amount * this.applied_coupon.amount) / 100;
          // if percentage greater then maiximum amount
          if (percentageAmount > this.applied_coupon.max_amount_limit) {
            return this.applied_coupon.max_amount_limit;
          }

          return percentageAmount;
        }
      }

      return 0;
    },
  },
  methods: {
    selectPackage(plan) {
      this.form.package_id = plan.id;
      this.form.total_charge = plan.total_amount;
      this.form.primary_discount = plan.discount;
      this.form.month = plan.total_month;
      this.form.before_coupon_amount = plan.final_amount;
      this.form.final_amount = plan.final_amount;
    },
    goStepTwo() {
      if (this.form.package_id !== "") {
        this.step = 1;
      } else {
        this.modalMessage({
          status: "error",
          message: "একটি পেকেজ নির্বাচন করুন ",
        });
      }
    },
    save() {
      this.formSubmiting = true;
      this.$axios
        .$post("/payment", this.form)
        .then((response) => {
          this.formSubmiting = false;
          if (response.status === "success") {
            this.payment = response.order;
            this.step = 2;
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.formSubmiting = false;
            this.validation_errors = error.response.data.errors;
            // this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    // discountAmount(type, discount, main_amount) {
    //   if (discount <= 0) {
    //     return 0;
    //   }
    //   if (
    //     this.payment_setting.discount_status == 1 &&
    //     Number(this.form.month) >=
    //       Number(this.payment_setting.discount_for_month)
    //   ) {
    //     if (type == 1) {
    //       return parseFloat((discount / 100) * main_amount).toFixed(2);
    //     } else {
    //       return parseFloat(discount).toFixed(2);
    //     }
    //   }
    //   return 0;
    // },
    applyCoupon() {
      this.$v.coupon_form.$touch();
      if (this.$v.coupon_form.$invalid) {
        return;
      }
      this.$axios.$post("apply/coupon", this.coupon_form).then((response) => {
        if (response.status === "success") {
          // call success message
          // console.log(response)
          this.toastMessage(response);
          this.getAppliedCoupon();
        } else {
          //  this.successMessage();
          this.modalMessage(response);
        }
      });
    },
    getAppliedCoupon() {
      this.$axios.$get("user/coupon").then((response) => {
        if (response.status === "error") {
          this.is_coupon = false;
        } else {
          this.is_coupon = true;
          this.applied_coupon = response;
          this.form.coupon_id = response.id;
          this.form.coupon_code = response.coupon_code;
        }
      });
    },
    // getPaymentSetting() {

    //   this.$axios.$get("payment/setting").then((response) => {
    //     this.payment_setting = response;
    //     this.isPriceLoading = false;
    //   });
    // },
    getPaymentPlan() {
      this.isPriceLoading = true;
      this.$axios.$get("/subscription-plan-list").then((response) => {
        this.isPriceLoading = false;
        this.plans = response;
      });
    },
    PayNow() {
      this.$axios
        .post("/pay-online", { order: this.payment.id })
        .then((response) => {
          this.payment_url = response.data.data;
          // console.log(response.data.data);
          SSLPayment.OpenModal(this.payment_url, response.data.logo);
          // window.location.replace(this.payment_url);
        })
        .catch((error) => {
          alert("erorr");
        });
    },
  },
};
</script>
​
<style >
.dashboard-card-list {
  cursor: pointer;
  border: 1px solid #f0eeee;
}
.paymentcardactive {
  background: linear-gradient(to right, #7d4196, #ff3494);
  background: -webkit-linear-gradient(to right, #7d4196, #ff3494);
  background: -moz-linear-gradient(to right, #7d4196, #ff3494);
  background: -ms-linear-gradient(to right, #7d4196, #ff3494);
}
.paymentcardactive .pryment-descount span,
.paymentcardactive .title {
  color: rgb(255, 255, 255) !important;
}
.pryment-descount {
  text-decoration: line-through;
  font-weight: 500;
}
.save-discount {
  background-color: rgba(236, 233, 233, 0.787);
}
.table-payment-order-id {
  margin-bottom: 30px;
}
.payment-order-table tr td {
  padding: 10px;
}
.coupon-apply {
  display: flex;
}
.coupon-apply .form-control {
  height: 42px;
}
</style>