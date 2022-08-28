<template>
  <b-modal
    id="contactModal"
    size="lg"
    centered
    title="ডিটেইলস"
    hide-footer
  >
    <b-row v-if="bidUser && bidUser.user">
      <div class="col-md-12 text-center mt-15">
        <div class="contact-image">
          <img
            :src="bidUser.user.avatar"
            class="img-responsive rounded-cirlce"
            style="height: 70px"
          />
        </div>
        <div class="contact-name">
          <a href="javasript:void(0)">{{ bidUser.user.name }}</a> <br />
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
          <a :href="`tel:${bidUser.user.mobile_no}`"
            ><i class="fas fa-phone-alt"></i> &nbsp; কল করুন:
            <span class="color-green fw-600 br-50 pl-10 pr-10">{{
              bidUser.user.mobile_no
            }}</span></a>
          <br />
          <a v-if="bidUser.user.email" :href="`mailto:${bidUser.user.email}`"
            ><i class="fas fa-envelope"></i> &nbsp; ইমেইল করুন:  
            <span class="color-green fw-600 br-50 pl-10 pr-10">
            {{ bidUser.user.email }}</span>
            </a>
          </div>
         
        </div>
        
        <div class="contact-offer mt-2">
          <button
            v-if="bidUser.is_confirmed"
            class="btn button-small primary-button bid-button w-50 mb-2 mt-10"
          >
            এই বিডটি কনফার্ম করেছেন
          </button>
          <button
            v-else
            @click="confrimBid(bidUser.id)"
            class="btn button-small primary-button bid-button w-50 mb-2"
          >
            এই বিডটি কনফার্ম করুন
          </button>
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
        title: "আপনি কি নিশ্চিত?",
        text: "আপনি এই বিড টি কনফার্ম করছেন!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "হ্যাঁ নিশ্চিত!",
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
