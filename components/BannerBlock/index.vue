<template>
  <div class="banner-block" :style="wrapStyle">
    <div class="center-box" :style="centerBoxStyle">
      <div class="bb-info" :style="infoStyle">
        <h2 class="bb-title">{{ title }}</h2>
        <p class="bb-desc">
          {{ desc }}
        </p>
        <div class="banner-news">
          <slot name="news"></slot>
        </div>
        <div class="custom-row">
          <slot name="custom"></slot>
        </div>
        <div class="bb-btns-tags" :style="btnsStyle">
          <div class="clear-float bb-btns">
            <slot name="btns"></slot>
          </div>
          <div class="clear-float bb-tags">
            <slot name="tags"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 
背景图广告区块组件
带描述、文字链接、按钮、标签链接
*/
export default {
  props: {
    bgUrl: {
      type: String,
      default: () => "",
    },
    wrapHeight: {
      type: String,
      default: () => "",
    },
    centerBoxWidth: {
      type: String,
      default: () => "",
    },
    infoWidth: {
      type: String,
      default: () => "730px",
    },
    title: {
      type: String,
      default: () => "",
    },
    desc: {
      type: String,
      default: () => "",
    },
    btnsTop: {
      type: String,
      default: () => "86px",
    },
  },
  computed: {
    wrapStyle() {
      return {
        backgroundImage: `url(${this.bgUrl})`,
        height: this.wrapHeight,
      };
    },
    centerBoxStyle() {
      return {
        width: this.centerBoxWidth,
      };
    },
    infoStyle() {
      return {
        width: this.infoWidth,
      };
    },
    btnsStyle() {
      return {
        marginTop: this.btnsTop,
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
.banner-block {
  display: flex;
  align-items: center;
  justify-content: center;
  .clear-float {
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .center-box {
    .bb-info {
      .bb-title {
        height: 67px;
        font-size: 48px;
        letter-spacing: 2px;
        color: #fff;
        position: relative;
      }
      .bb-desc {
        margin: 30px 110px 0 0;
        font-size: 16px;
        line-height: 26px;
        color: #fff;
        max-height: 80px;
        overflow: hidden;
      }
      .banner-news{
        margin-top: 24px;
        a {
          color: #fff;
          padding-bottom: 1px;
          &:hover{
            border-bottom: 1px solid #ffffff;
          }
        }
      }
      .custom-row {
        margin-top: 24px;
      }
    }
  }
}
</style>