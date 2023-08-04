<template>
  <div v-if="!imgUrl" class="postersBox">
    <div ref="content" class="content">
      <div class="postersBg">
        <div ref="codeImg" class="codeImg">
          <qrcode-vue class="qrcode" :value="qrcodeValue" :size="size" level="L"/>
        </div>
      </div>
      <van-row class="shareInfo" :gutter="10" justify="center">
        <van-col span="14" class="comments">
        </van-col>
      </van-row>
    </div>

    <div class="bottomBar">
      <div @click="test" class="shareBtn friends">邀请好友</div>
      <div @click="test" class="shareBtn circleFriends">转发朋友圈</div>
    </div>
  </div>
  <div v-else class="postersBox showPosters">
    <img style="width: 100%" :src="imgUrl" alt="">
  </div>

  <!-- 邀请弹窗 -->
  <van-overlay :show="show">
    <div class="popupBox">
      <img @click="showTip" style="width: 40%;height: 11%" src="../assets/image/Ranking/shareBtn.png" alt="">
    </div>
    <span
        style="color: white;font-size: 14px;text-align: center;width: 70%;margin-top: 30px">留言成功后邀请好友参与留言活动的，被邀请人成功注册并留言的视作邀请成功。</span>
  </van-overlay>
  <!-- 提示 -->
  <van-overlay :show="tipShow">
    <!--    <img class="tipImg" src="../assets/image/Ranking/arrow.png" alt="">-->
    <div class="tipPopupBox">
      长按屏幕分享图片
    </div>
    <img class="closeBtn" @click="tipShow = false" src="../assets/image/closebtn.png" alt="">
  </van-overlay>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import html2canvas from 'html2canvas'
import {VueCookieNext} from "vue-cookie-next";
import QrcodeVue from 'qrcode.vue'
import {Toast} from 'vant'
import 'vant/es/toast/style/index';

const router = useRouter();

const postersInfo = reactive({
  leave: VueCookieNext.getCookie('commentsInfo').leave,
  time: VueCookieNext.getCookie('commentsInfo').time,
  nickname: VueCookieNext.getCookie('nickname'),
  avatar: VueCookieNext.getCookie('avatar')
})

const imgUrl = ref<string>('')
const content = ref<any>(null)
const test = () => {
  Toast({
    type: 'loading',
    message: '生成海报...',
    duration: 1500
  })
  setTimeout(() => {
    html2canvas(content.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      scrollX: 0,
      scrollY: 0,
      height: content.value.scrollHeight,
      windowHeight: content.value.scrollHeight
    }).then((canvas: any) => {
      imgUrl.value = canvas.toDataURL('image/png')
      show.value = true
    })
  }, 1500)
}

const show = ref(false)
const tipShow = ref(false)

// 生成二维码
const size = ref<number>(85)
const qrcodeValue = ref<string>(`http://scanning.cdn-static.synconize.com/?helpOpenId=${VueCookieNext.getCookie('openId')}&periodId=${VueCookieNext.getCookie('periodId')}`)

const showTip = () => {
  show.value = false
  tipShow.value = true
}

</script>

<style scoped lang="scss">
.postersBox {
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
  overflow: scroll;

  .content {
    background-color: white;
    width: 92%;
    height: auto;
    margin: 10px auto;
    padding: 5px;

    .postersBg {
      height: 578px;
      background-image: url("../assets/image/posters/posters.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
    }

    .codeImg {
      margin-top: 430px;
      text-align: center;
      line-height: 75px;

      .qrcode {
        border: 3px solid #eb5750;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }

    .shareInfo {
      align-items: center;
      margin-top: 5px;


      .comments {
        font-size: 12px;
      }

      .useInfo {
        font-size: 15px;
        display: flex;
        flex-direction: column;
        text-align: end;
        align-content: space-between;

        .Info {
          //display: flex;
          //text-align: end;
          display: flex;
          justify-content: flex-end;
          font-size: 13px;
          align-items: center;

          .headerImg {
            width: 25px;
            height: 25px;
            border: 1px solid #999999;
            border-radius: 50%;
            margin-right: 5px;
          }

          .nickName {
            text-align: center;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .time {
          font-size: 13px;
        }

      }
    }
  }

  .bottomBar {
    width: 100%;
    height: 70px;
    position: absolute;
    bottom: 0;
    background-image: url("../assets/image/posters/postersBottom.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .shareBtn {
      font-size: 16px;
      background-color: white;
      padding: 1px 10px;
      color: #e72c30;
      border-radius: 5px;
      font-weight: bolder;
    }
  }
}

.van-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tipImg {
    position: absolute;
    width: 15%;
    top: 30px;
    right: 30px;
  }

  .popupBox {
    width: 80%;
    height: 350px;
    background: url("../assets/image/Ranking/popupBg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    position: relative;

    img {
      position: absolute;
      bottom: 10px;
    }


  }

  .closeBtn {
    width: 8%;
    margin-top: 30px;
  }
}

.tipPopupBox {
  width: 80%;
  height: 110px;
  background: url("../assets/image/Ranking/popup.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: relative;
  font-size: 18px;
  flex-direction: column;
  align-items: center;
  color: white;
}

.showPosters {
  padding: 5px;
}
</style>
