<template>
  <div class="likeCharts" :style="{ backgroundImage: 'url(' + backgroundImageUrl + ')' }">
    <img
        @click="showRules"
        style="width: 18%; position: absolute; right: 10px; top: 10px"
        src="../assets/image/home/showBtn.png"
        alt=""
    />
    <div v-if="route.query.type === 'like'" class="checkBox">
      <!--      <img @click="leftBtn" class="icon" src="../assets/image/Ranking/leftIcon.png" alt="">-->
      <!--      <div class="bg1" v-if="stageId === 1">第一期</div>-->
      <!--      <div class="bg1" v-else-if="stageId === 2">第二期</div>-->
      <!--      <div class="bg1" v-else-if="stageId === 3">第三期</div>-->
      <!--      <div class="bg1" v-else-if="stageId === 4">第四期</div>-->
      <!--      <img @click="rightBtn" class="icon" src="../assets/image/Ranking/rightIcon.png" alt="">-->
    </div>
    <van-row v-if="route.query.type === 'like'" class="topRow">
      <van-col span="6">排名</van-col>
      <van-col style="text-align: center" span="11">用户ID</van-col>
      <van-col style="text-align: end" span="7">集赞数量</van-col>
    </van-row>
    <van-row v-else class="topRow1">
      <van-col span="6">排名</van-col>
      <van-col style="text-align: center" span="11">用户ID</van-col>
      <van-col style="text-align: end" span="7">邀请数量</van-col>
    </van-row>
    <div class="userItem">
      <van-row
          v-for="(item, index) in likeList"
          :key="item.id"
          class="contentRow"
      >
        <van-col span="6" style="display: flex; align-items: center"
        ><img
            v-if="item.rank === 1"
            style="width: 35%"
            src="../assets/image/Ranking/jiangzhang1.png"
            alt=""
        />
          <img
              v-else-if="item.rank === 2"
              style="width: 35%"
              src="../assets/image/Ranking/jiangzhang2.png"
              alt=""
          />
          <img
              v-else-if="item.rank === 3"
              style="width: 35%"
              src="../assets/image/Ranking/jiangzhang3.png"
              alt=""
          /><span v-else>{{ item.rank }}</span>
        </van-col>
        <van-col class="userName" span="11">
          <div class="heartBox">
            <img :src="item.headUrl" alt="">
          </div>
          <span>{{ item.nickName }}</span>
        </van-col>
        <van-col class="num" span="7">{{
            item.count
          }}
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import likeBg from '@/assets/image/Ranking/likeBg.png'
import invitationBg from '@/assets/image/Ranking/invitationBg.png'
import {inviteRanking, likeRanking} from "@/api/path";
import {IData} from "@/type/request";

const route = useRoute()
const router = useRouter()

const backgroundImageUrl = ref(likeBg)
onMounted(() => {
  if (route.query.type === 'like') {
    backgroundImageUrl.value = likeBg
    getLikeRanking()
  } else {
    backgroundImageUrl.value = invitationBg
    getInviteRanking()
  }
})
const showRules = () => {
  router.push("rules");
};

const handleSwipeLeft = () => {
  console.log("123", 123)
}


/**
 * 监听页面滑动事件 start
 * (切换模板)
 */
//
const setAdd = reactive({
  startX: 0, // 手指起始坐标 x
  startY: 0, // 手指起始坐标 y
  offsetX: 0, // 手指在屏幕上的水平移动距离
  offsetY: 0, // 手指在屏幕上的垂直移动距离
  direction: '' // 手指移动方向
})
// 记录初始位置
const onTouchStart = (e) => {
  const touch = e.touches[0]
  setAdd.startX = touch.pageX
  setAdd.startY = touch.pageY
}
// 计算滑动方向
const onTouchMove = (e) => {
  const touch = e.touches[0]
  setAdd.offsetX = touch.pageX - setAdd.startX
  setAdd.offsetY = touch.pageY - setAdd.startY
  if (Math.abs(setAdd.offsetX) > Math.abs(setAdd.offsetY)) {
    setAdd.direction = setAdd.offsetX > 0 ? 'right' : 'left'
  } else {
    setAdd.direction = setAdd.offsetY > 0 ? 'down' : 'up'
  }
}
// 根据滑动方向切换模板
const onTouchEnd = (e) => {
  if (setAdd.direction === 'left') {
    console.log('左滑')
  } else if (setAdd.direction === 'right') {
    console.log('右滑')
  }
  setAdd.startX = setAdd.startY = setAdd.offsetX = setAdd.offsetY = 0
  setAdd.direction = ''
}
/**
 *  监听页面滑动事件 end
 */



// 邀请排行榜
const likeList = ref();
const getInviteRanking = () => {
  inviteRanking().then((res: IData) => {
    likeList.value = res.data
  })
}

// 集赞排行榜
const stageId = ref(1)
const getLikeRanking = () => {
  likeRanking().then((res: IData) => {
    likeList.value = res.data
  })
}


</script>

<style scoped lang="scss">
.likeCharts {
  width: 100%;
  height: 100%;
  background: url("../assets/image/Ranking/likeBg.png") no-repeat;
  background-size: 100% auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .topRow {
    width: 85%;
    font-size: 23px;
    //position: absolute;
    color: white;
    //top: 32%;
    margin-top: 14px;
  }

  .topRow1 {
    width: 85%;
    font-size: 23px;
    //position: absolute;
    color: white;
    //top: 32%;
    margin-top: 240px;
  }

  .checkBox {
    width: 60%;
    height: 40px;
    margin-top: 185px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      width: 13%;
    }

    .bg1 {
      text-align: center;
      width: 60%;
      background-image: url("../assets/image/Ranking/bg1.png");
      background-size: 100% 100%;
      color: #de1d27;
      font-size: 20px;
      font-weight: bolder;
    }
  }

  .userItem {
    //position: absolute;
    margin-top: 30px;
    width: 100%;
    height: 54%;
    overflow: scroll;

  }

  .contentRow {
    width: 80%;
    background-color: white;
    box-shadow: 3px 1px 10px 0 #999;
    border-radius: 5px;
    font-size: 20px;
    margin: 3px auto 25px auto;
    height: 55px;
    padding: 0 15px;

    .van-col {
      overflow: hidden;
    }

    .userName {

      text-align: center;
      font-size: 15px;
      line-height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 5px;
      }

      .heartBox {
        width: 35px;
        height: 35px;
        border: 1px solid #999;
        border-radius: 50%;
        line-height: 30px;

        img {

          width: 100%;
          border-radius: 50%;
        }
      }


    }

    .num {
      text-align: end;
      font-size: 20px;
      line-height: 55px

    }
  }
}
</style>
