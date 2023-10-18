<template>
 <div class="homeBox">
   <div class="title">数字：{{main.sum}}</div>
   <van-button @click="getCount" style="width: 30%;margin-bottom: 10px" type="primary">随机数字</van-button>
   <div style="font-size: 20px">姓名：{{ main.userName }}</div>
   <van-cell-group inset>
     <van-field v-model="newName" label="姓名" placeholder="请输入新姓名" />
   </van-cell-group>
   <van-button @click="changeName" style="width: 30%" type="primary">修改名字</van-button>
   <var-button type="primary">主要按钮</var-button>
   <var-space :size="[10, 10]">
     <var-button-group type="primary" mode="text">
       <var-button>按钮</var-button>
       <var-button>按钮</var-button>
       <var-button>按钮</var-button>
     </var-button-group>
   </var-space>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { VueCookieNext } from 'vue-cookie-next'
import { userMain } from "@/store";
import {getLogin} from "@/api/path";

const main = userMain()

// 获取随机数字
const getCount = async () => {
  let openId = 'st-dadasdasdada'
  VueCookieNext.setCookie('token', openId)
  await main.randomizeSum()
}
// 修改名字
const newName = ref<string>('')
const changeName = async () => {
  await main.changName(newName.value)
}

</script>

<style scoped lang="scss">
  .homeBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }
  .title{
    font-size: 20px;
  }
</style>
