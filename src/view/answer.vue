<template>
 <div class="answerBox">
   <div class="answer">
      <div v-if="topicArr" class="answerItem">
        <div class="title">{{checkIndex + 1}}、{{ topicArr[checkIndex].title }}</div>
        <div class="optionBox">
          <!-- 单选 -->
          <van-radio-group v-if="topicArr[checkIndex].type === 1" :disabled="topicArr[checkIndex].isSubmit" v-model="topicArr[checkIndex].userAnswer" shape="square">
            <van-radio style="color: blue" :name="item" v-for="item in topicArr[0].answer">
              <template #default>
                <span :style="{color:topicArr[checkIndex].isSubmit ? '#bab8ad': '#fff'}">{{ item.content }}</span>
              </template>
              <template #icon="props">
                <div class="radioIcon" style="width: 15px">
                  <img style="width: 100%" class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" alt="" />
                </div>
              </template>
            </van-radio>
          </van-radio-group>
          <!-- 复选框 -->
          <van-checkbox-group v-else v-model="topicArr[checkIndex].userAnswer" shape="square">
            <van-checkbox style="color: blue" v-for="item in topicArr[checkIndex].answer" :disabled="topicArr[checkIndex].isSubmit" :name="item.options">
              <template #default>
                <span :style="{color:topicArr[checkIndex].isSubmit ? '#bab8ad': '#fff'}">{{ item.content }}</span>
              </template>
              <template #icon="props">
                <div class="radioIcon" style="width: 15px">
                  <img style="width: 100%" class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" alt="" />
                </div>
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
     <em v-if="topicArr && topicArr[checkIndex].isSubmit">答案：{{topicArr[checkIndex].correctOptions.split('').toString()}}</em>
     <div class="checkBtn">
       <img @click="upIndex" src="@/assets/image/upperBtn.png" alt="">
       <img @click="nextIndex" src="@/assets/image/nextBtn.png" alt="">
     </div>
   </div>
   <div class="submit">
     <img @click="submit(topicArr[checkIndex])" src="../assets/image/submitBtn.png" alt="">
   </div>
 </div>
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
      <div class="submitItem">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="userInfo.userName"
                name="用户名"
                :label-width="30"
                label="姓名"
                placeholder="姓名"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                :label-width="30"
                v-model="userInfo.phone"
                label="手机"
                placeholder="手机号"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                :label-width="30"
                v-model="userInfo.address"
                label="地址"
                placeholder="地址"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              <img src="../assets/image/submitFrom.png" alt="">
            </van-button>
          </div>
        </van-form>
      </div>
      <img @click="show = false" class="close" src="../assets/image/closeBtn.png" alt="">
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import activeIcon from '@/assets/image/check1.png'
import inactiveIcon from '@/assets/image/check.png'
import {getTopicList,getAnswer,playPrize,addInfo} from "@/api/path";
import {VueCookieNext} from "vue-cookie-next";
import {Toast} from "vant";
import 'vant/es/toast/style/index';
import {json} from "stream/consumers";
const router = useRouter();

onMounted(() => {
topicList()
})

// 获取题目
const topicArr = ref()
const checkIndex = ref(0)
const topicList = async () => {
 const { data } = await getTopicList({openId: VueCookieNext.getCookie('openId')})
 data.forEach((item:any) => {
   item['isSubmit'] = false
   if (item.type === 1) {
     item['userAnswer'] = ''
   } else {
     item['userAnswer'] = []
   }
 })
 topicArr.value = data
}
const upIndex = () => {
  if (checkIndex.value >= 0) {
    checkIndex.value --
  }

}
const nextIndex = async () => {
  console.log("topicArr.value[checkIndex.value].userAnswer",topicArr.value[checkIndex.value].userAnswer)
  if (topicArr.value[checkIndex.value].userAnswer.length === 0 || topicArr.value[checkIndex.value].userAnswer === '' ) {
    Toast.fail('本题未作答！')
  } else {
    if (!topicArr.value[checkIndex.value].isSubmit) {
      Toast.fail('请先提交选项')
    } else {
      if (checkIndex.value < topicArr.value.length - 1) {
        checkIndex.value ++
      } else {
        if (isAllSubmit) {
          const { code,data,msg } = await playPrize({openId: VueCookieNext.getCookie('openId')})
          if (code === 10012) {
            Toast.fail(msg)
          } else {
            show.value = true
            if (data.id === 1) {
              isWin.value = true
            }
          }
        }
      }
    }
  }


}


const checked = ref()
const radioValue = ref()
const show = ref<boolean>(false)
const isWin = ref<boolean>(true)
const fillInfo = ref<boolean>(false)

// 提交答题
const isAllSubmit = ref(false)
let answerData = {
  answer:[] as any,
  openId: VueCookieNext.getCookie('openId')
}
const submit = async (item:any) => {
  console.log("checked.value",checked.value)
  let answerItem = reactive({
    answerOptions: item.type === 1 ?item.userAnswer.options : item.userAnswer.toString().replace(/,/g, ''),
    id: item.id
  })
  answerData.answer.push(answerItem)
  item.isSubmit = true
  if (checkIndex.value === 4) {
    const { data } = await getAnswer(JSON.stringify(answerData))
    isAllSubmit.value = true
  }

}
// 填写地址
const fillAddressBtn = () => {
  isWin.value = false
  fillInfo.value = true
}


const userInfo = reactive({
  userName: '',
  phone: '',
  address: ''
})


// 提交表单
const onSubmit = async (values:any) => {
  let formData = {
    name: userInfo.userName,
    phone: userInfo.phone,
    address: userInfo.address,
    openId: VueCookieNext.getCookie('openId')
  }
  const { code,data,msg } = await addInfo(JSON.stringify(formData))
  if (code === 200){
    Toast.success('信息已提交')
  } else {
    Toast.fail(msg)
  }

}
</script>

<style scoped lang="scss">
.answerBox{
  width: 100%;
  height: 989px;
  overflow: scroll;
  background-image: url("@/assets/image/answerBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  z-index: -1;
  .answer{
    margin-top: 410px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 360px;
    position: relative;
    .answerItem{
      width: 80%;
      height: 220px;
      background-image: url("@/assets/image/answerBox.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 1;
      .title{
        width: 82%;
        font-size: 13px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-weight: bolder;
        height: 55px;
      }
      .optionBox{
        height: 140px;
        display: flex;
        align-items: center;
        margin-top: 9px;
      }
      .van-radio-group, .van-checkbox-group{
        font-size: 13px;
        .van-radio, .van-checkbox{
          margin: 5px 25px;
        }
        :deep(.van-radio__icon--round .van-icon){
          border-radius: 0;
        }
        :deep(van-radio__icon){
          width: 15px;
        }
      }
    }
    .checkBtn{
      width: 90%;
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      img{
        width: 40%;
      }
    }
    em{
      position:absolute;
      bottom: 95px;
      left: 55px;
      font-size: 15px;
    }
  }
  .submit{
    text-align: center;
    margin-top: 30px;
    img{
      width: 45%;
    }
  }
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
      width: 100%;
    }
  }
  .close{
    width: 10%;
    text-align: center;
    margin-top: 50px;
  }
}
.addressBox{
  margin-top: -50px;
  .submitItem{
    width: 100%;
    height: 359px;
    background-image: url("@/assets/image/submitInfo.png");
    background-size: 100% 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .van-form{
      width: 100%;
      position: absolute;
      top: 120px;
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
}
</style>
