<template>
  <div class="comp-ocr-result">
    <!-- 无数据 -->
    <template v-if="tipInfoCompu || errorInfoCompu">
      <!-- <div class="g-flex">
        <span class="req-val warn">{{ tipInfoCompu }}</span>
      </div> -->
      <div class="result-no">
        <MyNoData></MyNoData>
      </div>
    </template>
    <!-- 异常展示 -->
    <!-- <template v-else-if="errorInfoCompu">
      <div class="g-flex err">
        <span class="req-title">异常</span>
        <span class="req-val">{{ errorInfoCompu }}</span>
      </div>
    </template> -->
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    tipInfo: String,
    errorInfo: String,
  },
  computed: {
    tipInfoCompu() {
      return this.tipInfo;
    },
    errorInfoCompu() {
      return this.errorInfo;
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.comp-ocr-result {
  height: 100%;

  .result-no {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>