<template>
  <div style="position: relative;">
    <div class="audio-wrapper">
      <div class="player-btn">
        <img src="../assets/loading.gif" class="loading" v-if="playState==3" @click="pause">
        <img src="../assets/audio.gif" class="voice" v-if="playState==1" @click="pause">
        <img src="../assets/audio.png" class="voice" v-else @click="play">
      </div>
      <div class="right">
        <div v-if="title" class="title">{{title}}</div>
        <div class="audio-player">
          <div class="slide-wrapper">
            <div class="line" ref="line" :style="{width:percent*100+'%'}">
              <i class="dot" ref="dot"></i>
            </div>
          </div>
          <div class="time-wrapper">
            <div class="cur-time" v-text="showDuraTime(curTime)"></div>
            <div class="duration" v-text="showDuraTime(duration)"></div>
          </div>
        </div>
      </div>
      <audio id="audio" v-show="false" controls ref="player" preload class="player" :src="audioSrc"
             @waiting="playState=3"
             @timeupdate="updateProgess" @playing="playState=1;" @ended="playState=5;isEnd=true;"></audio>
    </div>
  </div>
</template>

<script>

export default {
  name: 'player',
  components: {},
  props: {
    audioSrc: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curTime: 0,
      percent: 0,
      playState: 0, // 1播放2停止3缓冲4stop5ended
      hold: false, // 正在调节进度
      progess: null,
      max: 1000
    }
  },
  watch: {
    'percent': function (newVal) {
      if (this.hold) {
        clearTimeout(this.progess) // 函数防抖
        this.progess = setTimeout(() => {
          this.$refs.player.currentTime = this.duration * newVal
          this.hold = false
        }, 300)
      }
    }
  },
  mounted () {
    this.duration = parseInt(this.duration)
    this.initPlayer()
  },
  methods: {
    updateProgess (e) {
      let ct = this.$refs.player.currentTime
      this.curTime = parseInt(ct)
      if (!this.hold) {
        if (this.duration === 0) {
          this.percent = 0
        } else {
          this.percent = this.curTime / this.duration
        }
      }
    },
    play () {
      this.$nextTick(() => {
        this.$refs.player.play()
        this.playState = 1
        if (typeof window.WeixinJSBridge !== 'undefined') {
          window.WeixinJSBridge.invoke('getNetworkType', {}, e => {
            this.$refs.player.play()
            this.playState = 1
          })
        }
      })
    },
    pause () {
      this.$nextTick(() => {
        this.$refs.player.pause()
        this.playState = 2
        if (typeof window.WeixinJSBridge !== 'undefined') {
          window.WeixinJSBridge.invoke('getNetworkType', {}, e => {
            this.$refs.player.pause()
            this.playState = 2
          })
        }
      })
    },
    showDuraTime (val) {
      let m = Math.floor(val / 60)
      let n = val - m * 60
      return (m < 10 ? '0' + m : m) + ':' + (n < 10 ? '0' + n : n)
    },
    initPlayer () {
      let dot = this.$refs.dot
      let body = document.getElementsByTagName('body')[0]
      let cw = parseFloat(
        window.getComputedStyle(document.getElementsByTagName('body')[0]).width
      )
      dot.addEventListener(
        'touchstart',
        event => {
          this.hold = true
        },
        false
      )
      body.addEventListener(
        'touchend',
        event => {
          // this.hold = false;
        },
        false
      )
      body.addEventListener(
        'touchmove',
        event => {
          if (!this.hold) {
            return false
          }
          var p = parseFloat(event.touches[0].pageX) / cw
          this.percent = p > 1 ? 1 : p < 0 ? 0 : p
        },
        false
      )
      if (typeof window.WeixinJSBridge !== 'undefined') {
        window.WeixinJSBridge.invoke('getNetworkType', {}, e => {
          this.$refs.player.load()
        })
      } else {
        this.$refs.player.load()
      }
    }
  }
}
</script>
<style scoped>
.audio-wrapper {
  border: 1px solid #EFEFEF;
  background: #FDFDFD;
  display: flex;
  align-items: center;
  padding: 14px 20px;
  margin-bottom: 14px;
}

.player {
  position: absolute;
  bottom: 0;
}

.player-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: solid 2px #775979;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-btn .loading {
  width: 28px;
  height: 28px;
}

.player-btn .voice {
  width: 20px;
  height: 28px;;
}

.title {
  margin-left: 20px;
  font-size: 14px;
  color: #000;
  font-weight: 600;
}

.right {
  flex: 1;
}

.audio-player {
  flex: 1;
  padding-left: 20px;
  margin-top: 16px;
}

.time-wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
}

.cur-time,
.duration {
  font-size: 12px;
  color: #9B9B9B;
}

.line {
  height: 10px;
}

.slide-wrapper {
  height: 2px;
  background: #D8D8D8;
  position: relative;
  overflow: visible;
}

.slide-wrapper .line {
  width: 0%;
  height: 2px;
  background: #775979;
  position: absolute;
  left: 0;
  top: 0;
}

.slide-wrapper .dot {
  width: 6px;
  height: 6px;
  position: absolute;
  top: -4px;
  right: -8px;
  border: solid 2px #A799A8;
  background: #775979;
  border-radius: 50%;
  z-index: 2;
}
</style>
