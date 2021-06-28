<template>
  <div class="mwtl">
    <span class="mwtl-icon">{{ tagText }}</span
    ><nuxt-link :to="url" :target="target">{{ title }}</nuxt-link>
  </div>
</template>

<script>
/* 文字标签链接组件 */
export default {
  props: {
    tagText: {
      type: String,
      default: () => "",
    },
    title: {
      type: String,
      default: () => "",
    },
    url: {
      type: String,
      default: () => "",
    },
    // 同a标签target
    target: {
      type: String,
      default: () => "",
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
.mwtl {
  .mwtl-icon {
    border: 1px solid #faad15;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-right: 10px;
    color: #faad15;
    font-size: 12px;
    padding: 2px 4px;
  }
  & > a {
    color: #faad15;
    line-height: 33px;
    &:hover {
      border-bottom: 1px solid #faad15;
      padding-bottom: 2px;
    }
  }
}
</style>