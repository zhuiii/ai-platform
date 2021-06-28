<template>
  <div class="list-sort" v-if="Array.isArray(list) && list.length > 0">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in list"
        :key="index"
        :color="this.color"
      >
        <div class="dot" slot="dot">{{ index + 1 }}</div>
        <div class="g-flex">
          <p v-if="typeof item === 'string'">{{ item }}</p>
          <template v-else-if="typeof item === 'object'">{{
            item[dataKey]
          }}</template>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    keyCN: {
      type: Object,
      default: () => ({}),
    },
    dataKey: {
      type: String,
      default: () => "",
    },
    color: {
      type: String,
      default: () => "#0bbd87",
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  color: #fff;
}
</style>