<template>
  <div class="ocr-demo-layout">
    <InnerPageHeadBanner slot="head" :bg="bg" :title="title" :descs="descs">
    </InnerPageHeadBanner>
    <common-squareNav @changeBg="changeBg"></common-squareNav>
    <div class="g-center">
      <!-- 功能演示 -->
      <div class="paddingTop">
        <div class="flex-center">
          <h2 class="title g-mg-b-sm">技术体验</h2>
        </div>
        <!-- 这里后面不知道会不会自定义，可以通过prop传进来 -->

        <div class="hint g-mg-b-sm">
          点击下面的小图片或图片上传按钮,即可输出目标检测结果。内容包含:
          1、目标位五信息; 2、目标分类; 3、可信度;值域[0,1] ，越接近1,
          可信度越高。
        </div>
        <div class="flex-between">
          <div class="wrap-l">
            <slot name="left"></slot>
          </div>
          <div class="wrap-r">
            <slot name="right"></slot>
          </div>
        </div>
        <div class="intro">
          <div class="intro-wrapper">
            <div class="title">功能介绍</div>
            <div class="content">{{ functionIntroduction }}</div>
          </div>
          <img class="intro-img" :src="functionIntroductionIcon" />
        </div>
        <div class="intro">
          <img class="technology-img" :src="technologyIntroductionIcon" />
          <div class="intro-wrapper">
            <div class="title">技术介绍</div>
            <div class="content">{{ technologyIntroduction }}</div>
          </div>
        </div>
        <div class="indicators">
          <div class="title">主要指标</div>
          <div class="indicators-wrapper">
            <div
              class="indicators-item"
              v-for="(item, index) in indicators"
              :key="`indicators-${index}`"
            >
              <img class="item-img" :src="item.url" />
              <div>{{ item.title }}</div>
              <div class="tips-wrapper">
                <div
                  v-for="(tipsItem, tipsIndex) in item.tips"
                  :key="`tips-${tipsIndex}`"
                >
                  {{ tipsItem }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinDemoPage from "@/assets/mixin/mixin-demo-page.js";
import CommonSquareNav from "@/components/CommonSquareNav.vue";
import functionIntroductionIcon from "@/static/newui/funcintro.png";
import technologyIntroductionIcon from "@/static/newui/technologyIntro.png";
import indicatorsicon1 from "@/static/newui/indicatorsicon1.png";
import indicatorsicon2 from "@/static/newui/indicatorsicon2.png";
import indicatorsicon3 from "@/static/newui/indicatorsicon3.png";
import indicatorsicon4 from "@/static/newui/indicatorsicon4.png";
import targetBg from "@/static/banner/bg1.png";

/* OcrDemo布局组件 */
export default {
  components: { CommonSquareNav },
  mixins: [MixinDemoPage],
  props: {
    bg: String,
    title: String,
    descs: {
      type: Array,
      default: () => [],
    },
    functionIntroduction: {
      type: String,
      default:
        "对图片中的多个目标进行检测,得到各目标的识别结果及位置信息。支持识别300多种动物100多种植物、3000多种生活用品,共计3400种分类,仍在不断扩充当中。该算法的目标不是成为专业的动物学家或植物学家,而是通过我们的努力,让智能摄像机能识别出日常生活中常见的绝大部分内容。",
    },
    technologyIntroduction: {
      type: String,
      default:
        "采用YoloV5开源网络模型,对ImageNet数据集进行分类删减，增加了MVlmage数据集 共计2000类目标,超过3000万张图",
    },
  },
  data() {
    return {
      functionIntroductionIcon,
      technologyIntroductionIcon,
      // bg: targetBg,
      indicators: [ 
        {
          url: indicatorsicon1,
          title: "目标种类",
          tips: ["3400"],
        },
        {
          url: indicatorsicon2,
          title: "检出率",
          tips: [">95%"],
        },
        {
          url: indicatorsicon3,
          title: "准确率",
          tips: [">90%"],
        },
        {
          url: indicatorsicon4,
          title: "速度",
          tips: ["CPU Core i7-4451 100ms", "GPU GTX1050TI 20ms"],
        },
      ],
    };
  },
  // created: function () {
  //   console.log(this.$route.path);
  //   if (this.$route.path == "/ai/image/basic") {
  //     this.bg = targetBg;
  //   }
  // },
  methods: {
    changeBg(item) {
      this.bg = item;
    },
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
@import "~assets/less/page/ocr/common.less";
.ocr-demo-layout {
  .title {
    font-size: 30px;
    color: #242527;
  }
  .wrap-l {
    width: 760px;
  }
  .wrap-r {
    width: 420px;
    /deep/ .ac-wrap {
      height: 100%;
    }
    /deep/ .tabs-cont {
      height: 650px;
    }
  }

  .intro {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .intro-wrapper {
      width: 720px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #010101;
      }

      .content {
        margin-top: 30px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 28px;
        color: #010101;
      }
    }

    .intro-img {
      width: 250px;
      height: 190px;
    }

    .technology-img {
      width: 260px;
      height: 240px;
    }
  }

  .indicators {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .title {
      margin-top: 100px;
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #010101;
    }

    .indicators-wrapper {
      margin-top: 30px;
      width: 100%;
      display: flex;
      justify-content: space-around;

      .indicators-item {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .item-img {
          width: 124px;
          height: 124px;
        }

        .tips-wrapper {
          height: 38px;
        }
      }
    }
  }
}
</style>