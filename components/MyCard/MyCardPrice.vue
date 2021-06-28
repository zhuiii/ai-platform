<template>
  <div class="my-card-price">
    <div class="mcp-top">
      <h3 class="mcp-title">{{ title }}</h3>
      <p class="mcp-subTitle">{{ subTitle }}</p>
      <ul class="intro-wrap">
        <li
          class="intro-item"
          v-for="(item, index) in introList"
          :key="'intro' + index"
        >
          <span
            :class="[
              'intro-title',
              !item[introKeyConfig.desc] ? 'intro-title-only' : '',
            ]"
            >{{ item[introKeyConfig.title] }}</span
          >
          <span class="intro-desc">{{ item[introKeyConfig.desc] }}</span>
        </li>
      </ul>
      <ul class="link-wrap">
        <li v-for="(item, index) in linkList" :key="'link' + index">
          <nuxt-link :to="item[linkKeyConfig.url]">{{
            item[linkKeyConfig.label]
          }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="cost-wrap">
      <div class="cost-label" v-if="costSelect.length < 2">
        {{ costInfo[costSelectKeyConfig.label] }}
      </div>
      <el-select v-else v-model="priceNum" placeholder="" style="width: 150px">
        <el-option
          v-for="item in costSelect"
          :key="item[costSelectKeyConfig.label]"
          :label="item[costSelectKeyConfig.label]"
          :value="item[costSelectKeyConfig.value]"
        >
        </el-option>
      </el-select>
      <p class="price-row">
        <span class="price-num">{{ priceNum }}</span>
        <span class="price-unit">{{ costUnit }}</span>
      </p>
    </div>
    <div class="btn-wrap">
      <div :class="['commBtn', `commBtn-${btnConfig[btnConfigConfig.type] || 'primary'}`]">
        {{ btnConfig[btnConfigConfig.label] }}
      </div>
    </div>
  </div>
</template>

<script>
/* 价格卡片组件 */
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    subTitle: {
      type: String,
      default: () => "",
    },
    // 描述列表，区分 （仅有标题） 和 （标题、描述）
    introList: {
      type: Array,
      default: () => [],
    },
    // 描述列表数据key配置
    introKeyConfig: {
      type: Object,
      default: () => ({
        title: "title",
        desc: "desc",
      }),
    },
    // 链接列表
    linkList: {
      type: Array,
      default: () => [],
    },
    // 链接列表数据key配置
    linkKeyConfig: {
      type: Object,
      default: () => ({
        label: "label",
        url: "url",
      }),
    },
    // 价格类型选择
    costSelect: {
      type: Array,
      default: () => [],
    },
    // 价格类型选择key配置
    costSelectKeyConfig: {
      type: Object,
      default: () => ({
        label: "label",
        value: "value",
      }),
    },
    costUnit: {
      type: String,
      default: () => "",
    },
    btnConfig: {
      type: Object,
      default: () => ({
        type: "primary",
        url: "",
        label: "",
      }),
    },
    // 按钮配置对象key配置
    btnConfigConfig: {
      type: Object,
      default: () => ({
        type: "type",
        url: "url",
        label: "label",
      }),
    },
  },
  data() {
    return {
      priceNum: "", // 价格
      costInfo: {},
    };
  },
  methods: {
    getFirstCostInfo() {
      this.costInfo = this.costSelect.length > 0 ? this.costSelect[0] : {};
    },
    showFirstCostSelectOption() {
      if (this.costSelect.length > 0) {
        this.priceNum = this.costSelect[0][this.costSelectKeyConfig.value];
      }
    },
  },
  created() {
    this.showFirstCostSelectOption();
    this.getFirstCostInfo();
  },
  mounted() {},
};
</script>
<style scoped lang='less'>
.my-card-price {
  font-size: 14px;
  line-height: 24px;
  a {
    color: #0073eb;
  }
  .mcp-top {
    height: 280px;
    .mcp-title {
      font-size: 22px;
      height: 38px;
      line-height: 38px;
      font-weight: 700;
    }
    .mcp-subTitle {
      margin-top: 10px;
    }
    .intro-wrap {
      margin-top: 30px;
      .intro-item {
        .intro-title {
          display: inline-block;
          width: 80px;
          vertical-align: top;
        }
        .intro-title-only {
          width: 97%;
        }
      }
    }
  }
  .cost-wrap {
    height: 86px;
    .cost-label {
      height: 40px;
      line-height: 40px;
    }
    .price-row {
      margin-top: 10px;
      .price-num {
        display: inline-block;
        font-size: 22px;
        color: #ff540a;
        line-height: 38px;
        font-weight: 700;
        margin-right: 7px;
      }
    }
  }
  .btn-wrap {
      margin-top: 30px;
    .commBtn {
      width: 180px;
      &-ghost {
        border: 1px solid #036fe2;
        color: #036fe2;
      }
    }
  }
}
</style>