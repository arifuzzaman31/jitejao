<template>
  <div>
    <b-container class="dashboard">
      <ProfileMenu />

      <b-row class="mt-30-xs">
        <div class="col-md-6 offset-md-3">
          <div class="bg-gray-op-50 p20 payment-order-table br-5">
            <div class="title mb-30">
              <h3 for="">পয়েন্ট এড করুন</h3>
            </div>
            <div class="step1" v-if="step == 0">
              <div class="form-group mt-2">
                <h4 for="" class="mb-10">
                  <span class="color-purple"></span>
                  <span class="float-r color-purple">( ১পয়েন্ট = ১টাকা )</span>
                </h4>
                <input
                  class="form-control"
                  type="number"
                  v-model="form.points"
                  placeholder="পয়েন্ট অ্যাড করুন"
                />
                <div class="text-danger" v-if="$v.form.points.$error">
                  ভ্যালিড নন জিরো এমাউন্ট দিন
                </div>
              </div>
              <div class="form-group mt-30 clearfix float-r">
                <button class="btn btn-primary" @click="paymentInitiate">
                  পরবর্তী ধাপ
                </button>
              </div>
            </div>
            <div class="step2" v-if="step == 1">
              <div class="form-group mt-2">
                <h4 for="">
                  <span>পেমেন্ট আইডি</span>
                  <span class="float-r color-purple">
                    {{ payment.id }}
                  </span>
                </h4>
              </div>
              <div class="form-group mt-2">
                <h4 for="">
                  <span>মোট পয়েন্ট <span class="color-purple">( ১ পয়েন্ট = ১টাকা )</span></span
                  >
                  <span class="float-r">{{ replaceNumbersE2B(form.points) }}</span>
                </h4>
              </div>
              <div class="form-group mt-2">
                <h4 for="">
                  <span>খরচ হবে </span>
                  <span class="float-r">{{ replaceNumbersE2B(form.points) }}৳</span>
                </h4>
                <!-- <span class="badge badge-sucess"></span> -->
              </div>
              <div class="form-group mt-30 float-r">
                <button class="btn btn-primary" @click="PayNow()">
                  পেমেন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { SSLPayment } from "~/plugins/ssl.js";
import { validationMixin } from "vuelidate";
const { required, numeric, minValue } = require("vuelidate/lib/validators");
export default {
  middleware: "auth",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        points: 100,
      },
      formSubmiting: false,
      payment: {},
      step: 0,
    };
  },

  validations: {
    form: {
      points: { required, numeric },
    },
  },

  methods: {
    paymentInitiate() {
      this.$v.form.points.$touch();
      if (this.$v.form.points.$invalid) {
        return;
      }
      this.formSubmiting = true;
      this.$axios
        .$post("/add-point", this.form)
        .then((response) => {
          this.formSubmiting = false;
          if (response.status === "success") {
            this.payment = response.order;
            this.step = 1;
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

    PayNow() {
      this.$axios
        .post("/point-payment", { order: this.payment.id })
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

  head() {
    return {
      title: "বিডো । এড পয়েন্ট",
    };
  },
};
</script>

<style>
.payment-history table {
  border-collapse: separate;
}
.payment-history thead tr th {
  font-weight: 600 !important;
}
.payment-history thead tr th,
.payment-history tbody tr td {
  padding: 0.75rem;
  text-align: center;
}

.payment-history tbody tr td {
  width: 0 !important;
  vertical-align: middle;
}
.payment-history thead tr th,
.payment-history tbody tr td {
  /* background-color: #fff; */
}
.payment-history thead tr th {
  /* border-bottom: 1px solid #ddd; */
  border-radius: 5px;
}
.payment-history .payment-pending,
.payment-history .payment-complete {
  padding: 4px 10px;
  border-radius: 5px;
}
</style>