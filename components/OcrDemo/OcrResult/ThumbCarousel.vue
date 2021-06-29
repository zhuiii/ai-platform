<template>
<!-- 右侧图片展示swiper -->
  <div class="thumb-casousel" v-show="listCompu && listCompu.length > 0">
    <div v-for="(v,i) in listCompu" :key="i" class="item_list">
      <img :src="v" alt="" >
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
  },
  computed: {
    listCompu() {
      this.clearData();
      return this.list || [];
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
  background: #F8F8F8;
  border: 1px solid #EEEEEE;
  .item_list {
    img {
      width: 120px;
      height: 98px;
      object-fit: contain;
    }
  }
  
}
</style>