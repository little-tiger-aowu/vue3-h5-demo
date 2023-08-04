<template>
  <div class="listDetailsBox">
    <header class="header">{{ newsInfo.bigTitle }}</header>
    <div class="content">
      <div class="Copywriting">
        {{ newsInfo.title }}
      </div>
      <div v-if="newsInfo.video" class="video">
        <video style="width: 100%;height: 100%" controls>
          <source
              :src="newsInfo.video"
              type="video/mp4"/>
        </video>
      </div>
    </div>
    <!--    <van-field ref="input" class="actionValue" v-model="value" placeholder="请输入用户名"/>-->
    <!-- 评论 -->
    <div class="line"></div>
    <div class="interaction">
      <div class="title">互动区</div>
      <div class="actionBox">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <div v-for="item in commentsArr" :key="item.id" class="actionContent">
            <div class="userInfo">
              <div
                  style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
              >
                <div class="headerImg">
                  <img :src="item.wxHeadPortrait" alt="">
                </div>
                <div class="name">{{ item.wxNickname }}</div>
              </div>
              <div class="time" style="line-height: 28px">{{ item.createTime }}</div>
            </div>
            <div class="actionInfo">
              <div>{{ item.content }}</div>
              <div @click="likeBtn(item)">
                <van-icon v-if="item.flag" size="20" color="#ff0400" name="good-job"/>
                <van-icon v-else size="20" name="good-job-o"/>
                {{ item.count }}
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <img
          @click="showInput"
          class="addAction"
          src="../assets/image/Ranking/addAction.png"
          alt=""
      />
    </div>
  </div>
  <!-- 底部弹窗 -->
  <van-overlay :show="show" @click="show = false"/>
  <div class="commentsInput">
    <van-field v-show="show" autosize :maxlength="120" rows="1" type="textarea" style="margin-bottom: 10px" ref="input"
               class="actionValue"
               v-model="commentsValue"
               placeholder="输入评论">
      <template #right-icon>
        <div style="width: 20px; height: 18px">
          <img
              @click="sending"
              style="width: 100%; height: 100%"
              src="../assets/image/Ranking/icon.png"
              alt=""
          />
        </div>
      </template>
    </van-field>
  </div>
  <!-- 成功弹窗 -->
  <van-overlay
      style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
      :show="showOverlay"

  >
    <div class="popupBox">
      <img @click="toShare" style="width: 70%;height: 30%" src="../assets/image/list/shareBtn.png" alt="">
    </div>
    <img class="closeBtn" @click="showOverlay = false" src="../assets/image/closebtn.png" alt="">
  </van-overlay>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, onBeforeUnmount} from "vue";
import {getListById, getCommentsList, addComments, listComments} from "@/api/path";
import {IData} from "@/type/request";
import {useRoute} from "vue-router";
import {VueCookieNext} from "vue-cookie-next";
import router from "@/router";
import {Toast} from 'vant'
import 'vant/es/toast/style/index';
import dayjs from 'dayjs'

const route = useRoute()


const show = ref(false);
const showOverlay = ref(false);


onMounted(() => {
  getListInfo()
})

// 获取详情数据
const stageId = ref(parseInt(route.query.id as string))
const newsInfo = ref('')
const getListInfo = () => {
  getListById(JSON.stringify({stageId: stageId.value})).then((res: IData) => {
    if (res.code === '00000') {
      newsInfo.value = res.data[0]
    }
  })
}

// 获取评论列表
const total = ref<number>(0)
const commentsArr = ref()
let pageData = reactive({
  pageNum: 1,
  pageSize: 5,
  stageId: stageId.value
})
const commentsList = () => {

  getCommentsList(JSON.stringify(pageData)).then((res: any) => {
    commentsArr.value = res.data
    total.value = res.totalRecord
  })
}

const handleBackButton = () => {
  // 在这里处理返回事件的逻辑
  console.log('Back button pressed!');
  // 可以在这里执行相应的返回操作或其他逻辑
  router.push('list')
};


onMounted(() => {
  // 组件挂载时，添加popstate事件监听
  window.addEventListener('popstate', handleBackButton);
});

onBeforeUnmount(() => {
  // 组件卸载时，移除popstate事件监听
  window.removeEventListener('popstate', handleBackButton);
});

// 点赞
const likeBtn = (item: any) => {
  let data = {
    id: item.id
  }
  listComments(JSON.stringify(data)).then((res: IData) => {
    if (res.code === "00000") {
      Toast.success('操作成功')
      commentsList()
    } else {
      Toast.fail(res.message)
    }
  })
}

// 发布评论
const commentsValue = ref("");
const sending = () => {
  let data = {
    leave: commentsValue.value,
    stageId: stageId.value
  }
  addComments(JSON.stringify(data)).then((res: IData) => {
    commentsList()
    show.value = false;
    showOverlay.value = true;

    let commentsInfo = {
      time: dayjs(new Date()).format('YYYY-MM-DD'),
      leave: commentsValue.value,
    }
    VueCookieNext.setCookie('commentsInfo', JSON.stringify(commentsInfo))
    VueCookieNext.setCookie('periodId', route.query.id as string)
  })

};


const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  setTimeout(() => {
    commentsList()

    loading.value = false;

    console.log("commentsArr.value.length", commentsArr.value.length)
    console.log("total.value", total.value)
    if (commentsArr.value.length >= total.value) {
      finished.value = true;
      console.log("🚀 ~ file:listDetails.vue:199 ~  ~ -----> 456👉", 456)
    }
    pageData.pageSize += 5
  }, 1500)
}


// 判断是否填写表单
const input = ref<any>(null)
const showInput = () => {
  if (VueCookieNext.getCookie('isUserForm') === 'true') {
    show.value = true;
    nextTick(() => {
      input.value.focus();
    })
  } else {
    router.push('/form')
  }
}

// 跳转分享页面
const toShare = () => {
  router.push({path: '/posters', query: {periodId: stageId.value}})
}
</script>

<style scoped lang="scss">
.listDetailsBox {
  width: 100%;
  height: 100%;
  position: relative;

  .header {
    width: 60%;
    height: 40px;
    background: red;
    border-radius: 0 0 10px 10px;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    color: #eee;
    margin: 0 auto;
  }

  .content {
    margin: 15px auto 0 auto;
    width: 85%;

    .Copywriting {
      font-size: 15px;
      max-height: 100px;
      overflow: scroll;
    }

    .video {
      margin-top: 15px;
      width: 100%;
      height: 200px;
    }
  }

  .line {
    height: 25px;
    width: 100%;
    background: #f1f1f1;
    margin-top: 20px;
  }

  .interaction {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: red;
      font-size: 22px;
      margin: 5px 0;
    }

    .actionBox {
      width: 90%;
      height: 250px;
      overflow: scroll;
    }

    .actionContent {
      height: 80px;
      margin: 5px 0;

      .userInfo {
        display: flex;
        justify-content: space-between;

        .headerImg {
          border: 1px solid #999999;
          width: 28px;
          height: 28px;
          line-height: 28px;
          border-radius: 50%;

          img {
            object-fit: contain;
            width: 100%;
            border-radius: 50%;
          }
        }

        .name {
          font-size: 10px;
          margin-left: 8px;
        }

        .time {
          font-size: 10px;
        }
      }

      .actionInfo {
        margin: 8px auto;
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
      }
    }
  }
}

.addAction {
  width: 50%;
  position: fixed;
  bottom: 10px;
}

.actionValue {
  width: 85%;
  background-color: #eee;
  border-radius: 20px;
  margin: 10px auto 0 auto;
  padding: 10px 10px !important;

  :deep(.van-field__control) {
    height: 25px;
  }
}

.popupBox {
  width: 75%;
  height: 130px;
  background: url("../assets/image/list/popup.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    bottom: 20px;
  }
}

.closeBtn {
  width: 8%;
  margin-top: 30px;
}

.commentsInput {
  position: absolute;
  width: 100%;
  bottom: 0px;
  background-color: white;
  z-index: 9999;
}
</style>
