<template>
  <ocr-demo-layout 
    class="quality-credential-wrap" 
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
      :uploadUrl="host + imageDetectApiUrl.requestImageDetectApi"
      :ocrType="imageDetectTypeConfig.IDPhotoQuality"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :isShowResultCorner="isShowResultCorner"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestImageDetectApi"
      :requestConfig="ocrRequestConfig"
      :isMockData="false"
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
      <OcrResult
        :errorInfo="maxvisionErrorInfo"
        :tipInfo="maxvisionTipInfo"
        v-if="activeTabIndex == 0"
      >
        <template v-if="showResultMaxvision">
          <SingleNumer label="质量分" :count="scoreMaxvision"></SingleNumer>
        </template>
      </OcrResult>
      <OcrResult
        :errorInfo="baiduErrorInfo"
        :tipInfo="baiduTipInfo"
        v-if="activeTabIndex == 1"
      >
        <template>
          <SingleNumer label="质量分" :count="scoreBaidu"></SingleNumer>
        </template>
      </OcrResult>
      <OcrResult
        :errorInfo="tencentErrorInfo"
        :tipInfo="tencentTipInfo"
        v-if="activeTabIndex == 2"
      >
        <template>
          <SingleNumer label="质量分" :count="scoreTencent"></SingleNumer>
        </template>
      </OcrResult>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { pageMoveTo, getObjKeys } from "@/assets/js/utils.js";
import {
  requestImageDetectApi,
  imageDetectTypeConfig,
  imageDetectApiUrl,
  imageKeyCNConfig,
} from "@/assets/js/apis/image-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { credentialImageDetectQualitySamples } from "@/assets/js/apis/mockData.js";
import ListPercent from "@/components/list/ListPercent.vue";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/banner-face.png";
/* 图像技术-证件质量 */
export default {
  components: {
    OcrDemo,
    ListPercent,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["在人脸质量检测的基础上，添加证件照背景色、人脸比例内容检测"],
      aiIntro: "在人脸质量检测的基础上，添加证件照背景色、人脸比例内容检测",
      imageDetectApiUrl,
      imageDetectTypeConfig,
      // 不显示hide = true的tab
      ocrDemotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestImageDetectApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: imageDetectApiUrl.requestImageDetectApi,
        header: "none",
      },
      isShowResultCorner: false,
      // 公用字段中文配置
      keyCN: {
        ...imageKeyCNConfig,
        bgColor: "背景色",
        faceRatio: "人脸比例",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        score: "得分",
      },
      maxvisionResultKey: "data",
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: "",
      // 自定义获取腾讯数据key，覆盖mixin
      tencentResultKey: "",
      tempData: {
        color: "99",
        limpid: "99",
        bright: "99",
        cover: "无",
        font: "0",
        tilt: "10",
        bgColor: "合规",
        faceRatio: "合规",
      },
      activeTabIndex: 0,
      scoreMaxvision: 0,
      scoreBaidu: 0,
      scoreTencent: 0,
      showResultMaxvision: false,
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
      this.ocrDemotabList[0].samples = credentialImageDetectQualitySamples;
      this.baiduKeyCN = { ...this.keyCN };
      this.tencentKeyCN = { ...this.keyCN };
    },
    dataProcessMaxvision(data) {
      if (!data) return;
      this.showResultMaxvision = true;
      this.scoreMaxvision = data.score;
    },
    dataProcessBaidu(data) {
      if (!data) return;
    },
    dataProcessTencent(data) {
      if (!data) return;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin() {
      // this.isShowResultCorner = true;
    },
    // mixin中清除结果回调
    clearOcrResultInMixin() {
      this.showResultMaxvision = false;
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
@import "~assets/less/page/ocr/common.less";
.ditem-cus {
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .count-val{
  font-size: 40px !important;
}
</style>
