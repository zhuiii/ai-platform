<template>
  <div class="vtl-wrap">
    <table border="0">
      <tr
        class="vtl-row"
        v-for="(item, index) in list"
        :key="'vtl-row-' + index"
      >
        <td class="vtl-col vtl-row-label">{{ item[labelKey] }}</td>
        <td class="vtl-col vtl-row-val">
          <span>{{ item[valueKey] }}</span>
          <template v-if="item[tipKey]">
            <el-tooltip
              class="tooltip-item"
              effect="dark"
              :content="item[tipKey]"
              placement="top"
            >
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: () => "label",
    },
    valueKey: {
      type: String,
      default: () => "value",
    },
    tipKey: {
      type: String,
      default: () => "tip",
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
table {
  width: 100%;
}
.vtl-row {
  .vtl-col {
    height: 32px;
    vertical-align: middle;
    font-size: 14px;
    color: rgb(39, 39, 39);
  }
  .vtl-row-label {
    padding-right: 10%;
    white-space: nowrap;
    text-align: right;
  }
  .tooltip-item {
      display: inline-block;
      font-size: 20px;
      cursor: pointer;
      color: rgb(248, 52, 91);
  }
}
</style>