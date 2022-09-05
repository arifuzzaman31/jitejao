  <template>
  <div>
    <b-container fluid>
      <div class="position-relative">
        <div class="shapes-container">
          <div class="bg-box-rectangle-login"></div>
        </div>
      </div>

      <div class="display-table">
        <div class="display-table-cell">
          <b-row class="bido-form-main">
            <div
              class="col-md-3 d-none d-sm-block pl-0 position-relative"
              style="
                background-image: linear-gradient(to top, #25aae1, #4481eb);
              "
            >
              <div class="bg-left">
                <div class="content p20 text-center">
                  <NuxtLink to="/"
                    ><img
                      src="~/assets/images/logo-footer.png"
                      class="img-fluid mt-5 mb-50"
                      width="100"
                  /></NuxtLink>
                  <h2 class="color-white mb-20">খুলে যাক ব্যবসার সকল দুয়ার</h2>
                  <p class="color-white">
                    
                  </p>
                </div>
                <div class="img">
                  <img
                    src="~/assets/images/others/signup.svg"
                    class="img-fluid mt-5 img-bg"
                  />
                </div>
              </div>
            </div>

            <div
              class="col-md-5 col-lg-4 col-sm-6 mt-5 offset-md-2 offset-lg-2 align-self-center justify-margin-center-95"
            >
              <div class="bido-form">
                <div class="logo-form text-center mb-30">
                  <NuxtLink to="/"
                    ><img
                      src="~/assets/images/logo-footer.png"
                      class="img-fluid mt-5 mb-20"
                      width="100"
                  /></NuxtLink>
                </div>
                <div class="title text-center">
                  <h2 class="text-black">লগইন</h2>
                  <p></p>
                </div>
                <hr class="w-90 m-auto mt-10" />
                <div class="step step1  mt-50 mb-30" v-if="otpStatus == 0">
                  <div class="form-group">
                    <label class="font-600 mb-5" for=""
                      >আপনার মোবাইল নাম্বার দিন *</label
                    >
                    <input
                      v-model="form.mobile_no"
                      @keypress.enter="sendOTP"
                      type="text"
                      class="input-form form-control"
                      placeholder="আপনার মোবাইল নাম্বার দিন "
                    />
                    <div class="text-danger mt-5" v-if="$v.form.mobile_no.$error">
                      সঠিক বাংলাদেশি মোবাইল নাম্বার দিন 
                    </div>
                  </div>
                </div>
                <div
                  class="step step1 text-center mt-50 mb-30"
                  v-if="otpStatus == 1"
                >
                  <div class="form-group">
                    <p class="mb-10" for="">
                      আপনার মোবাইল নম্বরে পাঠানো ওটিপি কোড দিন *
                    </p>
                    <v-otp-input
                      ref="otpInput"
                      input-classes="form-control otp-control m5 text-center"
                      separator="-"
                      :num-inputs="4"
                      :should-auto-focus="true"
                      :is-input-num="true"
                      @on-complete="setOtpCode"
                      style="display: inline-flex"
                    />
                  </div>
                  <div class="form-group">
                    <a href="" v-if="countDown > 0">
                      {{ replaceNumbersE2B(countDown) }} সেকেন্ডের মধ্যে কোড
                      দিন</a
                    >
                    <a href="" v-else>আবার কোড পাঠান</a>
                    <p class="mt-10">
                      <a
                        class="color-dark-blue text-underline"
                        href=""
                        @click.prevent="otpStatus = 0"
                        >অথবা মোবাইল নাম্বার পৰিবৰ্তন করুন</a
                      >
                    </p>
                  </div>
                </div>

                <div class="form-group ">
                  <a
                    v-if="otpStatus == 0"
                    class="btn button-small primary-button bid-button w-100"
                    @click.prevent="sendOTP"
                  >
                    কন্টিনিউ <span v-if="sending_otp">....</span>
                  </a>
                  <button
                    v-if="otpStatus == 1"
                    @click="login"
                    class="btn button-small primary-button bid-button w-100"
                  >
                    কন্টিনিউ
                  </button>
                </div>
                <div class="text-center mb-xs-100">
                  <NuxtLink class="color-dark-blue text-underline" to="/signup"
                    >রেজিষ্ট্রেশন করুন
                  </NuxtLink>
                </div>
              </div>
            </div>
            <ErrorModal :errors="validation_errors"></ErrorModal>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength } = require("vuelidate/lib/validators");
const phoneNumber = (value) => {
  return /(01)[0-9]{9}/.test(value);
};
export default {
  mixins: [validationMixin],
  middleware: "auth",
  auth: "guest",
  layout: "nomenu",
  data() {
    return {
      form: {
        mobile_no: "",
        otp_code: "",
      },
      otpStatus: 0,
      countDown: 120,
      sending_otp: false,
      validation_errors: null,
    };
  },
  validations: {
    form: {
      mobile_no: {
        required,
        phoneNumber,
      },
      otp_code: {
        required,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    sendOTP() {
      this.$v.form.mobile_no.$touch();
      if (this.$v.form.mobile_no.$invalid) {
        return;
      }
      // console.log('before sending')
      this.sending_otp = true;
      this.$axios
        .$post("/login/otp", this.form)
        .then((response) => {
          this.sending_otp = false;
          // if (response.status === "success") {
          this.otpStatus = 1;
          this.countDown = 120;
          this.form.otp_code = "";
          this.countDownTimer();
          // }
        })
        .catch((error) => {
          this.sending_otp = false;
          if (error.response.status == 422) {
            this.validation_errors = error.response.data.errors;
            this.$bvModal.show("errorModal");
          } else {
            this.modalMessage(error.response.data);
          }
        });
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    setOtpCode(code) {
      this.form.otp_code = code;
    },
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form,
        });
        response.then((res) => {
            this.$router.push("/");
            // this.$route.push({
            //     path: "/"
            // });
            console.log(res)
          });
          console.log(response)
      } catch (error) {
        if (error.response.status == 422) {
          this.sending_otp = false;
          this.validation_errors = error.response.data.errors;
          this.$bvModal.show("errorModal");
        } else {
          console.log(error.response)
          this.modalMessage(error.response.data);
        }
      }
    },
  },
};
</script>

<style scoped>
.bido-form-main {
  height: 100%;
  position: fixed;
  width: 100%;
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
.shapes-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
}
/* .bg-box-rectangle-login {
  transform: translate3d(-56%, 37%, 0) rotate(54deg);
  -webkit-transform: translate3d(-56%, 37%, 0) rotate(54deg);
  -moz-transform: translate3d(-56%, 37%, 0) rotate(54deg);
  -ms-transform: translate3d(-56%, 37%, 0) rotate(54deg);
  background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -webkit-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -moz-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  -ms-background-image: linear-gradient(
    35deg,
    rgba(231, 238, 250, 0.8) 0,
    rgba(231, 238, 250, 0.8) 100%
  );
  width: 667px;
  height: 569px;
  border-radius: 120px;
  position: absolute;
  right: 11px;
} */
</style>