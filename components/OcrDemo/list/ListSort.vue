<template>
  <div class="list-sort" v-if="Array.isArray(list) && list.length > 0">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in list"
        class="timeline"
        :key="index"
      >
        <div class="dot" slot="dot">{{ index + 1 }}</div>
        <div class="g-flex">
          <p v-if="typeof item === 'string'">{{ item }}</p>
          <template v-else-if="typeof item === 'object'">{{
            item.text
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
.list-sort{
  width: 100%;
}
.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  background-color: rgb(22, 130, 253);
}
.timeline {
  color: #fff;
  border-left: #fff;
}
</style>