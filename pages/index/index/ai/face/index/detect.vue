<template>
  <ocr-demo-layout 
    class="face-detect-wrap" 
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
      :ocrType="faceTypeConfig.detect"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="demotabList"
      imgSelectSrcKey="src"
      :apiFn="requestFaceApi"
      :requestConfig="requestConfig"
      :isDrawCanvasRect="true"
      :isNeedClipImages="false"
      :drawRectKeyConfig="drawRectKeyConfig"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
      @getClipImages="getClipImages"
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
      <div class="ditem">
        <ocr-result :errorInfo="info.errorInfo" :tipInfo="info.tipInfo">
          <NumDetect label="识别人脸数量" :icon="peopleNum" :iconWidth="64" :count="info.num"></NumDetect>
        </ocr-result>
      </div>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { getObjKeys, firstLetterUpperCase } from "@/assets/js/utils.js";
import {
  requestFaceApi,
  faceTypeConfig,
  faceApiUrlConfig,
  faceKeyToChineseConfig,
  faceValueToChineseConfig,
} from "@/assets/js/apis/face-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import ListPanel from "@/components/list/ListPanel.vue";
import { samplesFace } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg1.png";
import peopleNum from "@/static/newui/peopleNum.png";

/* 人脸检测页 */
export default {
  components: {
    OcrDemo,
    ListPanel,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      peopleNum,
      bgPic,
      headDescs: ["检测图像中的所有人脸及位置"],
      aiIntro: '检测图像中的所有人脸及位置',
      faceApiUrlConfig,
      faceTypeConfig,
      // 不显示hide：true的tab
      demotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestFaceApi,
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: faceApiUrlConfig.requestFaceApi,
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
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
      // 检测数据
      detectInfo: {},
      detectInfoBaidu: {},
      detectInfoTencent: {},
      keyCN: {
        x: "x",
        y: "y",
        width: "宽",
        height: "高",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      maxvisionResultKey: "data",
      baiduResultKey: "result",
      baiduDataKey: "face_list",
      tencentResultKey: "FaceInfos",
      faceKeyToChineseConfig,
      faceValueToChineseConfig,
      // 坐标信息
      locationMaxvision: [],
      locationBaidu: [],
      locationTencent: [],
      activeTabIndex: 0,
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
      switch(this.activeTabIndex) {
        case 0:
          return {
            errorInfo: this.maxvisionErrorInfo,
            tipInfo: this.maxvisionTipInfo,
            isShow: this.locationMaxvision && this.locationMaxvision.length > 0,
            num: this.locationMaxvision && this.locationMaxvision.length
          }
        case 1:
          return {
            errorInfo: this.baiduErrorInfo,
            tipInfo: this.baiduTipInfo,
            isShow: this.locationBaidu && this.locationBaidu.length > 0,
            num: this.locationBaidu && this.locationBaidu.length
          }
        case 2:
          return {
            errorInfo: this.tencentErrorInfo,
            tipInfo: this.tencentErrorInfo,
            isShow: this.locationTencent && this.locationTencent.length > 0,
            num: this.locationTencent && this.locationTencent.length
          }
      }
    }
  },
  methods: {
    firstLetterUpperCase,
    initData() {
      // 识别样图设置
      this.demotabList[0].samples = samplesFace;
    },
    initFirstDetectInfo() {
      this.detectInfo = this.locationMaxvision[0] || {};
      this.detectInfoBaidu = this.locationBaidu[0] || {};
      this.detectInfoTencent = this.locationTencent[0] || {};
    },
    // 识别成功回调
    /* 
    {
      result: { faceList, faceNum },
      drawCanvasRectCbk,
      clipImagesCbk,
    }
    */
    /* handleOcrSuccess({shengshiResult, baiduResult, tengxunResult}) {
      this.resultKeys = getObjKeys(faceKeyToChineseConfig);
      this.resultData = faceList || [];
      if (faceNum > 0) {
        const list = this.resultData.map((item) => item.location);
        // 先裁剪再绘制执行，注意执行顺序
        clipImagesCbk(list);
        drawCanvasRectCbk(list);
        // 默认显示第一条数据
        this.initFirstDetectInfo();
      } else {
        this.clipImages = [];
      }
    }, */
    dataProcessMaxvision(list) {
      if (!Array.isArray(list)) return;
      this.locationMaxvision = list.map((item) => item.rect);
    },
    dataProcessBaidu({ face_list }) {
      if (!Array.isArray(face_list)) return (this.locationBaidu = []);
      this.locationBaidu = face_list.map((item) => item.location);
      this.locationBaidu.forEach((item) => {
        item.x = item.left;
        item.y = item.top;
      });
    },
    dataProcessTencent(faceInfos) {
      if (!Array.isArray(faceInfos)) return (this.locationTencent = []);
      this.locationTencent = faceInfos;
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function")
        clipCbk([
          this.locationMaxvision,
          this.locationBaidu,
          this.locationTencent,
        ]);
    },
    // clipImagesCbk回调执行过后需要获取裁剪图像OcrDemo才调用
    getClipImages(imageArr) {
      // this.clipImages = imageArr;
      const [
        clipImagesMaxvision = [],
        clipImagesBaidu = [],
        clipImagesTencent = [],
      ] = imageArr;
      this.clipImagesMaxvision = clipImagesMaxvision;
      this.clipImagesBaidu = clipImagesBaidu;
      this.clipImagesTencent = clipImagesTencent;
      this.initFirstDetectInfo();
    },
    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (typeof drawCanvasRectCbk === "function")
        drawCanvasRectCbk(this.locationMaxvision);
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.clipImagesTencent = [];
      this.restoreTopToggle = !this.restoreTopToggle;
      this.locationMaxvision = [];
      this.locationBaidu = [];
      this.locationTencent = [];
    },
    handleDetectListClick(item, index) {
      this.detectInfo = this.locationMaxvision[index] || {};
    },
    handleDetectListClickBaidu(item, index) {
      this.detectInfoBaidu = this.locationBaidu[index] || {};
    },
    handleDetectListClickTencent(item, index) {
      this.detectInfoTencent = this.locationTencent[index] || {};
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.resultKeys = getObjKeys(this.keyCN);
  },
};
</script>

<style lang='less' scoped>
@import "~assets/less/page/ocr/common.less";

.face-detect-wrap {
  font-size: 16px;

  .detect-item {
    line-height: 3;

    & > span {
      &:first-child {
        margin-right: 30px;
        width: 100px;
        display: inline-block;
        background: #e6fffb;
        text-align: right;
      }
    }
  }

  .face-total {
    background-color: #fff;
    line-height: 3;
    padding-left: 30px;

    .label {
      color: rgb(152, 64, 224);
      font-size: 20px;
    }

    .count {
      font-size: 26px;
      color: tomato;
    }
  }
}
</style>