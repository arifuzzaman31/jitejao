<template>
  <div>
    <b-container>
      <b-row>
        <div class="dashboard-title text-center mb-70 mt-30">
          <h2 class="mb-10">টার্মস ও কন্ডিশন</h2>
          <!-- <p>নিছে বর্ণিত নিয়মাবলী পড়ুন ।</p> -->
        </div>
      </b-row>

      <b-row>
        <div class="col-md-12">
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>গোপনীয়তা নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ১. যেকোনো ইউজার রেজিস্ট্রেশন এর সময় মোবাইল ভেরিফিকেশনের মাধ্যমে
                ভেরিফায়েড হতে হবে।
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>ক্রেতা অ্যাকাউন্ট নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>২. ইউজার যে কোনো বৈধ ডিমান্ড পোস্ট করতে পারবেন।</p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিক্রেতা অ্যাকাউন্ট নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৩. যে কেউ যে কোনো পোস্টে বিড করতে পারবেন। দিনের জন্যে ফ্রী
                সাবস্ক্রিপশন পাবেন ।
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৪. ডিমান্ড এবং নিলাম উভয় ক্ষেত্রেই সেলারকে সাবস্ক্রিপশন প্যাকেজ
                কিনে নিতে হবে। সর্বনিম্ন ৩০ টাকায় সারা মাস আনলিমিটেড সেল করতে
                পারবে।
              </p>
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
    return {};
  },
};
</script>

<style scoped>
.collapsed::after {
  content: "\f054";
  font-family: "Font Awesome 5 Pro" !important;
  float: right;
}
.not-collapsed::after {
  content: "\f054";
  font-family: "Font Awesome 5 Free" !important;
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
}

.faq-title span {
  font-size: 18px;
}
.faq-details .details {
  border-bottom: 1px solid #ddd;
}
</style>