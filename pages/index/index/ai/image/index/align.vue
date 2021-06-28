<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能介绍 -->
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap" id="dest2">
        <h2 class="title">功能演示</h2>
        <OcrDemo
          :uploadUrl="host + imageDetectApiUrl.requestImageDetectApi"
          :ocrType="ocrTypeConfig.textCorrection"
          tabKey="side"
          :isShowOcrJsonResult="false"
          :isShowResultCorner="isShowResultCorner"
          :tabList="ocrDemotabList"
          imgSelectSrcKey="src"
          :apiFn="requestOcrApi"
          :requestConfig="ocrRequestConfig"
          @ocrSuccess="handleOcrSuccess"
          @clearResult="clearOcrResult"
        >
        </OcrDemo>
      </div>
      <AlgorithmCompare
        :times="returnTimes"
        :list="compareList"
        :showCompareCompo="showCompareCompo"
      >
      </AlgorithmCompare>
    </div>
  </div>
</template>

<script>
import { pageMoveTo, getObjKeys } from "@/assets/js/utils.js";
import {
  requestImageDetectApi,
  imageDetectTypeConfig,
  imageDetectApiUrl,
} from "@/assets/js/apis/image-api.js";
import { ocrTypeConfig, requestOcrApi } from "@/assets/js/apis/ocr-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { imageDetectAlignSamples } from "@/assets/js/apis/mockData.js";
import ListPercent from "@/components/list/ListPercent.vue";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

/* 图像技术-文本对齐 */
export default {
  components: {
    OcrDemo,
    ListPercent,
  },
  mixins: [MixinFunDemo],
  data() {
    return {
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
      ocrTypeConfig,
      requestOcrApi,
      requestImageDetectApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: imageDetectApiUrl.requestImageDetectApi,
        header: "none",
      },
      isShowResultCorner: false,
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        beauty: "美观度",
        definition: "清晰度",
      },
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: "",
      // 自定义获取腾讯数据key，覆盖mixin
      tencentResultKey: "",
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
      this.ocrDemotabList[0].samples = imageDetectAlignSamples;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin() {
      // this.isShowResultCorner = true;
    },
    // mixin中清除结果回调
    clearOcrResultInMixin() {
      // this.isShowResultCorner = false;
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
.price-list {
  .price-item {
    width: 250px;
    &:not(:last-child) {
      border-right: 1px solid #391885a1;
      margin-right: 50px;
    }
  }
}
.ditem-cus {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
