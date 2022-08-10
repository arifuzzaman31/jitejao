<template>
  <b-row>
    <b-modal
      id="sellerReviewModal"
      centered
      title="বায়ারকে রিভিউ দিন"
      hide-footer
    >
      <b-row>
        <div class="col-md-12" v-if="confirmBid">
          <form action="" @submit.prevent="ReviewSubmit()">
            <div class="error" v-if="validation_errors">
              <ul>
                <li
                  class="text-danger"
                  v-for="error in validation_errors"
                  :key="error[0]"
                >
                  {{ error[0] }}
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label class="font-600 mb-5 mt-10" for=""
                >৫ এর মধ্যে ক্রেতা ({{ confirmBid.demand.user.name }}) কে রেটিং
                দিন *</label
              >
              <br />
              <StarsRatings
                v-model="bid_done_form.ratings"
                :star-size="12"
                :ssr="false"
                :increment="1"
                :show-rating="false"
              />
              <div class="text-danger" v-if="$v.bid_done_form.ratings.$error">
                কমপক্ষে ১ রেটিং দিন
              </div>
            </div>
            <div class="form-group">
              <label class="font-600 mb-5" for="">আপনার রিভিউ লিখুন </label>
              <textarea
                class="form-control"
                placeholder="আপনার ক্রেতার সাথে কাজ করার অনুভূতি লিখুন"
                v-model="bid_done_form.review"
              ></textarea>
            </div>
            <div class="form-group text-right">
              <button
                type="submit"
                class="btn button-small primary-button bid-button w-50 w-xs-100"
              >
                <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                <span v-else>কমপ্লিট</span>
              </button>
            </div>
          </form>
        </div>
      </b-row>
    </b-modal>
  </b-row>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, decimal, minValue } = require("vuelidate/lib/validators");
import { mapState } from "vuex";
export default {
  mixins: [validationMixin],
  data() {
    return {
      bid_done_form: {
        ratings: 0,
        review: "",
      },
      validation_errors: {},
      formSubmiting: false,
    };
  },
  computed: {
    ...mapState({
      confirmBid: (state) => state.bid.bidSellerReview,
    }),
  },
  methods: {
    ReviewSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.formSubmiting = true;
      this.$nuxt.$loading.start();
      this.$axios
        .$post("/review-to-buyer/" + this.confirmBid.id, this.bid_done_form)
        .then((response) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (response.status == "success") {
            this.clearField();
            this.toastMessage(response);
            this.$bvModal.hide("sellerReviewModal");
            $nuxt.$emit("buyer-review-done");
          }
        })
        .catch((error) => {
          this.formSubmiting = false;
          this.$nuxt.$loading.finish();
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    clearField() {
      this.bid_done_form = {
        ratings: 0,
        review: "",
      };
      this.validation_errors = {};
      this.formSubmiting = false;
    },
  },
  validations: {
    bid_done_form: {
      ratings: {required, decimal, minValue: minValue(1)}
    },
  },
};
</script>