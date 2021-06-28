<template>
  <div class="head-banner">
    <img class="bg-img" :src="bg"/>
    <div class="text-cont">
      <h2 class="g-mg-b-xs tc-title">{{ title }}</h2>
      <p class="tc-desc" v-for="(item, index) in descs" :key="index">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bg: String,
    title: String,
    descs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    bgStyle() {
      return {
        backgroundImage: `url(${this.bg})`,
      };
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
.head-banner {
  position: relative;
  // height: 260px;
  // background-repeat: no-repeat;
  // background-size: cover;
  
  .bg-img {
    width: 100%;
    // height: 426px;
    object-fit: cover;
  }

  .text-cont {
    position: absolute;
    top: 33%;
    left: 28%;
    color: #fff;
    font-weight: 400;
    // padding-top: 59px;
    // padding-left: 59px;
    z-index: 1;
  }

  .tc-title {
    color: inherit;
    font-size: 36px;
  }

  .tc-desc {
    color: inherit;
    font-size: 15px;
    line-height: 24px;
  }
}
</style>