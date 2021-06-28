<template>
  <ocr-demo-layout 
    class="plate-license" 
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
      :uploadUrl="host + ocrApiUrl.requestOcrApi"
      :ocrType="ocrTypeConfig.plateLicense"
      tabKey="side"
      :isShowOcrJsonResult="true"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestOcrApi"
      :requestConfig="ocrRequestConfig"
      :isDrawCanvasRect="true"
      :isCanvas="false"
      :clickable="true"
      :keyCN="maxvisionKeyCN"
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
      @getActiveIndex="getActiveIndex"
      :tabsToggleReset="tabsToggleReset"
    >
      <div class="ditem" v-show="activeTabName == 0">
        <OcrResult :errorInfo="maxvisionErrorInfo" :tipInfo="maxvisionTipInfo">
          <!-- <ThumbCarousel
            :list="clipImagesMaxvision"
            @handleClick="handleThumbCarouselItemClick"
          ></ThumbCarousel> -->
          <template v-if="listMaxvision.length">
            <el-scrollbar class="lkv-scroll">
              <ListKeyValue
                v-for="(itm, idx) in listMaxvision"
                :key="idx"
                :info="itm"
                :valKeyConfig="maxvisionKeyCN"
                dataKey=""
              ></ListKeyValue>
            </el-scrollbar>
          </template>
        </OcrResult>
      </div>
      <div class="ditem" v-show="activeTabName == 1">
        <OcrResult :errorInfo="baiduErrorInfo" :tipInfo="baiduTipInfo">
          <!-- <ThumbCarousel
            :list="clipImagesBaidu"
            @handleClick="handleThumbCarouselItemClickBaidu"
          ></ThumbCarousel> -->
          <el-scrollbar class="lkv-scroll">
            <ListKeyValue
              :info="jsonBaidu"
              :valKeyConfig="baiduKeyCN"
              dataKey="name"
            ></ListKeyValue>
          </el-scrollbar>
        </OcrResult>
      </div>
      <div class="ditem" v-show="activeTabName == 2">
        <OcrResult :errorInfo="tencentErrorInfo" :tipInfo="tencentTipInfo">
          <el-scrollbar class="lkv-scroll">
            <ListKeyValue
              :info="jsonTencent"
              :valKeyConfig="tencentKeyCN"
              dataKey=""
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
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
  bankcardTypeConfig,
} from "@/assets/js/apis/ocr-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import { ocrSamplesPlateLicense } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/banner-image.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

const plateColorFilterFn = function (val) {
  const map = {
    blue: "蓝色",
    green: "绿色",
    white: "白色",
  };
  return map[val] || "";
};

/* 车牌识别 */
export default {
  components: {
    OcrDemo,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  filters: {
    // 车牌颜色过滤
    plateColorFilter: plateColorFilterFn,
  },
  data() {
    return {
      bgPic,
      headDescs: ["识别内地所有类型车牌号码、港澳两/三地牌、与中国交界的14国车牌：朝鲜、蒙古、俄罗斯、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、阿富汗、巴基斯坦、印度、尼泊尔、不丹、缅甸、老挝、越南"],
      aiIntro: "识别内地所有类型车牌号码、港澳两/三地牌、与中国交界的14国车牌：朝鲜、蒙古、俄罗斯、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、阿富汗、巴基斯坦、印度、尼泊尔、不丹、缅甸、老挝、越南",
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
      bankcardTypeConfig,
      // 坐标点数组
      coordinates: [],
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        plateText: "车牌号",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {
        number: "车牌号",
      },
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        Number: "车牌号",
      },
      // 自定义获取百度数据key，覆盖mixin
      maxvisionResultKey: "data",
      baiduResultKey: "words_result",
      clipImagesMaxvision: [],
      clipImagesBaidu: [],
      clipImagesTencent: [],
      detectInfo: {},
      detectInfoBaidu: {},
      detectInfoTencent: {},
      locationBaidu: [],
      listMaxvision: [],
      activeTabName: 0,
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
      this.ocrDemotabList[0].samples = ocrSamplesPlateLicense;
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
    dataProcessMaxvision(list = []) {
      if (!Array.isArray(list)) return;
      this.listMaxvision = list.map((item) => {
        if (item.objectBoxPos) {
          const { left, top, width, height } = item.objectBoxPos;
          return {
            x: left,
            y: top,
            width: width,
            height: height,
            plateText: item.plateText,
          };
        }
      });
    },
    dataProcessBaidu(data) {
      if (!data) return;
      if (data.color) {
        data.color = plateColorFilterFn(data.color);
      }
      const tloca = data.vertexes_location;
      if (tloca && tloca.length) {
        const dot1 = tloca[0];
        const dot2 = tloca[1];
        const dot3 = tloca[2];
        const w = dot2.x - dot1.x;
        const h = dot3.y - dot1.y;
        this.locationBaidu.push({
          x: dot1.x,
          y: dot1.y,
          width: w,
          height: h,
        });
      }
    },
    dataProcessTencent(data) {
      if (!data) return;
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
      if (typeof clipCbk === "function") {
        const [clipImagesMaxvision = [], clipImagesBaidu = []] = clipCbk([
          this.listMaxvision,
          this.locationBaidu,
        ]);
        this.clipImagesMaxvision = clipImagesMaxvision;
        this.clipImagesBaidu = clipImagesBaidu;
        this.initFirstDetectInfo();
      }
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.listMaxvision = [];
      this.detectInfo = {};
      this.detectInfoBaidu = {};
      this.detectInfoTencent = {};
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
    handleThumbCarouselItemClickTencent(index) {
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

/deep/ .list-key-value {
  display: flex;
  justify-content: center;
}
</style>
