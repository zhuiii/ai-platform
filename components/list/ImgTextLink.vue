<template>
  <div class="itl-wrap">
    <div class="icon-wrap">
      <slot name="icon"></slot>
    </div>
    <div class="text-wrap">
      <h5 class="itl-title">{{ title }}</h5>
      <p class="itl-desc" :style="{height: descHeight}">{{ desc }}</p>
      <nuxt-link :to="jumpUrl" v-if="showLink">{{ linkText }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextList",
  props: ["title", "desc", "linkText", "jumpUrl", "showLink", "descHeight"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.itl-wrap {
  display: flex;
  .text-wrap {
    .itl-title {
      font-size: 22px;
      height: 38px;
      line-height: 38px;
      font-weight: 700;
    }
    .itl-desc {
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    &>a{
      color: #036fe2;
      &:active{
        color: tomato;
      }
    }
  }
}
</style>
