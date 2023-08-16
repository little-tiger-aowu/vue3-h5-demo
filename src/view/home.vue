<template>
 <div class="homeBox">
   <div class="content">
     <img @click="start" src="@/assets/image/startBtn.png" alt="">
   </div>
   <img class="relus" @click="showRules = true" src="../assets/image/relus.png" alt="">
   <img class="prize" @click="showRecord" src="../assets/image/myPrize.png" alt="">
 </div>
  <van-overlay :show="showRules" >
    <img style="width: 80%" src="../assets/image/rulesItem.png" alt="">
    <img style="width: 10%;margin-top: 30px" @click="showRules = false" src="../assets/image/closeBtn.png" alt="">
  </van-overlay>
  <van-overlay :show="showPrize" >
    <img style="width: 80%;" v-if="isPrize" src="../assets/image/myPrizePop.png" alt="">
    <img v-else style="width: 80%;" src="../assets/image/giftBox1.png" alt="">
    <div v-if="isPrize" class="addAddress" style="width: 100%">
      <span @click="toAddress" v-if="!isFillAddress">点击填写收件信息</span>
      <span @click="toUpAddress" v-else>查看地址</span>
    </div>
    <img style="width: 10%;margin-top: 30px" @click="showPrize = false" src="../assets/image/closeBtn.png" alt="">
  </van-overlay>
  <van-overlay class="showAddress" :show="showAddress" >
    <div class="addressBox">
      <div style="text-align: center;margin: 5px 0;font-weight: bolder">我的地址</div>
      <div class="infoBox">
        <div>姓名：{{info.name}}</div>
        <div>手机：{{info.phone }}</div>
        <div>所在地区：{{info.province}} {{info.city}}{{info.area}}</div>
        <div>详细地址：{{info.address}}</div>
      </div>
      <div @click="toAddress" class="text" style="text-align: center;font-size: 18px;color: #535bf2">修改地址</div>
    </div>
    <img style="width: 10%;margin-top: 30px" @click="showAddress = false" src="../assets/image/closeBtn.png" alt="">
  </van-overlay>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import {VueCookieNext} from "vue-cookie-next";
import {userLogin,getUserInfo,isFillInfo,getUserStart,getRecord} from "@/api/path";
import {Toast} from "vant";
import 'vant/es/toast/style/index';
const router = useRouter();
const showRules = ref(false)
const showPrize = ref(false)
const showAddress = ref(false)

onMounted(() => {
  login()
})

// 登录
const userStart = ref(0)
const login = async () => {
  let userData = {
    openId:VueCookieNext.getCookie('openId'),
    wxHeadPortrait: VueCookieNext.getCookie('avatar'),
    wxName: VueCookieNext.getCookie('nickname')
  }
  await userLogin(userData)

  const {data} = await getUserStart({openId: VueCookieNext.getCookie('openId')})
  userStart.value = data
  if (data === 4500) {
    Toast({
      type: 'loading',
      duration: 1500,
      message: '您已完成答题，将跳转抽奖页面'
    })
    setTimeout(() => {
       router.push('/prize')
    },1500)

  }

}


// 查看抽奖记录
const isPrize = ref()
const isFillAddress = ref()
const showRecord = async () => {
  const { data } = await getRecord({openId: VueCookieNext.getCookie('openId')})
  if (data) {
    showPrize.value = true
    isPrize.value = data.id === 1;
    if (data.id === 1) {
      const { data } = await isFillInfo({openId: VueCookieNext.getCookie('openId')})
      isFillAddress.value = data
    }
  } else {
    Toast.fail('您还未参与活动')
  }
}

// 填写地址
const toAddress = () => {
  router.push({path: '/prize',query:{address: 1}})
}
const info = ref()
const toUpAddress = async () => {
  showPrize.value = false
  showAddress.value = true
  const {data} = await getUserInfo({openId:VueCookieNext.getCookie('openId')})
  info.value = data
}


const start = () => {
   if(userStart.value === 0){
    Toast.fail('暂无答题资格')
  } else if (userStart.value === 4200) {
      Toast.fail('您已经参与活动，更多活动即将陆续上线，敬请保持关注哦！')
  } else if (userStart.value === 4500) {
    router.push({path:'/answer',query:{isAnswer: 1}})
  } else {
    router.push('/answer')
  }
}



</script>

<style scoped lang="scss">
.homeBox{
  width: 100%;
  height: 100%;
  font-size: 30px;
  background-image: url("@/assets/image/homeBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  position: relative;
  display: flex;
  justify-content: center;
  .content{
    position: absolute;
    bottom: 30px;
    width: 50%;
    img{
      width: 100%;
    }
    .text{
      font-size: 15px;
      letter-spacing: 2px;
      text-align: center;
      color: white;
    }
  }
  .relus{
    position: absolute;
    width: 20%;
    height: auto;
    bottom: 20px;
    right: 15px;
  }
  .prize{
    position: absolute;
    width: 18%;
    height: auto;
    bottom: 20px;
    left: 15px;
  }
}
.van-overlay{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //:nth-child(1){
  //  width: 80%;
  //}
  //:nth-child(3){
  //  width: 10%;
  //  margin-top: 30px;
  //}
}
.addAddress{
  display: flex;
  justify-content: center;
  margin: 10px ;
  span{
    width: 100%;
    color: white;
    font-size: 18px;
    text-align: center;
    text-decoration:underline

  }
}
.addressBox{
  width: 75%;
  background-image: url("../assets/image/errorBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 15px;
  font-size: 18px;
  .text{
    margin:10px 0;
    text-decoration:underline;
  }
}
</style>
