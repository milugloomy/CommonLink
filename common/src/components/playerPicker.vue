<template>
  <div class="page">
    <div v-on:click="select" class="row">
      <div class="left">请选择音乐</div>
      <div class="right">{{text}}</div>
    </div>
    <template v-if="audio">
      <player :audioSrc="audio.audioSrc" :duration="audio.duration" :title="audio.title"></player>
    </template>
    <div style="height:1px;"></div>
    <wv-picker :visible.sync="pickerShow" :columns="audioNames"
               value-key="name" @confirm="confirmPicker"/>
  </div>
</template>

<script>
import player from './player'

export default {
  name: 'playerPicker',
  components: { player },
  props: {
    audios: {
      type: Array
    }
  },
  data () {
    return {
      audio: null,
      audioNames: [],
      pickerShow: false,
      text: ''
    }
  },
  created () {
    let arr = []
    this.audios.forEach(item => {
      arr.push(item.title)
    })
    this.audioNames = [{
      values: arr
    }]
  },
  methods: {
    select () {
      this.pickerShow = true
    },
    confirmPicker (picker) {
      this.audio = this.audios[picker.getIndexes()[0]]
      this.text = this.audio.title
    }
  }
}
</script>

<style scoped>
.page {
  background: #f8f8f8;
}
.row {
  margin-top: 50px;
  margin-bottom: 50px;
  border: 1px solid #EFEFEF;
  display: flex;
  background: #fff;
  padding : 10px;
  font-size: 20px;
}
.row .left {
  flex: 1;
  text-align: left;
}
.row .right {
  color: #999;
}
</style>
