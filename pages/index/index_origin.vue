<template>
  <div class="container">
    <div class="g-center">
      <CommHeader></CommHeader>
      <CommonNav :list="navList"></CommonNav>
    </div>
    <nuxt-child></nuxt-child>
    <CommFooter></CommFooter>
  </div>
</template>

<script>
import CommonNav from "@/components/CommonNav.vue";
import CommHeader from "@/components/CommHeader.vue";
import CommFooter from '@/components/CommFooter.vue'
import routerPath from '@/assets/js/routerPath.js'
export default {
  components: {
    CommonNav,
    CommHeader,
    CommFooter
  },
  data() {
    return {
    };
  },
  async asyncData({ app: { $axios } }) {
    // const listData = $axios.get('/navlist')

    return {
      navList: [
        {
          title: "最新活动",
          sub: null,
          url: "#",
        },
        {
          title: "产品",
          sub: {
            isMenu: true,
            list: [
              {
                title: "人工智能",
                list: [
                  {
                    title: "OCR文字识别",
                    list: [
                      {
                        title: '身份证识别',
                        url: routerPath.ocr_idcard
                      },
                      {
                        title: '通用文字识别',
                        url: routerPath.ocr_basic
                      },
                      {
                        title: '银行卡识别',
                        url: routerPath.ocr_bankcard
                      },
                      {
                        title: '驾驶证识别',
                        url: routerPath.ocr_drivingLicense
                      },
                      {
                        title: '行驶证识别',
                        url: routerPath.ocr_vehicleLicense
                      },
                      {
                        title: '车牌识别',
                        url: routerPath.ocr_plateLicense
                      },
                      {
                        title: '营业执照识别',
                        url: routerPath.ocr_businessLicense
                      },
                      {
                        title: '通用票据识别',
                        url: routerPath.ocr_receipt
                      },
                    ]
                  },
                  {
                    title: "人脸与人体识别",
                    list: [
                      {
                        title: '人脸质量检测',
                        url: routerPath.face_quality
                      }
                    ]
                  },
                  {
                    title: "图像技术",
                    list: [
                      {
                        title: '通用目标检测',
                        url: routerPath.image_basic
                      }
                    ]
                  },
                ],
              }
            ],
          },
        },
      ],
    };
  },
};
</script>

<style>
img {
  width: 100%;
  height: 100%;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 20px;
}
</style>
