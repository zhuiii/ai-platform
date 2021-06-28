<template>
  <div class="list-panel-cont">
    <p
      class="lpc-item"
      v-for="(key, kindex) in Object.keys(keyConfigs)"
      :key="'k' + kindex"
    >
      <span>{{ keyConfigs[key] }}：</span>
      <span>{{ jsonData[key] }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    keyConfigs: {
      type: Object,
      default: () => ({}),
    },
    jsonData: {
      type: Object,
      default: () => {},
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
.lpc-item {
  line-height: 3;
  & > span {
    &:first-child {
      margin-right: 30px;
      width: 100px;
      display: inline-block;
      background: #e6fffb;
      text-align: right;
    }
  }
}
</style>