<template>
  <div class="my-progress-timer" :style="wrapStyle">
    <div :id="uniqId" :class="barCls" :style="barStyle"></div>
  </div>
</template>

<script>
import { genID } from "@/assets/js/utils.js";
/* 计时进度条组件 */
export default {
  props: {
    time: Number,
    height: String,
    bgColor: String,
    barColor: String,
    start: Boolean,
    onFinish: Function,
  },
  computed: {
    wrapStyle() {
      return {
        backgroundColor: this.bgColor || "#28404f",
        height: this.height || "1px",
      };
    },
    barStyle() {
      return {
        backgroundColor: this.barColor || "#007aff",
        animationDuration: this.time + "s",
        height: this.height || "1px",
      };
    },
    barCls() {
      return this.start ? "progress-bar active" : "progress-bar";
    },
  },
  data() {
    return {
      progressTimer: null,
      wrapWidth: 0,
      barDom: "",
      uniqId: "",
    };
  },
  methods: {
    checkProgressFull() {
      let barWidth;
      this.progressTimer = setInterval(() => {
        barWidth = this.barDom.clientWidth;
        if (barWidth === this.wrapWidth) {
          if (this.onFinish) {
            this.onFinish();
          }
          this.clearProgressTimer();
        }
      }, 10);
    },
    clearProgressTimer() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
    },
  },
  created() {
    this.uniqId = genID();
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapWidth = document.querySelector(".my-progress-timer").clientWidth;
      this.barDom = document.getElementById(this.uniqId);
    });
  },
};
</script>
<style scoped lang='less'>
.my-progress-timer {
  .progress-bar {
    display: none;
    &.active {
      display: block;
      animation-name: moveWidth;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }

  @keyframes moveWidth {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
}
</style>