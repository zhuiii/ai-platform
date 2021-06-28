<template>
  <transition-group
    appear
    :name="name"
    :tag="tag"
    :enter-active-class="enterCls"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => "",
    },
    tag: {
      type: String,
      default: () => "",
    },
    enterCls: {
      type: String,
      default: () => "",
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
</style>