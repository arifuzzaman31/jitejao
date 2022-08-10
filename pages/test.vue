<template>

  <b-row>
<!--
    <div class="notification-main">
        <div class="w-100 bg-white  clearfix text-left">

            <ul>
            
                <li>
                    <div class="">
                        <NuxtLink to="">
                            <img class="img-fluid rounded-circle author-img" src="	https://api.bidodevs.xyz/public/images/avatar/2021-06-17-1623909959.jpeg" />
                        </NuxtLink>
                        <div class="content notification-content">
                            <div class="notification-left-content">
                                <NuxtLink class="text-bold" to="">
                                    Sayeed Jony
                                </NuxtLink>
                                <br>
                                <NuxtLink to="">
                                    A ancient dress will .....
                                </NuxtLink>
                            </div>
                            <div class="notification-date">
                                <span> <i class="fas fa-clock"></i> 2 Minutes</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <NuxtLink to="">
                            <img class="img-fluid rounded-circle author-img" src="	https://api.bidodevs.xyz/public/images/avatar/2021-06-17-1623909959.jpeg" />
                        </NuxtLink>
                        <div class="content notification-content">
                            <div class="notification-left-content">
                                <NuxtLink class="text-bold" to="">
                                    Sayeed Jony
                                </NuxtLink>
                                <br>
                                <NuxtLink to="">
                                    A ancient dress will .....
                                </NuxtLink>
                            </div>
                            <div class="notification-date">
                                <span> <i class="fas fa-clock"></i> 2 Months</span>
                            </div>
                        </div>
                    </div>
                </li>       
                <li>
                    <div class="">
                        <NuxtLink to="">
                            <img class="img-fluid rounded-circle author-img" src="	https://api.bidodevs.xyz/public/images/avatar/2021-06-17-1623909959.jpeg" />
                        </NuxtLink>
                        <div class="content notification-content">
                            <div class="notification-left-content">
                                <NuxtLink class="text-bold" to="">
                                    Sayeed Jony
                                </NuxtLink>
                                <br>
                                <NuxtLink to="">
                                    A ancient dress will .....
                                </NuxtLink>
                            </div>
                            <div class="notification-date">
                                <span> <i class="fas fa-clock"></i> 1 Hours</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <NuxtLink to="">
                            <img class="img-fluid rounded-circle author-img" src="	https://api.bidodevs.xyz/public/images/avatar/2021-06-17-1623909959.jpeg" />
                        </NuxtLink>
                        <div class="content notification-content">
                            <div class="notification-left-content">
                                <NuxtLink class="text-bold" to="">
                                    Sayeed Jony
                                </NuxtLink>
                                <br>
                                <NuxtLink to="">
                                    A ancient dress will .....
                                </NuxtLink>
                            </div>
                            <div class="notification-date">
                                <span> <i class="fas fa-clock"></i> 1 Year</span>
                            </div>
                        </div>
                    </div>
                </li>

            </ul>


        </div>
    </div> -->
   
</b-row>

</template>
 
<script>

 
export default {

 
  data() {
    return {
      
    };
  }
};
</script>
<style>

.notification-main{
  background: #fff;
    width: 20% !important;
    height: 100%;
    position: fixed;
    right: 0;
    top: 73px;
    z-index: 9999;
    text-align: center;
}
.notification-main ul li{
    width: 100%;
    float: left;
    padding: 15px;
}
.notification-main ul li:nth-child(even){
     background: rgba(0,98,255,.04)!important;
}
.notification-main ul li:nth-child(odd){
    background-color: rgba(76,175,80,.04);
}
.notification-main img.author-img{
  float: left;
    margin-right: 15px;
    width: 45px;
    height: 45px;
    -o-object-fit: cover;
    object-fit: cover;
}
.notification-content{
  display:flex;
}
.notification-left-content{
    flex:1;
    line-height: 20px;
}
.notification-date i{
  font-size:11px;
}
.notification-date span{
  color: #727b9a;
  font-size:15px;
}

</style>