<template>
  <div class="mm-wrap" :id="uniqId">
    <div :class="wrapClsCompu">
      <div
        :class="[
          'mm-item',
          item.class,
          activeIndex === index ||
          (item[keyConfig.url] === routerPath.home
            ? activeRouterPath === item[keyConfig.url]
            : activeRouterPath.indexOf(item[keyConfig.url]) !== -1)
            ? 'active'
            : '',
          item[keyConfig.disable] ? 'disable' : '',
          itemCls,
        ]"
        v-for="(item, index) in list"
        :key="'mm' + index"
        @click="handleItemClick(item, index)"
        @mouseover="handleItemHover(item, index)"
        @mouseleave="handleItemLeave(item, index)"
      >
        <span>{{ item[keyConfig.title] }}</span>
        <i class="el-icon-arrow-down" v-if="item.isShowSub"></i>
        <div class="mm-item-right" v-if="item.isShowItemRight">
          ({{ item.itemRight }})
        </div>
      </div>
    </div>
    <ul class="line-wrap">
      <li class="line-item"></li>
    </ul>
    <div :class="subContCls" @mouseleave="handleSubLeave">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { genID } from "@/assets/js/utils.js";

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    keyConfig: {
      type: Object,
      default: () => ({
        title: "title",
        url: "url",
        disable: "disable",
        isShowSub: "isShowSub",
        isShowItemRight: "isShowItemRight",
        itemRight: "itemRight",
      }),
    },
    // menu || tab
    type: {
      type: String,
      default: () => "",
    },
    wrapCls: {
      type: String,
      default: () => "",
    },
    itemCls: {
      type: String,
      default: () => "",
    },
    toggleReset: Boolean,
  },
  data() {
    return {
      activeIndex: -1, // tab型当前激活下标
      activeRouterPath: "", // menu型当前激活路由
      isShowSub: false,
      uniqId: "",
      tempHoverIndex: -1,
      typeConfg: {
        menu: "menu",
        tab: "tab",
      },
      itemsSelector: "",
    };
  },
  computed: {
    wrapClsCompu() {
      return ["mm-items", this.wrapCls];
    },
    subContCls() {
      return this.isShowSub ? "mm-cont show" : "mm-cont";
    },
  },
  watch: {
    toggleReset(newVal) {
      this.reset();
    },
    list(newList) {
      this.initOperate();
    },
    $route(to, from) {
      // 不是菜单型直接退出
      if (
        this.type !== this.typeConfg.menu &&
        this.activeRouterPath === to.path
      ) {
        return;
      }
      this.activeRouterPath = to.path;
      this.initScrollLine();
      this._getActiveIndex();
    },
  },
  methods: {
    handleItemClick(item, index) {
      if(item && item.noJump) return;
      this._clearTempHoverIndex();
      this.initMenuActive(item[this.keyConfig.url], index);
      item[this.keyConfig.isShowSub]
        ? (this.isShowSub = true)
        : (this.isShowSub = false);
      this.$emit("handleClick", item, index);
    },
    handleItemHover(item, index) {
      if (this.tempHoverIndex === index) return;
      this.tempHoverIndex = index;
      item[this.keyConfig.isShowSub]
        ? (this.isShowSub = true)
        : (this.isShowSub = false);
      this.handleMouseEvent($(this.itemsSelector).eq(this.tempHoverIndex));
      this.$emit("handleHover", item, index);
    },
    handleItemLeave(item, index) {
      this._clearTempHoverIndex();
      if (this.isShowSub) return;
      this._mouseLeaveAnim();
      this.$emit("handleLeave", item, index);
    },
    handleSubLeave() {
      this._mouseLeaveAnim();
    },
    _mouseLeaveAnim() {
      this.isShowSub = false;
      this.handleMouseEvent($(this.itemsSelector).eq(this._getActiveIndex()));
    },
    // 获取当前激活项索引
    _getActiveIndex() {
      return $(this.itemsSelector).index($("#" + this.uniqId + " .active"));
    },
    _clearTempHoverIndex() {
      this.tempHoverIndex = -1;
    },
    initMenuActive(url, index) {
      if (this.type === "menu") {
        if (url) this.activeRouterPath = url;
        return;
      }
      this.activeIndex = index === -1 ? 0 : index;
    },
    initScrollLine() {
      const vmThis = this;
      this.$nextTick(function () {
        vmThis.handleMouseEvent($("#" + vmThis.uniqId + " .active"));
      });
    },
    handleMouseEvent(jqObj) {
      if (!(jqObj instanceof $) || !jqObj.position()) return;
      const $this = jqObj;
      const paddingLeft = parseInt($this.css("paddingLeft"));
      const marginLeft = parseInt($this.css("marginLeft"));
      const borderLeft = parseInt($this.css("borderLeftWidth"));
      $("#" + this.uniqId + " .line-item").css({
        width: $this.width(),
        left: $this.position().left + paddingLeft + marginLeft + borderLeft,
      });
    },
    bindEvent() {
      const vmThis = this;
      const uniqId = "#" + vmThis.uniqId;
      const itemCls = uniqId + " .mm-item:not(.disable)";
      $(itemCls).on("mouseover", function () {
        vmThis.handleMouseEvent($(this));
      });
      $(itemCls).on("mouseleave", function () {
        vmThis.handleMouseEvent($(uniqId + " .mm-item.active"));
      });
    },
    // 状态复原
    reset() {
      const $item0 = $("#" + this.uniqId + " .mm-item:first-child");
      if ($item0) {
        $item0.click();
        this.handleMouseEvent($item0);
      }
    },
    initOperate() {
      if (this.uniqId) {
        this.itemsSelector = "#" + this.uniqId + " .mm-item";
        this.$nextTick(() => {
          // this.bindEvent();
          this.initScrollLine();
        });
      }
    },
  },
  created() {},
  mounted() {
    this.uniqId = genID();
    this.initMenuActive(this.$route.path, this._getActiveIndex());
    this.initOperate();
    this.$emit("hasReady", this);
  },
};
</script>
<style scoped lang='less'>
  .mm-wrap {
    position: relative;
  }

  .line-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .line-item {
    height: 4px;
    background: cornflowerblue;
    transition: all 0.2s ease-in-out;
    position: relative;
    left: 0;
    top: 0;
    width: 0;
  }

  .mm-item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding: 9px 0 9px 50px;
    color: #5f6464;

    &:not(.disable):hover,
    &.active {
      color: cornflowerblue;
      
      span {
        color: cornflowerblue;
      }
    }

    &.disable {
      cursor: not-allowed;
      color: #c3c3c3;
    }
    .mm-item-right {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      color: #999999;
      font-size: 14px;
      margin-left: 2px;
    }
  }

  .mm-cont {
    width: 100%;
    max-height: 0;
    box-shadow: -3px 3px 3px #0000003d;
    left: 0;
    top: 72px;
    position: fixed;
    background: #fff;
    transition: all 0.2s ease-in-out;
    overflow: hidden;

    &.show {
      max-height: 100%;
      padding: 20px 0;
    }
  }
</style>