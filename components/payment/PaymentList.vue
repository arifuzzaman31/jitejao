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
              >ধন্যবাদ সফলভাবে আপনার সাবস্ক্রিপশন মেয়াদ এক্সটেন্ড হয়েছে</b
            >
            <b v-else>আপনার পেমেন্ট সফল হয়নি</b>
          </b-alert>
        </div>
      </b-row>

      <b-row class="mt-30-xs">
        <div class="col-lg-6 col-sm-6 xs-mb15 mb-15">
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
              <h3 class="color-white mb-5">সাবস্ক্রিপশন</h3>

              <NuxtLink
                to="/dashboard/payment/new-payment"
                class="button button-sm font-b bg-white color-dark-blue"
                > প্ল্যান দেখুন 
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 xs-mb15 mb-15">
          <div
            class="dashboard-card-list dashboard-payment-card card-gradient-red p20 clearfix br-5"
          >
            <div class="img-icon float-r">
              <img
                src="~/assets/images/icon/payment-white.svg"
                class="img-fluid float-l"
                style="height: 72px"
              />
            </div>
            <div class="dashboard-card-content text-right">
              <h2 class="color-white mb-5"> আমার সাবস্ক্রিপশন</h2>
              <p class="color-white mb-5">
                মেয়াদ : {{ user.subscription_expired_at_text }}
              </p>
            </div>
          </div>
        </div>
      </b-row>
      <!-- dashboard card end -->
      <b-row>
    <div class="col-md-12">
      <div class="dashboard-title mb-20">
        <h3>সাবস্ক্রিপশন / পেমেন্ট হিস্টরি</h3>
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
                  <th scope="col">সাবস্ক্রিপশন ডেট</th>
                  <th scope="col">মোড</th>
                  <th scope="col">ট্রানজেকশান  ডেট</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="payment in paymentList.data"
                  :key="'payment' + payment.id"
                >
                  <td scope="row">
                    <span
                      >{{ replaceNumbersE2B(payment.final_amount) }}৳ ({{
                        replaceNumbersE2B(payment.total_month)
                      }}
                      মাস )
                    </span>
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
                    <span
                      >{{ payment.extend_from_date }} -
                      {{ payment.extend_to_date }}
                    </span>
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
                  <td scope="row">
                    <span
                      class="payment-complete text-center"
                      >{{ payment.payment_date }}</span
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
        class="btn button-small  gradient-purple-secondary bid-button"
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
        <template v-slot:head-title> আপনি এখনো কোন পেমেন্ট করেননি </template>
        <template v-slot:subhead-title>
          এখনি সাবস্ক্রিপশন এক্সটেন্ড করে ব্যবসায়ীক কামিয়াবি হাসিল করুন
        </template>
        <template v-slot:button>
          <NuxtLink
            to="/dashboard/payment/new-payment"
            class="btn button-small  gradient-purple-secondary bid-button mt-15"
          >
            <span>সাবস্ক্রিপশন এক্সটেন্ড করুন</span>
          </NuxtLink>
        </template>
      </NotFound>
    </div>
  </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentList: [],
      current_page: 1,
      user: [],
      subscription_plan: 0,
    };
  },
  async fetch() {
    const response = await this.$axios.$get(
      "/my-payment-list?page=" + this.current_page
    );
    this.setPaymentList(response);
    // console.log(response.data);
  },

  created(){
    this.getUser();
      this.getMiniPlan();
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

    getMiniPlan() {
      this.$axios.$get("subscription-minimum-plan").then((response) => {
        if (response.total_amount % response.total_month != 0) {
          this.subscription_plan = (
            response.total_amount / response.total_month
          ).toFixed(2);
        } else {
          this.subscription_plan = response.total_amount / response.total_month;
        }
      });
    },

    onLoadMore() {
      this.current_page += 1;
    },
  },

  head() {
    return {
      title: "জিতে যাও । আমার পেমেন্ট লিস্ট",
    };
  },
};
</script>
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
 background: #f1f6ff;
  /* background: #fff; */
}
.payment-history thead tr th {
  /* border-bottom: 1px solid #ddd; */
  background: #f1f6ff;
   /* background: #fff; */
}
.payment-history .payment-pending,
.payment-history .payment-complete {
  padding: 4px 10px;
  border-radius: 5px;
}
</style>