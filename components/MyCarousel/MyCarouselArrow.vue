<template>
  <div :class="wrapCls">
    <div class="arrow arrow-lt" :style="arrowStyle" @click="handleClickLeft">
      <slot name="left"><div class="img"></div></slot>
    </div>
    <div class="arrow arrow-rt" :style="arrowStyle" @click="handleClickRight">
      <slot name="right"><div class="img"></div></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: () => "37px",
    },
    height: {
      type: String,
      default: () => "66px",
    },
    selector: String,
  },
  computed: {
    arrowStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    wrapCls() {
      return this.show ? "show" : "";
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleClickLeft() {
      this.$emit("handleClickLeft");
    },
    handleClickRight() {
      this.$emit("handleClickRight");
    },
  },
  created() {},
  mounted() {
    if ($(this.selector)) {
      $(this.selector).on("mouseover", () => {
        this.show = true;
      });
      $(this.selector).on("mouseleave", () => {
        this.show = false;
      });
    }
  },
};
</script>
<style scoped lang='less'>
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s linear;
  opacity: 0;
  .img {
    width: 100%;
    height: 100%;
    background: url("~static/banner/arrow-right.png") no-repeat;
    background-size: contain;
  }
}
.arrow-lt {
  left: 3%;
  .img {
    transform: rotate(180deg);
  }
}
.arrow-rt {
  right: 3%;
}

.show {
  .arrow {
    opacity: 1;
  }
}
</style>