<template>
  <div class="imgtext2-wrap" :style="{ width }">
    <div class="text-wrap">
      <h3 class="title">{{ dataInner.title }}</h3>
      <p class="desc">{{ dataInner.desc }}</p>
    </div>
    <div class="img-wrap">
      <img :src="dataInner.src" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgText2",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
  },
  watch: {
    data(newVal) {
      this.dataInner = newVal || {};
    },
  },
  data() {
    return {
      dataInner: {},
    };
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.imgtext2-wrap {
  display: flex;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  justify-content: space-between;
  .img-wrap {
    flex-shrink: 0;
    width: 280px;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .text-wrap {
    width: 55%;
    .title {
      font-size: 22px;
      height: 38px;
      line-height: 38px;
      font-weight: 700;
    }
    .desc {
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
      max-height: 80px;
      overflow: hidden;
    }
  }
}
</style>
