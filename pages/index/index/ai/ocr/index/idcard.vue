<template>
  <ocr-demo-layout
    class="idcard-ocr"
    :bg="bgPic"
    :title="aiName"
    :descs="headDescs"
  >
    <ProdIntro slot="intro" :desc="aiIntro"></ProdIntro>
    <OcrDemo
      slot="left"
      :uploadUrl="host + ocrApiUrl.requestOcrApi"
      :ocrType="ocrTypeConfig.idcard"
      tabKey="side"
      :isShowOcrJsonResult="true"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestOcrApi"
      :isDrawLineFrame="true"
      :requestConfig="ocrRequestConfig"
      :keyCN="maxvisionKeyCN"
      @ocrSuccess="handleOcrSuccess"
      @clearResult="clearOcrResult"
    >
    <template slot="result">
        <div
          class="g-flex"
          v-for="(key, index) in ocrResultKeys"
          :key="`ok${index}`"
        >
          <span class="req-title">{{ key }}</span>
          <span class="req-val">{{
            ocrResultData[key] && ocrResultData[key].words
          }}</span>
        </div>
      </template>
    </OcrDemo>
    <AlgorithmCompare
      slot="right"
      :times="returnTimes"
      :list="compareList"
      :showCompareCompo="showCompareCompo"
      :showTabs="compareList && compareList.length > 0"
      :tabsToggleReset="tabsToggleReset"
    >
    </AlgorithmCompare>
  </ocr-demo-layout>
</template>

<script>
import OcrDemo from "@/components/OcrDemo/index.vue";
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
} from "@/assets/js/apis/ocr-api.js";
import { idcardList } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/bg3.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

export default {
  components: {
    OcrDemo,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["识别身份证信息"],
      aiIntro: "从车头、车身、行为、整体四个角度分析车辆属性",
      ocrApiUrl,
      ocrTypeConfig,
      ocrDemotabList: [
        {
          label: "",
          side: "front",
          samples: [],
        },
      ],
      // ocrDemotabList: [
      //   {
      //     label: "正面",
      //     side: "front",
      //     samples: [],
      //     maxvisionKeyCN: {
      //       Name: "姓名",
      //       Nation: "民族",
      //       Birth: "出生年月",
      //       Address: "地址",
      //       IdNum: "身份证号",
      //       Sex: "性别",
      //     },
      //     baiduKeyCN: {
      //       name: "姓名",
      //       nation: "民族",
      //       birthDay: "出生年月",
      //       address: "地址",
      //       idCard: "身份证号",
      //       sex: "性别",
      //     },
      //     tencentKeyCN: {
      //       Name: "姓名",
      //       Nation: "民族",
      //       Birth: "出生年月",
      //       Address: "地址",
      //       IdNum: "身份证号",
      //       Sex: "性别",
      //     },
      //   },
      //   {
      //     label: "国徽面",
      //     side: "back",
      //     samples: [],
      //     maxvisionKeyCN: {},
      //     baiduKeyCN: {
      //       expirationDate: "失效日期",
      //       issueDate: "签发日期",
      //       issueOrganization: "签发机关",
      //     },
      //     tencentKeyCN: {
      //       Authority: "签发机关",
      //       ValidDate: "有效期",
      //     },
      //   },
      // ],
      requestOcrApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: ocrApiUrl.requestOcrApi,
        header: "none",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        fullName: "姓名",
        sex: "性别",
        birthday: "出生日期",
        idNumber: "身份证号",
        address: "地址",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      baiduResultKey: "words_result",
      baiduIsChineseKey: true,
      listMaxvision: [],
      activeTabsIndex: 0,
      detectInfo: null,
    };
  },
  // async fetch({ app: {$axios} }) {
  //   try{
  //     const {methods: {requestUseTypeApiFn}} = this
  //     const {data: usetypesReturn = []} = await Function.prototype.call(this, requestUseTypeApiFn)
  //     // const {data: usetypesReturn = []} = await requestUseTypeApiFn()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // },
  methods: {
    handleProductClick(product) {},
    initData() {
      this.ocrDemotabList[0].samples = idcardList;
      // this.handleTabChange(0);
      // this.ocrDemotabList[0].samples = idcardList;
      // this.ocrDemotabList[1].samples = idcardBackList;
    },
    handleTabChange(index) {
      const { maxvisionKeyCN, baiduKeyCN, tencentKeyCN } =
        this.ocrDemotabList[index];
      this.maxvisionKeyCN = maxvisionKeyCN;
      this.tencentKeyCN = tencentKeyCN;
    },
    handleRectItemClick(idx) {
      console.log("handleRectItemClick");
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
.ocr-wrap {
  .req-title {
    width: 30%;
  }
}
</style>
