<template>
 <div class="homeBox">
   <img @click="start" src="@/assets/image/startBtn.png" alt="">
 </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import {VueCookieNext} from "vue-cookie-next";
import {userLogin,getUserInfo,isFillInfo,getUserStart} from "@/api/path";
import axios from "axios";
import {Toast} from "vant";
import 'vant/es/toast/style/index';
const router = useRouter();


// 获取授权信息
const userInfo = reactive<any>({
  openId: router.currentRoute.value.query.openId || "", // 获取用户openId
  avatar: router.currentRoute.value.query.avatar || "", // 获取用户头像
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
    login()
  } else {
    let url = encodeURIComponent(import.meta.env.VITE_APP_WXCHAT_OAUTH);
    window.location.href =
        `http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=${url}`;
    // window.location.href =
    //     `https://vmapi.webhl.com/Oapi/Auth?url=https://cad-answer.thermo-fisher.ms-vm.synconize.com`;
  }
}

// 登录
const userStart = ref(-1)
const login = async () => {
  let userData = {
    openId:userInfo.openId,
    wxHeadPortrait: userInfo.avatar,
    wxName: userInfo.nickname
  }
  await userLogin(userData)
  await getUserInfo({openId:VueCookieNext.getCookie('openId')})
  const {data} = await getUserStart({openId: VueCookieNext.getCookie('openId')})
  userStart.value = data

}




const start = () => {
  if (userStart.value === -1) {
    Toast.fail('登录中。。。')
  } else if(userStart.value === 0){
    Toast.fail('暂无抽奖资格')
  } else if (userStart.value === 4200) {
      Toast.fail('已经参与过活动,后续继续多多关注赛默飞的咨询!')
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
  img{
    width: 50%;
    position: absolute;
    bottom: 50px;
    margin: 0 auto;
  }
}
</style>
