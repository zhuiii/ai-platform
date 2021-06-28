<template>
  <ocr-demo-layout 
    class="car-ocr" 
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
      :ocrType="imageDetectTypeConfig.car"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :isDrawCanvasRect="true"
      :isNeedClipImages="true"
      :drawRectKeyConfig="drawRectKeyConfig"
      :isShowResultCorner="isShowResultCorner"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestImageDetectApi"
      :requestConfig="ocrRequestConfig"
      :isCanvas="false"
      :clickable="true"
      :keyCN="maxvisionKeyCN"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
      @handleRectItemClick="handleRectItemClick"
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
      <ocr-result
        :errorInfo="maxvisionErrorInfo"
        :tipInfo="maxvisionTipInfo"
        v-show="activeTabIndex === 0"
      >
        <ListPercent
          class="flex-center-center"
          :list="listMaxvision"
          :keyConfig="{ label: 'label', percent: 'score' }"
        ></ListPercent>
      </ocr-result>
      <ocr-result
        :errorInfo="baiduErrorInfo"
        :tipInfo="baiduTipInfo"
        v-show="activeTabIndex === 1"
      >
        <ListPercent
          class="flex-center-center"
          :list="jsonBaidu"
          :keyConfig="{ label: 'name', percent: 'score' }"
        ></ListPercent>
      </ocr-result>
      <ocr-result
        :errorInfo="tencentErrorInfo"
        :tipInfo="tencentTipInfo"
        v-show="activeTabIndex === 2"
      >
        <ListPercent
          class="flex-center-center"
          :list="jsonTencent"
          :keyConfig="{ label: 'Name', percent: 'Confidence' }"
        ></ListPercent>
      </ocr-result>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { pageMoveTo, getObjKeys } from "@/assets/js/utils.js";
import {
  requestImageDetectApi,
  imageDetectTypeConfig,
  imageDetectApiUrl,
} from "@/assets/js/apis/image-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { imageDetectCarSamples } from "@/assets/js/apis/mockData.js";
import ListPercent from "@/components/list/ListPercent.vue";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/bg1.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

/* 图像技术-车辆识别页 */
export default {
  components: {
    OcrDemo,
    ListPercent,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["从车头、车身、行为、整体四个角度分析车辆属性"],
      aiIntro: "从车头、车身、行为、整体四个角度分析车辆属性",
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
      maxvisionKeyCN: {
        color: "颜色",
        make: "品牌",
        model: "系列",
        plate: "车牌",
      },
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
      maxvisionResultKey: "data",
      // 自定义获取腾讯数据key，覆盖mixin
      tencentResultKey: "CarTags",
      activeTabIndex: 0,
      listMaxvision: [],
      clipImagesMaxvision: [],
      clipImagesBaidu: [],
      clipImagesTencent: [],
      detectInfo: {},
      detectInfoBaidu: {},
      detectInfoTencent: {},
      locationMaxvision: [],
      locationBaidu: [],
      locationTencent: [],
      restoreTopToggle: false,
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
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
      this.ocrDemotabList[0].samples = imageDetectCarSamples;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin() {
      // this.isShowResultCorner = true;
    },
    // mixin中清除结果回调
    clearOcrResultInMixin() {
      // this.isShowResultCorner = false;
      this.listMaxvision = [];
      this.restoreTopToggle = !this.restoreTopToggle;
      this.locationMaxvision = [];
      this.locationBaidu = [];
      this.locationTencent = [];
    },
    /* 自定义数据处理开始 */
    dataProcessMaxvision(list) {
      if (!Array.isArray(list)) return;
      const tempArr = [];
      const keys = Object.keys(this.maxvisionKeyCN);
      keys.forEach((k) => {
        list.forEach((item) => {
          if (item[k] && item[k] !== "null") {
            tempArr.push({
              label: item[k],
              score: item[k + "Score"],
            });
          }
        });
      });
      this.listMaxvision = tempArr;
      list.forEach((item) => {
        if (item.plateRect) item.plateRect.plate = item.plate;
        delete item.plate;
        this.locationMaxvision.push(item.plateRect);
        this.locationMaxvision.push(Object.assign(item, item.carRect));
      });
    },
    dataProcessBaidu(data) {
      if (!data) this.jsonBaidu = [];
    },
    dataProcessTencent(data) {
      if (!data || data.errorMsg) this.jsonTencent = [];
      this.jsonTencent.forEach((d) => {
        d.Name = d.Brand + d.Serial;
      });
    },
    /* 自定义数据处理结束 */
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
    },
    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (typeof drawCanvasRectCbk === "function")
        drawCanvasRectCbk(this.locationMaxvision);
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function") {
        const result = clipCbk([
          this.listMaxvision,
          this.locationBaidu,
          this.locationTencent,
        ]);
        // this.clipImagesMaxvision = result[0] || [];
        // this.clipImagesBaidu = result[1] || [];
        // this.clipImagesTencent = result[2] || [];
        // this.initFirstDetectInfo();
      }
    },
    initFirstDetectInfo() {
      this.detectInfo = this.locationMaxvision[0] || {};
      this.detectInfoBaidu = this.locationBaidu[0] || {};
      this.detectInfoTencent = this.locationTencent[0] || {};
    },
    handleDetectListClick(item, index) {
      this.detectInfo = this.listMaxvision[index] || {};
    },
    handleDetectListClickBaidu(item, index) {
      this.detectInfoBaidu = this.locationBaidu[index] || {};
    },
    handleDetectListClickTencent(item, index) {
      this.detectInfoTencent = this.locationTencent[index] || {};
    },
    handleRectItemClick(idx) {
      console.log("handleRectItemClick");
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
