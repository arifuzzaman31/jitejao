<template>
    <div>
        <div class="bg-profile clearfix">
            <div class="Profile-bg">
                <!-- <img src="~/assets/images/" class="bg img-fluid"> -->
                <!-- image profile_bg -->
            </div>
            <b-container>
                <b-row class="pt-20 pb-20">
                    <div class="col-md-12">
                        <div class="buyer-public-profile  text-center">
                            <div class="buyer-public-img">
                                <!-- <img src="~/assets/images/user/#" alt="Customers" class="img-fluid avatar rounded-circle" /> -->
                            </div>
                            <div class="buyer-public-content">
                                <h2 class="name ">শাখাওয়াত হোসেন</h2>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <NuxtLink to="#"> <span>(5 Rating)</span></NuxtLink>
                                </div>
                                <div class="badge-main p0">
                                    <img src="~/assets/images/badge/1.svg" class="img-fluid badge mr-5" v-b-tooltip.hover title="Badge 1" alt="badge " />
                                    <img src="~/assets/images/badge/2.svg" class="img-fluid badge mr-5" v-b-tooltip.hover title="Badge 2" alt="badge" />
                                    <img src="~/assets/images/badge/3.svg" class="img-fluid badge mr-5" v-b-tooltip.hover title="Badge 3" alt="badge" />
                                </div>
                            </div>
                            <div class="buyer-public-description">
                                <p>
                                    আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিঅভ্র^ নামক এক যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।
                                    এর পর একে একে বাংলা উইকিপিডিয়া, ওয়ার্ডপ্রেস বাংলা কোডেক্সসহ বিভিন্ন বাংলা অনলাইন পত্রিকা তৈরির কাজ করতে করতে বাংলার সাথে নিজেকে
                                    বেঁধে নিয়েছি আষ্টেপৃষ্ঠে। বিশেষ করে অনলাইন পত্রিকা তৈরি করতে ডিযাইন করার সময়, সেই ডিযাইনকে কোডে রূপান্তর করবার সময় বারবার
                                </p>
                            </div>
                        </div>
                    </div>
                </b-row>
            </b-container>
            <div class="buyer-public-list border p10 clearfix">
                <b-container>
                    <div class="col-md-8">
                        <div class="df ">
                            <ul>
                                <li><b>মিরপুর</b> লোকেশন</li>
                                <li><b>০১-০১-২০২১</b>জয়েনিং ডেট </li>
                                <li><b>২০টি </b>কাজ শেষ করেছেন </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                    </div>
                </b-container>
            </div>
        </div>
        <!-- end profile -->


        <b-container>
            <b-row>
                <div class="col-md-12">
                    <div class="dashboard-title mt-30">
                        <h2>মাই রিভিউ </h2>
                    </div>
                </div>
            </b-row>
            <b-row>
                <div class="col-md-12">
                    <div class="bg-white p10">
                        <div class="buyer-review-profile clearfix mt-15">
                            <div class="buyer-review-img">
                                <!-- <img src="~/assets/images/user/#" alt="Customers" class="img-fluid mb-10 avatar rounded-circle"> -->
                            </div>
                            <div class="buyer-review-content mt-15">
                                <NuxtLink to="">
                                    <h3>আমি ফেনী থেকে ঢাকা যাবো। আমার একটা হেলিকাপ্টার দরকার।</h3>
                                </NuxtLink>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span class="ml-15">13 ডিসেম্বর 2020</span>
                                </div>
                            </div>
                            <div class="buyer-review-content">
                                <p>প্রোডাক্ট কোয়ালিটি দামের সাথে ঠিক আছে। সেলার ব্যবহার ব্যাবহার ভালো লেগেছে।
                                    আর পরিশেষে ডেলিভারি সার্ভিস বেশ ভালো লেগেছে। বাসার কাছাকাছি এসে দিয়ে গেছেন।</p>
                            </div>
                        </div>
                        <!-- review end  -->
                        <div class="buyer-review-profile clearfix mt-15">
                            <div class="buyer-review-img">
                                <!-- <img src="~/assets/images/user/#" alt="Customers" class="img-fluid mb-10 avatar rounded-circle"> -->
                            </div>
                            <div class="buyer-review-content mt-15">
                                <NuxtLink to="">
                                    <h3> আমার ২ টা এনা বাস লাগবে ঢাকা - লন্ডন</h3>
                                </NuxtLink>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span class="ml-15">13 ডিসেম্বর 2020</span>
                                </div>
                            </div>
                            <div class="buyer-review-content">
                                <p>প্রোডাক্ট কোয়ালিটি দামের সাথে ঠিক আছে। সেলার ব্যবহার ব্যাবহার ভালো লেগেছে।
                                </p>
                            </div>
                        </div>
                        <!-- review end  -->
                        <div class="buyer-review-profile clearfix mt-15">
                            <div class="buyer-review-img">
                                <!-- <img src="~/assets/images/user/#" alt="Customers" class="img-fluid mb-10 avatar rounded-circle"> -->
                            </div>
                            <div class="buyer-review-content mt-15">
                                <NuxtLink to="">
                                    <h3>আমার ৫০০ টা T-Shirt লাগবে, কে দিতে পারবেন?</h3>
                                </NuxtLink>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span class="ml-15">13 ডিসেম্বর 2020</span>
                                </div>
                            </div>
                            <div class="buyer-review-content">
                                <p>Extraordinary Talent.Thanks you</p>
                            </div>
                        </div>
                        <!-- review end  -->
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
            };
        },
        methods: {},
        computed: {
            // getUser() {
            //   return this.$store.state.auth.user;
            // },
        },
    };
</script>

<style>
</style>