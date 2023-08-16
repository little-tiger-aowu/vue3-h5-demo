<template>
  <div class="homeBox">
    <div class="content">
      <img  src="@/assets/image/startBtn.png" alt="">
    </div>
    <img class="relus" src="../assets/image/relus.png" alt="">
    <img class="prize" src="../assets/image/myPrize.png" alt="">
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import 'vant/es/toast/style/index';
import {VueCookieNext} from "vue-cookie-next";
const router = useRouter();

// 获取授权信息
const userInfo = reactive<any>({
  openId: router.currentRoute.value.query.openid || "", // 获取用户openId
  avatar: router.currentRoute.value.query.headerurl || "", // 获取用户头像
  nickname: router.currentRoute.value.query.nickname || '' // 获取用户昵称
});


onMounted(() => {
  getOpenId()
})

// 获取openId
const getOpenId = () => {
  if (userInfo.openId) {
    VueCookieNext.setCookie("openId", userInfo.openId);
    VueCookieNext.setCookie("avatar", userInfo.avatar);
    VueCookieNext.setCookie("nickname", userInfo.nickname);
    router.replace('/home')
  } else {
    let url = encodeURIComponent(import.meta.env.VITE_APP_WXCHAT_OAUTH);
    // window.location.href =
    //     `http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=${url}`;
    window.location.href =
        `https://vmapi.webhl.com/Oapi/Auth?url=${url}`;
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
  :nth-child(1){
    width: 70%;
  }
  :nth-child(2){
    width: 10%;
    margin-top: 50px;
  }
}
</style>
