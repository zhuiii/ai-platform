<template>
  <div class="list-panel" :id="uniqId">
    <slot name="head"></slot>
    <div class="cont-wrap">
      <div class="pos lp-left">
        <ul class="nav-wrap">
          <li
            :class="['lp-nav-item', activeIndex === index ? 'left-active' : '']"
            v-for="(item, index) in list"
            :key="'lp' + index"
            @click="handleClick(item, index)"
          >
            <template v-if="type === 'image'">
              <img
                class="item-image"
                :src="typeof item === 'string' ? item : item[srcKey]"
                alt=""
                v-if="typeof item === 'string' || item[srcKey]"
              />
              <div v-else :style="{width: item.width / 2 + 'px', height: item.height / 2 + 'px'}">图{{index + 1}}</div>
            </template>
            <span v-else-if="type === 'text'">{{
              typeof item === "string" ? item : item[titleKey]
            }}</span>
          </li>
        </ul>
      </div>
      <div class="lp-right">
        <slot name="cont"></slot>
      </div>
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
    titleKey: {
      type: String,
      default: () => "title",
    },
    srcKey: {
      type: String,
      default: () => "src",
    },
    // 导航类型 image | text
    type: {
      type: String,
      default: () => "",
    },
    // 变换该值，右侧marginTop复原
    restoreTopToggle: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    listCmputed() {
      return this.list;
    },
  },
  watch: {
    restoreTopToggle(newVal) {
      this.topRestore();
    },
  },
  data() {
    return {
      activeIndex: 0,
      uniqId: "",
    };
  },
  methods: {
    handleClick(item, index) {
      this.activeIndex = index;
      this.setRightTop(index);
      this.$emit("handleClick", item, index);
    },
    setRightTop(index) {
      const wrapDom = document.getElementById(this.uniqId);
      if (!wrapDom) return;
      const leftItemDoms = wrapDom.getElementsByClassName("lp-nav-item");
      const currentItem = leftItemDoms[index];
      let tempItem, top = 0;
      for(let i = 0; i < index; i++) {
        tempItem = leftItemDoms[i];
        top += tempItem.offsetHeight;
      }
      wrapDom.getElementsByClassName("lp-right")[0].style.marginTop = top + "px";
    },
    topRestore() {
      Array.from(document.getElementsByClassName("lp-right")).forEach((dom) => {
        dom.style.marginTop = "0px";
      });
      this.activeIndex = 0;
    },
  },
  created() {},
  mounted() {
    this.uniqId = genID();
  },
};
</script>
<style scoped lang='less'>
.list-panel {
  width: 100%;
  background-color: #fff;
  font-size: 16px;
  .cont-wrap {
    display: flex;
    border-top: 2px solid rgb(71, 144, 255);
    .lp-left {
      max-width: 30%;
      border-right: 2px solid rgb(71, 144, 255);
      background-color: rgb(236, 236, 236);
      flex-shrink: 0;
      .nav-wrap {
        .lp-nav-item {
          text-align: center;
          padding: 10px;
          background-color: rgb(236, 236, 236);
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease-in;
          box-sizing: border-box;
          cursor: pointer;
          .item-image {
            max-height: 50%;
            max-width: 50%;
          }
          &.left-active {
            background-color: #fff;
            border-top: 2px solid rgb(71, 144, 255);
            border-bottom: 2px solid rgb(71, 144, 255);
            margin-right: -3px;
          }
          &:first-child {
            border-top: 0;
          }
        }
      }
    }
    .lp-right {
      margin-left: 3%;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>