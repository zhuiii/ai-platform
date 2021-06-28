<template>
  <div class="wf-list">
    <dl class="wf-item" v-for="(item, index) in list" :key="index">
      <template
        v-if="
          Array.isArray(item[keyConfig.children]) &&
          item[keyConfig.children].length > 0
        "
      >
        <dt class="wf-item-title">{{ item[keyConfig.title] }}</dt>
        <!-- <dd
          class="wf-item-link"
          v-for="(citem, cindex) in item[keyConfig.children]"
          :key="index + '-' + cindex"
        >
          <p class="link-hover" @click="handleItemClick(citem, item)">
            <i></i>{{ citem[keyConfig.title] }}
          </p>
        </dd> -->
        <ItemAi
          class="wf-item-link"
          v-for="(citem, cindex) in item[keyConfig.children]"
          :key="index + '-' + cindex"
          :item="citem"
          :fontStyle="itemAiStyle"
          @handleClick="handleItemClick"
        ></ItemAi>
      </template>
    </dl>
  </div>
</template>

<script>
import { waterfallLayout } from "@/assets/js/utils.js";
import ItemAi from "@/components/list/Item/ItemAI.vue";

export default {
  components: {
    ItemAi,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    keyConfig: {
      type: Object,
      default: () => ({
        children: "children",
        title: "title",
        url: "url",
      }),
    },
  },
  data() {
    return {
      itemAiStyle: {
        fontSize: '13px',
        color: '#2b2e2e'
      }
    };
  },
  methods: {
    handleWaterfallLayout() {
      waterfallLayout(".wf-list", ".wf-item", 20, 20);
    },
    handleItemClick(child, parent) {
      this.$emit("handleItemClick", child, parent);
    },
  },
  watch: {
    list(newList) {
      if (!Array.isArray(newList)) return;
      this.$nextTick(() => {
        this.handleWaterfallLayout();
      });
    },
  },
  created() {},
  mounted() {
    // this.handleWaterfallLayout();
  },
};
</script>
<style scoped lang='less'>
.wf-list {
  width: 100%;
  .wf-item {
    width: 180px;
    margin-right: 20px;
    padding: 20px 0 15px 0;
    color: #2b2e2e;
    .wf-item-title {
      padding-bottom: 8px;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid #2b2e2e21;
    }
    .wf-item-link {
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      .link-hover {
        font-size: 13px;
        &:hover {
          color: #0073eb;
        }
      }
    }
  }
}
</style>