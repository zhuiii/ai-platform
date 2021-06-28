<template>
<!-- AI能力布局 -->
  <ocr-demo-layout 
    class="img-basic"
    :title="aiName"
    :bg="bgPic"
    :descs="headDescs"
  >
  <!-- 左侧图片展示区域 -->
    <OcrDemo
      slot="left"
      :uploadUrl="host + imageDetectApiUrl.requestImageDetectApi"
      :ocrType="imageDetectTypeConfig.basic"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :isShowResultCorner="isShowResultCorner"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :isDrawCanvasRect="true"
      :isNeedClipImages="true"
      :apiFn="requestImageDetectApi"
      :requestConfig="ocrRequestConfig"
      :isCanvas="false"
      :clickable="true"
      :keyCN="maxvisionKeyCN"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
    </OcrDemo>
    <!-- 右侧数据展示区域 -->
    <AlgorithmCompare
      class="ac-wrap__thumb-list"
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :isCustom="true"
      :tabsToggleReset="tabsToggleReset"
      @getActiveIndex="getActiveIndex"
    >
      <OcrResult
        class="ocr-result__thumb-list"
        :errorInfo="maxvisionErrorInfo"
        :tipInfo="maxvisionTipInfo"
        v-if="activeTabsIndex === 0"
      >
        <ThumbCarousel
          :list="clipImagesMaxvision"
          @handleClick="handleThumbCarouselItemClick"
        ></ThumbCarousel>
        <el-scrollbar
          class="elem-scroll"
          v-show="clipImagesMaxvision && clipImagesMaxvision.length > 0"
        >
          <ListKeyValue
            :info="detectInfo"
            :valKeyConfig="maxvisionKeyCN"
            dataKey=""
          ></ListKeyValue>
        </el-scrollbar>
      </OcrResult>
      <OcrResult
        class="ocr-result__thumb-list"
        :errorInfo="baiduErrorInfo"
        :tipInfo="baiduTipInfo"
        v-if="activeTabsIndex === 1"
      >
        <ListPercent
          v-if="jsonBaidu && jsonBaidu.length > 0"
          class="flex-center-center"
          :list="jsonBaidu"
          :keyConfig="{ label: 'keyword', percent: 'score' }"
        ></ListPercent>
      </OcrResult>
      <OcrResult
        class="ocr-result__thumb-list"
        :errorInfo="tencentErrorInfo"
        :tipInfo="tencentTipInfo"
        v-if="activeTabsIndex === 2"
      >
        <ListPercent
          v-if="jsonTencent && jsonTencent.length > 0"
          class="flex-center-center"
          :list="jsonTencent"
          :keyConfig="{ label: 'Name', percent: 'Confidence' }"
        ></ListPercent>
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
} from "@/assets/js/apis/image-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { imageDetectBasicSamples } from "@/assets/js/apis/mockData.js";
import ListPercent from "@/components/list/ListPercent.vue";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/bg1.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
/* 图像技术-通用目标检测页 */
export default {
  components: {
    OcrDemo,
    ListPercent,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["图谱，以图识万物"],
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
        className: "名称",
        confidences: "置信度",
      },
      maxvisionResultKey: "data",
      maxvisionDataKey: "objects",
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: "result",
      // 自定义获取腾讯数据key，覆盖mixin
      tencentResultKey: "Labels",
      listMaxvision: [],
      activeTabsIndex: 0,
      locationMaxvision: [],
      clipImagesMaxvision: [],
      detectInfo: null,
    };
  },
  methods: {
    initData() {
      // 识别样图设置
      this.ocrDemotabList[0].samples = imageDetectBasicSamples;
    },
    dataProcessMaxvision(data) {
      if (!data || !data.objects || !Array.isArray(data.objects))
        return (this.listMaxvision = []);
      const { objects } = data;
      this.listMaxvision = objects;
      this.locationMaxvision = objects.map((item) => ({
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      }));
    },
    dataProcessBaidu(data) {
      // this.jsonBaidu = data;
    },
    dataProcessTencent(data) {
      // this.jsonTencent = data;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin() {
      // this.isShowResultCorner = true;
    },
    // mixin中清除结果回调
    clearOcrResultInMixin() {
      // this.isShowResultCorner = false;
      this.ocrResultData = null;
      this.listMaxvision = [];
      this.locationMaxvision = [];
      this.clipImagesMaxvision = [];
    },
    getActiveIndex(index) {
      this.activeTabsIndex = index;
      this.initFirstDetectInfo();
    },

    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (
        typeof drawCanvasRectCbk === "function" &&
        this.listMaxvision.length > 0
      ) {
        drawCanvasRectCbk(this.listMaxvision);
      }
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function" && this.listMaxvision.length > 0) {
        const [clipImagesMaxvision = []] = clipCbk([this.listMaxvision]);
        this.clipImagesMaxvision = clipImagesMaxvision;
        this.initFirstDetectInfo();
      }
    },
    initFirstDetectInfo() {
      if (this.listMaxvision && this.listMaxvision.length > 0) {
        this.detectInfo = this.listMaxvision[0];
      }
    },
    handleThumbCarouselItemClick(item, index) {
      this.detectInfo = this.listMaxvision[index];
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
@import "~assets/less/page/custom-comm.less";
.img-basic {
  /deep/ .list-percent {
    max-height: 80%;
  }
  .err {
    text-align: center;
  }
}

.elem-scroll {
  margin-top: 20px;
}
</style>
