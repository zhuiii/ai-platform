<template>
  <div class="flex-center-center num-detect">
    <div v-if="icon" class="icon-wrap">
      <img :src="icon" :style="`width: ${iconWidth}px; height: ${iconHeight}px`">
    </div>
    <div class="num-wrap">
      <p class="label">{{ label }}</p>
      <p class="count">{{ count }}</p>
    </div>
  </div>
</template>

<script>
/* 数量检测组件 */
export default {
  props: {
    label: String,
    count: Number,
    icon: {
      type: String,
      default: null
    },
    iconWidth: {
      type: Number,
      default: 74
    },
    iconHeight: {
      type: Number,
      default: 74
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.num-detect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .icon-wrap {
    margin-right: 20px;
    text-align: center;
  }

  .num-wrap {
    color: #08C06B;
    text-align: center;
  }

  .count {
    color: rgb(247, 54, 54);
    font-size: 30px;
    font-weight: 700;
  }
}

</style>