<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap">
        <h2 class="title">功能演示</h2>
        <OcrDemo
          :uploadUrl="host + ocrApiUrl.requestOcrApi"
          :ocrType="ocrTypeConfig.idcard"
          tabKey="side"
          :isShowOcrJsonResult="true"
          :tabList="ocrDemotabList"
          imgSelectSrcKey="src"
          :apiFn="requestOcrApi"
          :requestConfig="ocrRequestConfig"
          @ocrSuccess="handleOcrSuccess"
          @clearResult="clearOcrResult"
          @handleTabChange="handleTabChange"
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
      </div>
      <AlgorithmCompare
        :times="returnTimes"
        :list="compareList"
        :showCompareCompo="showCompareCompo"
      >
      </AlgorithmCompare>
    </div>
  </div>
</template>

<script>
import MyButtonCyber from "@/components/MyButton/MyButtonCyber.vue";
import OcrDemo from "@/components/OcrDemo/index.vue";
import AlgorithmCompare from "@/components/OcrDemo/AlgorithmCompare.vue";
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
} from "@/assets/js/apis/ocr-api.js";
import { idcardList, idcardBackList } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

export default {
  components: {
    OcrDemo,
    MyButtonCyber,
    AlgorithmCompare,
  },
  mixins: [MixinFunDemo],
  data() {
    return {
      applyCont: {},
      ocrApiUrl,
      ocrTypeConfig,
      ocrDemotabList: [
        {
          label: "正面",
          side: "front",
          samples: [],
          maxvisionKeyCN: {},
          baiduKeyCN: {
            name: "姓名",
            nation: "民族",
            birthDay: "出生年月",
            address: "地址",
            idCard: "身份证号",
            sex: "性别",
          },
          tencentKeyCN: {
            Name: "姓名",
            Nation: "民族",
            Birth: "出生年月",
            Address: "地址",
            IdNum: "身份证号",
            Sex: "性别",
          },
        },
        {
          label: "国徽面",
          side: "back",
          samples: [],
          maxvisionKeyCN: {},
          baiduKeyCN: {
            expirationDate: "失效日期",
            issueDate: "签发日期",
            issueOrganization: "签发机关",
          },
          tencentKeyCN: {
            Authority: "签发机关",
            ValidDate: "有效期",
          },
        },
      ],
      requestOcrApi,
      ocrRequestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: ocrApiUrl.requestOcrApi,
        header: "none",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      baiduResultKey: "words_result",
      baiduIsChineseKey: true,
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
    handleProductClick(product) {
    },
    initData() {
      this.handleTabChange(0);
      this.ocrDemotabList[0].samples = idcardList;
      this.ocrDemotabList[1].samples = idcardBackList;
    },
    handleTabChange(index) {
      const {maxvisionKeyCN, baiduKeyCN, tencentKeyCN} = this.ocrDemotabList[index];
      this.maxvisionKeyCN = maxvisionKeyCN;
      this.tencentKeyCN = tencentKeyCN;
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
