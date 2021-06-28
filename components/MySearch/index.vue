<template>
  <div :class="wrapCls" :style="wrapStyle">
    <el-input
      placeholder="请输入"
      v-model="inputVal"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
      <!-- mousedown.prevent 阻止input失去焦点 -->
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @mousedown.prevent=""
        @mouseup="handleSearch"
      ></i>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    isAnim: {
      type: Boolean,
      default: () => true
    },
    width: {
      type: String,
      default: () => '100px'
    }
  },
  data() {
    return {
      inputVal: "",
      isFocus: false,
    };
  },
  computed: {
    wrapCls() {
      return this.isAnim && this.isFocus ? "search-wrap search-wrap__focus" : "search-wrap";
    },
    wrapStyle() {
      return {
        width: this.width
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.inputVal);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.search-wrap {
  float: right;
  transition: all 0.2s ease-in;
  /deep/ .el-input__inner {
    border-radius: 30px;
  }
  &.search-wrap__focus {
    width: 200px !important;
  }
  /deep/ .el-input__icon {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>