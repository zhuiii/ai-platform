<template>
  <ocr-demo-layout 
    class="face-keypoint-wrap" 
    :bg="bgPic"
    :title="aiName"
    :descs="headDescs"
  >
    <!-- <InnerPageHeadBanner
      slot="head"
      class="g-center"
      :bg="bgPic"
      :title="aiName"
      :descs="headDescs"
    >
    </InnerPageHeadBanner> -->
    <ProdIntro slot="intro" :desc="aiIntro"></ProdIntro>
    <OcrDemo
      slot="left"
      :uploadUrl="host + faceApiUrlConfig.requestFaceApi"
      :ocrType="faceTypeConfig.keyPoint"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="demotabList"
      imgSelectSrcKey="src"
      :isDrawCanvasRect="false"
      :isNeedClipImages="true"
      :drawRectKeyConfig="drawRectKeyConfig"
      :apiFn="requestFaceApi"
      :requestConfig="requestConfig"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :isCustom="true"
      :showTabs="compareList && compareList.length > 0"
      :tabsToggleReset="tabsToggleReset"
      @getActiveIndex="getActiveIndex"
    >
      <div
        :class="[
          'cus-ac-cont',
          compareList && compareList.length > 0 ? 'show' : '',
        ]"
      >
        <ocr-result
          :class="[activeTabIndex === 0 ? 'show' : '']"
          :errorInfo="maxvisionErrorInfo"
          :tipInfo="maxvisionTipInfo"
        >
          <!-- <p class="pcount">
            人脸数：{{
              (this.locationMaxvision && this.locationMaxvision.length) || 0
            }}
          </p> -->
          <div class="ac-cvs">
            <canvas id="cvs-maxvision"></canvas>
          </div>
        </ocr-result>
        <ocr-result
          :class="[activeTabIndex === 1 ? 'show' : '']"
          :errorInfo="baiduErrorInfo"
          :tipInfo="baiduErrorInfo"
        >
          <!-- <p class="pcount">
            人脸数：{{ (this.locationBaidu && this.locationBaidu.length) || 0 }}
          </p> -->
          <div class="ac-cvs">
            <canvas id="cvs-baidu"></canvas>
          </div>
        </ocr-result>
        <ocr-result
          :class="[activeTabIndex === 2 ? 'show' : '']"
          :errorInfo="tencentErrorInfo"
          :tipInfo="tencentErrorInfo"
        >
          <!-- <p class="pcount">
            人脸数：{{
              (this.locationTencent && this.locationTencent.length) || 0
            }}
          </p> -->
          <div class="ac-cvs">
            <canvas id="cvs-tencent"></canvas>
          </div>
        </ocr-result>
      </div>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { getObjKeys } from "@/assets/js/utils.js";
import {
  requestFaceApi,
  faceTypeConfig,
  faceApiUrlConfig,
  faceKeyToChineseConfig,
  faceValueToChineseConfig,
} from "@/assets/js/apis/face-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import ListPanel from "@/components/list/ListPanel.vue";
import { samplesFaceKeypoint } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import {
  setCanvasShrink,
  getCanvas,
  drawPoints,
} from "@/assets/js/mycanvas.js";

import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg5.png";
/* 人脸关键点检测页 */
export default {
  components: {
    OcrDemo,
    ListPanel,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["检测人脸图像的关键点位置"],
      aiIntro: "检测人脸图像的关键点位置",
      faceApiUrlConfig,
      faceTypeConfig,
      // 不显示hide：true的tab
      demotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestFaceApi,
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: faceApiUrlConfig.requestFaceApi,
        header: "none",
      },
      // 识别数据结果key
      resultKeys: [],
      // 识别数据结果
      resultData: [],
      resultDataBaidu: [],
      resultDataTencent: [],
      clipImagesMaxvision: [],
      clipImagesBaidu: [],
      clipImagesTencent: [],
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
      // 检测数据
      detectInfo: {},
      detectInfoBaidu: {},
      detectInfoTencent: {},
      keyCN: {
        x: "x",
        y: "y",
        width: "宽",
        height: "高",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      maxvisionResultKey: "data",
      baiduResultKey: "result",
      tencentResultKey: "FaceShapeSet",
      faceKeyToChineseConfig,
      faceValueToChineseConfig,
      // 坐标信息
      locationMaxvision: [],
      locationBaidu: [],
      locationTencent: [],
      imageCanvasCtx: null,
      activeTabIndex: 0,
      keyPoints: [],
      // 人脸数
      pcountBaidu: 0,
      pcountTencent: 0,
    };
  },
  // async asyncData({ app: {$axios} }) {
  //   try{
  //     const {methods: {requestUseTypeApiFn}} = this
  //     const {data: usetypesReturn = []} = await Function.prototype.call(this, requestUseTypeApiFn)
  //     // const {data: usetypesReturn = []} = await requestUseTypeApiFn()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // },
  methods: {
    initData() {
      // 识别样图设置
      this.demotabList[0].samples = samplesFaceKeypoint;
    },
    initFirstDetectInfo() {
      this.detectInfo = this.locationMaxvision[0] || {};
      this.detectInfoBaidu = this.locationBaidu[0] || {};
      this.detectInfoTencent = this.locationTencent[0] || {};
    },
    dataProcessMaxvision(list) {
      if (!Array.isArray(list)) return;
      this.keyPoints = list.map((item) => item.faceKeyPoints);
      this.locationMaxvision = list.map((item) => item.facePosition);
    },
    dataProcessBaidu({ face_list: faceList = [] } = {}) {
      if (!Array.isArray(faceList)) return;
      this.pcountBaidu = faceList.length;
      this.locationBaidu = faceList.map((item) => item.landmark72);
    },
    dataProcessTencent(list = []) {
      if (!Array.isArray(list)) return;
      this.pcountTencent = list.length;
      this.locationTencent = list.map((item) => Object.values(item));
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.clipImagesTencent = [];
      this.locationMaxvision = [];
      this.locationBaidu = [];
      this.locationTencent = [];
      this.keyPoints = [];
      this.pcountBaidu = 0;
      this.pcountTencent = 0;
    },
    handleOcrSuccessInMixin() {
      [
        { id: "cvs-maxvision", data: this.keyPoints },
        { id: "cvs-baidu", data: this.locationBaidu },
        { id: "cvs-tencent", data: this.locationTencent },
      ].forEach(({ id, data }) => {
        this.drawCompareCanvasImg(document.getElementById("image-canvas"), id);
        drawPoints(id, data, { color: "#12ff12" });
      });
    },
    // 获取canvas绘制的图片
    drawCompareCanvasImg(canvasDom, canvasId) {
      const canvas = getCanvas(canvasId);
      const ctx = canvas.getContext("2d");
      canvas.width = canvasDom.width;
      canvas.height = canvasDom.height;
      this.drawImgByImgCanvas(ctx, canvasDom);
      this.$nextTick(() => {
        setCanvasShrink(canvas);
      });
    },
    // 根据图片节点绘制画布图片
    drawImgByImgCanvas(ctx, canvasDom) {
      ctx.drawImage(canvasDom, 0, 0, canvasDom.width, canvasDom.height);
    },
    getCanvasContext(canvasId) {
      return getCanvas(canvasId).getContext("2d");
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
    },

    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (
        typeof drawCanvasRectCbk === "function" &&
        this.locationMaxvision.length > 0
      ) {
        drawCanvasRectCbk(this.locationMaxvision);
      }
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.resultKeys = getObjKeys(this.keyCN);
  },
};
</script>

<style lang='less' scoped>
@import "~assets/less/page/ocr/common.less";
.face-keypoint-wrap {
  font-size: 16px;
  .price-list {
    .price-item {
      width: 250px;
      &:not(:last-child) {
        border-right: 1px solid #eeeeee;
        margin-right: 50px;
      }
    }
  }
  .pcount {
    text-align: center;
    margin-bottom: 10px;
  }
  .req-title {
    margin-right: 6%;
  }
  .req-val {
    width: 75%;
  }
  .ac-cvs {
    position: relative;
    width: 100%;
    height: 400px;
    canvas {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: scale(0.2);
    }
  }
  .detect-item {
    line-height: 3;
    & > span {
      &:first-child {
        margin-right: 30px;
        width: 100px;
        display: inline-block;
        background: #e6fffb;
        text-align: right;
      }
    }
  }
  .face-total {
    background-color: #fff;
    line-height: 3;
    padding-left: 30px;
    .label {
      color: rgb(152, 64, 224);
      font-size: 20px;
    }
    .count {
      font-size: 26px;
      color: tomato;
    }
  }
}
.cus-ac-cont {
  position: relative;
  height: 100%;
  opacity: 0;
  /deep/ .comp-ocr-result {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    .result-no {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  }
}
.show {
  opacity: 1 !important;
}

/deep/ .tabs-cont {
  & > .el-scrollbar__wrap {
    align-items: flex-start !important;
  }
  .is-vertical {
    display: none;
  }
}
</style>