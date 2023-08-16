<template>
 <div class="prizeBox">
   <img v-if="gifShow" class="prizeGif" src="../assets/image/prizeGif.gif" alt="">
   <img v-else @click="playStart" class="prizeGif" src="../assets/image/gitStart.png" alt="">
   <div class="bottomTab">
     <span v-if="!backHome">点击盒子进行抽奖</span>
     <img @click="toHome" v-else src="../assets/image/goHome.png" alt="">
   </div>
 </div>
  <!-- 奖品弹窗 -->
<!--  <van-overlay :show="show">-->
<!--    <img src="../assets/image/giftBox.png" alt="">-->
<!--    <img @click="show = false" src="../assets/image/closeBtn.png" alt="">-->
<!--  </van-overlay>-->
  <!-- 遮罩层 -->
  <van-overlay :show="show">
    <div v-if="!fillInfo" class="giftBox" @click.stop>
      <div v-if="isWin" class="gift">
        <img @click="fillAddressBtn" src="../assets/image/fillAddress.png" alt="">
      </div>
      <div v-else class="gift1">
        <img  src="../assets/image/giftBox1.png" alt="">
      </div>
      <img @click="show = false" class="close" src="../assets/image/closeBtn.png" alt="">
    </div>
    <!-- 表单 -->
    <div v-else class="addressBox giftBox">
      <img style="display: block;z-index: 3" src="@/assets/image/submitInfo.png" alt="">
      <div class="submitItem">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="userInfo.userName"
                name="用户名"
                :label-width="45"
                label="姓名"
                placeholder="姓名"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                :label-width="45"
                v-model="userInfo.phone"
                label="手机"
                placeholder="手机号"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                v-model="userInfo.city"
                readonly
                label="所在地区"
                :label-width="75"
                placeholder="选择城市"
                @click="showPicker = true"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                :label-width="75"
                v-model="userInfo.address"
                label="详细地址"
                placeholder="详细地址"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              <img src="../assets/image/submitFrom.png" alt="">
            </van-button>
          </div>
        </van-form>
      </div>
<!--      <img @click="show = false" class="close" src="../assets/image/closeBtn.png" alt="">-->
    </div>
  </van-overlay>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
        :columns="urbanArea"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :columns-field-names="customFieldName"
    />
  </van-popup>
  <!---->
  <van-overlay :show="endShow" >
    <div class="endIngBox">
      <div>提交成功</div>
      <div>我们将会在活动结束后7天内寄送奖品</div>
    </div>
    <img @click="endShow = false" style="width: 8%;margin-top: 50px" class="close" src="../assets/image/closeBtn.png" alt="">
  </van-overlay>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import {addInfo, playPrize} from "@/api/path";
import {VueCookieNext} from "vue-cookie-next";
import {urbanArea} from '@/utils/urbanArea'
import {Toast} from "vant";
import 'vant/es/toast/style/index';
const router = useRouter();

const show = ref(false)
const endShow = ref(false)
const fillInfo = ref(false)
const gifShow = ref(false)
const backHome = ref(false)

const addressId = router.currentRoute.value.query.address
console.log("addressId",addressId)

onMounted(() => {
  console.log("router.currentRoute.fullPath",router.currentRoute)
  if (addressId) {
    show.value = true
    fillInfo.value = true
    router.replace(router.currentRoute.value.path)
  }

})

// 返回首页
const toHome = () => {
  router.replace('/home')
}

const isWin = ref<boolean>(false)
const getPrize = async () => {
  const { code,data,msg } = await playPrize({openId: VueCookieNext.getCookie('openId')})
  if (code === 10012) {
    Toast.fail(msg)
    backHome.value = true
  } else {
    gifShow.value = true
    if (data === 1) {
      isWin.value = true
    }
    setTimeout(() => {
      show.value = true
      backHome.value = true
    },2500)
  }
}

const playStart = () => {
  getPrize()
}

// 填写地址
const fillAddressBtn = () => {
  fillInfo.value = true
}


const showPicker = ref(false);

const onConfirm = (value:any) => {
  userInfo.city = ''
  value.forEach((item:any) => {
    if (item.label) {
      userInfo.city += item.label + ' '
    }
  })
  userInfo.province = value[0].label
  userInfo.city1 = value.length === 2 ? '' : value[1].label
  userInfo.area = value[2].label
  showPicker.value = false
};


const customFieldName = {
  text: 'label',
  children: 'children',
};

const userInfo = reactive({
  userName: '',
  phone: '',
  address: '',
  city1: '',
  province: '',
  city: '',
  area: '',
})


// 提交表单
const onSubmit = async (values:any) => {
  let formData = {
    name: userInfo.userName,
    phone: userInfo.phone,
    address: userInfo.address,
    province: userInfo.province, // 省
    city: userInfo.city1, // 市
    area: userInfo.area, // 区
    openId: VueCookieNext.getCookie('openId')
  }
  const { code,data,msg } = await addInfo(JSON.stringify(formData))
  if (code === 200){
    show.value = false
    endShow.value = true
    backHome.value = true
  } else {
    Toast.fail(msg)
  }

}

</script>

<style scoped lang="scss">
.prizeBox{
  width: 100%;
  height: 100%;
  background-image: url("@/assets/image/prizeBg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}
.prizeGif{
  width: 100%;
  position: absolute;
  top: -70px;
}
.van-overlay{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //:nth-child(1){
  //  width: 70%;
  //}
  //:nth-child(2){
  //  width: 8%;
  //  margin-top: 35px;
  //}
}
.giftBox{
  width: 80%;
  height: 267px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .gift{
    width: 100%;
    height: 100%;
    background-image: url("@/assets/image/giftBox.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    position: relative;
    text-align: center;
    img{
      width: 40%;
      position: absolute;
      bottom: 15px;
      transform: translate(-50%, 0);
    }
  }
  .gift1{
    img{
      width: 90%;
    }
  }
  .close{
    width: 10%;
    text-align: center;
    margin-top: 40px;
  }
}
.addressBox{
  width: 80%;
  margin-top: -80px;
  .submitItem{
    width: 100%;
    height: 309px;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .van-form{
      width: 99.4%;
      position: absolute;
      top: -10px;
      background-color: white;
      border-radius: 0 0 10px 10px;
      .van-cell-group{
        border-bottom: 1px solid #999;
        border-radius: 0;
        padding: 5px 0;
      }
      .van-button{
        background-color: transparent;
        border: 0;
        img{
          width: 70%;
          margin-top: 20px;
        }
      }
    }


  }
  img{
    width: 100%;
  }
  .close{
    width: 10%;
    text-align: center;
    margin-top: 10px;
  }
}
.bottomTab{
  width: 100%;
  position: absolute;
  bottom: 220px;
  display: flex;
  justify-content: center;
  font-size: 15px;
  span{
    letter-spacing: 2px;
  }
  img{
    width: 40%;
  }
}
.endIngBox{
  width: 80%;
  height: 115px;
  background-image: url("../assets/image/end.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  font-size: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
}

</style>
