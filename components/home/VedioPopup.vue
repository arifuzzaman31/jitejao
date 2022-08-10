<template>
  <b-container class="mt-50 mb-50">
    <b-row>
      <div class="col-md-12 text-center">
        <h1>কিভাবে আপনি আমাদের সার্ভিস ব্যবহার করবেন ?</h1>
      </div>
    </b-row>
    <b-row class="mt-30">
      <div class="col-md-12">
        <div class="bg-image-vedio-popup clearfix">
          <img
            src="~/assets/images/vedio-bg.png"
            class="img-fluid"
            alt="vedio popup"
          />
          <div class="display-table vediopopup-circle">
            <div class="display-table-cell">
              <div class="popup-icon">
                
                <div class="circle-ripple circle-ripple--animation"
                     v-b-modal.modal-center @click="showModal">
                  <span >
                    <i class="fas fa-play"></i>
                  </span>
                </div>

                <b-modal
                  id="video-modal"
                  centered
                  modal-footer="No"
                  v-bind:hide-footer="true"
                  content-class="videopopup-home"
                >
                  <iframe
                    width="100%"
                    height="500px"
                    src="https://www.youtube-nocookie.com/embed/OIjKTLZAbHE?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      // modalvedio (){
      //  footer: 'No'
      // }
    };
  },

  methods: {
    showModal() {
      this.$bvModal.show("video-modal");
    },
  },
};
</script>

<style >
.bg-image-vedio-popup {
  margin: 0 auto;
  position: relative;
  text-align: center;
}
.vediopopup-circle {
  position: absolute;
  top: 0;
}
.display-table {
  display: table;
  height: 100%;
  width: 100%;
}
.display-table-cell {
  display: table-cell;
  vertical-align: middle;
}
.circle-ripple {
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 71px 5px rgba(0, 0, 0, 0.52);
  margin: 0 auto;
  text-align: center;
  line-height: 100px;
}

.circle-ripple--animation {
  -webkit-animation: ripple 0.7s linear infinite;
  animation: ripple 0.7s linear infinite;
}

/* @-webkit-keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgb(255, 255, 255), 0 0 0 1em rgb(255, 255, 255), 0 0 0 3em rgb(255, 255, 255), 
            0 0 0 5em rgb(255, 255, 255);
          }
          100% {
            box-shadow: 0 0 0 1em rgb(255, 255, 255), 0 0 0 3em rgb(255, 255, 255), 0 0 0 5em rgb(255, 255, 255), 0 0 0 8em
             rgb(255, 255, 255);
          }
        } */

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(20, 129, 179, 0.3),
      0 0 0 1em rgba(20, 129, 179, 0.3), 0 0 0 2em rgba(20, 129, 179, 0.3),
      0 0 0 3em rgba(20, 129, 179, 0.3);
  }
  100% {
    box-shadow: 0 0 0 1em rgba(20, 129, 179, 0.3),
      0 0 0 2em rgba(20, 129, 179, 0.3), 0 0 0 3em rgba(20, 129, 179, 0.3),
      0 0 0 4em rgba(20, 129, 179, 0);
  }
}
.modal-dialog {
  max-width: 700px;
}
.videopopup-home .modal-header {
  background: #fff !important;
  border: 0 !important;
  padding: 0.3rem 0.5rem !important;
}
.modal-body {
  padding-top: 0;
}
</style>

 