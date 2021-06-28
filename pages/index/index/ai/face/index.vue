<template>
  <div class="face-page-wrap">
    <!-- <div class="g-center backhome">
      <CommButton
        label="返回"
        width="80px"
        height="40px"
        fsize="18px"
        :isAnimate="true"
        @handleClick="backHome"
      ></CommButton>
    </div> -->
    <!-- <div class="g-mg-b-md g-center">
      <InnerPageHeadBanner :bg="bgPic"></InnerPageHeadBanner>
    </div> -->
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
// import bgPic from "@/static/banner/banner-face-ocr.png";

export default {
  data() {
    return {
    };
  },
  methods: {
    backHome() {
      this.$router.push({
        path: this.routerPath.home_ai,
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'></style>