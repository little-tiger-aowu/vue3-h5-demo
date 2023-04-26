<template>
 <div class="errorPage">
   <img src="../assets/image/404.png" alt="页面丢失">
   <van-button @click="backHome" style="width: 25%;height: 0.8rem" type="primary">返回首页</van-button>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const backHome = () => {
  router.replace({
    path: '/'
  })
}


</script>

<style scoped lang="scss">
  .errorPage{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
      height: auto;
    }
  }
</style>
