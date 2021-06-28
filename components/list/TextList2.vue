<template>
  <div class="tl2-wrap">
    <h5 class="tl-title">
      <!-- <nuxt-link v-if="isTitleUrl" :to="data[urlKey]">
        {{ data[titleKey] }}
      </nuxt-link> -->
      <span>{{ data[titleKey] }}</span>
    </h5>
    <ul class="tl-list">
      <li
        :class="{ underline: !!listItem.url }"
        v-for="(listItem, lindex) in data[listKey]"
        :key="lindex"
      >
        <nuxt-link :to="listItem[urlKey]">{{
          listItem[subTitleKey]
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TextList2",
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
.tl2-wrap {
  a {
    color: #191c3d;
  }
  .tl-title {
    font-size: 18px;
    color: #ffffff;
    padding-bottom: 10px;
    margin-bottom: 10px;
    > a {
      display: flex;
      justify-content: space-between;
    }
  }
  .tl-list {
    a {
      color: #ffffff;
      opacity: 0.6;
      font-size: 14px;
      cursor: text;
    }

    & > li {
      line-height: 30px;
      &.underline {
        a {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
