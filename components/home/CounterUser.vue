<template>
  <div class="counter-user mt-60 text-center ">
    <b-container>
      <b-row class="">
        <div class="col-lg-3 col-sm-6 col-xs-6 col-md-3 bg-blue-gray p40 p-xs-25">
          <div class="counter">
            <div class="img bg-purple-op-20">
              <img
                src="~/assets/images/counter_icon/dashboard-seller.svg"
                class="img-fluid"
                alt="user counter"
              />
            </div>
            <h2>{{ replaceNumbersE2B(counter.total_buyer) }}</h2>
            <p>ক্রেতা</p>
          </div>
        </div>
        <!-- counter -->
        <div class="col-lg-3 col-sm-6 col-xs-6 col-md-3 bg-blue-gray p40 p-xs-25">
          <div class="counter">
            <div class="img bg-green-op-20">
              <img
                src="~/assets/images/counter_icon/dashboard-buyer.svg"
                class="img-fluid"
                alt="user counter"
              />
            </div>
            <h2>{{ replaceNumbersE2B(counter.total_seller) }}</h2>
            <p>বিক্রেতা</p>
          </div>
        </div>
        <!-- counter -->
        <div class="col-lg-3 col-sm-6 col-xs-6 col-md-3 bg-blue-gray p40 p-xs-25">
          <div class="counter">
            <div class="img bg-blue-op-20">
              <img
                src="~/assets/images/counter_icon/dashboard-bemand.svg"
                class="img-fluid"
                alt="user counter"
              />
            </div>
            <h2>{{ replaceNumbersE2B(counter.total_demand) }}</h2>
            <p>ডিমান্ড</p>
          </div>
        </div>
        <!-- counter -->
        <div class="col-lg-3 col-sm-6 col-xs-6 col-md-3 bg-blue-gray p40 p-xs-25">
          <div class="counter">
            <div class="img bg-red-op-20">
              <img
                src="~/assets/images/counter_icon/dashboard-bid.svg"
                class="img-fluid"
                alt="user counter"
              />
            </div>
            <h2>{{ replaceNumbersE2B(counter.total_bid) }}</h2>
            <p>বিড</p>
          </div>
        </div>
        <!-- counter -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: {
        total_buyer: 0,
        total_seller: 0,
        total_demand: 0,
        total_bid: 0,
      },
    };
  },

  created() {
    this.$axios.$get("/counter").then((response) => {
      this.counter = response;
    });
  },
};
</script>

<style>

.counter-user .counter {
}
.counter-user .counter .img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  /* margin: 10px auto; */
  float: left;
  margin: 0px 30px 0px 0px;

}

.counter-user .counter .img img {
  width: 42px;
}

.counter-user .counter p,
.counter-user .counter h2{
  text-align: left;
  margin-right: 15px;
}

.counter-user .counter p {
  color: #252c53;
  font-size: 20px;
}
</style>