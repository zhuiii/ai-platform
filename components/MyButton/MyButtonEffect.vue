<template>
  <div :class="wrapCls">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    bgColor: {
      type: String,
      default: () => "",
    },
    color: {
      type: String,
      default: () => "",
    },
    active: {
      type: Boolean,
      default: () => false,
    },
    disable: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    wrapCls() {
      if (this.disable) return "my-buttonn-effect disable";
      return this.active ? "my-buttonn-effect mbe-active" : "my-buttonn-effect";
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
.my-buttonn-effect {
  position: relative;
  line-height: 30px;
  text-indent: 0;
  transition: text-indent 0.2s linear;
  text-align: center;
  color: #fff;
  cursor: pointer;
  &:not(&.disable):hover {
    text-indent: 20px;
    color: #006de3;
    &::after {
      left: 20px;
      background: #fff;
    }
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: skewX(20deg);
    background: #006de3;
    content: "";
    transition: left 0.2s linear;
  }
  &.mbe-active {
    text-indent: 20px;
    color: #006de3;
    &::after {
      left: 20px;
      background: #fff;
    }
  }
  &.disable {
    cursor: not-allowed;
    &::after {
      background: #459eff;
    }
  }
}
</style>