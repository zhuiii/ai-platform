<template>
  <div class="ocr-demo-tab">
    <ul class="flex-center-center tab-wrap">
      <li
        :class="[
          'tab-item',
          tabActiveIndex === tindex ? 'tab-item-active' : '',
        ]"
        v-for="(tab, tindex) in tabList"
        :key="`tab${tindex}`"
        @click="handleTabChange(tindex)"
      >
        <span v-if="!tab[keyConfig[hide]]">{{ tab[keyConfig[label]] }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    keyConfig: {
      type: Object,
      default: () => ({
          label: 'label',
          hide: 'hide'
      }),
    }
  },
  data() {
    return {
      tabActiveIndex: 0,
    };
  },
  methods: {
    handleTabChange(index) {
      if (this.tabActiveIndex === index) return;
      this.tabActiveIndex = index;
      this.$emit('handleTabChange', {...this.tabList[index]})
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.ocr-demo-tab {
  .tab-wrap {
    .tab-item {
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 2%;
      }
      &:not(.tab-item-active) {
        &:hover {
          color: #036fe2;
        }
      }
      &.tab-item-active {
        color: #036fe2;
        font-weight: 700;
        font-size: 20px;
      }
    }
  }
}
</style>