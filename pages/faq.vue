<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title text-center mb-70 mt-30">
          <h2 class="mb-10">এফএকিও</h2>
          <p>সচরাচর জিজ্ঞাসিত প্রশ্ন</p>
        </div>
      </b-row>

      <b-row>
        <div class="col-md-12">
          <div class="accordion accordion-custom w-100 clearfix" role="tablist">
            <div v-if="!$fetchState.pending">
              <div v-for="value in faqs" :key="'faq' + value.id">
                <div header-tag="header" class="" role="tab">
                  <a
                    class="faq-title button button-sm w-100 text-left p20"
                    block
                    v-b-toggle
                    :href="`#accordion-${value.id}`"
                    @click.prevent=""
                    variant="info"
                  >
                    <span>{{ value.question }}</span>
                  </a>
                </div>
                <b-collapse
                  :id="`accordion-${value.id}`"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="faq-details"
                >
                  <div class="details p30 pl-30">
                    <p>
                      {{ value.answer }}
                    </p>
                  </div>
                </b-collapse>
              </div>
            </div>

            <div v-if="$fetchState.pending">
              <div v-for="number in 10" :key="'faq_number' + number">
                <div header-tag="header" class="" role="tab">
                  <a
                    class="faq-title button button-sm w-100 text-left p20"
                    block
                    v-b-toggle
                    :href="`#accordions-${number}`"
                    @click.prevent=""
                    variant="info"
                  >
                    <span><b-skeleton></b-skeleton></span>
                  </a>
                </div>
                <b-collapse
                  :id="`accordions-${number}`"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="faq-details"
                >
                  <div class="details p30 pl-30">
                    <p></p>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [],
    };
  },

  async fetch() {
    const response = await this.$axios.$get("faqs");
    this.faqs = response;
  },

  head() {
    return {
      title: "বিডো । সচরাচর জিজ্ঞাসিত প্রশ্ন",
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "বিডো । সচরাচর জিজ্ঞাসিত প্রশ্ন",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "বিডো । সচরাচর জিজ্ঞাসিত প্রশ্ন",
        },
      ],
    };
  },
};
</script>

<style scoped>
.collapsed::after {
  content: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  float: right;
  transform: translate(0px, 1px);
  -webkit-transform: translate(0px, 1px);
  -ms-transform: translate(0px, 1px);
  -moz-transform: translate(0px, 1px);
}
.not-collapsed::after {
  content: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  float: right;
  transform: rotate(180deg) translate(0px, 4px);
  -webkit-transform: rotate(180deg) translate(0px, 4px);
  -ms-transform: rotate(180deg) translate(0px, 4px);
  -moz-transform: rotate(180deg) translate(0px, 4px);
}

.not-collapsed {
  background-color: #da2d75 !important;
}
.not-collapsed span {
  color: #fff !important;
}
/* .collapsed{
    border-top:inherit !important;
} */
.accordion-custom {
  border: 1px solid #ddd;
}
.faq-title {
  border-radius: 0;
  border-bottom: 1px solid #ddd;
  white-space: inherit !important;
  background: rgb(255, 255, 255, 0);
}

.faq-title span {
  font-size: 18px;
  font-weight: 600;
}
.faq-details .details {
  border-bottom: 1px solid #ddd;
}
</style>