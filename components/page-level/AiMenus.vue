<template>
  <div class="g-mg-t-md ai-menus">
    <el-tabs v-model="currentAiId">
      <el-tab-pane
        :name="String(itm.id)"
        v-for="(itm, idx) in aiList"
        :key="idx"
      >
        <div class="ai-menus-head" slot="label" @click="handleAiTabClick(itm)">
          <i :class="tempIcons[idx]"></i>
          <p class="g-mg-t-xs ai-menus-head-label">{{ itm.title }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <ul class="ai-menus-cont">
      <ItemAi
        :class="['ai-sub-item', citm.id == currentSubId ? 'active' : '']"
        :item="citm"
        v-for="(citm, cidx) in currentAiSubs"
        :key="cidx"
        @handleClick="aiPageJump"
      ></ItemAi>
    </ul>
  </div>
</template>

<script>
import MixinRouter from "@/assets/mixin/mixin-router.js";
import ItemAi from "@/components/list/Item/ItemAI.vue";

export default {
  components: {
    ItemAi,
  },
  mixins: [MixinRouter],
  data() {
    return {
      currentAiSubs: null,
      currentAiId: "",
      currentSubId: "",
      tempIcons: [
        "fa fa-street-view",
        "fa fa-text-width",
        "fa fa-child",
        "fa fa-picture-o",
        "fa fa-users",
      ],
    };
  },
  computed: {
    aiList() {
      return this.$store.state.aiList;
    },
  },
  methods: {
    handleAiTabClick({ children = [] } = {}) {
      this.currentAiSubs = children;
    },
    initAiMenu() {
      if (!Array.isArray(this.aiList)) return;
      let currentAi, children, child;
      for (let i = 0; i < this.aiList.length; i++) {
        currentAi = this.aiList[i];
        children = currentAi.children;
        if (Array.isArray(children)) {
          for (let j = 0; j < children.length; j++) {
            child = children[j];
            if (this.isEqualPath(child.url)) {
              this.currentAiId = String(currentAi.id);
              this.currentSubId = String(child.id);
              this.currentAiSubs = children;
              return;
            }
          }
        }
      }
    },
  },
  created() {},
  mounted() {
    this.initAiMenu();
  },
};
</script>
<style scoped lang='less'>
.ai-menus-head-label {
  font-size: 20px;
  font-weight: 400;
}
.ai-menus {
  .ai-menus-head {
    line-height: normal;
    text-align: center;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-left: 1px solid #e4e7ed;
      border-top: 1px solid #e4e7ed;
      background: #fff;
      transform: rotate(45deg);
      position: absolute;
      left: 50%;
      bottom: -5%;
      opacity: 0;
    }
  }
  /deep/ .el-tabs {
    .el-tabs__nav-wrap {
      &::after {
        height: 1px;
      }
    }
    .el-tabs__nav,
    .ai-menus-head {
      padding-bottom: 10px;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size: 22px;
        font-weight: bold;
      }
    }
    .el-tabs__item {
      padding: 0;
      margin: 0 40px;
    }
    .is-active {
      .ai-menus-head {
        &:after {
          opacity: 1;
        }
      }
    }
  }
  .ai-menus-cont {
    display: flex;
    padding: 0 30px 20px;
    .ai-sub-item {
      cursor: pointer;
      margin-right: 4%;
      margin-bottom: 10px;
      p {
        font-size: 14px;
      }
    }
  }
  .fa {
    font-size: 23px;
  }
}
</style>