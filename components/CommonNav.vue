<template>
  <div class="nav-wrap">
    <div
      class="nav-list"
      v-for="(navItem, nindex) in list"
      :key="nindex"
    >
      <span class="nav-title" @click="handleNavClick(navItem.url)" @mouseover="handleNavListOver(navItem)">{{
        navItem.title
      }}</span>
      <div class="nav-sub" v-if="navItem.sub">
        <div class="nav-sub-menu" v-if="navItem.sub.isMenu">
          <div
            :class="[
              'sub-menu-item',
              mindex === activeSubMenuIndex ? 'sub-menu-item-active' : '',
            ]"
            v-for="(menuItem, mindex) in navItem.sub.list"
            :key="mindex"
            @mouseover.stop="handleSubMenuActive(mindex, menuItem.list)"
          >
            <span>{{ menuItem.title }}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="g-f-clr nav-sub-cont">
          <div
            class="sub-cont-item"
            v-for="(subItem, sindex) in subMenuContList"
            :key="sindex"
          >
            <h6>{{ subItem.title }}</h6>
            <ul>
              <li
                class="sub-cont-item_list-item"
                v-for="(subItemLi, silIndex) in subItem.list"
                :key="silIndex"
              >
                <nuxt-link :to="subItemLi.url">{{ subItemLi.title }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonNav",
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: "",
          sub: {
            isMenu: true,
            list: [
              {
                title: "",
                list: [],
              },
            ],
          },
        },
      ],
    },
  },
  data() {
    return {
      activeIndex: 0,
      activeSubMenuIndex: 0,
      subMenuContList: [],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    handleNavListOver({ sub }) {
      if (sub) {
        if (sub.isMenu && sub.list && sub.list[0]) {
          this.activeSubMenuIndex = 0;
          this.subMenuContList = sub.list[0].list || [];
        }
      }
    },
    handleSubMenuActive(subIndex, menuList) {
      this.activeSubMenuIndex = subIndex;
      this.subMenuContList = menuList;
    },
    handleNavClick(url = "") {
      if (url) {
        this.$router.push({
          path: url,
        });
      }
    },
    handleNavActive(nindex) {
      this.activeIndex = nindex;
    },
  },
};
</script>

<style lang="less" scoped>
.nav-wrap {
  margin-top: 20px;
  .nav-active {
    &::after {
      content: "";
      width: 30px;
      height: 2px;
      background-color: #195ff1;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
  .nav-list {
    position: relative;
    display: inline-block;
    padding-bottom: 15px;
    margin-right: 20px;
    &:hover {
      .nav-sub {
        z-index: 1;
        opacity: 1;
      }
      &::after {
        content: "";
        width: 30px;
        height: 2px;
        background-color: #195ff1;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
    .nav-title {
      cursor: pointer;
    }
    .nav-sub {
      display: flex;
      position: absolute;
      left: 0;
      top: 102%;
      z-index: -1;
      opacity: 0;
      transform: translateX(-30%);
      background-color: #fff;
      .nav-sub-menu {
        width: 154px;
        height: 100%;
        background-color: #195ff1;
        position: absolute;
        top: 0;
        bottom: 0;
        .sub-menu-item {
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          cursor: pointer;
          .el-icon-arrow-right {
            display: none;
          }
          &.sub-menu-item-active {
            background-color: rgba(128, 168, 255, 0.6);
            .el-icon-arrow-right {
              display: block;
            }
          }
        }
      }
      .nav-sub-cont {
        min-width: 300px;
        padding: 20px 50px;
        margin-left: 150px;
        .sub-cont-item {
          float: left;
          width: 140px;
          & > h6 {
            display: block;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #191c3d;
            line-height: 26px;
            opacity: 1;
            border-bottom: 1px solid #eeeeee;
            padding: 10px 0;
          }
          .sub-cont-item_list-item {
            padding: 0 0 10px;
            a {
              opacity: 0.8;
              text-align: left;
              line-height: 20px;
              margin-top: 8px;
              font-family: PingFangSC-Regular;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              font-size: 12px;
              color: #191c3d;
              &:hover{
                color: #195ff1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
