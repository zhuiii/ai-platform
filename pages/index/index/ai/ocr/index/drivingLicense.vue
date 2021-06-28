<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap">
        <div class="flex-center">
          <h2 class="title">功能演示</h2>
        </div>
        <OcrDemo
          :uploadUrl="host + ocrApiUrl.requestOcrApi"
          :ocrType="ocrTypeConfig.drivingLicense"
          tabKey="side"
          :isShowOcrJsonResult="true"
          :tabList="ocrDemotabList"
          imgSelectSrcKey="src"
          :apiFn="requestOcrApi"
          :requestConfig="ocrRequestConfig"
          @ocrSuccess="handleOcrSuccess"
          @clearResult="clearOcrResult"
        >
          <template slot="result">
            <div class="g-flex" v-for="(key, index) in ocrResultKeys" :key="`ok${index}`">
              <span class="req-title">{{ key }}</span>
              <span class="req-val">{{ ocrResultData[key] && ocrResultData[key].words }}</span>
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
import {
  requestOcrApi,
  ocrTypeConfig,
  ocrApiUrl,
  bankcardTypeConfig,
} from "@/assets/js/apis/ocr-api.js";
import OcrDemo from "@/components/OcrDemo/index.vue";
import {
  ocrSamplesDrivingLicense,
} from "@/assets/js/apis/mockData.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";

export default {
  components: {
    OcrDemo
  },
  mixins: [MixinFunDemo],
  data() {
    return {
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
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {
        Name: "姓名",
        Sex: "性别",
        Nationality: "国籍",
        Address: "住址",
        CardCode: "证号",
        DateOfBirth: "出生日期",
        DateOfFirstIssue: "初次领证日期",
        Sclass: "准驾车型",
        StartDate: "有效期限",
        EndDate: "至",
      },
      // 自定义获取百度数据key，覆盖mixin
      baiduResultKey: 'words_result',
      // 百度-返回是否中文key，覆盖mixin
      baiduIsChineseKey: true,
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
      this.ocrDemotabList[0].samples = ocrSamplesDrivingLicense;
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  },
};
</script>

<style lang='less' scoped>
@import "~assets/less/page/ocr/common.less";
.ocr-wrap{
.price-list {
  .price-item {
    width: 250px;
    &:not(:last-child) {
      border-right: 1px solid #eeeeee;
      margin-right: 50px;
    }
  }
}
.req-title{
  margin-right: 6%;
}
.req-val{
  width: 75%;
}
}
</style>
