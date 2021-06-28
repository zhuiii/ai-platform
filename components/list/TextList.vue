<template>
  <div class="tl-wrap">
    <h5 class="tl-title">
      <nuxt-link v-if="isTitleUrl" :to="data[urlKey]">
        {{ data[titleKey] }}
        <span>
          <i class="el-icon-arrow-right"></i>
          <i class="el-icon-arrow-right"></i>
        </span>
      </nuxt-link>
      <span v-else>{{ data[titleKey] }}</span>
    </h5>
    <ul class="tl-list">
      <li v-for="(listItem, lindex) in data[listKey]" :key="lindex">
        <nuxt-link>{{ listItem[subTitleKey] }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TextList",
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        list: [],
      }),
    },
    isTitleUrl: {
      type: Boolean,
      default: () => false,
    },
    titleKey: {
      type: String,
      default: () => "title",
    },
    subTitleKey: {
      type: String,
      default: () => "title",
    },
    urlKey: {
      type: String,
      default: () => "url",
    },
    listKey: {
      type: String,
      default: () => "list",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.tl-wrap {
  a {
    color: #191c3d;
  }
  .tl-title {
    font-size: 14px;
    color: #191c3d;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    > a {
      display: flex;
      justify-content: space-between;
    }
  }
  .tl-list {
    a {
      opacity: 0.8;
      font-size: 12px;
    }
  }
}
</style>
