
<template>
<div>
<div class="container">
    <div class="row">
        <div v-if="$route.query.payment == 'success'" class="col-md-12">
            <div class="paymentSuccess text-center d-flex">
                <div class="align-self-center w-100">
                <img 
                 class="img-fluid "
                src="~/assets/images/others/payment-success.svg"
                width="250" height="220"
                alt=""
                >
                <h2>পেমেন্ট সাকসেসফুল !</h2>
                <NuxtLink to="/" class="btn button-small primary-button bid-button mt-15 "><span>ব্যাক টু হোম পেজ </span></NuxtLink>
            </div>
            </div>
        </div>
        <!-- paymentSuccess -->
          <div v-else class="col-md-12">
            <div class="paymentSuccess text-center d-flex">
                <div class="align-self-center w-100">
                <img 
                 class="img-fluid "
                src="~/assets/images/others/payment-fail.svg"
                width="250" height="220"
                alt=""
                >
                <h2>পেমেন্ট ফেল !</h2>
                <NuxtLink to="/dashboard/payment/new-payment" class="btn button-small primary-button bid-button mt-15 "><span>পেমেন্ট ট্রাই এগেইন</span></NuxtLink>
            </div>
            </div>
        </div>
        <!-- paymentfail -->
    </div>
</div> 
<Footer />
</div>
</template>

<script>
export default {
      head() {
    return {
      title: this.$route.query.payment == 'success' ? "success" : 'failed',
    };
  },
}
</script>

<style>
.paymentSuccess{
   height: 500px;
}
</style>