<template>
  <div class="pcount flex-center-center">
    <div>
      <p class="label-title">{{ label }}</p>
      <p class="count-val">{{ count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    count: Number,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.pcount {
  text-align: center;
}
.label-title {
  color: #858585;
}
.count-val {
  font-size: 100px;
  color: rgb(247, 54, 54);
  line-height: 0.8;
}
</style>