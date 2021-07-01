<template>
  <div class="bottom-copyright-box">
    <div class="copy-right" :style="customStyle">
      Copyright Since 1997 盛视科技股份有限公司
    </div>
    <a
      class="copy-right cursor"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      :style="customStyle"
    >
      粤ICP备09136412号-1
    </a>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
  props: ["color", "opacity"],
  data() {
    return {};
  },
  computed: {
    customStyle() {
      return {
        color: this.color,
        opacity: this.opacity,
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.bottom-copyright-box {
  display: flex;
  justify-content: center;
}
.copy-right {
  font-size: 12px;
  margin-right: 18px;
  opacity: 0.4;
  color: #fff;
  /* padding-top: 20px; */
}
.cursor:hover {
  color: #fff;
  opacity: 1;
}
</style>
