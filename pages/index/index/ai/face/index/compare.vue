<template>
  <div class="face-ccontrast">
    <ocr-demo-layout 
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
      <div class="g-border img-wrap" slot="left">
        <div class="img-wrap-cont">
          <BorderCorner></BorderCorner>
          <Contrast
            ref="contrastRef"
            :scanLoading="scanLoading"
            :drawImgSrcLeft="drawImgSrcLeft"
            :drawImgSrcRight="drawImgSrcRight"
            uploadWidth="314px"
            canvasHeight="393px"
            :score="0"
            :showScore="false"
            :probability="probability"
            :toggleResetLeft="toggleResetLeft"
            :toggleResetRight="toggleResetRight"
            @handleRequest="handleRequest"
            @setDrawImgSrc="setDrawImgSrc"
          ></Contrast>
        </div>
        <PureImgList
          class="g-mg-t-sm"
          ref="pureImgListRef"
          :list="imgSelectList"
          srcKey="src"
          @handleClick="handleSampleSelect"
        ></PureImgList>
      </div>
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
        <OcrResult
          :errorInfo="maxvisionErrorInfo"
          :tipInfo="maxvisionTipInfo"
          v-if="activeTabIndex == 0"
        >
          <SingleNumer
            label="比对分数"
            :count="score"
            v-if="score !== -1"
          ></SingleNumer>
        </OcrResult>
        <OcrResult
          :errorInfo="baiduErrorInfo"
          :tipInfo="baiduTipInfo"
          v-if="activeTabIndex == 1"
        >
          <SingleNumer
            label="比对分数"
            :count="scoreBaidu"
            v-if="scoreBaidu !== -1"
          ></SingleNumer>
        </OcrResult>
        <OcrResult
          :errorInfo="tencentErrorInfo"
          :tipInfo="tencentTipInfo"
          v-if="activeTabIndex == 2"
        >
          <SingleNumer
            label="比对分数"
            :count="scoreTencent"
            v-if="scoreTencent !== -1"
          ></SingleNumer>
        </OcrResult>
      </AlgorithmCompare>
    </ocr-demo-layout>
  </div>
</template>

<script>
import {
  requestBodyContrastApi,
  bodyApiUrlConfig,
} from "@/assets/js/apis/body-api.js";
import { faceTypeConfig } from "@/assets/js/apis/face-api.js";
import { readBlobAsDataURL, imgToFile, getBlob } from "@/assets/js/utils.js";
import { contrastListModuleFace } from "@/assets/js/apis/mockModule/face-tech/compare.js";
import MixinCompoPraise from "@/assets/mixin/mixin-compo-praise.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/banner-face.png";

/* 人脸比对 */
export default {
  mixins: [MixinCompoPraise, MixinDemoPage, MixinFunDemo],
  data() {
    return {
      bgPic,
      headDescs: ["提取人脸图像的特征；比对两个人脸特征的相似度；"],
      aiIntro:
        "提取人脸图像的特征；比对两个人脸特征的相似度；比对分数范围[0, 10]，分数越高，人脸相似度越高",
      scanLoading: false,
      drawImgSrcLeft: "",
      drawImgSrcRight: "",
      tabList: [
        {
          label: "",
          hide: true,
          samples: contrastListModuleFace,
        },
      ],
      imgSelectList: [],
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: bodyApiUrlConfig.requestContrastApi,
        header: "none",
      },
      // 盛视结果
      ocrResponse: {},
      probability: "",
      showCompareCompo: false,
      keyCN: {
        score: "得分",
        scoreCN: "相似度",
      },
      maxvisionKeyCN: {
        compareValue: "比较值",
        similarity: "相似度",
      },
      toggleResetLeft: false,
      toggleResetRight: false,
      maxvisionResultKey: "data",
      showScore: false,
      score: -1,
      scoreBaidu: -1,
      scoreTencent: -1,
      activeTabIndex: 0,
    };
  },
  methods: {
    dataProcessMaxvision(data) {
      if (!data) {
        this.toggleResetLeft = !this.toggleResetLeft;
        this.toggleResetRight = !this.toggleResetRight;
        return;
      }
      const { minScore, positionList } = data;
      if (!positionList) return;
      const oneObj = positionList[0];
      if (!oneObj) return;
      this.showScore = true;
      this.score = minScore;
      oneObj.width = oneObj.w;
      oneObj.height = oneObj.h;
      this.ocrResultData = oneObj;
      const firstPos = oneObj.picFirstPosition;
      const secondPos = oneObj.picSecondPosition;
      this.$refs.contrastRef.drawRect(0, {
        x: firstPos.x,
        y: firstPos.y,
        width: firstPos.w,
        height: firstPos.h,
      });
      this.$refs.contrastRef.drawRect(1, {
        x: secondPos.x,
        y: secondPos.y,
        width: secondPos.w,
        height: secondPos.h,
      });
    },
    dataProcessBaidu(data) {
      if (!data) return;
      this.scoreBaidu = data.score;
    },
    dataProcessTencent(data) {
      if (!data) return;
      this.scoreTencent = data.Score;
    },
    // 发起请求
    handleRequest({ apiType, list }, cbk) {
      if (list && list.length < 2) return;
      this.clearOcrResult();
      const toFileListCbk = (fileList) => {
        this.scanLoading = true;
        requestBodyContrastApi({
          apiType,
          list: fileList,
          type: faceTypeConfig.compare,
        })
          .then((res) => {
            this.handleOcrSuccess(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.scanLoading = false;
            if (typeof cbk === "function") cbk();
          });
      };
      // toFileListCbk(list);
      this.toFileList(list, toFileListCbk);
    },
    // 样图点击，样图结构 {src:'缩略图地址', list: [图片路径]}
    handleSampleSelect({ list = [] }, cbk) {
      if (this.scanLoading) return;
      if (list.length < 2) throw new Error("length of sample list less than 2");
      this.clearOcrResultInMixin(true);
      const [srcLeft, srcRight] = list;
      this.drawImgSrcLeft = srcLeft;
      this.drawImgSrcRight = srcRight;
      this.handleRequest(
        {
          apiType: 1,
          list,
        },
        cbk
      );
    },
    // 图片路径数组转File数组
    toFileList(list, cbk) {
      if (!Array.isArray(list) || typeof cbk !== "function") return [];
      const fileOrigin = [],
        srcList = [];
      list.forEach((item) => {
        typeof item === "string" ? srcList.push(item) : fileOrigin.push(item);
      });
      if (srcList.length === 0) return cbk(list);
      const fileList = [];
      let count = 0;
      srcList.forEach((imgSrc) => {
        /* let img = document.createElement('img');
        img.src = imgSrc;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          count++;
          fileList.push(imgToFile(img));
          if (count === srcList.length) {
            cbk([...fileList, ...fileOrigin]);
          }
        }; */
        getBlob(imgSrc, (blob) => {
          count++;
          fileList.push(blob);
          if (count === srcList.length) {
            cbk([...fileList, ...fileOrigin]);
          }
        });
      });
    },
    // 上传时设置画布图片路径以显示图片
    setDrawImgSrc(leftOrRight, src) {
      this.pureImgListStatusRemove();
      // 判断是否File
      if (src instanceof File) {
        readBlobAsDataURL(src, (dataUrl) => {
          leftOrRight === "left"
            ? (this.drawImgSrcLeft = dataUrl)
            : (this.drawImgSrcRight = dataUrl);
        });
      } else {
        leftOrRight === "left"
          ? (this.drawImgSrcLeft = src)
          : (this.drawImgSrcRight = src);
      }
    },
    // 清除图片列表激活状态
    pureImgListStatusRemove() {
      this.$refs.pureImgListRef.removeStatus();
    },
    getProbabilityByScore(score) {
      if (score > 100 || score < 0) return "";
      if (score < 10) return "极低";
      if (score >= 10 && score < 20) return "非常低";
      if (score >= 20 && score < 30) return "很低";
      if (score >= 30 && score < 40) return "较低";
      if (score >= 40 && score < 50) return "低";
      if (score >= 50 && score < 60) return "高";
      if (score >= 60 && score < 70) return "较高";
      if (score >= 70 && score < 80) return "很高";
      if (score >= 80 && score < 90) return "非常高";
      if (score >= 90 && score <= 100) return "极高";
    },
    initData() {
      this.imgSelectList = this.tabList[0].samples;
      // 默认识别第一项样图
      const firstSampleList = contrastListModuleFace[0]
        ? contrastListModuleFace[0].list
        : [];
      this.handleSampleSelect({
        apiType: 1,
        list: firstSampleList,
      });
    },
    clearOcrResultInMixin(clearSrc) {
      this.score = this.scoreBaidu = this.scoreTencent = -1;
      this.probability = "";
      this.showCompareCompo = false;
      this.showScore = false;
      if (clearSrc) {
        this.drawImgSrcLeft = "";
        this.drawImgSrcRight = "";
      }
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
    },
  },
  created() {},
  mounted() {
    this.initData();
  },
};
</script>
<style scoped lang='less'>
.face-contrast {
}
.img-wrap {
  padding: 30px;
}
.img-wrap-cont {
  position: relative;
  overflow: hidden;
}
/deep/ .ac-wrap {
  height: 100% !important;
}

/deep/ .count-val {
  font-size: 40px !important;
}
</style>