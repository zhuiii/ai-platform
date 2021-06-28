<template>
  <ocr-demo-layout 
    class="impression-wrap" 
    :title="aiName"
    :bg="bgPic"
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
      :ocrType="ocrTypeConfig.impression"
      tabKey="side"
      :isShowOcrJsonResult="true"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestOcrApi"
      :requestConfig="ocrRequestConfig"
      :isDrawLineFrame="true"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
      <template slot="result">
        <div
          class="g-flex"
          v-for="(key, index) in ocrResultKeys"
          :key="`ok${index}`"
        >
          <span class="req-title">{{ maxvisionKeyCN[key] }}</span>
          <span class="req-val">{{ ocrResultData[key] }}</span>
        </div>
      </template>
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :showTabs="compareList && compareList.length > 0"
    >
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { getObjKeys } from "@/assets/js/utils.js";
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
} from "@/assets/js/apis/ocr-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { ocrSamplesImpression } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg2.png";

/* 印模识别页 */
export default {
  components: {
    OcrDemo,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["识别印模上的日期"],
      aiIntro: '识别印模上的日期',
      ocrApiUrl,
      ocrTypeConfig,
      // 不显示hide：true的tab
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
      // 坐标点数组
      coordinates: [],
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        error_msg: "异常",
        date: "日期",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        SealBody: "印体内容",
      },
      // 自定义获取盛视数据key，覆盖mixin
      maxvisionResultKey: "data",
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: "",
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
      this.ocrDemotabList[0].samples = ocrSamplesImpression;
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
.impression-wrap {
  .req-title {
    margin-right: 6%;
  }
  .req-val {
    width: 75%;
  }
}
</style>
