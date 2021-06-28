<template>
  <div class="table-wrap">
    <div class="final-result">
      <div class="censor-result censor-pass" v-if="isPass">
        <i class="el-icon-circle-check"></i>
        <span class="">审核通过</span>
      </div>
      <div class="censor-result censor-fail" v-else>
        <i class="el-icon-circle-close"></i>
        <span>审核不通过</span>
      </div>
    </div>
    <table border="0" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th class="table-head">审核维度</th>
          <th class="table-head">状态</th>
          <th class="table-head">置信度</th>
          <th class="table-head">违禁词</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td class="table-cell">{{ item[keyConfig.labelText] }}</td>
          <td
            :class="['table-cell', item[keyConfig.reject] ? 'cell-reject' : 'cell-pass']"
          >
            {{ item[keyConfig.statusText] }}
          </td>
          <td class="table-cell">{{ item[keyConfig.score] }}</td>
          <td class="table-cell">
            <span v-if="item[keyConfig.hit] && item[keyConfig.hit].length > 0">有</span>
            <span class="cell-grey" v-else>无</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
      isPass: {
          type: Boolean,
          default: () => false
      },
      list: {
          type: Array,
          default: () => []
      },
      keyConfig: {
          type: Object,
          default: () => ({
              labelText: 'labelText',
              reject: 'reject',
              statusText: 'statusText',
              score: 'score',
              hit: 'hit'
          })
      }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.table-wrap {
  table {
    width: 100%;
    color: #363636;
  }
  .table-head {
    font-size: 14px;
    color: #666;
    opacity: 0.8;
    font-weight: normal;
    &:nth-child(1) {
      text-align: left;
    }
  }
  .table-cell {
    line-height: 2.5;
    &:not(:nth-child(1)) {
      text-align: center;
    }
  }
  .cell-reject {
    color: #f03b35;
  }
  .cell-pass {
    color: #00b359;
  }
  .cell-grey {
    color: #666;
  }
  .final-result {
    font-weight: 700;
    margin-bottom: 20px;
    i {
      font-size: 22px;
      margin-right: 6px;
    }
    span {
      font-size: 20px !important;
    }
    .censor-result {
      display: flex;
      align-items: center;
    }
    .censor-pass {
      color: #00b359;
    }
    .censor-fail {
      color: #f03b35;
    }
  }
}
</style>