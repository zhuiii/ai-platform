<template>
  <div class="footer-wrap">
    <!-- <div class="footer-center">
      <div class="g-center footer-up">
        <div class="up-left">
          <div
            class="up-left-item"
            v-for="(item, index) in mainLinks"
            :key="index"
          >
            <TextList2 :data="item"></TextList2>
          </div>
        </div>
        <div class="up-right">
          <h5>关注我们</h5>
          <ul>
            <li>
              <p>公众号</p>
              <div class="qrcode"><img src="https://0.rc.xiniu.com/g1/M00/94/A5/CgAGTFiYC0CAIAc_AAAdVWp4dbo083.png" alt="" /></div>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <!-- <div class="footer-center">
      <div class="g-center footer-middle">
        <div
          class="middle-item"
          v-for="(item, index) in moreLinks"
          :key="index"
        >
          <p class="middle-item-title">{{ item.title }}：</p>
          <ul class="g-f-clr middle-item-list">
            <li v-for="(mitem, mindex) in item.list" :key="mindex">
              <nuxt-link class="text-underline" :to="mitem.url">{{ mitem.title }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <div class="footer-center">
      <div class="g-center">
        <CopyRight></CopyRight>
      </div>
    </div>
  </div>
</template>

<script>
import TextList2 from "@/components/list/TextList2.vue";
import CopyRight from '@/components/CopyRight.vue'
import { hostPrefix } from '@/assets/js/constConfig.js'


export default {
  name: "CommFooter",
  components: {
    TextList2,
    CopyRight
  },
  data() {
    return {
      mainLinks: [
        {
          title: "关于盛视",
          list: [
            {
              title: "公司概况",
              url: "",
            },
            {
              title: "企业文化",
              url: "",
            },
            {
              title: "资质荣誉",
              url: "",
            },
          ],
        },
        {
          title: "快速入口",
          list: [
            {
              title: "首页",
              url: "",
            },
            {
              title: "操作台",
              url: "",
            }
          ],
        },
        {
          title: "友情链接",
          list: [
            {
              title: "盛视官网",
              url: "http://www.maxvision.com.cn/",
            }
          ],
        },
        {
          title: "联系我们",
          list: [
            {
              title: "热线（4001-800-969）",
              url: 'no-jump',
            },
            
          ],
        },
      ],
      moreLinks: [
        {
          title: "热门产品",
          list: [
            {
              title: "云服务器",
              url: "",
            },
            {
              title: "对象存储",
              url: "",
            },
            {
              title: "边缘计算",
              url: "",
            },
          ],
        },
        {
          title: "人工智能",
          list: [
            {
              title: "人脸识别",
              url: "",
            },
            {
              title: "语音识别",
              url: "",
            },
            {
              title: "图像识别",
              url: "",
            },
          ],
        },
        {
          title: "友情链接",
          list: [
            {
              title: "盛视大脑",
              url: "",
            },
            {
              title: "盛视AI市场",
              url: "",
            },
            {
              title: "开发者中心",
              url: "",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.footer-wrap {
  width: 100%;
  background-color: #373f5e;
  padding: 20px 0;
  .footer-center {
    width: 1300px;
    margin: 0 auto;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .footer-up {
    padding-bottom: 20px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .up-left,
    .up-left-item {
      float: left;
    }
    .up-left-item {
      margin-right: 125px;
    }
    .up-right {
      float: right;
      & > h5 {
        font-size: 18px;
        color: #ffffff;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      & > ul {
        & > li {
          float: left;
          &:first-child {
            margin-right: 36px;
          }
          & > p {
            color: #ffffff;
            opacity: 0.6;
            font-size: 14px;
            line-height: 30px;
            margin-bottom: 10px;
          }
          .qrcode {
            width: 80px;
            height: 80px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .footer-middle {
    padding: 20px 0;
    .middle-item {
      font-size: 12px;
      line-height: 24px;
      color: #ffffff;
      a {
        font-size: 12px;
        color: #ffffff;
        opacity: 0.6;
        line-height: 24px;
      }
      .middle-item-title {
        float: left;
        width: 100px;
        text-align: left;
      }
      .middle-item-list {
        padding-left: 87px;
        & > li {
          float: left;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
