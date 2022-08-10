<template>
  <b-container class="mt-50 mb-50">

    <b-row class="mt-30">
      <div class="col-md-6 text-center">
        <div class="h-vedio-popup"
          v-b-modal.modal-center @click="showModal1"
        >
          <div class="h-vedio-popup-image bg-red-op-10">
            <img src="~/assets/images/icon/home-demand-video.svg" alt="Demand" />
          </div>
          <div class="content">
            <h2>ডিমান্ড কিভাবে করবেন </h2>
                <b-modal
                  id="video-modal1"
                  centered
                  modal-footer="No"
                  v-bind:hide-footer="true"
                  content-class="videopopup-home"
                >
                  <iframe
                    width="100%"
                    height="500px"
                    src="https://www.youtube.com/embed/X0XWWYcRovw?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </b-modal>
            <p>
              
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <div class="h-vedio-popup"
        v-b-modal.modal-center @click="showModal2">
          <div class="h-vedio-popup-image bg-green-op-10">
            <img src="~/assets/images/icon/home-demand-video.svg" alt="Demand" />
          </div>
          <div class="content">
            <h2>নিলাম কিভাবে করবেন </h2>

                <b-modal
                  id="video-modal2"
                  centered
                  modal-footer="No"
                  v-bind:hide-footer="true"
                  content-class="videopopup-home"
                >
                  <iframe
                    width="100%"
                    height="500px"
                    src="https://www.youtube.com/embed/8GSQRnn8Fl0?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </b-modal>
            <p>
             
            </p>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
   methods: {
    showModal1() {
      this.$bvModal.show("video-modal1");
    },
     showModal2() {
      this.$bvModal.show("video-modal2");
    },
  },
}
</script>

<style>
.h-vedio-popup {
  background: #fff;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0);
  padding: 70px 30px;
  transition: 1s ease all;
  border-radius: 10px;
}
.h-vedio-popup:hover {
  box-shadow: 0px 34px 90px 0px rgba(0, 0, 0, 0.1);
}
.h-vedio-popup .h-vedio-popup-image {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  line-height: 100px;
  border-radius: 8px;
}
.h-vedio-popup-image.bg-purple {
  background-color: rgba(190, 99, 249, 0.1);
}
.h-vedio-popup-image.bg-blue {
  background-color: rgba(29, 196, 217, 0.1);
}
.h-vedio-popup-image.bg-red {
  background-color: rgba(249, 91, 91, 0.1);
}
.h-vedio-popup .content {
  margin-top: 30px;
}
</style>

