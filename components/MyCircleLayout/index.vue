<template>
  <div class="circle-layout" :id="uniqId" :style="bigCircleStyle">
    <div
      class="c-item"
      v-for="(item, index) in list"
      :key="item.label + index"
      :style="smallCircleStyle"
    >
      <div class="c-item-main">
        <template v-if="item.isIcon">
          <img
            class="c-item-icon"
            :src="item.iconSrc"
            alt=""
            v-if="item.iconSrc"
          />
          <i :class="['c-item-icon', item.iconCls]"></i>
        </template>
        <span :style="smallCircleTextStyle" v-else>{{ item.label }}</span>
      </div>
      <div class="icon-label" :style="smallCircleTextStyle" v-if="item.isIcon">
        {{ item.label }}
      </div>
      <div class="point-center">
        <slot name="pointCenter"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { genID, circleLayout } from "@/assets/js/utils.js";

export default {
  props: {
    /* 
    [{iconSrc: 图片icon, iconCls: 类icon，isIcon：是否正中展示图标型，label：文本}]
    */
    list: {
      type: Array,
      default: () => [],
    },
    // 大圆半径
    rBig: Number,
    // 小圆半径
    rSmall: Number,
    // 旋转角度
    rotate: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    bigCircleStyle() {
      const val = this.rBig * 2 + "px";
      return {
        width: val,
        height: val,
        transform: `rotate(${this.rotate}deg)`,
      };
    },
    smallCircleStyle() {
      const val = this.rSmall * 2 + "px";
      return {
        width: val,
        height: val,
      };
    },
    smallCircleTextStyle() {
      let fontSize = parseInt(this.rSmall / 2.5);
      fontSize < 12 ? (fontSize = 12) : fontSize;
      return {
        fontSize: fontSize + "px",
      };
    },
  },
  data() {
    return {
      uniqId: "",
    };
  },
  methods: {
    initCircleLayout() {
      this.$nextTick(() => {
        circleLayout(
          `#${this.uniqId} .c-item`,
          this.rBig,
          this.rSmall,
          this.rotate
        );
      });
    },
  },
  created() {},
  mounted() {
    this.uniqId = genID();
    this.initCircleLayout();
  },
};
</script>
<style scoped lang='less'>
.circle-layout {
  background: #ebf5ff;
  position: relative;
  border-radius: 50%;
  border: 1px dashed #6a6a6a;
  .c-item,
  .point-center,
  .point-center img {
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .c-item {
    position: absolute;
    display: none;
    cursor: default;
    .c-item-main {
      border-radius: 50%;
      background: #0085fe;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #fff;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 4px;
      .c-item-icon {
        max-width: 100%;
        max-height: 100%;
        color: #fff;
        font-size: 20px;
      }
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #a6d2ff;
      animation: wave 1s ease-in-out infinite;
    }
    .icon-label {
      position: absolute;
      left: -10%;
      top: 108%;
      color: rgb(2, 100, 59);
      white-space: nowrap;
    }
  }
  .point-center {
    width: 100%;
    position: absolute;
    top: -20%;
    left: 100%;
    img {
      max-width: 100%;
    }
  }
}

@keyframes wave {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>