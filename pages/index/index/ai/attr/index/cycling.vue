<template>
  <ocr-demo-layout
    class="body-basic"
    :bg="bgPic"
    :title="aiName"
    :descs="headDescs"
  >
    <OcrDemo
      slot="left"
      :uploadUrl="host + attrApiUrl.requestAttrApi"
      :ocrType="imageDetectTypeConfig.cycling"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="demotabList"
      imgSelectSrcKey="src"
      :apiFn="requestAttrApi"
      :requestConfig="requestConfig"
      :isDrawCanvasRect="true"
      :isNeedClipImages="true"
      :drawRectKeyConfig="drawRectKeyConfig"
      :rectRandomColor="true"
      :keyCN="maxvisionKeyCN"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
      :isCanvas="false"
      :clickable="true"
    >
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :isCustom="true"
      :showTabs="compareList && compareList.length > 0"
      @getActiveIndex="getActiveIndex"
      :tabsToggleReset="tabsToggleReset"
    >
      <template v-if="count !== -1">
        <OcrResult
          :errorInfo="info.errorInfo"
          :tipInfo="info.tipInfo"
          v-if="info.isShow"
        >
          <!-- <NumDetect label="骑行人数量" :icon="cycling" :count="info.num"></NumDetect> -->
          <ThumbCarousel
            :list="clipImagesMaxvision"
            :info="detectInfo"
            :keyCN="maxvisionKeyCN"
          ></ThumbCarousel>
          <!-- <el-scrollbar
            class="elem-scroll"
            v-show="clipImagesMaxvision && clipImagesMaxvision.length > 0"
          >
          </el-scrollbar> -->
        </OcrResult>
      </template>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { getObjKeys } from "@/assets/js/utils.js";
import {
  requestAttrApi,
  imageDetectTypeConfig,
  attrApiUrl,
} from "@/assets/js/apis/image-api.js";
import { samplesCycling } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg4.png";
import cycling from "@/static/newui/cycling.png";

/* 人骑车属性分析 */
export default {
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      cycling,
      bgPic,
      headDescs: ["从人、车、行为、整体四个角度分析人骑车属性"],
      attrApiUrl,
      imageDetectTypeConfig,
      // 不显示hide：true的tab
      demotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestAttrApi,
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: attrApiUrl.requestAttrApi,
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
      // 检测数据
      detectInfo: {},
      detectInfoBaidu: {},
      detectInfoTencent: {},
      keyCN: {
        x: "x1",
        y: "y1",
        width: "宽",
        height: "高",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        type: "车型",
        direction: "朝向",
        useFor: "功能",
        carry: "是否载客",
        dangerousAction: "有无危险动作",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      baiduResultKey: "person_info",
      tencentResultKey: "BodyDetectResults",
      // 坐标信息
      locationMaxvision: [],
      locationBaidu: [],
      locationTencent: [],
      keyToChineseConfig: {},
      restoreTopToggle: false,
      listMaxvision: [],
      activeTabIndex: 0,
      maxvisionResultKey: "data",
      maxvisionDataKey: "data",
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "width",
        height: "height",
        rotation: "rotation",
      },
      count: -1,
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
  computed: {
    info() {
      switch (this.activeTabIndex) {
        case 0:
          return {
            errorInfo: this.maxvisionErrorInfo,
            tipInfo: this.maxvisionTipInfo,
            isShow: this.activeTabIndex == 0,
            num: this.listMaxvision && this.listMaxvision.length,
          };
        case 1:
          return {
            errorInfo: this.baiduErrorInfo,
            tipInfo: this.baiduTipInfo,
            isShow: this.activeTabIndex == 1,
            num: this.locationBaidu && this.locationBaidu.length,
          };
        case 2:
          return {
            errorInfo: this.tencentErrorInfo,
            tipInfo: this.tencentErrorInfo,
            isShow: this.activeTabIndex == 2,
            num: this.locationTencent && this.locationTencent.length,
          };
      }
    },
  },
  methods: {
    initData() {
      // 识别样图设置
      this.demotabList[0].samples = samplesCycling;
    },
    initCount(count) {
      this.count = count;
    },
    dataProcessMaxvision(data) {
      if (!Array.isArray(data)) return;
      this.listMaxvision = data;
      this.locationMaxvision = data.map((item) => ({
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      }));
      this.initCount(data.length);
    },
    dataProcessBaidu(list = []) {
      if (!Array.isArray(list)) return;
      this.locationBaidu = list.map((item) => item.location);
      this.locationBaidu.forEach((item) => {
        item.x = item.left;
        item.y = item.top;
      });
    },
    dataProcessTencent(list = []) {
      if (!Array.isArray(list)) return;
      this.locationTencent = list.map((item) => item.BodyRect);
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function") {
        const [clipImagesMaxvision = []] = clipCbk([this.listMaxvision]);
        this.clipImagesMaxvision = clipImagesMaxvision;
        this.initFirstDetectInfo();
      }
    },
    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (typeof drawCanvasRectCbk === "function")
        drawCanvasRectCbk(this.listMaxvision);
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.clipImagesTencent = [];
      this.restoreTopToggle = !this.restoreTopToggle;
      this.listMaxvision = [];
      this.detectInfo = {};
      this.detectInfoBaidu = {};
      this.detectInfoTencent = {};
      this.count = -1;
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
      this.initFirstDetectInfo();
    },
    handleThumbCarouselItemClick(index) {
      this.detectInfo = this.listMaxvision[index];
    },
    handleThumbCarouselItemClickBaidu(index) {
      this.detectInfoBaidu = this.jsonBaidu[index].attributes;
    },
    handleThumbCarouselItemClickTencent(index) {
      this.detectInfoTencent = this.jsonTencent[index].BodyAttributeInfo;
    },
    initFirstDetectInfo() {
      if (this.listMaxvision && this.listMaxvision.length > 0) {
        this.detectInfo = this.listMaxvision[0];
      }
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
@import "~assets/less/page/custom-comm.less";

.body-basic {
  font-size: 16px;

  .req-val {
    width: 75%;
  }

  .lp-wrap {
    height: 100%;
    overflow: auto;
  }

  .detect-item {
    line-height: 2;
    display: flex;
  }

  .face-total {
    background-color: #fff;
    padding-left: 30px;

    & > p {
      display: flex;
      align-items: center;
    }

    .label {
      color: rgb(152, 64, 224);
      font-size: 20px;
      margin-right: 10px;
    }

    .count {
      font-size: 26px;
      color: tomato;
    }

    &.face-total-mv {
      border-bottom: 2px solid rgb(71, 144, 255);
    }
  }
}
</style>