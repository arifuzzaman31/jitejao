<template>
  <!-- <UserTopMenu/> -->
  <div>
  <b-container>
    <b-row>
      <div class="col-md-12 mb-15 mt-15">
        <div class="profile-update">
          <b-form method="" action="" class="" v-if="!$fetchState.pending">
            <div class="from-group mb-15">
              <div class="user-avatar-icon">
                <img
                  v-if="!form.new_avatar"
                  :src="view_avatar"
                  alt="Customers"
                  class="img-fluid mb-10 avatar"
                />
                <img
                  v-else
                  :src="form.new_avatar"
                  alt="Customers"
                  class="img-fluid mb-10 avatar"
                />
                <span>
                  <input type="file" @change="handleProfileUploads($event)" />
                  <i class="fas fa-pencil-alt color-purple"></i>
                </span>
              </div>
              <label class="font-600 mb-5" for="">
                পিকচার অ্যাড করুন *
              </label>
            </div>

            <div class="from-group mb-15">
              <label class="font-600 mb-5" for="">  নাম লিখুন <span class="text-danger">*</span></label>
              <input
                v-model="form.name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                class="input-form form-control"
              />
              <div class="text-danger mt-5" v-if="$v.form.name.$error">
                     নাম লিখুন 
                  </div>
            </div>

            <div class="from-group mb-15">
              <label class="font-600" for=""> ইমেইল আইডি দিন </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="আপনার ইমেইল আইডি দিন"
                class="input-form form-control"
              />
              <span class="text-danger" v-if="validation_errors && validation_errors.email">
                {{ validation_errors.email[0] }}
              </span>
            </div>

            <div class="from-group mb-15">
            <label class="font-600" for=""
                > অ্যাড্রেস দিন </label>
             <textarea
             class="form-control" rows="3"
             v-model="form.address"
             placeholder='আপনার অ্যাড্রেস লিখুন'></textarea>
             </div>
             <div class="from-group mb-15">
                 <label class="font-600" for="">
                     আপনার সম্পর্কে বিস্তারিত লিখুন </label>
             <textarea 
             v-model="form.description" class="form-control"
             placeholder='আপনার সম্পর্কে বিস্তারিত লিখুন' rows="5"></textarea>
             </div>

             <div class="from-group mb-15">
               <label class="font-600"> এরিয়া নির্বাচন করুন </label>
                <multiselect
                  v-model="form.area"
                  :custom-label="customAreaLabel"
                  track-by="id"
                  :options="areas"
                ></multiselect>
                <div class="text-danger" v-if="$v.form.area.$error">
                    লোকেশন সিলেক্ট করুন 
                  </div>
            </div>

             <!-- <div class="form-group">
                <label class="font-600 mb-5" for="">
                  <span v-if="!form.is_seller_before">
                    ক্রেতার পাশাপাশি আপনি কি বিক্রিতা ও হতে চান ? 
                  </span>
                  <span v-else>
                    <span v-if="form.is_seller">বিক্রিতা মোড অফ করতে চান ?</span>
                    <span v-else> বিক্রিতা মােডে ফিরে যেতে চান ? </span>
                  </span>
                </label>
                <br />
                <b-form-checkbox
                  v-model="form.is_seller"
                  name="check-button"
                  switch
                >
                  <b v-if="form.is_seller">হ্যাঁ</b>
                  <b v-else>না </b>
                </b-form-checkbox>
              </div> -->

             <div class="from-group mb-15" v-if="form.is_seller">
                 <label class="font-600">ক্যাটেগরি নির্বাচন করুন <span class="text-danger">*</span></label>
                 <multiselect
                  v-model="form.category"
                  :options="categories"
                  :multiple="true"
                  :max="5"
                  :custom-label="customCategoryLabel"
                  selectedLabel="নির্বাচিত"
                  track-by="id">
                </multiselect>
                <div class="text-danger mt-5" v-if="$v.form.category.$error">
                    সর্বনিম্ন একটি ক্যাটাগরি হলেও সিলেক্ট করুন 
                  </div>
             </div>

             <div class="profile-btn md-15">
               <!-- <a href="#" class="btn button-small primary-button bid-button ">এডিট  করুন </a> -->
               <a href="#" @click.prevent="update()" class="btn button-small primary-button bid-button w-xs-100">
                  <span v-if="formSubmiting"> প্রসেসিং </span>
                  <span v-else> আপডেট করুন</span>
                  <b-spinner type="grow" v-if="formSubmiting"></b-spinner>
                  </a>
             </div>
             </b-form>


             <!-- skelton  -->
          <b-form method="" action="" class="" v-if="$fetchState.pending">
            <div class="from-group mb-15">
              <div class="user-avatar-icon">
                                  <b-skeleton
                    class="img-fluid mb-10 avatar"
                    type="avatar"
                  ></b-skeleton>
                <span>
                  <input type="file"  />
                  <i class="fas fa-pencil-alt color-purple"></i>
                </span>
              </div>
              <b-skeleton width="40%"></b-skeleton>
            </div>

            <div class="from-group mb-15">
             <b-skeleton width="30%"></b-skeleton>
            <b-skeleton type="input" width="100%"></b-skeleton>
            </div>
            <div class="from-group mb-15">
             <b-skeleton width="30%"></b-skeleton>
            <b-skeleton type="input" width="100%"></b-skeleton>
            </div>
            <div class="from-group mb-15">
             <b-skeleton width="30%"></b-skeleton>
            <b-skeleton type="input" width="100%" height="100px"></b-skeleton>
            </div>

            <div class="from-group mb-15">
             <b-skeleton width="30%"></b-skeleton>
            <b-skeleton type="input" width="100%" height="140px"></b-skeleton>
            </div>

            <div class="from-group mb-15">
             <b-skeleton width="30%"></b-skeleton>
            <b-skeleton type="input" width="100%"></b-skeleton>
            </div>


             <div class="profile-btn md-15">
               <!-- <a href="#" class="btn button-small primary-button bid-button ">এডিট  করুন </a> -->
                <b-skeleton  type="button"></b-skeleton>
             </div>
             </b-form>
             <!-- skelton -->

             
         </div>
        </div>
    </b-row>
  </b-container>
  <Footer />
  </div>
</template>

<script>
import index from "../index.vue";
import { validationMixin } from "vuelidate";
const { required, requiredIf } = require("vuelidate/lib/validators");
import Multiselect from "vue-multiselect";

export default {
  mixins: [validationMixin],
  middleware: "auth",
  components: {
    index,
    Multiselect,
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        new_avatar: "",
        address: "",
        description: "",
        category: null,
        area: "",
        is_seller: "",
        is_seller_before: "",
      },
      formSubmiting: false,
      view_avatar: "",
      categories: [],
      areas: [],
      validation_errors: null
    };
  },

  validations: {
    form: {
      name: { required },
      area: { required },
      category: {
        required: requiredIf(function () {
          return this.form.is_seller;
        }),
      },
    },
  },

  async fetch() {
    const response = await this.$axios.$get("/user/profile");

    this.form.name = response.data.name;
    this.form.email = response.data.email;
    this.view_avatar = response.data.avatar;
    this.form.description = response.data.user_information.bio;
    this.form.address = response.data.user_information.address;
    this.form.category = response.data.category;
    this.form.area = response.data.area;
    this.form.is_seller = response.data.is_seller;
    this.form.is_seller_before = response.data.is_seller_before;
  },

  mounted() {
    this.getCategoryList();
    this.getAreaList();
  },

  methods: {
    update() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.formSubmiting = true;
      this.$axios
        .$post("/update/profile", this.form)
        .then((response) => {
          if (response.status === "success") {
            // this.$auth.setUserToken(response.token);
            // console.log(response.user);
            this.$auth.setUser(response.user);
            this.toastMessage(response);
            this.formSubmiting = false;
            this.$router.push('/dashboard/profile')
            // this.$fetch();
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.validation_errors = error.response.data.errors;
            // this.$bvModal.show("errorModal");
            this.modalMessage(error.response.data);
          }
        })
        .finally(() => {
          this.formSubmiting = false;
        });
    },

    handleProfileUploads(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.new_avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    getCategoryList() {
      this.$axios
        .$get("category-list?no_pagination=yes&status=1")
        .then((response) => {
          this.categories = response.data;
        });
    },

    customCategoryLabel({ name, english_name }) {
      return `${name} — (${english_name})`;
    },

    customAreaLabel(name) {
      return `${name.area_name}`;
    },

    getAreaList() {
      this.$axios
        .$get("area-list?no_pagination=yes&status=1")
        .then((response) => {
          this.areas = response;
        });
    },
  },

  head() {
    return {
      title: "বিডো । প্রোফাইল আপডেট",
    };
  },
};
</script>
<style scoped>
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>