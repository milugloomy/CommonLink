<template>
  <div class="hello">
    <h1 style="text-align: center;">{{ msg }}</h1>
    <player-picker :audios="audios"></player-picker>
  </div>
</template>

<script>
import { playerPicker } from 'common'

export default {
  name: 'HelloWorld',
  components: { playerPicker },
  props: {

  },
  data () {
    return {
      msg: '音乐播放器',
      audios: [{
        audioSrc: 'https://m801.music.126.net/20191121202654/e1b93f2bbd9a741dbb6afb2fba7fab8d/jdyyaac/010b/5359/565d/6a7ed7d40cd34dea3ddda7779a460973.m4a',
        duration: 326,
        title: '天涯'
      }, {
        audioSrc: 'http://audio04.dmhmusic.com/71_53_T10041182782_128_4_1_0_sdk-cpm/cn/0208/M00/31/B1/ChR461plD6yARfTFAEEIKD_hxsU439.mp3?xcode=8a44d93c492e630856e62a602d6c4faf12cc3f2',
        duration: 266,
        title: '伤心太平洋'
      }, {
        audioSrc: 'http://audio04.dmhmusic.com/71_53_T10041184599_128_4_1_0_sdk-cpm/cn/0208/M00/31/B5/ChR47FplIpCAEaVVAEZqHtp44Ks826.mp3?xcode=e8a16a5aa7bb2e5b56e57822bb09de2b96fca9a',
        duration: 288,
        title: '难念的经'
      }]
    }
  }
}
</script>

<style scoped>

</style>
