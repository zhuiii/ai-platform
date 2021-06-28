<template>
  <div class="imgtext1-wrap" :style="{ width }">
    <div class="img-wrap">
      <img :src="src" alt="" />
    </div>
    <div class="text-wrap">
      <h3 class="title">{{ title }}</h3>
      <p class="desc">{{ desc }}</p>
      <span class="seeText">{{ seeText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgText1",
  props: {
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
    seeText: {
      type: String,
      default: "了解详情",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.imgtext1-wrap {
  cursor: pointer;
  &:hover {
    .text-wrap {
      box-shadow: 0 5px 10px #eee;
      .seeText{
        text-decoration: underline;
      }
    }
  }
  .img-wrap {
    width: 100%;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .text-wrap {
    border: 1px solid #eee;
    transition: box-shadow 0.3s linear, -webkit-box-shadow 0.3s linear,
      -moz-box-shadow 0.3s linear;
    padding: 20px 48px 22px;
    .title {
      font-size: 22px;
      height: 38px;
      line-height: 38px;
    }
    .desc {
      height: 48px;
      line-height: 24px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      font-size: 14px;
      color: #999;
    }
    .seeText {
      font-size: 14px;
      color: #036fe2;
    }
  }
}
</style>
