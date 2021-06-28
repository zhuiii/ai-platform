<template>
  <div :class="wrapCls" :style="wrapStyle" @click="handleClick">
      <div class="btn-active" v-if="active">
        <slot name="btn-active"></slot>
      </div>
      <div class="btn-default" v-else>
        <slot name="btn-default"></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      iconCls: String,
      disable: Boolean,
      active: Boolean,
      width: {
          type: String,
          default: () => ""
      },
      height: {
          type: String,
          default: () => ""
      },
  },
  computed: {
      wrapStyle() {
          return {
              width: this.width,
              height: this.height,
          }
      },
      wrapCls() {
          return this.disable ? ["btn-icon disable"] : ["btn-icon"]
      }
  },
  data() {
    return {};
  },
  methods: {
      handleClick() {
          if(this.disable) return;
          this.$emit("handleClick");
      }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.btn-icon{
    cursor: pointer;
    &.disable{
        cursor: not-allowed;
    }
}
</style>