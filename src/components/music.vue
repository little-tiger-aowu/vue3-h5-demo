<template>
  <div>
    <div class="bgMusic">
      <!-- 音乐暂停和播放 -->
      <div class="img" :class="{ playing: isPlay }" @click="playMusic">
        <img src="../assets/image/musicBtn.png" class="musicBtn" alt=""/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Howl, Howler} from 'howler';
import {onMounted, ref, watch} from "vue";
import musicBg from '../assets/music.mp3'

const isPlay = ref(true)
const sound = new Howl({
  src: musicBg,
  autoplay: true,
  loop: true,
  volume: 1,
  onend: function () {
    console.log('播放结束');
  }
});

onMounted(() => {
  sound.play()
})

const playMusic = () => {
  isPlay.value = !isPlay.value
  if (!isPlay.value) {
    sound.pause(); // 暂停
  } else {
    sound.play(); //播放
  }
}

</script>

<style lang="scss" scoped>
.bgMusic {
  // position: relative;
  .musicBtn {
    width: 30px;
    position: absolute;
    left: 20px;
    top: 20px;
    animation-name: move;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-timing-function: linear;
    animation-duration: 3s;
    z-index: 2;
  }
  .img.playing .musicBtn {
    animation-play-state: running;
    -webkit-animation-play-state: running;
  }
@keyframes move {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@-webkit-keyframes move {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
}
</style>
