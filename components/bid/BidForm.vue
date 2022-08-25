<template>
  <b-modal id="bidModal" centered title="বিড করুন" hide-footer>
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
          <div class="mt-20 text-center p10 clearfix">
            <div class=" col-md-4 offset-md-2">
              <div class="bg-blue-gray p10 mb-15">

                <h6 class="display-b">বাজেট</h6>
                <p class="color-purple">{{demand_data.budget_type === true ? demand_data.minimum_budget +'-'+ demand_data.maximum_budget+ ' ৳' : 'নেগেশিয়েবল'}} </p>
              
              </div>
            </div>

            <div class=" col-md-4">
              <div class="bg-blue-gray p10 mb-15">

                 <h6 class="display-b">পরিমাণ</h6>
                <p  v-if="demand_data.quantity">
                  {{demand_data.quantity}} {{demand_data.quantity_unit.name }}
                </p>
              
              </div>
            </div>

             
             
          </div>
          
          <div class="form-group mt-15">
            <label class="font-600 mb-5" for=""
              >অফার এমাউন্ট (আপনার সাপ্লাই এমাউন্ট) 
              <span class="text-danger">*</span></label
            >
             
            <input
              type="text"
              placeholder="অফার এমাউন্ট (ইংরেজিতে লিখুন )"
              name=""
              v-model="bid_form.offer_amount"
              class="form-control input-form"
            />
            <div class="text-danger" v-if="$v.bid_form.offer_amount.$error">
              নন জিরো এবং ভ্যালিড এমাউন্ট দিন
            </div>
          </div>

          <div class="form-group photo-upload pl-0">
            <label class="font-600 mb-5">সেম্পল ছবি দিন (অপশনাল)</label>
            <div class="files">
              <div class="file-content">
                <input
                  type="file"
                  class="p30"
                  accept=".jpeg,.png,.PNG,.gif,.jpg,.webp,.bmp"
                  @change="handleFile($event)"
                />
                <img
                  v-if="bid_form.bid_image"
                  :src="bid_form.bid_image"
                  class="img img-fluid"
                />
                <img
                  v-else
                  src="~/assets/images/icon/image_demo_icon.svg"
                  class="img img-fluid"
                />
                <div class="file-display-table">
                  <div class="file-display-table-cell">
                    <h3 v-if="bid_form.bid_image">ছবি চেঞ্জ করুন</h3>
                    <h3 v-else>ছবি যোগ করুন</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="font-600 mb-5" for=""
              >সম্ভাব্য ডেলিভারির তারিখ *
            </label>
            <b-datepicker
              class="form-control"
              locale="en"
              :hide-header="true"
              v-model="bid_form.delivery_date"
              placeholder="ডেট সিলেক্ট করুন "
              style="line-height: 40px; opacity: 1"
              :date-disabled-fn="dateDisabled"
            >
            </b-datepicker>
            <div class="text-danger" v-if="$v.bid_form.delivery_date.$error">
              ডেলিভারির ডেট সিলেক্ট করুন
            </div>
          </div>
          <div class="form-group">
            <label class="font-600 mb-5" for=""
              >বিড সংক্রান্ত বিস্তারিত লিখুন
            </label>
            <textarea
              class="form-control"
              placeholder="বিড সংক্রান্ত নোট লিখুন"
              v-model="bid_form.proposal"
            ></textarea>
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
const { required, decimal, minValue } = require("vuelidate/lib/validators");
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [validationMixin],
  data() {
    return {
      bid_form: {
        offer_amount: "",
        bid_image: "",
        delivery_date: "",
        proposal: "",
      },
      validation_errors: {},
      formSubmiting: false,
    };
  },

  // mounted() {
  //   this.listen()
  // },
  computed: {
    ...mapState({
      demand_data : (state) => state.demand.demand,
    }),
  },

  methods: {
    bidSubmit() {
      this.$v.bid_form.$touch();
      if (this.$v.bid_form.$invalid) {
        return false;
      }
      this.formSubmiting = true;
      this.$axios
        .$post("/bid/" + this.$route.params.id, this.bid_form)
        .then((response) => {
          this.formSubmiting = false;
          this.toastMessage(response);
          //  this.listen();
          this.$store.commit("bid/addNewBid", response.bid);
          this.$bvModal.hide("bidModal");
          this.clearField();
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
        offer_amount: "",
        bid_image: "",
        delivery_date: "",
        proposal: "",
      };
      this.validation_errors = {};
      this.formSubmiting = false;
    },
  },
  validations: {
    bid_form: {
      offer_amount: { required, decimal, minValue: minValue(1) },
      delivery_date: { required },
    },
  },
};
</script>