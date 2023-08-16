<template>
  <div class="listBox">
    <div class="listItem">
      <img @click="toDetails(listArr[0])" src="../assets/image/list/list1.png" alt="">
      <img @click="toDetails(listArr[1])" src="../assets/image/list/list2.png" alt="">
      <img @click="toDetails(listArr[2])" src="../assets/image/list/list3.png" alt="">
      <img @click="toDetails(listArr[3])" src="../assets/image/list/list4.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {IData} from "@/type/request";
import {stageList} from "@/api/path";
import {Toast} from "vant";
import 'vant/es/toast/style/index';

const router = useRouter()

const listArr = ref()
onMounted(() => {
  stageList().then((res: IData) => {
    if (res.code === '00000') {
      listArr.value = res.data
    }
  })
})


// 查看详情
const toDetails = (item: any) => {
  if (item.flag) {
    router.push({
      path: 'listDetails',
      query: {
        id: item.id
      }
    })
  } else {
    Toast.fail('暂未开放')
  }

}
</script>

<style scoped lang="scss">
.listBox {
  width: 100%;
  height: 100%;
  background: url("../assets/image/list/listBg.png") no-repeat;
  background-size: 100% auto;
  position: relative;
  overflow: hidden;

  .listItem {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 280px;
    align-items: center;
    position: absolute;
    //bottom: 15%;
    //left: 10%;
    //transform: translate(5%, 10%);

    img {
      width: 70%;
      margin: 5px 0;
    }
  }
}
</style>
