<template>
  <div class="wrapper-title">
    <div class="inner-border">
      <div class="inner-title">{{ title }}</div>
      <div class="inner-cont">
        <slot name="cont"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
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
.wrapper-title {
  border: 1px solid #0174f5;
  padding: 2px;
  border-radius: 10px;
  .inner-border {
    border: 1px solid #016ae0;
    padding: 5px;
    border-radius: 10px;
    .inner-title {
      background: url("~static/title_bg.png") no-repeat;
      text-align: center;
      background-position: center top;
      height: 40px;
      margin-top: -10px;
    }
  }
}
</style>