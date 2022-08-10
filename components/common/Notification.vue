<template>
    <div class="d-flex" :class="readunread != null ? 'read' : ''">
        <img v-if="detaildata.details.bidder_avatar !== ''"  class="img-fluid rounded-circle author-img" :src="detaildata.details.bidder_avatar" />
        <img v-else class="img-fluid rounded-circle author-img" src="~/assets/images/user/avatar_demo.svg" />
        <div class="w-100">
            <div class="">
                <div class="display-fl">
                <h6 class="mb-1 fw-600 " style="flex:1" ><a  @click.prevent="markAsread(notificationid)" href="#">{{detaildata.details.bidder_name}}</a> </h6>
                <div class="notification-toggle">
                  
                    <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                        <i class="fas fa-ellipsis-v fa-xs" style="color: #252c53;"></i>
                        </template>
                        <b-dropdown-item @click.prevent="markAsread(notificationid)" href="#">ডিটেইলস দেখুন</b-dropdown-item>
                        <b-dropdown-item @click.prevent="deleteNotifica(notificationid)" href="#">ডিলিট করুন </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
            <small style="display: flow-root;"><a  @click.prevent="markAsread(notificationid)" href="#">{{detaildata.details.notification_message}}</a></small>
            </div>

            <p class="mb-1 float-right mt-10 fw-500" style="font-size: 0.75rem;">
            <i class="fas fa-calendar-alt fa-xs ml-5 "></i>  {{date}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:['notificationid','date','detaildata','readunread'],

    methods: {
        markAsread(id){
           this.$axios.$post('mark-notification',{'id':id})
            .then(response => {
                this.$router.push(response)
            })
            .catch(error => {
            console.log(error)
            })
        },

        deleteNotifica(id){
            this.$axios.$delete("notification/"+id+"/destroy")
            .then(response => {
                this.$store.commit("bid/setRemoveNotification", id);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
.read {
    opacity: 0.6;
}
.unread {
    
}
.notification-icon img{
    width: 35px;
    margin-right: 6px;
}
.notification-main{
/* background: #fff; */
    /* width: 20% ;
    height: 100%;
    position: fixed;
    right: 0;
    top: 61x;
    z-index: 9999;
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
    /* max-height: 291px; */
    /* border-radius: 3px;
    -webkit-box-shadow:-5px 1px 15px 0px #e8e5e5;
    box-shadow: -5px 1px 15px 0px #e8e5e5;  */
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

.notification-toggle ul{
    padding: 0 !important;
    box-shadow: 1px 1px 4px 1px rgb(149 157 165 / 52%);
}
.notification-toggle ul li{
    padding: 0 !important;
}
.notification-toggle ul li:first-child{
     border-bottom: 1px solid #ddd;
}


</style>