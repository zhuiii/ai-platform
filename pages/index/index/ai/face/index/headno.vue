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
      :ocrType="faceTypeConfig.headNumber"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestFaceApi"
      :requestConfig="ocrRequestConfig"
      :isDrawCanvasRect="true"
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
    >
      <OcrResult :errorInfo="maxvisionErrorInfo" :tipInfo="maxvisionTipInfo">
        <template v-if="locationMaxvision && locationMaxvision.length">
          <SingleNumer
            label="人头数"
            :count="locationMaxvision.length"
          ></SingleNumer>
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
import { headnoListModuleFace } from "@/assets/js/apis/mockModule/face-tech/headno.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/banner-face.png";

/* 人头数检测 */
export default {
  components: {
    OcrDemo,
    AlgorithmCompare,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["检测图像中的人头数量及位置"],
      aiIntro: '检测图像中的人头数量及位置',
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
      maxvisionResultKey: "data",
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: null,
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      maxvisionResultKey: "data",
      baiduResultKey: "words_result",
      baiduIsChineseKey: true,
      locationMaxvision: [],
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
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
      this.ocrDemotabList[0].samples = headnoListModuleFace;
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
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
</style>
