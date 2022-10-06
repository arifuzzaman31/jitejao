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
                ১. যেকোনো ইউজার রেজিস্ট্রেশন এর সময় মোবাইল ভেরিফিকেশনের মাধ্যমে ভেরিফায়েড হতে হবে।
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
                ৩. যে কেউ যে কোনো পোস্টে বিড করতে পারবেন। প্রথম ৩০ দিনের জন্যে ফ্রী সাবস্ক্রিপশন পাবেন । 
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৪. শুধুমাত্র সেলারকে সাবস্ক্রিপশন প্যাকেজ কিনে নিতে হবে। সর্বনিম্ন ৩০ টাকায় সারা মাস আনলিমিটেড সেল করতে পারবে।
              </p>
            </div>
          </div>

          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৫. ডিমান্ড পোস্ট দাতা অবশ্যই বুঝে শুনে পোস্ট করবে। অপ্রয়োজনে পোস্ট করবে না। 
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৬. সেলার অবশ্যই বিড করার সময় প্রোডাক্টের রিয়েল ইমেজ দিয়ে পোস্ট করার চেষ্টা করবে। 
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                
       ৭. কাষ্টমার এবং সেলারের মধ্যে ডিল ফাইনাল হলে অবশ্যই লিখিত চুক্তির মাধ্যমে লেনদেন করবে। এক্ষেত্রে <a href="http://jitejao.com" target="_blank">jitejao.com</a> এর সরাসরি হেল্প নিতে পারে। 
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ৯. প্রোডাক্ট ডেলিভারির ক্ষেত্রে <a href="http://jitejao.com" target="_blank">jitejao.com</a> এর সরাসরি হেল্প নিতে পারে। 
              </p>
            </div>
          </div>
          <div class="terms">
            <div class="title  pb-0">
              <!-- <h2>বিজ্ঞাপন নীতি</h2> -->
            </div>
            <div class="details  pt-10">
              <p>
                ১০. <a href="http://jitejao.com" target="_blank">jitejao.com</a> যে কোনো বিষয়ে যে কোনো সময় যে কোনো সিদ্ধান্ত নেয়ার সম্পূর্ণ একক অধিকার রাখে।
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

.terms .details a{
    color: #B90D59;
  }
  .terms  p{
    font-size:18px;
  }
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