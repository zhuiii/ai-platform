<template>
  <div class="no-data">
    <div>
      <img src="@/static/no-data.png" alt="" />
      <p class="g-mg-t-sm no-data-tip">{{ tip }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: () => "很抱歉 ，暂无结果，请重新选择一张图片",
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
.no-data {
  text-align: center;
  & > img {
    max-width: 100%;
  }
  .no-data-tip {
    font-size: 14px;
    font-weight: 400;
    color: #858585;
    line-height: 24px;
    white-space: nowrap;
  }
}
</style>