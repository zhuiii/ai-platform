<template>
  <ocr-demo-layout 
    class="body-basic" 
    :bg="bgPic"
    :title="aiName"
    :descs="headDescs"
  >
    <OcrDemo
      slot="left"
      :uploadUrl="host + bodyApiUrlConfig.requestBodyApi"
      :ocrType="bodyTypeConfig.basic"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="demotabList"
      imgSelectSrcKey="src"
      :apiFn="requestBodyApi"
      :requestConfig="requestConfig"
      :isDrawCanvasRect="true"
      :isNeedClipImages="true"
      :drawRectKeyConfig="drawRectKeyConfig"
      :rectRandomColor="true"
      :isCanvas="false"
      :clickable="true"
      :keyCN="maxvisionKeyCN"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
    </OcrDemo>
    <AlgorithmCompare
      class="ac-wrap__thumb-list"
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :isCustom="true"
      :showTabs="compareList && compareList.length > 0"
      @getActiveIndex="getActiveIndex"
      :tabsToggleReset="tabsToggleReset"
    >
      <div class="ditem" v-if="activeTabName == 0">
        <OcrResult
          class="ocr-result__thumb-list"
          :errorInfo="maxvisionErrorInfo"
          :tipInfo="maxvisionTipInfo"
        >
          <ThumbCarousel
            :list="clipImagesMaxvision"
            @handleClick="handleThumbCarouselItemClick"
          ></ThumbCarousel>
          <el-scrollbar class="lkv-scroll">
            <ListKeyValue
              :info="detectInfo"
              :valKeyConfig="maxvisionKeyCN"
              dataKey="attributeName"
            ></ListKeyValue>
          </el-scrollbar>
        </OcrResult>
      </div>
      <div class="ditem" v-else-if="activeTabName == 1">
        <OcrResult
          class="ocr-result__thumb-list"
          :errorInfo="baiduErrorInfo"
          :tipInfo="baiduTipInfo"
        >
          <ThumbCarousel
            :list="clipImagesBaidu"
            @handleClick="handleThumbCarouselItemClickBaidu"
          ></ThumbCarousel>
          <el-scrollbar class="lkv-scroll">
            <ListKeyValue
              :info="detectInfoBaidu"
              :valKeyConfig="keyToChineseConfig"
              dataKey="name"
            ></ListKeyValue>
          </el-scrollbar>
        </OcrResult>
      </div>
      <div class="ditem" v-else-if="activeTabName == 2">
        <OcrResult
          class="ocr-result__thumb-list"
          :errorInfo="tencentErrorInfo"
          :tipInfo="tencentTipInfo"
        >
          <ThumbCarousel
            :list="clipImagesTencent"
            @handleClick="handleThumbCarouselItemClickTencent"
          ></ThumbCarousel>
          <el-scrollbar class="lkv-scroll">
            <ListKeyValue
              :info="detectInfoTencent"
              :valKeyConfig="tencentKeyCN"
              dataKey="Type"
            ></ListKeyValue>
          </el-scrollbar>
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
import { samplesBodyBasic } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import bgPic from "@/static/banner/bg3.png";

/* 通用人体属性检测 */
export default {
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["从头部、躯干、腿部、行为、整体五个角度分析人体属性"],
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
        downclothing: "下身服饰",
        // glasses: "眼镜",
        gneder: "性别",
        handbag: "手提包",
        // hat: "帽子",
        orientation: "朝向",
        shoulderbag: "挎包",
        upclothing: "上身服饰",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        Age: "年龄",
        Bag: "背包",
        Gender: "性别",
        LowerBodyCloth: "下身服饰",
        UpperBodyCloth: "上身服饰",
        Orientation: "朝向",
      },
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
      maxvisionResultKey: "data",
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "width",
        height: "height",
        rotation: "rotation",
      }
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
      this.demotabList[0].samples = samplesBodyBasic;
    },
    initFirstDetectInfo() {
      if (this.listMaxvision && this.listMaxvision.length > 0) {
        this.detectInfo = this.listMaxvision[0];
      }
      if (this.jsonBaidu) {
        this.detectInfoBaidu = this.jsonBaidu[0]
          ? this.jsonBaidu[0].attributes
          : {};
      }
      if (this.jsonTencent) {
        this.detectInfoTencent = this.jsonTencent[0]
          ? this.jsonTencent[0].BodyAttributeInfo
          : {};
        if (this.detectInfoTencent.LowerBodyCloth) {
          this.detectInfoTencent.LowerBodyCloth = this.detectInfoTencent.LowerBodyCloth.Type.Type;
        }
        if (this.detectInfoTencent.UpperBodyCloth) {
          this.detectInfoTencent.UpperBodyCloth = this.detectInfoTencent.UpperBodyCloth.Sleeve.Type;
        }
      }
    },
    dataProcessMaxvision({ personAttributes = [], personCount = 0 } = {}) {
      if (!Array.isArray(personAttributes)) return;
      this.listMaxvision = personAttributes;
      let obj;
      this.locationMaxvision = personAttributes.map((item) => {
        obj = {};
        Object.keys(item).forEach((k) => {
          if (k === "position") {
            obj.x = item[k].x;
            obj.y = item[k].y;
            obj.width = item[k].width;
            obj.height = item[k].height;
          } else {
            obj[k] = item[k].attributeName;
          }
        });
        return obj;
      });
      console.log("this.locationMaxvision");
      console.log(this.locationMaxvision);
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
        const [
          clipImagesMaxvision = [],
          clipImagesBaidu = [],
          clipImagesTencent = [],
        ] = clipCbk([
          this.locationMaxvision,
          this.locationBaidu,
          this.locationTencent,
        ]);
        this.clipImagesMaxvision = clipImagesMaxvision;
        this.clipImagesBaidu = clipImagesBaidu;
        this.clipImagesTencent = clipImagesTencent;
        this.initFirstDetectInfo();
      }
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
      this.listMaxvision = [];
      this.detectInfo = {};
      this.detectInfoBaidu = {};
      this.detectInfoTencent = {};
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
    handleThumbCarouselItemClick(item, index) {
      this.detectInfo = this.listMaxvision[index];
    },
    handleThumbCarouselItemClickBaidu(item, index) {
      this.detectInfoBaidu = this.jsonBaidu[index].attributes;
    },
    handleThumbCarouselItemClickTencent(item, index) {
      this.detectInfoTencent = this.jsonTencent[index].BodyAttributeInfo;
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
  .req-title {
    margin-right: 6%;
  }
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
    // & > span {
      // &:first-child {
      //   margin-right: 30px;
      //   width: 100px;
      //   display: inline-block;
      //   // background: #e6fffb;
      //   text-align: right;
      //   flex-shrink: 0;
      // }
    // }
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