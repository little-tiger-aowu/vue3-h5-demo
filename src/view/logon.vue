/**
* Author: LZP
* Date: 2023-08-16
*/
<template>
  <div class="loginBg">
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {VueCookieNext} from "vue-cookie-next";

const cookies = VueCookieNext
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
    router.push('/home')
  } else {
    let url = encodeURIComponent(import.meta.env.VITE_APP_WXCHAT_OAUTH);
    // window.location.href =
    //     `http://wx.oauth.synconize.com/wech/at/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://192.168.241.33:5175/`;
    window.location.href =
        `https://app.jingsocial.com/api/oauth/authorize?appid=wx923804b1d49f51fb&scope=snsapi_userinfo&redirect_uri=http://thermofisher.thumbs.al-ecs.synconize.cn/`;
  }
}

</script>

<style scoped lang="scss">
.loginBg {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/image/loginBg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>
