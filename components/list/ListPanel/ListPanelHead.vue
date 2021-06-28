<template>
  <div class="list-panel-head">
    <span class="label">{{label}}：</span>
    <span class="count">{{ count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => '数量',
    },
    count: {
      type: Number,
      default: () => 0,
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
.list-panel-head {
  background-color: #fff;
  line-height: 3;
  padding-left: 30px;
  .label {
    color: rgb(152, 64, 224);
    font-size: 20px;
  }
  .count {
    font-size: 26px;
    color: tomato;
  }
}
</style>