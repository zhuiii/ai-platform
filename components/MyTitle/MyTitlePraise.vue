<template>
  <div class="flex-between-center g-mg-b-sm mtp">
    <!-- <h2 class="tl-sec-2 font-size--md g-color--black">{{ title }}</h2> -->
    <h2></h2>
    <!-- 点赞 -->
    <div class="mtp-praise">
      <MyPraise
        :goodNum="goodNum"
        :badNum="badNum"
        @handlePraise="handlePraise"
      ></MyPraise>
    </div>
  </div>
</template>

<script>
import MixinCompoPraise from "@/assets/mixin/mixin-compo-praise.js";

/* 带点赞功能标题组件 */
export default {
  mixins: [MixinCompoPraise],
  props: {
    title: String,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
</style>