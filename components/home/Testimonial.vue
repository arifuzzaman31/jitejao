<template>
<div class="h-testimonial pt-100 mb-50">
  <b-container>
    <b-row class="pb-50">
      <div class="col-lg-12 col-sm-12 ">
        <div class="author-heading text-center">
          <h2>কাস্টমার রিভিউ</h2>
          <p>আমাদের কাস্টমার আমাদের সম্পর্কে যে কমেন্ট করেছেন</p>
        </div>
      </div>
    </b-row>
     
      <b-row class="justify-content-md-center">
      <div class="col-lg-6 col-sm-12 bg-blue-gray">
        <div class="testimonial-author text-center">
          <div class="content">
            <p>{{ ratings[currentIndex].content }}</p>
          <div class="author">
            <img
              :src="
                require(`~/assets/images/testimonial/${ratings[currentIndex].image}`)
              "
              class="img-fluid"
              alt="author"
            />
          </div>
          </div>
          <div class="slider-nav mb-15">
            <a href="" @click.prevent="previousIndex" class="prev">
             <i class="fas fa-long-arrow-alt-left"></i>
            </a>
            <a href="" @click.prevent="nextIndex" class="next">
            <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      ratings: [
        {
          id: 1,
          customer_name: "মিজান",
          content:
            "অফিসিয়াল ট্যুর এর জন্যে ২০০ পিস টি-শার্ট দরকার ছিলো। jitejao.com এ ডিমান্ড করার সাথে সাথে অনেক প্রফেশনাল সেলার থেকে আমি রেস্পন্স পাই ।",
          image: "1.jpg",
        },
        {
          id: 2,
          customer_name: "ইমরান",
          content: "অনেক প্রফেশনাল সার্ভিস । বাংলাদেশের প্রেক্ষাপটে এইরকম একটা ওয়েবসাইট সবার খুব কাজে আসবে। jitejao.com এখানকার বাজার ব্যবস্থার চেহারা পাল্টে দিতে পারে।",
          image: "2.jpg",
        },

        {
          id: 3,
          customer_name: "তুহিন",
          content:
            "আমি jitejao.com এর ১জন সেলার। আগের থেকে কাস্টমার খুজে নেওয়া এখন অনেক সহজ হয়ে গেছে । ব্যবসা হাতের মুঠোয় মনে হচ্ছে । ধন্যবাদ jitejao.com।",
          image: "3.jpg",
        },
      ],
    };
  },
  methods: {
    previousIndex() {
      let totalRating = this.ratings.length;
      if (totalRating <= 0) {
        return false;
      }
      if (this.currentIndex <= 0) {
        this.currentIndex = totalRating - 1;
      } else {
        this.currentIndex -= 1;
      }
    },
    nextIndex() {
      let totalRating = this.ratings.length;
      if (totalRating <= 0) {
        return false;
      }
      if (this.currentIndex >= totalRating - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
  },
};
</script>
<style >
/* ===================
 testimonial
=================== */
.h-testimonial{
  position: relative;
}
.h-testimonial::before{
    content: "";
    /* background-color: white; */
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 70%;
}

.testimonial-author .content {
  /* background-color: #F4F5F8; */
  padding: 30px 0px;
  margin: 0 auto;
  border-radius: 5px;
}
.testimonial-author  .author {
  margin-top: 15px;
}
.testimonial-author .author img {
  border-radius: 50px;
  width: 60px;
  height: 60px;
  border: 2px solid #fff;
}
.testimonial-author .content p {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.testimonial-author .slider-nav .prev,
.testimonial-author .slider-nav .next {
 margin: 10px;
}

.testimonial-author .slider-nav i{
  font-size: 18px;
}
</style>
