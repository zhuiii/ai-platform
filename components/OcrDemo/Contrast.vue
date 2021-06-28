<template>
  <div class="contrast-comp">
    <div :class="resultCls">
      <slot name="result">
        <!-- <p class="contrast-result-percent">相似度 {{ score }}%</p> -->
        <!-- <p class="contrast-result-desc">同一个人的可能性{{ probability }}</p> -->
        <el-progress
          type="circle"
          :width="112"
          :stroke-width="12"
          :percentage="scorePercent"
          :show-text="false"
        ></el-progress>
        <div class="percent-text">
          <p>相似度</p>
          <p>{{ scorePercent }}%</p>
        </div>
      </slot>
    </div>
    <div class="flex-between upload-wrap">
      <div class="flex-item" :style="{ width: uploadWidth }">
        <DemoUpload
          ref="zoneLeft"
          uniqueId="l"
          :autoUpload="autoUpload"
          :scanLoading="scanLoadingComputed"
          :drawImgSrc="drawImgSrcLeft"
          :canvasHeight="canvasHeight"
          :toggleReset="toggleResetLeft"
          @handleChange="handleUploadChangeLeft"
          @handleTestClick="handleTestClickLeft"
        ></DemoUpload>
      </div>
      <div class="flex-item" :style="{ width: uploadWidth }">
        <DemoUpload
          ref="zoneRight"
          uniqueId="r"
          :autoUpload="autoUpload"
          :scanLoading="scanLoadingComputed"
          :drawImgSrc="drawImgSrcRight"
          :canvasHeight="canvasHeight"
          :toggleReset="toggleResetRight"
          @handleChange="handleUploadChangeRight"
          @handleTestClick="handleTestClickRight"
        ></DemoUpload>
      </div>
    </div>
    <svg class="svg-loop" width="100%" height="100%">
      <defs>
        <linearGradient id="loop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #1739a4" stop-opacity="1"></stop>
          <stop
            :offset="scorePercent + '%'"
            style="stop-color: #3085f0"
            stop-opacity="1"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
import DemoUpload from "@/components/OcrDemo/DemoUpload.vue";
import { canvasDrawRect } from "@/assets/js/mycanvas.js";

/* 图片比对组件 */
export default {
  components: {
    DemoUpload,
  },
  props: {
    scanLoading: {
      type: Boolean,
      default: () => false,
    },
    drawImgSrcLeft: {
      type: String,
      default: () => "",
    },
    drawImgSrcRight: {
      type: String,
      default: () => "",
    },
    // 上传组件宽度
    uploadWidth: {
      type: String,
      default: () => "",
    },
    // 画布高度
    canvasHeight: {
      type: String,
      default: () => "",
    },
    // 比对结果百分比
    score: {
      type: Number,
      default: () => 0,
    },
    // 比对结果可能性
    probability: {
      type: String,
      default: () => "",
    },
    toggleResetLeft: Boolean,
    toggleResetRight: Boolean,
    showScore: Boolean, // 比对分数显隐
  },
  computed: {
    scanLoadingComputed() {
      return this.scanLoading;
    },
    // 根据分数显示隐藏结果
    resultCls() {
      return this.showScore ? "contrast-result" : "contrast-result none";
    },
    scorePercent() {
      return this.score < 0 ? 0 : Math.round(this.score * 100);
    },
  },
  watch: {
    drawImgSrcLeft(newVal) {
      this.list[0] = newVal;
    },
    drawImgSrcRight(newVal) {
      this.list[1] = newVal;
    },
  },
  data() {
    return {
      autoUpload: false,
      fileArr: [],
      urlArr: [],
      apiType: 1, // 图片转dataUrl进行路径型请求
      list: [],
    };
  },
  methods: {
    handleUploadChangeLeft({ raw }) {
      // this.apiType = 1;
      // this.fileArr[0] = file;
      this.list[0] = raw;
      this.$emit("setDrawImgSrc", "left", raw);
      this.handleRequest();
    },
    handleTestClickLeft(imageUrl) {
      this.list[0] = imageUrl;
      this.$emit("setDrawImgSrc", "left", imageUrl);
      this.handleRequest();
    },
    handleUploadChangeRight({ raw }) {
      // this.apiType = 1;
      // this.fileArr[1] = file;
      this.list[1] = raw;
      this.$emit("setDrawImgSrc", "right", raw);
      this.handleRequest();
    },
    handleTestClickRight(imageUrl) {
      this.list[1] = imageUrl;
      this.$emit("setDrawImgSrc", "right", imageUrl);
      this.handleRequest();
    },
    // 发起请求，回传父组件数据 {apiType: 1 | 2; list: []}
    handleRequest() {
      const params = {
        apiType: this.apiType,
      };
      // let canSubmit = false;
      // if (params.apiType === 1 && this.fileArr.length === 2) {
      //   params.list = this.fileArr;
      //   canSubmit = true;
      // } else if (params.apiType === 2 && this.urlArr.length === 2) {
      //   params.list = this.urlArr;
      //   canSubmit = true;
      // }
      if (this.validateRequestList()) {
        this.$emit("handleRequest", {
          apiType: 1,
          list: this.list,
        });
      }
    },
    initData() {},
    validateRequestList() {
      let count = 0;
      Array.from(this.list).forEach((item) => {
        if (item) count++;
      });
      return count === 2;
    },
    drawRect(
      lor,
      { x, y, width, height, rotation, lineWidth = 2, type, color }
    ) {
      let cvsId = "";
      let shrinkRatio = 1;
      switch (lor) {
        case 0:
          cvsId = "image-canvas-l";
          console.log(this.$refs.zoneLeft);
          shrinkRatio = this.$refs.zoneLeft.shrinkRatio;
          break;
        case 1:
          cvsId = "image-canvas-r";
          shrinkRatio = this.$refs.zoneRight.shrinkRatio;
          break;
      }
      const cvs = document.getElementById(cvsId);
      if (!cvs) return;
      console.log(lineWidth / shrinkRatio);
      canvasDrawRect({
        context: cvs.getContext("2d"),
        x,
        y,
        width,
        height,
        rotation,
        lineWidth: lineWidth / shrinkRatio,
        type,
        color,
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.upload-wrap {
  flex-wrap: nowrap;
}
.contrast-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none; // 暂时隐藏
  /deep/ svg > path:nth-child(2) {
    stroke: url(#loop);
  }
  &.none {
    display: none;
  }
  .contrast-result-percent {
    text-align: center;
    font-size: 28px;
    color: #fff;
  }
  .contrast-result-desc {
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  .percent-text {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background-color: #7b97ce8a;
    color: #fff;
    position: absolute;
    top: 12px;
    left: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
.svg-loop {
  position: fixed;
  left: -99999px;
}
</style>