<template>
  <ocr-demo-layout 
    class="passport-wrap" 
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
      :ocrType="ocrTypeConfig.passport"
      tabKey="side"
      :isShowOcrJsonResult="false"
      :tabList="ocrDemotabList"
      imgSelectSrcKey="src"
      :apiFn="requestOcrApi"
      :requestConfig="ocrRequestConfig"
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
import AlgorithmCompare from "@/components/OcrDemo/AlgorithmCompare.vue";
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
} from "@/assets/js/apis/ocr-api.js";
import { ocrSamplesPassport } from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
import bgPic from "@/static/banner/banner-image.png";
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

/* 护照识别 */
export default {
  components: {
    OcrDemo,
    AlgorithmCompare,
  },
  mixins: [MixinFunDemo, MixinDemoPage],
  data() {
    return {
      bgPic,
      headDescs: ["全页式识别符合ICAO-9303标准的证件上的所有文字信息"],
      aiIntro: '全页式识别符合ICAO-9303标准的证件上的所有文字信息',
      applyCont: {},
      ocrApiUrl,
      ocrTypeConfig,
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
      /* 
      （en是英文字段，na是中文字段）
"MRZ1": "POCHNZHANG<<WEICHENG<<<<<<<<<<<<<<<<<<<<<<<<",         国籍码
 "MRZ2": "GP82442685CHN8303246F2810087NFMCMOKKLDMJA968",        防伪码
      "cardId": "GP8244268",                                    护照号码
  "certificateType": "P",  									证件类型
      "countryCode": "CHN",      							 国家码
									
      "enAuthority": "MPS Exit & Entry Administration",     签发机关
      "enBirthday": "1983-03-24",                          出生日期
      "enDateOfexpiry": "2028-10-08",                      有效期
      "enDateOfissue": "2018-10-09",                        签发日期
      "enName": "ZHANG WEICHENG",                            姓名
      "enNationality": "CHINESE",                         国籍
      "enPlaceOfbirth": "",                               出生地点
      "enPlaceOfissue": "辽宁",                            签发地点
      "enSex": "女",                                       性别
      "msg": "",                                          
      "naAuthority": "公安部出入境管理局",               签发机关
      "naBirthday": "1983-03-24",                        。。。。。。
      "naDateOfexpiry": "2028-10-08",
      "naDateOfissue": "2018-10-09",
      "naName": "护腿",
      "naNationality": "中国",
      "naPlaceOfbirth": "",
      "naPlaceOfissue": "LIAONING"

      */
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        mrz1: "MRZCode1",
        mrz2: "MRZCode2",
        cardId: "护照号码",
        certificateType: "证件类型",
        countryCode: "国家码",
        naName: "姓名",
        enName: "Name",
        enSex: "性别",
        naNationality: "国籍",
        enNationality: "Nationality",
        naBirthday: "出生日期",
        naPlaceOfbirth: "出生地点",
        enPlaceOfbirth: "Place of birth",
        enPlaceOfissue: "签发地点",
        naPlaceOfissue: "Place of issue",
        naAuthority: "签发机关",
        enAuthority: "Authority",
        enDateOfissue: "签发日期",
        enDateOfexpiry: "有效期至",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: null,
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        DateOfBirth: "出生日期",
        DateOfExpiration: "有效期至",
        ID: "护照号码",
        IssuingCountry: "国家码",
        Name: "姓名拼音",
        Nationality: "国籍",
        Sex: "性别",
      },
      maxvisionResultKey: "data",
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
    initData() {
      this.ocrDemotabList[0].samples = ocrSamplesPassport;
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
</style>
