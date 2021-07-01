<template>
  <div class="header-wrap">
    <div class="header-main">
      <div class="logo">
        <nuxt-link :to="routerPath.home">
          <img class="logo-img" src="@/static/logo-white.png" alt="" />
          <span class="line"></span>
          <span class="title">AI 开放平台</span>
        </nuxt-link>
      </div>
      <div class="header-right">
        <!-- <div class="desc">助力国家人工智能建设 免费开放所有Al算法云服务</div> -->
        <div class="desc">
          <!-- <p>助力国家人工智能建设 免费开放所有Al算法云服务</p> -->
          <div class="control-box">
            <p @click="onJumpUrl">控制台</p>
            <!-- <div class="user-control">
              <p class="active" @click="onJumpUrl">登录</p>
              <p class="active" @click="onJumpUrl">注册</p>
            </div> -->
          </div>
        </div>

        <div class="nav">
          <el-tabs v-model="tabValue" @tab-click="tabClick">
            <el-tab-pane label="首页" name="home" />
            <el-tab-pane label="AI体验中心" name="ai" />
            <!-- <el-tab-pane label="快速入门" name="new" /> -->
            <!-- <el-tab-pane label="应用案例" name="application" /> -->
            <!-- <el-tab-pane label="控制台" name="control" />
            <el-tab-pane label="登录" name="login" />
            <el-tab-pane label="注册" name="register" /> -->
          </el-tabs>
          <!-- <MyMenu
            :list="menuList"
            type="menu"
            :toggleReset="toggleResetMenu"
            @handleClick="handleMenuClick"
            @handleHover="handleMenuHover"
            @handleLeave="handleMenuLeave"
            @hasReady="handleMenuReady"
          >
            <div class="g-center">
              <ListWaterFall
                :list="subMenuList"
                childKey="children"
                titleKey="title"
                @handleItemClick="handleWaterFallClick"
              ></ListWaterFall>
            </div>
          </MyMenu> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinRouter from "@/assets/mixin/mixin-router.js";

export default {
  name: "CommHeader",
  mixins: [mixinRouter],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  created: function () {
    if (this.$route.path == "/") {
      // console.log(this.$route.path);
      this.tabValue = "home";
    } else{
      this.tabValue = "ai";
    }
  },
  watch: {
    $route(to, from) {
      // console.log("route change ", to, from);
      if (!from.path || from.path === this.routerPath.home) return;

      if (to.path === "/") {
        this.tabValue = "home";
      }
    },
  },
  computed: {
    menuList() {
      return [
        {
          title: "AI能力",
          url: "/ai",
          disable: false,
        },
        {
          title: "应用案例",
          url: this.routerPath.hoem_case,
          disable: false,
        },
      ];
    },
  },
  data() {
    return {
      searchValue: "",
      toggleResetMenu: false,
      subMenuList: [],
      isScroll: false,
      myMenu: null,
      tabValue: "",
    };
  },
  methods: {
    tabClick() {
      // if (!noJump && url) this.$router.push({ path: url })

      switch (this.tabValue) {
        case "home":
          // 默认进入 通用目标检测
          this.$router.push({ path: this.routerPath.home });
          break;
        case "ai":
          // 默认进入 通用目标检测
          this.$router.push({
            path: "/ai/ocr/basic",
            query: this.aesEncrypt({
              i: 36,
              n: "通用文字识别",
            }),
          });
          break;
        case "application":
          this.$router.push({ path: this.routerPath.hoem_case });
          break;
        default:
          // window.location.href = "http://192.168.103.227:81";
          window.open("http://192.168.103.227:81", "_blank");
      // window.open("http://ai.maxvision.com.cn/console", "_blank");

      }
    },
    onJumpUrl() {
      // window.open("http://ai.maxvision.com.cn/console", "_blank");
      window.open("http://192.168.103.227:81", "_blank");

    },
    handleMenuHover({ children }, index) {
      this.subMenuList = children || [];
    },
    handleMenuLeave({ children }, index) {
      this.subMenuList = [];
    },
    handleWaterFallClick(child, parent) {
      this.myMenu.handleSubLeave();
      this.$router.push({
        path: child.url,
        query: this.aesEncrypt({
          i: child.id,
          n: child.title,
        }),
      });
    },
    // 菜单挂载完毕回调，返回菜单组件实例
    handleMenuReady(myMenu) {
      this.myMenu = myMenu;
    },
  },
  mounted() {
    // const _vthis = this;
    // $(window).scroll(function (event) {
    //   if ($(window).scrollTop() !== 0 && _vthis.isScroll) return;
    //   else if ($(window).scrollTop() !== 0) return (_vthis.isScroll = true);
    //   _vthis.isScroll = false;
    // });
  },
};
</script>

<style scoped lang="less">
.header-wrap {
  min-width: 1300px;
  width: 100%;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  // box-shadow: 0px 7px 7px -7px #b0b0b0;
  // padding: 14px 0;
  background-color: transparent;

  .header-main {
    padding-left: 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-width: 1200px;

    .logo {
      margin-right: 40px;
      color: #fff;

      & > a {
        display: flex;
        align-items: center;
        height: 100%;

        .line {
          margin: 0 20px;
          width: 2px;
          height: 35px;
          background-color: #fff;
        }

        .title {
          font-size: 20px;
          font-weight: bold;
          line-height: 31px;
          color: #fff;
        }
      }

      .logo-img {
        width: 115px;
      }

      &:hover {
        animation: jello 1s;
      }
    }

    .header-right {
      height: 100%;
      flex: 1;
      color: #fff;

      .desc,
      .nav {
        display: flex;
        align-items: center;
      }

      .desc {
        justify-content: flex-end;
        height: 50%;
        // padding-right: 25%;
        border-bottom: 1px solid #949496;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        .control-box {
          margin-left: 155px;
          display: flex;
          height: 100%;
          font-size: 16px;
          align-items: center;
          > p {
            width: 77px;
            text-align: center;
            cursor: pointer;
          }
          .user-control {
            display: flex;
            height: 100%;
            align-items: center;
            .active {
              height: 100%;
              width: 77px;
              text-align: center;
              line-height: 50px;
              cursor: pointer;
              border-left: 1px solid #949496;

              &:hover {
                background-color: #3388ff;
              }
            }
          }
        }
      }

      .nav {
        height: 50%;
        padding-left: 80px;

        /deep/ .el-tabs__active-bar {
          background-color: #fff;
        }

        /deep/ .el-tabs__item {
          color: #fff;
        }

        /deep/ .el-tabs__nav-wrap {
          &::after {
            height: 0;
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
