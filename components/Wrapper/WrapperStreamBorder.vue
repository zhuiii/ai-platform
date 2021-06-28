<template>
  <div class="wsb">
    <span :style="spanStyle1"></span>
    <span :style="spanStyle2"></span>
    <span :style="spanStyle3"></span>
    <span :style="spanStyle4"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    borderColor: {
      type: String,
      default: () => "#b5fffc",
    },
  },
  computed: {
    spanStyle1() {
      return {
        background: `linear-gradient(90deg, rgba(0,0,0,0), ${this.borderColor})`,
      };
    },
    spanStyle2() {
      return {
        background: `linear-gradient(180deg, transparent, ${this.borderColor})`,
      };
    },
    spanStyle3() {
      return {
        background: `linear-gradient(-90deg, transparent, ${this.borderColor})`,
      };
    },
    spanStyle4() {
      return {
        background: `linear-gradient(0deg, transparent, ${this.borderColor})`,
      };
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
.wsb {
  width: 100%;
  height: 100%;
  border-style: none;
  outline: none;
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    display: block;
    &:nth-child(1) {
      height: 3px;
      width: 100%;
      top: 0px;
      left: -100%;
      border-top-right-radius: 1px;
      border-bottom-right-radius: 1px;
      animation: span1 2s linear infinite;
      animation-delay: 1s;
    }
    &:nth-child(2) {
      height: 100%;
      width: 3px;
      top: -100%;
      right: 0px;
      border-bottom-left-radius: 1px;
      border-bottom-right-radius: 1px;
      animation: span2 2s linear infinite;
      animation-delay: 2s;
    }
    &:nth-child(3) {
      height: 3px;
      width: 100%;
      right: -100%;
      bottom: 0px;
      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
      animation: span3 2s linear infinite;
      animation-delay: 3s;
    }
    &:nth-child(4) {
      height: 100%;
      width: 3px;
      bottom: -100%;
      left: 0px;
      border-top-right-radius: 1px;
      border-top-left-radius: 1px;
      animation: span4 2s linear infinite;
      animation-delay: 4s;
    }
  }
  @keyframes span1 {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  @keyframes span2 {
    0% {
      top: -100%;
    }
    100% {
      top: 100%;
    }
  }
  @keyframes span3 {
    0% {
      right: -100%;
    }
    100% {
      right: 100%;
    }
  }
  @keyframes span4 {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 100%;
    }
  }
}
</style>