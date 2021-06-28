<template>
  <ocr-demo-layout 
    class="person-detect" 
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
      :uploadUrl="host + bodyApiUrlConfig.requestBodyApi"
      :ocrType="bodyTypeConfig.personDetect"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="demotabList"
      imgSelectSrcKey="src"
      :apiFn="requestBodyApi"
      :requestConfig="requestConfig"
      :isDrawCanvasRect="true"
      :isNeedClipImages="false"
      :drawRectKeyConfig="drawRectKeyConfig"
      :rectRandomColor="true"
      @getClipImages="getClipImages"
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
      <div class="ditem">
        <OcrResult :errorInfo="info.errorInfo" :tipInfo="info.tipInfo">
          <template v-if="info.num">
            <NumDetect label="识别人数" :icon="people" :iconWidth="48" :iconHeight="101" :count="info.num"></NumDetect>
          </template>
        </OcrResult>
      </div>
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import { getObjKeys } from "@/assets/js/utils.js";
import {
  requestBodyApi,
  bodyTypeConfig,
  bodyApiUrlConfig,
  keyToChineseConfig,
  valueToChineseConfig,
} from "@/assets/js/apis/body-api.js";
import { personListModuleBody } from "@/assets/js/apis/mockModule/body-tech/person.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg1.png";
import people from "@/static/newui/people.png";

/* 行人检测 */
export default {
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      people,
      bgPic,
      headDescs: ["检测图像中的行人数量及位置"],
      aiIntro: "检测图像中的行人数量及位置",
      bodyApiUrlConfig,
      bodyTypeConfig,
      // 不显示hide：true的tab
      demotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestBodyApi,
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: bodyApiUrlConfig.requestBodyApi,
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
        x: "x",
        y: "y",
        width: "宽",
        height: "高",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        age: "年龄",
        backpack: "背包",
        downclothing: "下身",
        glasses: "眼镜",
        gneder: "性别",
        handbag: "手提包",
        hat: "帽子",
        orientation: "朝向",
        shoulderbag: "挎包",
        upclothing: "上身",
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
      keyToChineseConfig,
      restoreTopToggle: false,
      listMaxvision: [],
      activeTabName: "0",
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "w",
        height: "h",
        rotation: "rotation",
      },
      maxvisionResultKey: "data",
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
      switch(this.activeTabName) {
        case '0':
          return {
            errorInfo: this.maxvisionErrorInfo,
            tipInfo: this.maxvisionTipInfo,
            num: this.listMaxvision && this.listMaxvision.length
          }
        case '1':
          return {
            errorInfo: this.baiduErrorInfo,
            tipInfo: this.baiduTipInfo,
            num: this.locationBaidu && this.locationBaidu.length
          }
        case '2':
          return {
            errorInfo: this.tencentErrorInfo,
            tipInfo: this.tencentErrorInfo,
            num: this.locationTencent && this.locationTencent.length
          }
      }
    }
  },
  methods: {
    initData() {
      // 识别样图设置
      this.demotabList[0].samples = personListModuleBody;
    },
    initFirstDetectInfo() {
      if (this.listMaxvision && this.listMaxvision.length > 0) {
        this.detectInfo = this.listMaxvision[0];
      }
      if (Array.isArray(this.jsonBaidu)) {
        this.detectInfoBaidu = this.jsonBaidu[0]
          ? this.jsonBaidu[0].attributes
          : {};
      }
      if (Array.isArray(this.jsonTencent)) {
        this.detectInfoTencent = this.jsonTencent[0]
          ? this.jsonTencent[0].BodyAttributeInfo
          : {};
      }
    },
    dataProcessMaxvision(list) {
      if (!Array.isArray(list)) return;
      this.listMaxvision = list;
    },
    dataProcessBaidu(list) {
      if (!Array.isArray(list)) return;
      this.locationBaidu = list.map((item) => item.location);
      this.locationBaidu.forEach((item) => {
        item.x = item.left;
        item.y = item.top;
      });
    },
    dataProcessTencent(list) {
      if (!Array.isArray(list)) return;
      this.locationTencent = list.map((item) => item.BodyRect);
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function")
        clipCbk([this.listMaxvision, this.locationBaidu, this.locationTencent]);
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
        drawCanvasRectCbk(this.listMaxvision);
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.clipImagesTencent = [];
      this.restoreTopToggle = !this.restoreTopToggle;
      this.listMaxvision = [];
    },
    handleDetectListClick(item, index) {
      this.detectInfo = this.listMaxvision[index];
    },
    handleDetectListClickBaidu(item, index) {
      this.detectInfoBaidu = this.jsonBaidu[index].attributes;
    },
    handleDetectListClickTencent(item, index) {
      this.detectInfoTencent = this.jsonTencent[index].BodyAttributeInfo;
    },
    getActiveIndex(activeTabName) {
      this.activeTabName = activeTabName;
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.person-detect {
  font-size: 16px;
  .pcount {
    text-align: center;
  }
  .req-title {
    margin-right: 6%;
    color: #858585;
  }
  .req-val {
    font-size: 100px;
    color: rgb(247, 54, 54);
    line-height: 0.8;
  }
  .lp-wrap {
    height: 100%;
    overflow: auto;
  }
  .detect-item {
    line-height: 2;
    display: flex;
    & > span {
      &:first-child {
        margin-right: 30px;
        width: 100px;
        display: inline-block;
        background: #e6fffb;
        text-align: right;
        flex-shrink: 0;
      }
    }
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