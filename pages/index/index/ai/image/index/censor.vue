<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能介绍 -->
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap" id="dest2">
        <h2 class="title">功能演示</h2>
        <OcrDemo
          :uploadUrl="host + imageDetectApiUrl.requestImageDetectApi"
          :ocrType="imageDetectTypeConfig.basic"
          tabKey="side"
          :isShowOcrJsonResult="false"
          :isShowResultCorner="isShowResultCorner"
          :tabList="ocrDemotabList"
          imgSelectSrcKey="src"
          :apiFn="requestImageDetectApi"
          :requestConfig="ocrRequestConfig"
          :isMockData="true"
          @ocrSuccess="handleOcrSuccess"
          @clearResult="clearOcrResult"
        >
          <!-- 右上角识别结果显示 -->
          <!-- <template slot="corner-result">
            <ListPercent :list="ocrResultData" :keyConfig="{label: 'keyword', percent: 'score'}"></ListPercent>
          </template> -->
        </OcrDemo>
      </div>
      <AlgorithmCompare
        :times="returnTimes"
        :list="[]"
        :showCompareCompo="showCompareCompo"
        :isCustom="true"
      >
        <DataDisplayItem :titleIndex="0">
          <ValueTipList slot="cont" :list="ocrResultData"></ValueTipList>
        </DataDisplayItem>
        <DataDisplayItem :titleIndex="1">
          <ValueTipList slot="cont" :list="ocrResultData"></ValueTipList>
        </DataDisplayItem>
        <DataDisplayItem :titleIndex="2">
          <ValueTipList slot="cont" :list="ocrResultData"></ValueTipList>
        </DataDisplayItem>
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
import OcrDemo from "@/components/OcrDemo/index.vue";
import { imageDetectCensorSamples } from "@/assets/js/apis/mockData.js";
import ListPercent from "@/components/list/ListPercent.vue";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

/* 图像技术-图像审核 */
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
      tencentKeyCN: {},
      // 返回结果-盛视
      ocrResultData: [],
      // 返回结果-百度
      jsonBaidu: [],
      // 返回结果-腾讯
      jsonTencent: [],
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: "result",
      // 自定义获取腾讯数据key，覆盖mixin
      tencentResultKey: "labels",
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
      this.ocrDemotabList[0].samples = imageDetectCensorSamples;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin() {
      // this.isShowResultCorner = true;
      this.ocrResultData = [
        {
          label: "色情识别",
          value: "合规",
        },
        {
          label: "暴恐识别",
          value: "合规",
        },
        {
          label: "恶心识别",
          value: "合规",
        },
        {
          label: "广告检测",
          value: "合规",
        },
        {
          label: "政治人物识别",
          value: "合规",
        },
        {
          label: "公众人物识别",
          value: "合规",
        },
        {
          label: "图文审核",
          value: "合规",
        },
        {
          label: "旗帜标识识别",
          value: "不合规",
          tip: "存在反动组织旗帜、徽章、标志不合规",
        },
        {
          label: "不良场景识别",
          value: "合规",
        },
      ];
      this.returnTimes = [100, 200, 300]
    },
    // mixin中清除结果回调
    clearOcrResultInMixin() {
      // this.isShowResultCorner = false;
    },
  },
  created() {
    // this.requestUseTypeApiFn();
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
