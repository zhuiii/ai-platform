<template>
  <div
    class="comm-btn-wrap animate__animated"
    :style="{
      width,
      height,
      backgroundImage: `url(${bgImgSrc})`,
      backgroundColor: bgColor,
      color,
      border,
      borderRadius: bradius,
    }"
    @click="handleClick"
  >
    <slot name="before"></slot>
    <span :style="{ fontSize: fsize }">{{ label }}</span>
    <slot name="after"></slot>
  </div>
</template>

<script>
import bgBtn from "@/static/bg-btn.png";

export default {
  name: "CommonButton",
  props: {
    width: {
      type: String,
      default: () => "100px",
    },
    height: {
      type: String,
      default: () => "50px",
    },
    animateCls: {
      type: String,
      default: () => "animate__tada",
    },
    isAnimate: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => "",
    },
    // 背景图
    bgImgSrc: {
      type: String,
      default: () => bgBtn,
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: () => "",
    },
    // 边框
    border: {
      type: String,
      default: () => "",
    },
    // 字体颜色
    color: {
      type: String,
      default: () => "#fff",
    },
    // 字体大小
    fsize: {
      type: String,
      default: () => "16px",
    },
    // 圆角
    bradius: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
    initAnimateCls() {
      if (this.isAnimate) {
        const $commBtn = $(".comm-btn-wrap");
        $commBtn.on("mouseover", () => {
          $commBtn.addClass(this.animateCls);
        });
        $commBtn.on("mouseleave", () => {
          $commBtn.removeClass(this.animateCls);
        });
      }
    },
  },
  mounted() {
    this.initAnimateCls();
  },
};
</script>

<style>
.comm-btn-wrap {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-iteration-count: infinite;
  cursor: pointer;
}
</style>
