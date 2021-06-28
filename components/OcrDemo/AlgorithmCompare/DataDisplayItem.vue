<template>
  <div class="ditem">
    <div class="ditem-title">{{ titles[titleIndex] }}</div>
    <div class="json-cont">
      <slot name="cont"></slot>
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
    titleIndex: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      titles: ["盛视", "百度", "腾讯"],
    };
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.ditem {
  // width: 32%;
  background-color: #fff;
  padding: 10px;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgb(139, 250, 244);
  }
  .ditem-title {
    border-bottom: 1px solid rgb(219, 219, 219);
    text-align: center;
    color: cornflowerblue;
    padding: 10px 0;
    letter-spacing: 10px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .json-cont {
    // max-height: 500px;
    // overflow: auto;
    font-size: 14px;
    /deep/ span {
      font-size: 14px;
    }
  }
}
</style>