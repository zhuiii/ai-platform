<template>
  <!-- 右侧图片展示swiper -->
  <div class="thumb-casousel" v-show="listCompu && listCompu.length > 0">
    <div v-for="(v, i) in listCompu" :key="i" class="item_list">
      <img :src="v" alt="" />
      <ListKeyValue :info="info" :valKeyConfig="keyCN" dataKey="">
      </ListKeyValue>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 路径数组或含src对象数组
    list: {
      type: Array,
      default: () => [],
    },
    // 数据中文键配置
    keyCN: {
      type: Object,
      default: () => ({}),
    },
    //   [{key:val}]
    info: {
      type: Object | Array,
      default: () => ({}),
    },
  },
  computed: {
    listCompu() {
      this.clearData();
      return this.list || [];
    },
  },
  watch: {
    info: {
      handler(newList) {
        // if (newList) {
        //   this.tabs = newList;
        // } else {
        //   this.tabs = [];
        // }
        console.log(this.info);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      choseIndex: 0,
    };
  },
  methods: {
    clearData() {
      this.choseIndex = 0;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.thumb-casousel {
  overflow-y: auto;
  height: 98%;
  // max-height: 705px;
  // background: #f8f8f8;
  // border: 1px solid #eeeeee;
  .item_list {
    padding: 8px 0;
    display: flex;
    align-items: center;
    img {
      width: 120px;
      height: 98px;
      object-fit: contain;
      margin-right: 10px;
    }
  }
}
</style>