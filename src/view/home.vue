<template>
  <div class="homeBox">
    <!-- 转盘 -->
    <div class="luckyBox">
      <LuckyWheel
          class="myLucky"
          ref="myLucky"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
      />
    </div>
    <!-- 开始抽奖 -->
    <!--    <img class="playBtn" @click="startCallback" src="../assets/image/playBtn.png" alt="">-->
    <!-- 我的奖品 -->
    <div @click="showRecord" class="playBtn">我的奖品和收获信息</div>
  </div>
  <!-- 中奖结果 -->
  <van-overlay :show="prizeShow">
    <div class="wrapper">
      <div class="prizeBg">
        <div class="prizeUrl">
          <img :src=prizeInfo.prizePic alt="">
        </div>
        <div v-if="prizeInfo.id !== 0" class="prizeName" style="color: #381012">恭喜你，获得{{
            prizeInfo.prizeName
          }}
        </div>
        <div v-else>很遗憾，未中奖</div>
      </div>
      <div class="addressFill" style="color: white;border-bottom: 1px solid #fff;margin-top: 20px">
        <span @click="addressShow = true;prizeShow = false">填写收货地址</span>
        <!--        <img @click="addressShow = true;prizeShow = false" style="width: 50%" src="../assets/image/addressBtn.png"-->
        <!--             alt="">-->
      </div>
      <img @click="prizeShow = false" class="close" src="../assets/image/close.png" alt="">
    </div>
  </van-overlay>
  <!-- 抽奖记录 -->
  <van-overlay :show="recordShow">
    <div class="wrapper">
      <div class="prizeBg">
        <div class="prizeUrl">
          <img :src=recordInfo.prizePic alt="">
        </div>
        <!--        <div class="prizeName" style="color: #381012">恭喜你，获得{{ recordInfo.prizeName }}</div>-->
      </div>
      <div class="addressFill" style="display: flex;justify-content: center">
        <div v-if="!isFillAddress" @click="addressShow = true;recordShow = false"
             style="color: #fff;border-bottom: 1px solid;margin-top: 10px" class="">
          <span>添加地址</span>
        </div>
        <div v-else @click="showMyAddress"
             style="color: #fff;border-bottom: 1px solid;margin-top: 10px"
             class="">
          <span>查看地址</span>
        </div>
        <!--        <img v-if="!isFillAddress" @click="addressShow = true;recordShow = false" style="width: 50%"-->
        <!--             src="../assets/image/addressBtn.png"-->
        <!--             alt="">-->
        <!--        <img v-else @click="showMyAddress" style="width: 50%"-->
        <!--             src="../assets/image/showAddBtn.png"-->
        <!--             alt="">-->
      </div>
      <img @click="recordShow = false" class="close" src="../assets/image/close.png" alt="">
    </div>
  </van-overlay>
  <!-- 查看收货地址 -->
  <van-overlay :show="myAddress">
    <div class="wrapper">
      <div class="addressInfo">
        <div class="info">
          <div>姓名：{{ addressInfo.name }}</div>
          <div>手机：{{ addressInfo.phone }}</div>
          <div>所在地区：{{ addressInfo.province }} {{ addressInfo.city }} {{ addressInfo.area }}</div>
          <div>详细地址：{{ addressInfo.address }}</div>
        </div>
        <div class="upBtn">
          <div @click="addressShow = true;myAddress = false"
               style="color: #000;border-bottom: 1px solid;margin-top: 10px"
               class="">
            <span>修改地址</span>
          </div>
        </div>
      </div>
      <img @click="myAddress = false" class="close" src="../assets/image/close.png" alt="">
    </div>
  </van-overlay>
  <!-- 填写收货地址 -->
  <van-overlay :show="addressShow">
    <div class="wrapper">
      <div class="addressBox">
        <div class="topTitle">
          填写收货信息
        </div>
        <!--        <img style="display: block;z-index: 3;width: 100%" src="@/assets/image/addressTop.png" alt="">-->
        <div class="submitItem">
          <van-form @submit="onSubmit">
            <van-cell-group inset>
              <van-field
                  v-model="userInfo.userName"
                  name="用户名"
                  :label-width="45"
                  label="姓名"
                  autocomplete="off"
                  placeholder="姓名"
                  :rules="[{ required: true, message: '请填写姓名' }]"
              />
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                  :label-width="45"
                  v-model="userInfo.phone"
                  label="手机"
                  autocomplete="off"
                  placeholder="手机号"
                  :rules="[{ required: true, message: '请填写手机号' },{ pattern, message: '请输入正确的手机号码' }]"
              />
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                  v-model="userInfo.city"
                  readonly
                  label="所在地区"
                  :label-width="75"
                  autocomplete="off"
                  placeholder="选择城市"
                  @click="showPicker = true"
              />
            </van-cell-group>
            <van-cell-group inset>
              <van-field
                  :label-width="75"
                  v-model="userInfo.address"
                  label="详细地址"
                  autocomplete="off"
                  placeholder="详细地址"
                  :rules="[{ required: true, message: '请填写详细地址' }]"
              />
            </van-cell-group>
            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>

  </van-overlay>
  <van-popup :show="showPicker" round position="bottom">
    <van-picker
        :columns="urbanArea"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        :columns-field-names="customFieldName"
    />
  </van-popup>
  <!--ending-->
  <van-overlay :show="endShow">
    <div class="wrapper">
      <div class="endIngBox">
        <div>提交成功</div>
        <div>我们将会在活动结束后7天内寄送奖品</div>
      </div>
      <img @click="endShow = false" style="width: 8%;margin-top: 50px" src="../assets/image/close.png" alt="">
    </div>

  </van-overlay>
  <!-- 用户协议 -->
  <!--  <van-overlay :show="agreementShow">-->
  <!--    <div class="wrapper" @click.stop>-->
  <!--      <div class="block">-->
  <!--        <van-checkbox class="checked1" v-model="checked1" icon-size="20px">-->
  <!--          我已完整阅读并同意赛默飞《个人信息保护政策》并同意赛默飞按照该政策处理我的个人信息-->
  <!--          <template #icon="props">-->
  <!--            <img class="img-icon" style="width: 70%;margin-right: -10px"-->
  <!--                 :src="props.checked ? checkIcon : nocheckIcon"/>-->
  <!--          </template>-->
  <!--        </van-checkbox>-->
  <!--        <van-checkbox class="checked2" v-model="checked2" icon-size="20px">-->
  <!--          我同意赛默飞通过电子邮件电话、短信或者其他方式向我发送有关赛默飞产品或服务信息与我取得联系-->
  <!--          <template #icon="props">-->
  <!--            <img class="img-icon" style="width: 70%;margin-right: -10px"-->
  <!--                 :src="props.checked ? checkIcon : nocheckIcon" alt=""/>-->
  <!--          </template>-->
  <!--        </van-checkbox>-->
  <!--        <div class="checked3">-->
  <!--          <van-checkbox icon-size="12px" checked-color="#002f6b" v-model="checked3">阅读个人信息保护政策</van-checkbox>-->
  <!--        </div>-->
  <!--        <div class="haveRead">-->
  <!--          <img @click="agreed" src="../assets/image/haveRead.png" alt="">-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </van-overlay>-->
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import RotaryBorder from '@/assets/image/RotaryBorder.png'
import bg from '@/assets/image/bg.png'
import notWinning from '@/assets/image/notWinning.png'
import myprize from '@/assets/image/prize.png'
import myproze1 from '@/assets/image/myprize1.png'
import myproze2 from '@/assets/image/myprize2.png'
import prize1 from '@/assets/image/prize1.png'
import prize2 from '@/assets/image/prize2.png'
import prize3 from '@/assets/image/prize3.png'
import prize4 from '@/assets/image/prize4.png'
import pointer from '@/assets/image/Pointer.png'
import checkIcon from '@/assets/image/checkIcon.png'
import nocheckIcon from '@/assets/image/nocheckIcon.png'
import {urbanArea} from '@/utils/urbanArea'
import {
  userLogin,
  getUserStart,
  getPrizeList,
  isDrawPrize,
  playPrize,
  addInfo,
  getRecord,
  isFillInfo,
  getUserInfo
} from "@/api/path";
import {Toast} from "vant";
import 'vant/es/toast/style/index'
import {VueCookieNext} from "vue-cookie-next";
import {useRouter} from "vue-router";

const router = useRouter();

// 转盘配置
const blocks = ref([
  {padding: '3px', background: '#000'}
])
const prizes = ref<any>([])
// const prizes = reactive([
//   {background: '#e44645', imgs: [{src: prize4, width: '35%', top: '-50%'}]},
//   {background: '#ffc1c1', imgs: [{src: prize3, width: '35%', top: '-30%'}]},
//   {background: '#e44645', imgs: [{src: prize2, width: '35%', top: '-50%'}]},
//   {background: '#ffc1c1', imgs: [{src: prize1, width: '35%', top: '-50%'}]},
// ])
const buttons = reactive([
  {
    radius: '130%',
    imgs: [{src: pointer, width: '18%', height: '20%', top: '-20%'}]
  }
])

onMounted(() => {
  login()
  PrizeList()
})

const pattern = /^1[3456789]\d{9}$/

// // 获取奖品
const PrizeList = async () => {
  const {data} = await getPrizeList()
  data.forEach((item: any, index: number) => {
    prizes.value.push({
      // fonts: [{text: item.prizeName, fontSize: '20px', fontColor: '#000', top: '30px'}],
      background: index % 2 ? '#e44645' : '#ffc1c1',
      imgs: [{
        src: item.prizePic,
        width: '65px',
        height: '65px',
        top: '25px'
      }]
    })
  })
}

// 获取用户信息
const isDraw = ref(false)
const login = async () => {
  let userData = {
    openId: VueCookieNext.getCookie('openId'),
    wxHeadPortrait: VueCookieNext.getCookie('avatar'),
    wxName: VueCookieNext.getCookie('nickname')
  }
  await userLogin(userData)
  const {data} = await isDrawPrize({openId: VueCookieNext.getCookie('openId')})
  isDraw.value = data
}

// 开始抽奖_测试
// const index = ref(0)
// const prizeInfo = ref({
//   prizePic: 'http://thermo-fisher-physical.img.qiniu.synconize.com/secret/secret1.png',
//   prizeName: '笔记本'
// })
// const myLucky = ref<any>(null)
// const startCallback = () => {
//   myLucky.value.play()
//   setTimeout(() => {
//     myLucky.value.stop(index.value)
//   }, 2500)
// }

// 开始抽奖
const index = ref(0)
const prizeInfo = ref<any>()
const myLucky = ref<any>(null)
const startCallback = async () => {
  if (isDraw.value) {
    Toast.fail('没有抽奖次数')
    return false
  }
  const {data, msg} = await playPrize({openId: VueCookieNext.getCookie('openId')})
  if (data) {
    index.value = data.id
    prizeInfo.value = data
    myLucky.value.play()
    setTimeout(() => {
      myLucky.value.stop(index.value)
    }, 3000)
  } else {
    Toast.fail(msg)
  }
}

// 抽奖结束
const endCallback = (prize: any) => {
  console.log("prize", prize)
  prizeShow.value = true
  if (index.value !== 0) {
    isWin.value = true
  }
}

// 抽奖结果
const prizeShow = ref(false)
const isWin = ref(false)


/**
 * 填写收获地址 start
 */
const addressShow = ref(false) // 填写收获地址
const endShow = ref(false) // 结束
// 省市区弹窗配置
const customFieldName = {
  text: 'label',
  children: 'children',
};
const showPicker = ref(false) // 省市区联动弹窗
const onConfirm = (value: any) => {
  userInfo.city = ''
  value.forEach((item: any) => {
    if (item.label) {
      userInfo.city += item.label + ' '
    }
  })
  userInfo.province = value[0].label
  userInfo.city1 = value.length === 2 ? '' : value[1].label
  userInfo.area = value[2].label
  showPicker.value = false
};
// 表单
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
const onSubmit = async (values: any) => {
  let formData = {
    name: userInfo.userName,
    phone: userInfo.phone,
    address: userInfo.address,
    province: userInfo.province, // 省
    city: userInfo.city1, // 市
    area: userInfo.area, // 区
    openId: VueCookieNext.getCookie('openId')
  }
  console.log("formData", formData)
  const {code, data, msg} = await addInfo(JSON.stringify(formData))
  if (code === 200) {
    addressShow.value = false
    endShow.value = true
  } else {
    Toast.fail(msg)
  }

}
/**
 * 填写收获地址 end
 */

// 查看抽奖记录
const recordShow = ref(false)
const recordInfo = ref()
const isFillAddress = ref(false)
const showRecord = async () => {
  const {data} = await getRecord({openId: VueCookieNext.getCookie('openId')})
  if (data) {
    console.log("data", data)
    recordInfo.value = data
    recordShow.value = true
    const res = await isFillInfo({openId: VueCookieNext.getCookie('openId')})
    isFillAddress.value = res.data
  } else {
    Toast.fail('您还未进行抽奖')
  }
}

// 查看收货地址
const myAddress = ref(false)
const addressInfo = ref()
const showMyAddress = async () => {
  const {data} = await getUserInfo({openId: VueCookieNext.getCookie('openId')})
  addressInfo.value = data
  myAddress.value = true
  recordShow.value = false
}


// 用户协议
// const agreementShow = ref(VueCookieNext.getCookie('agreementShow') !== 'false')
// const checked1 = ref<boolean>(false)
// const checked2 = ref<boolean>(false)
// const checked3 = ref<boolean>(false)
// const agreed = () => {
//   if (checked1.value && checked2.value && checked3.value) {
//     agreementShow.value = false
//     VueCookieNext.setCookie('agreementShow', 'false')
//   } else {
//     Toast.fail('请先阅读并同意相关政策')
//   }
// }

</script>

<style scoped lang="scss">
.homeBox {
  width: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  background-image: url("../assets/image/homeBg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  //position: relative;

  .luckyBox {
    margin-top: 270px;

    .myLucky {
      width: 340px !important;
      height: 340px !important;;
    }
  }

  .playBtn {
    font-size: 15px;
    margin: 60px 0;
    bottom: 80px;
    left: 50%;
    border-bottom: 2px solid #000;
    font-weight: bolder;
  }

  .myPrize {
    position: absolute;
    bottom: 20px;
    right: 10px;
    width: 15%;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .close {
    margin-top: 30px;
    width: 8%;
  }
}

.myPrize {
  font-size: 15px;
}

.block {
  width: 60%;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 15px;
  font-size: 11px;
  letter-spacing: 2px;

  .checked2 {
    margin: 15px 0;
  }

  .checked3 {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    :deep(.van-checkbox__icon--round .van-icon) {
      border-radius: 0;
    }


  }

  .img-icon {
    margin-right: -10xp;
  }

  .haveRead {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    img {
      width: 60%;
    }
  }
}

.prizeBg {
  width: 75%;
  height: 250px;
  //background-image: url("../assets/image/prizeBg.png");
  background-color: white;
  border-radius: 10px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;


  .prizeName {
    color: white;
    margin-top: 50px;
    font-size: 13px;
    letter-spacing: 1px;
    opacity: 0.7;
  }

  .prizeUrl {

    width: 100%;
    height: 110px;
    margin-top: 50px;
    display: flex;
    justify-content: center;

    img {
      width: auto;
      height: 100%;
    }
  }

  .addressFill {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    span {
      font-size: 20px;
      border-bottom: 1px solid;
    }
  }

  .notWin {
    height: 100px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
    font-size: 35px;
    font-weight: bolder;

    img {
      width: 80%;
    }
  }

}

.addressBox {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .topTitle {
    width: 99.3%;
    background-color: white;
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;

  }

  .submitItem {
    width: 100%;
    height: 309px;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;

    .van-form {
      width: 99.4%;
      position: absolute;
      top: -10px;
      background-color: white;
      border-radius: 0 0 10px 10px;

      .van-cell-group {
        border-bottom: 1px solid #999;
        border-radius: 0;
        padding: 5px 0;
      }

      //.van-button {
      //  background-color: transparent;
      //  border: 0;
      //
      //  img {
      //    width: 70%;
      //    margin-top: 20px;
      //  }
      //}
    }


  }

  img {
    width: 100%;
  }

  .close {
    width: 10%;
    text-align: center;
    margin-top: 10px;
  }
}

.recordBox {
  width: 80%;
  height: 255px;
  //background-image: url("../assets/image/recordBg.png");
  background-color: white;
  border-radius: 10px;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  .prizeUrl {

    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;

    img {
      width: auto;
      height: 100%;
    }
  }

  .prizeName {
    font-size: 15px;
    color: white;
    margin-top: 10px;
  }

  .notWin {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    opacity: 0.8;

    span {
      color: white;
      font-size: 43px;
      font-weight: bolder;
      letter-spacing: 5px;
      margin-top: 180px;
    }
  }

}

.addressBtn {
  color: white;
  text-decoration: underline;
  font-size: 18px;
  margin-top: 20px;
}

.addressInfo {
  width: 81%;
  height: 230px;
  //background-image: url("../assets/image/myAddressbg.png");
  background-color: white;
  border-radius: 10px;
  background-size: 100% auto;
  background-repeat: no-repeat;

  .info {
    margin-top: 20px;
    color: #000;
    font-size: 15px;
    margin-left: 10px;

    div {
      margin: 10px;
    }

  }

  .upBtn {
    text-align: center;
    display: flex;
    justify-content: center;

    img {
      margin-top: 20px;
      width: 40%;
    }
  }
}

.endIngBox {
  width: 80%;
  height: 115px;
  //background-image: url("../assets/image/endingBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: white;
  color: #000;
  border-radius: 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}


</style>
