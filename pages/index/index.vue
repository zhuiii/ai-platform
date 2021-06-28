<template>
  <div class="container">
    <!-- <canvas id="cosmos">该浏览器不支持canvas</canvas> -->
    <div id="containerCont" class="container-wrapper">
      <CommHeader></CommHeader>
      <!-- <div class="occupay-header"></div> -->
      <div class="container-content">
        <div class="container-cont">
          <nuxt-child></nuxt-child>
        </div>
        <CommFooter></CommFooter>
      </div>
    </div>
  </div>
</template>

<script>
import CommHeader from "@/components/CommHeader.vue";
import routerPath from "@/assets/js/routerPath.js";
import { generateCosmos } from "@/plugins/cosmos.js";
import mixinRouter from "@/assets/mixin/mixin-router.js";
import { requestAIList } from "@/assets/js/apis/ai-api.js";

export default {
  components: {
    CommHeader,
  },
  mixins: [mixinRouter],
  data() {
    return {};
  },
  computed: {
  },
  async asyncData({ app, params, store }) {
    try {
      const allAIs = store.state.aiList
        ? store.state.aiList
        : await requestAIList();
      if (!store.state.aiList) {
        store.commit("setAiList", allAIs);
      }
      const firstNav = allAIs[0];

      return {
        allAIs,
        apiList: firstNav ? firstNav.children : [],
      };
    } catch (err) {}
  },
  // async asyncData({ app: { $axios }, store }) {
  //   // const listData = $axios.get('/navlist')
  //   try {
  //     const allAIs = store.state.aiList
  //       ? store.state.aiList
  //       : await requestAIList();
  //     if (!store.state.aiList) {
  //       const filterAis = allAIs.filter(item => item.children && item.children.length > 0);
  //       store.commit("setAiList", filterAis);
  //     }

  //     return {
  //       allAIs,
  //       navList: [
  //         {
  //           title: "最新活动",
  //           sub: null,
  //           url: "#",
  //         },
  //         {
  //           title: "产品",
  //           sub: {
  //             isMenu: true,
  //             list: [
  //               {
  //                 title: "人工智能",
  //                 list: [
  //                   {
  //                     title: "OCR文字识别",
  //                     list: [
  //                       {
  //                         title: "身份证识别",
  //                         url: routerPath.ocr_idcard,
  //                       },
  //                       {
  //                         title: "通用文字识别",
  //                         url: routerPath.ocr_basic,
  //                       },
  //                       {
  //                         title: "银行卡识别",
  //                         url: routerPath.ocr_bankcard,
  //                       },
  //                       {
  //                         title: "驾驶证识别",
  //                         url: routerPath.ocr_drivingLicense,
  //                       },
  //                       {
  //                         title: "行驶证识别",
  //                         url: routerPath.ocr_vehicleLicense,
  //                       },
  //                       {
  //                         title: "车牌识别",
  //                         url: routerPath.ocr_plateLicense,
  //                       },
  //                       {
  //                         title: "营业执照识别",
  //                         url: routerPath.ocr_businessLicense,
  //                       },
  //                       {
  //                         title: "通用票据识别",
  //                         url: routerPath.ocr_receipt,
  //                       },
  //                     ],
  //                   },
  //                   {
  //                     title: "人脸与人体识别",
  //                     list: [
  //                       {
  //                         title: "人脸质量检测",
  //                         url: routerPath.face_quality,
  //                       },
  //                     ],
  //                   },
  //                   {
  //                     title: "图像技术",
  //                     list: [
  //                       {
  //                         title: "通用目标检测",
  //                         url: routerPath.image_basic,
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //       clearSizeTimer: null,
  //       routerPath,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  methods: {},
  mounted() {
    //canvas的id名，星星颜色(hsla的hue色调)，星星数量，星星半径比，星星移动范围(值越大范围越小)，星星移动速度(值越大速度越慢),星星拖尾效果(0~1值越小拖尾越明显), 监控尺寸改变的节点Selector(默认body)
    /* this.clearSizeTimer = generateCosmos(
      "cosmos",
      230,
      1000,
      60,
      2,
      80000,
      0.5,
      '#containerCont'
    ); */
  },
  beforeDestroy() {
    if (typeof this.clearSizeTimer === "function") this.clearSizeTimer();
  },
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
.container {
  // margin: 0 auto;
  // min-height: 100vh;
  // font-size: 0;

  .container-wrapper {
    display: flex;
    flex-direction: column;
  }

  .container-cont {
    // background: linear-gradient(-45deg, #301670, #3d91a4, transparent);
    // position: absolute;
    // top: 0;

    // left: 0;
    // z-index: 1;
    width: 100%;
    min-width: 1200px;
    min-height: calc(100vh - 72px);
  }
}
.occupay-header {
  height: 72px;
}

/deep/ .el-scrollbar__bar.is-horizontal{
    bottom: -10px
}
</style>
