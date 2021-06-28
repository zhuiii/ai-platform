<template>
  <div class="copy-right" :style="customStyle">© 2020 盛视科技</div>
</template>

<script>
export default {
  name: "CopyRight",
  props: ['color', 'opacity'],
  data() {
    return {};
  },
  computed: {
      customStyle() {
          return {
              color: this.color,
              opacity: this.opacity,
          }
      }
  },
  methods: {},
};
</script>

<style scoped>
.copy-right {
  font-size: 12px;
  opacity: 0.4;
  color: #fff;
  /* padding-top: 20px; */
}
</style>
