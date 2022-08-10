<template>
  <b-modal
    id="contactUserModal"
    size="lg"
    centered
    title="সেলারের সাথে যোগাযোগ করুন"
    hide-footer
  >
    <b-row v-if="bidUser && bidUser.user">
      <div class="col-md-12 text-center mt-15">
        <div class="contact-name">
        <UserAuthor :user="bidUser.user" :badge="bidUser.user.seller_badge" />
        <div class="user-rating text-center">
          <StarsRatings
            v-model="bidUser.user.average_selling_rating"
            :star-size="12"
            :ssr="false"
            :increment="0.2"
            :show-rating="false"
            read-only
          />
        </div>

          <div class="mt-10 p10 br-4 display-in">
            <div class=" col-md-12">
             <div class="bg-blue-gray p10 mb-15">
          
          <a :href="`tel:${bidUser.user.mobile_no}`">

           <h6><i class="fas fa-phone-alt fa-xs"></i> মোবাইল নম্বর </h6>
            <p class="color-green fw-600 br-50 pl-10 pr-10">
              {{bidUser.user.mobile_no}}
            </p>

            </a>

           </div>
          </div>

          <a v-if="bidUser.user.email" :href="`mailto:${bidUser.user.email}`">

             <div class=" col-md-12">
                    <div class="bg-blue-gray p10 mb-15">
            
                      <h6><i class="fas fa-envelope"></i>  ইমেইল</h6>
                      <p class="color-green fw-600 br-50 pl-10 pr-10">
                            {{ bidUser.user.email }}</p>

                    </div>
                </div>
            </a>
          </div>
        </div>
      </div>
    </b-row>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      bidUser: (state) => state.bid.bidUserContact,
    }),
  },

  methods: {
    confrimBid(bid_id) {
      Swal.fire({
        title: "আপনি কি নিচ্ছিত?",
        text: "আপনি এই বিড টি কনফার্ম করছেন!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ নিচ্ছিত!",
        cancelButtonText: "না !",
      }).then((result) => {
        if (result.value) {
          this.$axios
            .post("/bid-confirm/" + bid_id)
            .then((response) => {
              console.log(response)
              this.toastMessage(response.data);
              this.$store.commit("bid/setCurrentTab", 3);
              this.$bvModal.hide("contactModal");
            })
            .catch((error) => {
              this.modalMessage(error.response.data);
            });
        }
      });
    },
  },
};
</script>

<style  scoped>
.vue-star-rating {
  display: inline-block;
}
</style>
