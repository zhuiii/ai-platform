<template>
  <ocr-demo-layout 
    class="passport-wrap" 
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
      :uploadUrl="host + ocrApiUrl.requestOcrApi"
      :ocrType="ocrTypeConfig.basic"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestOcrApi"
      :requestConfig="ocrRequestConfig"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
      <template slot="result">
        <div
          class="g-flex"
          v-for="(key, index) in ocrResultKeys"
          :key="`ok${index}`"
        >
          <span class="req-title">{{ key }}</span>
          <span class="req-val">{{
            ocrResultData[key] && ocrResultData[key].words
          }}</span>
        </div>
      </template>
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
    >
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import OcrDemo from "@/components/OcrDemo/index.vue";
import AlgorithmCompare from "@/components/OcrDemo/AlgorithmCompare.vue";
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
} from "@/assets/js/apis/ocr-api.js";
import { ocrBasicList } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/bg3.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

/* 通用文字识别 */
export default {
  components: {
    OcrDemo,
    AlgorithmCompare,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["能有效对中、英、数字、手写文字等内容的有效识别。"],
      aiIntro: '能有效对中、英、数字、手写文字等内容的有效识别。',
      applyCont: {},
      ocrApiUrl,
      ocrTypeConfig,
      ocrDemotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestOcrApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: ocrApiUrl.requestOcrApi,
        header: "none",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        mrz1: "MRZCode1",
        mrz2: "MRZCode2",
        cardId: "护照号码",
        certificateType: "证件类型",
        countryCode: "国家码",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: null,
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        DateOfBirth: "出生日期",
        DateOfExpiration: "有效期至",
        ID: "护照号码",
        IssuingCountry: "国家码",
        Name: "姓名拼音",
        Nationality: "国籍",
        Sex: "性别",
      },
      maxvisionResultKey: "data",
      baiduResultKey: "words_result",
      baiduIsChineseKey: true,
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
      this.ocrDemotabList[0].samples = ocrBasicList;
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
