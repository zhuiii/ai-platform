<template>
  <ocr-demo-layout 
    class="headno-wrap" 
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
      :ocrType="faceTypeConfig.mosaic"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestFaceApi"
      :requestConfig="ocrRequestConfig"
      :isDrawCanvasRect="false"
      :isNeedClipImages="false"
      :drawRectKeyConfig="drawRectKeyConfig"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :showTabs="compareList && compareList.length > 0"
      :tabsToggleReset="tabsToggleReset"
      :isCustom="true"
      @getActiveIndex="getActiveIndex"
    >
      <OcrResult
        :errorInfo="maxvisionErrorInfo"
        :tipInfo="maxvisionTipInfo"
        v-if="activeTabIndex === 0"
      >
        <template v-if="typeof ocrResultData === 'string'">
          <img :src="ocrResultData" alt="" />
        </template>
      </OcrResult>
      <OcrResult
        :errorInfo="baiduErrorInfo"
        :tipInfo="baiduTipInfo"
        v-if="activeTabIndex === 1"
      >
        <template v-if="typeof jsonBaidu === 'string'">
          <img :src="jsonBaidu" alt="" />
        </template>
      </OcrResult>
      <OcrResult
        :errorInfo="tencentErrorInfo"
        :tipInfo="tencentTipInfo"
        v-if="activeTabIndex === 2"
      >
        <template v-if="typeof jsonTencent === 'string'">
          <img :src="jsonTencent" alt="" />
        </template>
      </OcrResult>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import OcrDemo from "@/components/OcrDemo/index.vue";
import AlgorithmCompare from "@/components/OcrDemo/AlgorithmCompare.vue";
import {
  requestFaceApi,
  faceTypeConfig,
  faceApiUrlConfig,
  faceKeyToChineseConfig,
  faceValueToChineseConfig,
} from "@/assets/js/apis/face-api.js";
import { samplesFaceMosaic } from "@/assets/js/apis/mockModule/face-tech/mosaic.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg5.png";

/* 人脸马赛克 */
export default {
  components: {
    OcrDemo,
    AlgorithmCompare,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["将图像中的人脸进行马赛克处理"],
      aiIntro: "将图像中的人脸进行马赛克处理",
      applyCont: {},
      faceApiUrlConfig,
      faceTypeConfig,
      ocrDemotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestFaceApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: faceApiUrlConfig.requestFaceApi,
        header: "none",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: null,
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      maxvisionResultKey: "imageUrl",
      baiduResultKey: "path",
      tencentResultKey: "path",
      baiduIsChineseKey: true,
      locationMaxvision: [],
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
      activeTabIndex: 0,
    };
  },
  // async fetch({ app: {$axios} }) {
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
      this.ocrDemotabList[0].samples = samplesFaceMosaic;
    },
    dataProcessMaxvision(list) {
      if (!Array.isArray(list)) return;
      this.locationMaxvision = list;
    },
    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (typeof drawCanvasRectCbk === "function")
        drawCanvasRectCbk(this.locationMaxvision);
    },
    clearOcrResultInMixin() {
      this.locationMaxvision = [];
    },
    getActiveIndex(idx) {
      this.activeTabIndex = idx;
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
/deep/ .tabs-cont {
  .el-scrollbar__view {
    text-align: center;
    width: 100%;
    height: 100%;
    .comp-ocr-result {
      width: 100%;
      & > img,
      .result-no {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
