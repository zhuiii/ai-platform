<template>
  <div class="ocr-wrap">
    <div class="g-center">
      <!-- 功能演示 -->
      <div class="paddingTop special-wrap">
        <div class="flex-center">
          <h2 class="title">功能演示</h2>
        </div>
        <div class="g-mg-t-sm operate-wrap">
          <div class="input-title">
            <span class="input-title-label">请输入一段想分析的文本：</span>
            <span
              class="g-link g-link_underline input-title-random"
              @click="handleSamplesChange"
              >随机示例</span
            >
          </div>
          <div class="g-flex input-textarea">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textareaValue"
              maxlength="200"
              show-word-limit
              resize="none"
            >
            </el-input>
            <JsonCollapse
              ref="jsonCollapse"
              :isShowOcrJsonResult="false"
              :requestConfig="requestConfig"
              :ocrResponse="ocrResponse"
              width="50%"
              height="324px"
              itemMaxHeight="213px"
            >
            </JsonCollapse>
          </div>
          <div class="flex-center confirm-btn">
            <div class="g-btn-common" @click="handleConfirm">分析</div>
          </div>
        </div>
        <AlgorithmCompare
          dtitle="分析结果"
          :times="returnTimes"
          :list="[]"
          :showCompareCompo="showCompareCompo"
          :isCustom="true"
          transitionName=""
        >
          <DataDisplayItem
            :titleIndex="index"
            v-for="(item, index) in compareList"
            :key="index"
          >
            <TableCensor
              slot="cont"
              :isPass="item.spam === 0"
              :list="item.data"
            ></TableCensor>
          </DataDisplayItem>
        </AlgorithmCompare>
      </div>
    </div>
  </div>
</template>

<script>
import { getObjKeys } from "@/assets/js/utils.js";
import { samplesTextcensor } from "@/assets/js/apis/mockData.js";

/* 语言处理-文本审核 */
export default {
  data() {
    return {
      requestConfig: {
        params: 'content=""',
        method: "POST",
        url: "",
        header: "none",
      },
      ocrResponse: null,
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {},
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      baiduResultKey: "",
      tencentResultKey: "",
      textareaValue: "",
      sampleIndex: 0,
      showCompareCompo: false,
      returnTimes: [],
      dataMaxvision: {
        data: [],
        spam: 1,
      },
      dataBaidu: {
        data: [],
        spam: 1,
      },
      dataTencent: {
        data: [],
        spam: 1,
      },
      compareList: [],
      censorLabels: [
        "暴恐违禁",
        "文本色情",
        "政治敏感",
        "恶意推广",
        "低俗辱骂",
        "低质灌水",
      ],
      tempData: {
        pass: [
          {
            score: 0.000011599940080487,
            hit: [],
            label: 1,
          },
          {
            score: 0.00038947406574152,
            hit: [],
            label: 2,
          },
          {
            score: 0.0081489533185959,
            hit: [],
            label: 3,
          },
          {
            score: 0.00008104774315143,
            hit: [],
            label: 5,
          },
          {
            score: 0.0080000003799796,
            hit: [],
            label: 6,
          },
        ],
        reject: [
          {
            score: 1,
            hit: [],
            label: 4,
          },
        ],
        review: [],
        spam: 1,
      },
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
    initData() {},
    handleRequest() {
      this.myLoading.show();
      setTimeout(() => {
        this.returnTimes = [parseInt(Math.random()*100), parseInt(Math.random()*200), parseInt(Math.random()*300)];
        this.ocrResponse = this.tempData;
        this.showCompareCompo = true;
        this.myLoading.hide();
      }, 1000);
      this.dataProcessMaxvision();
      this.dataProcessBaidu();
      this.dataProcessTencent();
      this.compareList = [this.dataMaxvision, this.dataBaidu, this.dataTencent];
    },
    handleConfirm() {
      if(!this.textareaValue) return this.$message.warning('请输入内容')
      this.clearData();
      this.requestConfig.params = `content="${this.textareaValue}"`;
      this.handleRequest();
    },
    dataProcessMaxvision({} = {}) {
      this.dataMaxvision.data = this.dataFormat(
        this.tempData.pass,
        this.tempData.reject
      );
    },
    dataProcessBaidu(list = []) {
      this.dataBaidu.data = this.dataFormat(
        this.tempData.pass,
        this.tempData.reject
      );
    },
    dataProcessTencent(list = []) {
      this.dataTencent.data = this.dataFormat(
        this.tempData.pass,
        this.tempData.reject
      );
    },
    handleSamplesChange() {
      if (this.sampleIndex >= samplesTextcensor.length) this.sampleIndex = 0;
      this.textareaValue = samplesTextcensor[this.sampleIndex++];
    },
    dataFormat(passList, rejectList) {
      if (!Array.isArray(passList) || !Array.isArray(rejectList)) return [];
      const tempPassList = [],
        tempRejectList = [];
      passList.forEach((pa) => {
        tempPassList.push(this._dataObjFormat(pa, true));
      });
      rejectList.forEach((rej) => {
        tempRejectList.push(this._dataObjFormat(rej, false));
      });
      return tempRejectList.concat(tempPassList);
    },
    _dataObjFormat(obj, isPass) {
      const labelIndex = obj.label - 1;
      const tempObj = {
        labelText: this.censorLabels[labelIndex],
        statusText: isPass ? "通过" : "不通过",
        score: obj.score.toFixed(3),
        reject: !isPass,
      };
      return tempObj;
    },
    clearData() {
      this.returnTimes = [];
      this.compareList = [];
      this.showCompareCompo = false;
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

.operate-wrap {
  .input-title {
    margin-bottom: 20px;
    .input-title-label {
      font-size: 18px;
    }
    .input-title-random {
      font-size: 13px;
    }
  }
  .input-textarea {
    /deep/ .el-textarea {
      textarea {
        border-radius: 0;
        height: 324px;
      }
    }
  }
}

.table-wrap {
  table {
    width: 100%;
    color: #363636;
  }
  .table-head {
    font-size: 14px;
    color: #666;
    opacity: 0.8;
    font-weight: normal;
    &:nth-child(1) {
      text-align: left;
    }
  }
  .table-cell {
    line-height: 2.5;
    &:not(:nth-child(1)) {
      text-align: center;
    }
  }
  .cell-reject {
    color: #f03b35;
  }
  .cell-pass {
    color: #00b359;
  }
  .cell-grey {
    color: #666;
  }
  .final-result {
    font-weight: 700;
    margin-bottom: 20px;
    i {
      font-size: 22px;
      margin-right: 6px;
    }
    span {
      font-size: 20px !important;
    }
    .censor-result {
      display: flex;
      align-items: center;
    }
    .censor-pass {
      color: #00b359;
    }
    .censor-fail {
      color: #f03b35;
    }
  }
}
</style>