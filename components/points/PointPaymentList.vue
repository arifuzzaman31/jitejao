<template>
<div>
      <b-row>
        <div class="col-md-12" v-if="$route.query.payment">
          <b-alert
            show
            dismissible
            :variant="$route.query.payment == 'success' ? 'success' : 'danger'"
          >
            <b v-if="$route.query.payment == 'success'"
              >ধন্যবাদ আপনার পয়েন্ট সফলভাবে এড হয়েছে</b
            >
            <b v-else>আপনার পেমেন্ট সফল হয়নি</b>
          </b-alert>
        </div>
      </b-row>

      <b-row class="mt-30-xs">
        <div class="col-lg-6 col-sm-6 xs-mb15 mb-30">
          <div
            class="dashboard-card-list dashboard-payment-card card-gradient-blue p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/wallet-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <!-- <h4 class="color-white mb-5">পয়েন্ট প্রাইস</h4> -->
              <h3 class="color-white mb-5">১ পয়েন্ট = ১টাকা</h3>
              <NuxtLink
                to="/dashboard/point"
                class="button button-sm font-b bg-white color-dark-blue"
                >পয়েন্ট এড করুন
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 xs-mb15 mb-30">
          <div
            class="dashboard-card-list dashboard-payment-card card-gradient-red p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/wallet-white-money.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h2 class="color-white mb-5">পয়েন্টস</h2>
              <p class="color-white mb-5">
                বর্তমান ব্যালেন্স:
                {{ replaceNumbersE2B($auth.user.current_point) }}
              </p>
              <!-- <button
                v-b-modal="'withdrawModal'"
                class="button button-sm font-b bg-white color-dark-blue"
                 v-if="$auth.user.current_point > 0">উইথড্র 
              </button>
              <NuxtLink
                to="/dashboard/point"
                class="button button-sm font-b bg-white color-dark-blue"
                 v-else >পয়েন্ট এড করুন
              </NuxtLink> -->
            </div>
          </div>
        </div>
      </b-row>
      <!-- dashboard card end -->
      <!-- <PaymentList /> -->
      
  <b-row>
    <div class="col-md-12">
      <div class="dashboard-title mb-20">
        <h3>পয়েন্ট এড হিস্টরি</h3>
      </div>
    </div>
    <div class="col-md-12">
      <div class="dashboard-payment">
        <div class="payment-history">
          <div responsive class="table-responsive">
            <table class="table">
              <thead v-if="paymentList.data && paymentList.data.length > 0">
                <tr>
                  <th scope="col">এমাউন্ট</th>
                  <th scope="col">মেথড</th>
                  <th scope="col">পয়েন্টস</th>
                  <th scope="col">মোড</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="payment in paymentList.data"
                  :key="'payment' + payment.id"
                >
                  <td scope="row">
                    <span>{{ replaceNumbersE2B(payment.total_amount) }}৳ </span>
                  </td>
                  <td scope="row">
                    <div class="method-name">
                      <!-- <NuxtLink to="">
                        <img
                          class="img-fluid rounded-circle img-method"
                          src="~/assets/images/payment/bkash.svg"
                          alt=""
                        />
                      </NuxtLink> -->
                      <div class="content">
                        <span
                          >{{
                            payment.card_type
                              ? payment.card_type.split("-")[0]
                              : ""
                          }}
                          (PID : {{ payment.id }})</span
                        >
                      </div>
                    </div>
                  </td>
                  <td scope="row">
                    <span>{{ replaceNumbersE2B(payment.total_points) }}</span>
                  </td>
                  <td scope="row">
                    <span
                      class="payment-complete text-center"
                      :class="
                        payment.payment_mode == 1
                          ? 'bg-green-op-20 color-green'
                          : 'bg-blue-op-20 color-blue'
                      "
                      >{{ payment.payment_mode_text }}</span
                    >
                  </td>
                </tr>
              </tbody>
              <PaymentListSkelton v-if="$fetchState.pending" />
            </table>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-12 text-center mb-3"
      v-if="paymentList.meta && paymentList.meta.last_page != current_page"
    >
      <button
        @click.prevent="onLoadMore()"
        class="btn button-small primary-button bid-button"
      >
        <b-spinner type="grow" v-if="$fetchState.pending"></b-spinner>
        <span v-else>আরো লোড করুন</span>
      </button>
    </div>

    <div
      class="col-md-12 text-center"
      v-if="
        !$fetchState.pending && paymentList.data && paymentList.data.length <= 0
      "
    >
      <NotFound>
        <template v-slot:head-title>
          আপনি এখনো কোন  পয়েন্ট ক্রয় করেননি
        </template>
        <template v-slot:subhead-title>
          এখনি পয়েন্ট কিনে নিলামে অংশগ্রহন করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/dashboard/point/add"
            class="btn button-small primary-button bid-button mt-15"
          >
            <span>পয়েন্ট কিনুন</span>
          </NuxtLink> 
        </template>
      </NotFound>
    </div>
  </b-row>
    <b-modal id="withdrawModal" centered title="টাকা উত্তোলনের জন্য আবেদন করুন" hide-footer>
      <b-row>
        <div class="col-md-12">
          <form action="" @submit.prevent="withdrawRequest($auth.user.current_point)">
            <div class="form-group clearfix">
              <div class="col-md-12 pl-0  mb-5">
                <label class="font-600 my-1" for="">উত্তোলন পরিমাণ </label>
                <input
                  class="form-control"
                  v-model="withdraw.amount"
                  placeholder="উত্তোলন পরিমাণ উল্লেখ করুন "
                  style="line-height: 40px; opacity: 1"
                >
                  <div class="text-danger" v-if="$v.withdraw.amount.$error">
                    উত্তোলন পরিমাণ উল্লেখ করুন
                  </div>
              </div>
            </div>
            <div class="form-group clearfix">
              <div class="col-md-12 pl-0 mb-5">
                <label class="font-600 mb-5" for="">নোট লিখুন</label>
                <textarea
                  class="form-control"
                  v-model="withdraw.note"
                  placeholder="ব্যাংক বা মোবাইল ব্যাংক নম্বর দিন"
                >
                </textarea>
                <div class="text-danger" v-if="$v.withdraw.note.$error">
                    ব্যাংক বা মোবাইল ব্যাংক সম্পর্কিত প্রয়োজনীয় তথ্য উল্লেখ করুন
                  </div>
              </div>
              
            </div>

            <div class="form-group text-right">
              <button
                type="submit"
                class="btn button-small primary-button bid-button"
              >
                <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                <span v-else>রিকুয়েষ্ট করুন</span>
              </button>
            </div>
          </form>
        </div>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const {
  required,
  decimal, minValue
} = require("vuelidate/lib/validators");
export default {
  middleware: ["auth"],
  mixins: [validationMixin],
  data() {
    return {
      paymentList: [],
      current_page: 1,
      user: [],
      withdraw : {amount : 0, note : ''},
      formSubmiting : false,
      validation_errors: {},
    };
  },
  async fetch() {
    const response = await this.$axios.$get(
      "/my-recharge-list?page=" + this.current_page
    );
    this.setPaymentList(response);
    // console.log(response.data);
  },

  created() {
    this.getUser()
  },

  watch: {
    current_page: function (value) {
      this.$fetch();
    },
  },
  methods: {
    setPaymentList(payments) {
      if (payments.meta) {
        if (payments.meta.current_page != 1) {
          if (payments.data.length > 0) {
            payments.data.forEach((bid) => {
              this.paymentList.data.push(bid);
            });
          }
        } else {
          this.paymentList = payments;
        }
      }
    },

    getUser(){

      this.$axios.$get("user").then((response) => {
        this.user = response.user;
      });
    },

    withdrawRequest(current_point){
      this.$v.withdraw.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      if(current_point < 1 || this.withdraw.amount > current_point){
        this.modalMessage({message : 'Your current point below the request Point!'})
        return false
      }
      this.formSubmiting = true
      this.$axios.$post("point/withdraw",this.withdraw)
        .then(response => {
            this.formSubmiting = false
            this.$fetch();
            this.toastMessage(response)
            this.$bvModal.hide("withdrawModal");
        })
    },

    onLoadMore() {
      this.current_page += 1;
    },
  },

  validations: {
    withdraw: {
      amount: { required, decimal, minValue: minValue(1) },
      note: { required },
    },
  },

  head() {
    return {
      title: "জিতে যাও । আমার  পয়েন্ট",
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
  background-color: #F1F6FF;
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