<template>
 <div class="answerBox">
   <div class="answer">
      <div v-if="topicArr" class="answerItem">
        <div class="title">{{checkIndex + 1}}、{{ topicArr[checkIndex].title }}</div>
        <div class="optionBox">
          <!-- 单选 -->
          <van-radio-group v-if="topicArr[checkIndex].type === 1" :disabled="topicArr[checkIndex].isSubmit" v-model="topicArr[checkIndex].userAnswer" shape="square">
            <van-radio style="color: blue" :name="item" v-for="item in topicArr[checkIndex].answer">
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
       <template v-if="!isAllSubmit">
         <img v-if="isSubmit" @click="nextIndex" src="@/assets/image/nextBtn.png" alt="">
         <img v-else @click="submit(topicArr[checkIndex])" src="@/assets/image/submitAnswer.png" alt="">
       </template>
       <img v-else @click="luckyDraw" src="../assets/image/submitBtn.png" alt="">
     </div>
   </div>
 </div>
  <!-- 正确音效 -->
  <audio ref="audio">
    <source src="../assets/correct.mp3" type="audio/mpeg">
  </audio>
  <!-- 错误音效 -->
  <audio ref="audio1">
    <source src="../assets/failure.mp3" type="audio/mpeg">
  </audio>
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
import 'vant/es/picker/style/index';
import {urbanArea} from '@/utils/urbanArea'
const router = useRouter();


const isSubmit = ref(false)

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


const nextIndex = async () => {
   if (checkIndex.value < topicArr.value.length) {
      checkIndex.value ++
        isSubmit.value = false
   }
}


// 点击抽奖
const luckyDraw = async () => {
  await getAnswer(JSON.stringify(answerData))
  await router.push('/prize')
}


// 提交答题
const audio = ref<any>(null)
const audio1 = ref<any>(null)
const isAllSubmit = ref(false)
let answerData = reactive({
  answer:[] as any,
  openId: VueCookieNext.getCookie('openId')
})
const submit = async (item:any) => {
  let answerItem = reactive({
    answerOptions: item.type === 1 ?item.userAnswer.options : item.userAnswer.toString().replace(/,/g, ''),
    id: item.id
  })
  if (topicArr.value[checkIndex.value].userAnswer.length === 0 || topicArr.value[checkIndex.value].userAnswer === '') {
    Toast.fail('本题未作答')
  } else {
    let containsId = answerData.answer.some((item:any) => item.id === answerItem.id)
    console.log("containsId",containsId)
    if (!containsId) {
      answerData.answer.push(answerItem)
      item.isSubmit = true
      isSubmit.value = true
      const isRight = ref(false)
      if (item.type === 1) {
        isRight.value = item.userAnswer.options === item.correctOptions
      } else {
        isRight.value = judgeAnswer(item.correctOptions,item.userAnswer)
      }
      if (isRight.value) {
        audio.value.play()
      } else {
        audio1.value.play()
      }
      if (checkIndex.value === 4) {
        isAllSubmit.value = true
      }
    }
  }

}

// 比较答案
const judgeAnswer = (correctAnswer:any, myAnswer:any) => {
  if (typeof myAnswer === 'string') {
      return correctAnswer === myAnswer
  } else {
    const sortedArrString = myAnswer.slice().sort().join('');
    return sortedArrString === correctAnswer;
  }
}
</script>

<style scoped lang="scss">
.answerBox{
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-image: url("@/assets/image/answerBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  z-index: -1;
  .answer{
    margin-top: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 360px;
    position: relative;
    .answerItem{
      width: 90%;
      height: 220px;
      background-image: url("@/assets/image/answerBox.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .title{
        margin-top: 6px;
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
        width: 45%;
      }
    }
    em{
      position:absolute;
      bottom: 95px;
      left: 35px;
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
      width: 90%;
    }
  }
  .close{
    width: 10%;
    text-align: center;
    margin-top: 10px;
  }
}
.addressBox{
  margin-top: -50px;
  .submitItem{
    width: 100%;
    height: 309px;
    //background-image: url("@/assets/image/submitInfo.png");
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
}
</style>
