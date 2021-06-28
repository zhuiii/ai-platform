<template>
  <div class="ocr-wrap contrast-layout">
    <div class="g-center">
      <div class="g-mg-t-lg experience">
        <h2 class="flex-center title">功能体验</h2>
        <AiMenus></AiMenus>
      </div>
      <div class="g-mg-t-lg flex-center">
        <h2 class="g-mg-b-sm title">功能演示</h2>
      </div>
      <!-- <my-title-praise :title="aiName"></my-title-praise> -->
      <div class="cl-wrap">
        <el-row :gutter="12">
          <el-col :span="12">
            <div class="g-border cl-left">
              <div class="cl-contrast">
                <slot name="left-up"></slot>
                <div class="input-tip">此处仅供功能展示</div>
                <BorderCorner></BorderCorner>
              </div>
              <!-- 样图选择 -->
              <div class="g-mg-t-xs img-select">
                <slot name="left-down"></slot>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <slot name="right"></slot>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";

/* 对比布局组件 */
export default {
  mixins: [MixinDemoPage],
};
</script>

<style scoped lang='less'>
@import "~assets/less/page/ocr/common.less";
.contrast-layout {
  .title {
    font-size: 30px;
    color: #242527;
  }
  .cl-wrap {
    .cl-left {
      width: 100%;
      position: relative;
      padding: 20px;
      .cl-contrast {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 496px;
        background-color: #eaeaea;
        padding: 40px;
        position: relative;
        .input-tip {
          margin-top: 20px;
          color: #ccc;
          font-size: 12px;
        }
      }
    }
    .cl-right {
      width: 340px;
      flex-grow: 1;
    }
  }
  .img-select {
    min-height: 90px;
  }
}
</style>