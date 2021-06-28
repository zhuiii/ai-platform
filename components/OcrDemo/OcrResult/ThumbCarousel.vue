<template>
<!-- 右侧图片展示swiper -->
  <div class="thumb-casousel" v-show="listCompu && listCompu.length > 0">
    <no-ssr>
      <swiper ref="thumbSwiper" :options="swiperOptions">
        <swiper-slide
          :class="[choseIndex === i ? 'is-chose' : '']"
          v-for="(item, i) in listCompu"
          :key="i"
          @click.native="handleThumbClick(item, i)"
          ><img
            :data-i="i"
            :src="typeof item === 'object' ? item.src : item"
            alt=""
        /></swiper-slide>
        <div class="swiper-pagination tc-pagi" slot="pagination"></div>
      </swiper>
    </no-ssr>
    <MyCarouselArrow
      width="9px"
      height="16px"
      @handleClickLeft="handleThumbLeft"
      @handleClickRight="handleThumbRight"
    >
      <div class="btn-arrow button-prev" slot="left"></div>
      <div class="btn-arrow button-next" slot="right"></div>
    </MyCarouselArrow>
  </div>
</template>

<script>
export default {
  props: {
    // 路径数组或含src对象数组
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    thumbSwiper() {
      return this.$refs.thumbSwiper.$swiper;
    },
    listCompu() {
      this.clearData();
      return this.list || [];
    },
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 10,
        grabCursor: true,
        pagination: {
          el: ".tc-pagi",
        },
      },
      choseIndex: 0,
    };
  },
  methods: {
    handleThumbClick(item, idx) {
      this.choseIndex = idx;
      this.$emit("handleClick", item, idx);
    },
    handleThumbLeft() {
      this.thumbSwiper.slidePrev();
    },
    handleThumbRight() {
      this.thumbSwiper.slideNext();
    },
    clearData() {
      this.choseIndex = 0;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.thumb-casousel {
  border: 1px solid #cee8ff;
  padding: 3px 30px;
  position: relative;
  .swiper-slide {
    width: 44px;
    height: 44px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    line-height: 44px;
    img {
      max-width: 100%;
    }
    &.is-chose {
      position: relative;
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border: 3px solid #0073eb;
      }
    }
  }
  .btn-arrow {
    &::after {
      content: "";
      display: block;
      width: 9px;
      height: 16px;
      background-size: cover;
      background: url("~static/icon/icon-arrow-left.png") no-repeat;
    }
  }
  .button-next {
    &::after {
      transform: rotateY(180deg);
    }
  }
  /deep/ .arrow {
    opacity: 1;
    &.arrow-lt {
      left: 2%;
    }
    &.arrow-rt {
      right: 2%;
    }
  }
}
</style>