<template>
<!-- 右侧数据展示 -->
  <transition :name="transitionName">
    <!-- :class="{ 'ac-hide': !isShow }" v-show="isShow"-->
    <div class="g-border ac-wrap">
      <!-- 时间图表 -->
      <!-- <div class="g-border time-wrap">
        <h4 class="tl-sec-2">{{ dtitle }}</h4>
        <div class="g-mg-t-sm" id="time-chart"></div>
      </div> -->
      <div class="data-display">
        <div class="flex-between-center dd-title">
          <h4 class="dd-tl"><i></i>数据展示</h4>
          <MyPraise
            :goodNum="goodNum"
            :badNum="badNum"
            :isGood="isGood"
            :isBad="isBad"
            @handlePraise="handlePraise"
            @cancelPraise="cancelPraise"
          ></MyPraise>
        </div>
        <div
          class="g-f-clr g-mg-t-xs display-list"
          :style="{ height: dataListHeight }"
        >
          <my-menu
            ref="tabsRef"
            :class="{ hide: tabs.length === 0 }"
            :list="tabs"
            wrapCls=""
            itemCls="cus-menu-item"
            :toggleReset="tabsToggleReset"
            @handleClick="handleTabClick"
          ></my-menu>

          <el-scrollbar class="tabs-cont" v-if="!isCustom">
            <div
              class="ditem"
              v-for="(item, index) in list"
              :key="'ditem' + index"
              v-show="activeTabIndex == index"
            >
              <div class="json-cont" :style="{ height: listItemMaxHeight }">
                <!-- 无数据 -->
                <template
                  v-if="item.tip_info || item.error_msg || item.errorMsg"
                >
                  <MyNoData></MyNoData>
                </template>
                <!-- 异常展示 -->
                <!-- <template v-else-if="item.error_msg || item.errorMsg">
                  <div class="g-flex err">
                    <span class="req-title">异常</span>
                    <span class="req-val">{{
                      item.error_msg || item.errorMsg
                    }}</span>
                  </div>
                </template> -->
                <!-- 数组类型数据 -->
                <template
                  v-else-if="
                    item.data &&
                    (Array.isArray(item.data) ||
                      Array.isArray(item.data[item.listKey]))
                  "
                >
                  <!-- <div class="g-flex">
                    <span class="req-title">序号</span>
                    <span class="req-val">内容</span>
                  </div> -->
                  <!-- item.data为数组则直接用，否则取item.data[item.listKey] -->
                  <!-- <div
                    class="g-flex"
                    v-for="(listItem, lindex) in Array.isArray(item.data)
                      ? item.data
                      : item.data[item.name]"
                    :key="`ditem${index}${lindex}`"
                  >
                    <template>
                      <span class="req-title">{{ lindex + 1 }}</span>
                      <span class="req-val">{{ listItem.text }}</span>
                    </template>
                  </div> -->
                  <list-sort :list="item.data">

                  </list-sort>
                </template>
                <!-- 判断item.keyCN，是否为中文字段配置型数据 -->
                <template v-else-if="item.keyCN && isJsonObj(item.keyCN)">
                  <!-- <div
                    class="g-flex"
                    v-for="(key, kindex) in getObjKeys(item.keyCN)"
                    :key="`ditem${index}${kindex}`"
                  >
                    <template
                      v-if="
                        (typeof item.data[key] === 'object' &&
                          item.data[key] !== null &&
                          item.data[key][item.dataKey]) ||
                        item.data[key]
                      "
                    >
                      <span class="req-title">{{ item.keyCN[key] }}</span>
                      <span class="req-val">{{
                        typeof item.data[key] === "object" &&
                        item.data[key] !== null
                          ? item.data[key][item.dataKey]
                          : item.data[key]
                      }}</span>
                    </template>
                  </div> -->
                  <ListKeyValue
                    :info="item.data.data || item.data"
                    :valKeyConfig="item.keyCN"
                  ></ListKeyValue>
                  <!-- <ListSort :list="item.data" :keyCN="item.keyCN"></ListSort> -->
                </template>
                <!-- 百度的返回值key为中文字段，这里做单独处理 -->
                <template v-else-if="item.isChineseKey">
                  <ListKeyValue
                    :info="createInfoByBaiduData(item.data)"
                    :valKeyConfig="createValKeyConfigByBaiduData(item.data)"
                  ></ListKeyValue>
                  <!-- <div
                    class="g-flex"
                    v-for="(cnKey, ckindex) in getObjKeys(item.data)"
                    :key="`ditem${index}${ckindex}`"
                  >
                    <template
                      v-if="
                        (typeof item.data[cnKey] === 'object' &&
                          item.data[cnKey] !== null &&
                          item.data[cnKey][item.dataKey]) ||
                        item.data[cnKey]
                      "
                    >
                      <span class="req-title">{{ cnKey }}</span>
                      <span class="req-val">{{
                        typeof item.data[cnKey] === "object" &&
                        item.data[cnKey] !== null
                          ? item.data[cnKey][item.dataKey]
                          : item.data[cnKey]
                      }}</span>
                    </template>
                  </div> -->
                </template>
                
              </div>
            </div>
          </el-scrollbar>
          <el-scrollbar class="tabs-cont" v-else>
            <slot></slot>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getObjKeys, isJsonObj } from "@/assets/js/utils.js";
import ListKeyValue from "@/components/OcrDemo/OcrResult/ListKeyValue.vue";
import MixinCompoPraise from "@/assets/mixin/mixin-compo-praise.js";
import ListSort from './list/ListSort.vue';

/* 算法对比组件 */
export default {
  mixins: [MixinCompoPraise],
  components: {
    ListKeyValue,
    ListSort,
  },
  props: {
    times: {
      type: Array,
      default: () => [],
    },
    /* 
    list数据格式：{ keys: [字段], keyCN: {字段：中文配置}, listKey: 列表数据key，dataKey：数据key， data: {} }
    */
    list: {
      type: Array,
      default: () => [],
    },
    // 显示隐藏组件
    showCompareCompo: {
      type: Boolean,
      default: () => false,
    },
    // 是否自定义列表
    isCustom: {
      type: Boolean,
      default: () => false,
    },
    // 数据展示标题
    dtitle: {
      type: String,
      default: () => "算法时间对比",
    },
    // 设置过渡名
    transitionName: {
      type: String,
      default: () => "",
    },
    listItemMaxHeight: {
      type: String,
      default: () => "",
    },
    dataListHeight: {
      type: String,
      default: () => "calc(100% - 50px)",
    },
    tabsToggleReset: Boolean,
  },
  computed: {
    isShow() {
      return this.showCompareCompo;
    },
  },
  watch: {
    times(newVal) {
      return;
      if (this.isShow) {
        this.$nextTick(() => {
          this.handleCreateChart(newVal);
        });
      }
    },
    isShow(newVal) {
      return;
      if (!newVal) {
        const option = this.myChart.getOption();
        option.series[0].data = [];
        this.myChart.setOption(option);
      }
    },
    list: {
      handler(newList) {
        // if (newList) {
        //   this.tabs = newList;
        // } else {
        //   this.tabs = [];
        // }
        console.log(this.list)
          this.tabs = [];

      },
      immediate: true,
      deep: true
    },
  },
  data() {
    return {
      chartId: "time-chart",
      myChart: null,
      getObjKeys,
      isJsonObj,
      activeTabIndex: 0,
      tabs: [],
    };
  },
  methods: {
    handleCreateChart(data) {
      if (!Array.isArray(data)) return;
      if (!this.myChart) {
        this.myChart = this.createChart(this.chartId, data);
      } else {
        const option = this.myChart.getOption();
        option.series[0].data = data.map((item) => item.time);
        option.xAxis[0].data = data.map((item) => item.label);
        this.myChart.setOption(option);
      }
    },
    createChart(id, seriesData = []) {
      // 基于准备好的dom，初始化echarts实例
      const container = document.getElementById(id);
      if (!container) return null;
      let myChart = this.$echarts.init(container);
      let labels = [];
      let times = [];
      seriesData.forEach(({ label, time }) => {
        labels.push(label);
        times.push(time);
      });
      const textColor = "#757575";
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          textStyle: {},
        },
        tooltip: {},
        grid: {
          x: "10%", //距离左边
          x2: 0, //距离右边
          y: "18%", //距离上边
          y2: "12%", //距离下边
        },
        xAxis: {
          axisLabel: {
            color: textColor,
          },
          //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: textColor,
            },
          },
          data: labels,
        },
        yAxis: {
          name: "毫秒", //坐标名字
          nameLocation: "end", //坐标位置，支持start,end，middle
          nameTextStyle: {
            //字体样式
            // fontSize: 16, //字体大小
            // padding: 2, //距离坐标位置的距离
            color: textColor,
          },
          //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: textColor,
              // width:8,//这里是为了突出显示加上的
            },
          },
          // boundaryGap: [0, 10],
          axisLabel: {
            color: textColor,
          },
        },
        series: [
          {
            name: "时间",
            type: "bar",
            data: times,
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              //数值样式
              color: textColor,
              fontSize: 16,
            },
            tooltip: {
              // formatter: '{b}：{c} 毫秒'
              formatter(params) {
                return `${params.marker}${params.name}：${params.value} 毫秒`;
              },
            },
          },
        ],
      });
      return myChart;
    },
    handleTabClick(item, index) {
      if (this.activeTabIndex === index) return;
      this.activeTabIndex = index;
      this.$emit("getActiveIndex", index); // 暂时没作用
    },
    createInfoByBaiduData(data) {
      const retObj = {};
      Object.values(data).forEach((item, index) => {
        retObj[`baiduKey${index}`] = item.words;
      })
      return retObj
    },
    createValKeyConfigByBaiduData(data) {
      const retObj = {};
      Object.keys(data).forEach((item, index) => {
        retObj[`baiduKey${index}`] = item;
      })
      return retObj
    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
@import url(~assets/less/element-custom.less);
.ac-hide {
  height: 0;
  overflow: hidden;
}
.ac-wrap {
  /deep/ .mm-wrap {
    border-bottom: 1px solid #e3e3e3;
  }
  /deep/ .cus-menu-item {
    line-height: 30px;
    padding: 10px 0 10px 40px;
    font-weight: bold;
    color: #242527;
    margin-right: 15%;
  }
  /deep/ .line-wrap {
    .line-item {
      height: 2px;
    }
  }
}

.display-title {
  color: #757575;
  font-size: 18px;
  margin-bottom: 10px;
  width: 200px;
}
.time-wrap {
  padding: 20px;
}
#time-chart {
  height: 200px;
}
.data-display {
  height: 100%;
  .display-list {
    width: 100%;
    padding: 20px;
    padding-top: 0;
    .tabs-cont {
      position: relative;
      margin-top: 10px;
      /deep/ .ditem {
        // width: 100%;
        height: 100%;
        background-color: #fff;
        transition: all 0.2s ease-in;
        .ditem-title {
          border-bottom: 1px solid rgb(219, 219, 219);
          text-align: right;
          color: cornflowerblue;
          padding: 10px 0;
          letter-spacing: 10px;
          font-weight: 700;
        }
        .json-cont {
          // overflow: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          /deep/ span {
            font-size: 14px;
          }
        }
      }
      /deep/ & > .el-scrollbar__wrap {
        display: flex;
        .el-scrollbar__view {
          height: 100%;
          flex: 1;
        }
      }
    }
  }
}
.dd-title {
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
}
.dd-tl {
  font-size: 18px;
  font-weight: 400;
  color: #2b2e2e;
  display: flex;
  align-items: center;
  & > i {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url("~static/icon/icon-data-display.png") no-repeat;
    background-size: contain;
    margin-right: 6px;
  }
}
.hide {
  opacity: 0;
  position: relative;
  z-index: -1;
}
</style>