<template>
  <!-- ai导航栏 -->
  <div class="square-nav-wrapper">
    <div class="square-nav-box">
      <div class="square-wrapper">
        <div
          :class="['square-item', active === index && 'square-item-active']"
          v-for="(item, index) in navList"
          :key="`square-${index}`"
          @click="switchActive(index)"
        >
          <img class="square-icon" :src="item.defaultIconUrl" />
          <div class="square-title">{{ item.title }}</div>
        </div>
      </div>
      <div
        class="nav-detail"
        :class="{ padding: aiList[active].children.length > 0 }"
      >
        <template v-if="!!aiList">
          <div
            :class="['nav-item', curPath === item.url && 'nav-item-active']"
            v-for="(item, index) in aiList[active] && aiList[active].children"
            :key="`alItem-${index}`"
            @click="switchNav(item, active)"
          >
            <!-- <img src="" alt="" /> -->
            <p class="item-name">{{ item.title }}</p>
            <!-- <i class="el-icon-right"></i> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import targetDefault from "@/static/newui/nav/target-default.png";
import targetActive from "@/static/newui/nav/target-active.png";
import imgidentifyDefault from "@/static/newui/nav/imgidentify-default.png";
import imgidentifyActive from "@/static/newui/nav/imgidentify-active.png";
import fontDefault from "@/static/newui/nav/font-default.png";
import fontActive from "@/static/newui/nav/font-active.png";
import attributeDefault from "@/static/newui/nav/attribute-default.png";
import attributeActive from "@/static/newui/nav/attribute-active.png";
import imgdealDefault from "@/static/newui/nav/imgdeal-default.png";
import imgdealActive from "@/static/newui/nav/imgdeal-active.png";
import biologyDefault from "@/static/newui/nav/biology-default.png";
import biologyActive from "@/static/newui/nav/biology-active.png";
import voiceDefaultDefault from "@/static/newui/nav/voice-default.png";
import voiceActive from "@/static/newui/nav/voice-active.png";
// 背景图
import targetBg from "@/static/banner/bg1.png";
import fontBg from "@/static/banner/bg2.png";
import attributeBg from "@/static/banner/bg3.png";
import imgdealBg from "@/static/banner/bg4.png";
import biologyBg from "@/static/banner/bg5.png";
import voiceBg from "@/static/banner/bg6.png";

export default {
  name: "CommonSquareNav",
  props: {},
  data() {
    return {
      active: 0,
      navList: [
        {
          title: "目标检测",
          defaultIconUrl: targetDefault,
          activeIconUrl: targetActive,
          bgUrl: targetBg,
        },
        // {
        //     title: '图像识别',
        //     defaultIconUrl: imgidentifyDefault,
        //     activeIconUrl: imgidentifyActive
        // },
        {
          title: "文字识别",
          defaultIconUrl: fontDefault,
          activeIconUrl: fontActive,
          bgUrl: fontBg,
        },
        {
          title: "属性分析",
          defaultIconUrl: attributeDefault,
          activeIconUrl: attributeActive,
          bgUrl: attributeBg,
        },
        {
          title: "图像处理",
          defaultIconUrl: imgdealDefault,
          activeIconUrl: imgdealActive,
          bgUrl: imgdealBg,
        },
        {
          title: "生物特征识别",
          defaultIconUrl: biologyDefault,
          activeIconUrl: biologyActive,
          bgUrl: biologyBg,
        },
        {
          title: "语音技术",
          defaultIconUrl: voiceDefaultDefault,
          activeIconUrl: voiceActive,
          bgUrl: voiceBg,
        },
      ],
    };
  },
  computed: {
    aiList() {
      // console.log(this.$store.state.aiList);
      return this.$store.state.aiList;
    },
    curPath() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (!val.query.squareActive) return;
        this.active = Number(val.query.squareActive);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {
    switchActive(index) {
      if (index === this.active) return;
      this.active = index;
      if (this.navList[index].bgUrl) {
        this.$emit("changeBg", this.navList[index].bgUrl);
      }
    },
    switchNav(navInfo, active) {
      const queryPart = this.aesEncrypt({
        i: navInfo.id,
        n: navInfo.title,
      });
      const query = Object.assign(queryPart, { squareActive: active });
      this.$router.push({
        path: navInfo.url,
        query,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.square-nav-wrapper {
  margin-top: -4px;
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  transform: translateY(-70px);
  .square-nav-box {
    box-shadow: 0px 0px 10px 0px rgba(12, 12, 12, 0.19);
  }

  .square-wrapper {
    border-radius: 8px 8px 0 0;
    width: 1190px;
    height: 70px;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #bfbfbf;

    .square-item {
      //   width: 170px;
      width: 16.67%;
      height: 70px;
      display: flex;
      //   flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
      &:nth-child(1) {
        border-radius: 8px 0 0 0;
      }

      .square-icon {
        width: 28px;
        height: 28px;
      }

      .square-title {
        // margin-top: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        margin-left: 10px;
      }

      // &:not(:last-child) {
      //   &::after {
      //     content: "";
      //     height: 25%;
      //     width: 1px;
      //     background-color: #ddd;
      //     position: absolute;
      //     right: -1px;
      //     top: 37.5%;
      //   }
      // }

      &.square-item-active {
        // background-color: #0073eb;
        .square-title {
          color: #4a81ff;
        }
      }
      &.square-item-active::after {
        transition: 0.5s width;
        position: absolute;
        top: 66px;
        left: 50%;
        transform: translateX(-50%);
        content: "";
        width: 109px;
        height: 4px;
        background-color: #4a81ff;
      }
    }
  }

  .nav-detail {
    width: 1190px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border-radius: 8px;

    // transform: translateY(-50px);

    .nav-item {
      width: 120px;
      margin-right: 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      transition: all 0.5s;
      color: #444444;
      background-color: transparent;
      position: relative;
      cursor: pointer;
      > img {
        width: 120px;
        height: 120px;
        border-radius: 4px;
        background-color: #bfbfbf;
      }
      &:nth-child(7n) {
        margin-right: 0px;
      }
      .item-name {
        margin-top: 10px;
        width: 120px;
        height: 42px;
        line-height: 42px;
        border-radius: 21px;
        text-align: center;
        border: 1px solid #f3f3f3;
        transition: all 0.5s;
      }

      .el-icon-right {
        opacity: 0;
        transition: all 0.5s;
        position: absolute;
        right: 15px;
        top: 22.5px;
        color: #3388ff;
      }

      &:hover {
        .item-name {
          color: #fff;
          background-color: #4a81ff;
        }

        .el-icon-right {
          opacity: 1;
        }
      }

      &.nav-item-active {
        // width: 210px;
        // height: 60px;
        .item-name {
          color: #fff;
          background-color: #4a81ff;
        }

        &:hover {
          .el-icon-right {
            opacity: 0;
          }
        }
      }
    }
  }
  .padding {
    padding: 40px 43px 0 43px;
  }
}
</style>
