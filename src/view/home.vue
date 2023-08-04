<template>
  <div class="homeBox">
    <div class="showRules">
      <img @click="showRules" src="../assets/image/home/showBtn.png" alt=""/>
    </div>
    <div class="btnBox">
      <img @click="toStart" src="../assets/image/home/startBtn.png" alt=""/>
      <img @click="toRanking('like')" src="../assets/image/home/homeBtn2.png" alt=""/>
      <img @click="toRanking('invitation')" src="../assets/image/home/homeBtn1.png" alt=""/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {VueCookieNext} from "vue-cookie-next";
import {useRouter} from "vue-router";
import {userLogin} from "@/api/path";
import {IData} from "@/type/request";

const router = useRouter();

// 获取授权信息
const userInfo = reactive<any>({
  openId: router.currentRoute.value.query.openId || "", // 获取用户openId
  avatar: router.currentRoute.value.query.avatar || "", // 获取用户头像
  nickname: router.currentRoute.value.query.nickname || '' // 获取用户昵称
});

onMounted(() => {
  if (router.currentRoute.value.query.helpOpenId) {
    VueCookieNext.setCookie('helpOpenId', router.currentRoute.value.query.helpOpenId as string)
  }
  if (router.currentRoute.value.query.periodId) {
    VueCookieNext.setCookie('targetId', router.currentRoute.value.query.periodId as string)
  }
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
  }
}

// 登录
const login = () => {
  let data = {
    openId: userInfo.openId,
    wxHeadPortrait: userInfo.avatar,
    wxNickname: userInfo.nickname,
    inviteUserOpenId: VueCookieNext.getCookie('helpOpenId'),
    helpUserOpenId: userInfo.openId
  }
  userLogin(JSON.stringify(data)).then((res: IData) => {
    if (res.code === '00000') {
      localStorage.token = res.data.authInfo.accessToken
      VueCookieNext.setCookie('isUserForm', res.data.hasInfo)
      if (VueCookieNext.getCookie('targetId')) {
        router.push({path: 'listDetails', query: {id: VueCookieNext.getCookie('targetId')}})
        VueCookieNext.removeCookie('targetId')
        VueCookieNext.removeCookie('periodId')
      }
    }
  })
}
const showRules = () => {
  router.push("rules");
};

// 开始
const toStart = () => {
  router.push("list");
}

// 排行榜
const toRanking = (type: string) => {
  router.push({path: 'ranking', query: {type}});
}
</script>

<style scoped lang="scss">
.homeBox {
  height: 100%;
  background-image: url("../assets/image/home/homeBg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;

  .showRules {
    width: 15%;
    position: absolute;
    top: 15px;
    right: 20px;

    img {
      width: 100%;
    }
  }

  .btnBox {
    //position: fixed;
    //bottom: 11%;
    left: 30%;
    width: 60%;
    height: auto;
    margin-top: 425px;
    margin-left: 118px;
    // border: 1px solid red;
    img {
      width: 75%;
      margin-bottom: 18px;
    }
  }
}
</style>
