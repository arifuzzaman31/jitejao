<template>
  <b-modal id="nilamBidModal" centered title="বিড করুন" hide-footer>
    <b-row>
      <div class="col-md-12">
        <form action="" @submit.prevent="bidSubmit()">
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
          <div class="form-group mt-15">
            <label class="font-600 mb-5" for=""
              >বিড করুন <span class="text-danger">*</span>
              ( ১ পয়েন্ট = ১ টাকা )
            </label>
            <label class="font-600 mb-5 float-r" for="">
              বেস প্রাইস :
              <span class="color-purple">
                {{ replaceNumbersE2B(nilambaseprise) }} পয়েন্ট</span
              >
            </label>
            <input
              type="text"
              placeholder="বিড পয়েন্ট ঊল্লেখ করুন"
              name=""
              v-model="bid_form.offer_point"
              class="form-control input-form"
            />
            <div class="text-danger" v-if="$v.bid_form.offer_point.$error">
              নন জিরো এবং ভ্যালিড এমাউন্ট দিন
            </div>
          </div>

          <div class="form-group text-right">
            <button
              type="submit"
              class="btn button-small primary-button bid-button w-50"
            >
              <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
              <span v-else>বিড করুন</span>
            </button>
          </div>
        </form>
      </div>
    </b-row>
  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
const {
  required,
  decimal,
  maxValue,
  minValue,
} = require("vuelidate/lib/validators");
import { mapMutations } from "vuex";
export default {
  props: ["nilambaseprise"],
  mixins: [validationMixin],
  data() {
    return {
      bid_form: {
        nilam_id: "",
        offer_point: "",
        proposal: "",
      },
      validation_errors: {},
      formSubmiting: false,
    };
  },
  methods: {
    bidSubmit() {
      this.$v.bid_form.offer_point.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.bid_form.nilam_id = this.$route.params.id;
      this.formSubmiting = true;
      this.$axios
        .$post("nilam-bid", this.bid_form)
        .then((response) => {
          this.formSubmiting = false;
          this.clearField();
          this.toastMessage({
            status: response.status,
            message: response.message,
          });
          this.$store.commit("nilam/addNewBid", response.bid);
          this.$bvModal.hide("nilamBidModal");
        })
        .catch((error) => {
          this.formSubmiting = false;
          if (error.response.status == 422) {
            this.validation_errors = error.response.data;
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    dateDisabled(ymd, date) {
      return ymd < this.ymdDate();
    },

    handleFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.bid_form.bid_image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    clearField() {
      this.bid_form = {
        offer_point: "",
        proposal: "",
      };
      this.validation_errors = {};
      this.formSubmiting = false;
    },
  },
  validations: {
    bid_form: {
      offer_point: { required, decimal, minValue: minValue(1) },
    },
  },
};
</script>