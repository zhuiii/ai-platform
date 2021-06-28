<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能介绍 -->
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap" id="dest2">
        <h2 class="title">功能演示</h2>
        <OcrDemo
          :uploadUrl="host + ocrApiUrl.requestOcrApi"
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
        :list="[]"
        :showCompareCompo="showCompareCompo"
        :isCustom="true"
      >
        <DataDisplayItem :titleIndex="0">
          <div class="ac-cvs" slot="cont">
            <canvas id="cvs-maxvision"></canvas>
          </div>
        </DataDisplayItem>
        <DataDisplayItem :titleIndex="1">
          <div class="ac-cvs" slot="cont">
            <canvas id="cvs-baidu"></canvas>
          </div>
        </DataDisplayItem>
        <DataDisplayItem :titleIndex="2">
          <div class="ac-cvs" slot="cont">
            <canvas id="cvs-tencent"></canvas>
          </div>
        </DataDisplayItem>
      </AlgorithmCompare>
    </div>
  </div>
</template>

<script>
import { pageMoveTo, getObjKeys } from "@/assets/js/utils.js";
import {
  ocrTypeConfig,
  ocrApiUrl,
  requestOcrApi,
} from "@/assets/js/apis/ocr-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { ocrSamplesTextalign } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import { cloneCanvasCont, setCanvasShrink } from "@/assets/js/mycanvas.js";

/* 文本对齐 */
export default {
  components: {
    OcrDemo,
  },
  mixins: [MixinFunDemo],
  data() {
    return {
      ocrApiUrl,
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
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: ocrApiUrl.requestOcrApi,
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
      // 角度信息
      angleMaxvision: 0,
      angleBaidu: 0,
      angleTencent: 0,
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
      this.ocrDemotabList[0].samples = ocrSamplesTextalign;
    },
    dataProcessMaxvision(data) {},
    dataProcessBaidu({ direction = 0 } = {}) {
      this.angleBaidu = direction;
    },
    dataProcessTencent({ angel = 0 } = {}) {
      this.angleTencent = angel;
    },
    // mixin中识别成功回调
    handleOcrSuccessInMixin(hasResults) {
      const cvsInfo = [
        { id: "cvs-maxvision", angle: this.angleMaxvision },
        { id: "cvs-baidu", angle: this.angleBaidu },
        { id: "cvs-tencent", angle: this.angleTencent },
      ];
      hasResults.forEach((hasResult, index) => {
        if (hasResult) {
          // todo 旋转后有留白
          cloneCanvasCont("image-canvas", cvsInfo[index].id, {
            rotate: true,
            angle: cvsInfo[index].angle,
          });
          this.$nextTick(() => {
            setCanvasShrink(document.getElementById(cvsInfo[index].id));
          });
        }
      });
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
.ac-cvs {
  position: relative;
  height: 357px;
  overflow: hidden;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
