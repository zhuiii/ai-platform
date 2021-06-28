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
            :score="score"
            :showScore="showScore"
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
        :tabsToggleReset="tabsToggleReset"
      >
      </AlgorithmCompare>
    </ocr-demo-layout>
  </div>
</template>

<script>
import {
  requestBodyContrastApi,
  bodyApiUrlConfig,
  bodyTypeConfig,
} from "@/assets/js/apis/body-api.js";
import { readBlobAsDataURL, imgToFile, getBlob } from "@/assets/js/utils.js";
import { samplesBodyRepeat } from "@/assets/js/apis/mockData.js";
import MixinCompoPraise from "@/assets/mixin/mixin-compo-praise.js";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

import bgPic from "@/static/banner/banner-face.png";
/* 行人重识别 */
export default {
  mixins: [MixinCompoPraise, MixinDemoPage, MixinFunDemo],
  data() {
    return {
      bgPic,
      headDescs: ["同一个人跨镜识别"],
      aiIntro: "同一个人跨镜识别",
      scanLoading: false,
      drawImgSrcLeft: "",
      drawImgSrcRight: "",
      tabList: [
        {
          label: "",
          hide: true,
          samples: samplesBodyRepeat,
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
      score: 0,
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
    };
  },
  methods: {
    dataProcessMaxvision(list) {
      if (!Array.isArray(list) || !list[0]) {
        // this.toggleResetLeft = !this.toggleResetLeft;
        // this.toggleResetRight = !this.toggleResetRight;
        return;
      }
      this.showScore = true;
      const oneObj = list[0];
      this.ocrResultData = oneObj;
      const rightPicPositions = list.map((item) => {
        if (item.similarity === "是同一个人") {
          item.picSecondPosition.color = "#4fff00";
        }
        return item.picSecondPosition;
      });
      this.$refs.contrastRef.drawRect(0, {
        ...oneObj.picFirstPosition,
      });
      rightPicPositions.forEach((rpos) => {
        this.$refs.contrastRef.drawRect(1, {
          ...rpos,
        });
      });
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
          type: bodyTypeConfig.bodyRecognition,
        })
          .then((res) => {
            this.handleOcrSuccess(res);
          })
          .catch((err) => {
            console.log(err);
            // this.$message.error(err.msg || "异常，请稍后重试");
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
      const firstSampleList = samplesBodyRepeat[0]
        ? samplesBodyRepeat[0].list
        : [];
      this.handleSampleSelect({
        apiType: 1,
        list: firstSampleList,
      });
    },
    clearOcrResultInMixin(clearSrc) {
      this.score = 0;
      this.probability = "";
      this.showCompareCompo = false;
      this.showScore = false;
      this.toggleResetLeft = !this.toggleResetLeft;
      this.toggleResetRight = !this.toggleResetRight;
      if (clearSrc) {
        this.drawImgSrcLeft = "";
        this.drawImgSrcRight = "";
      }
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
</style>