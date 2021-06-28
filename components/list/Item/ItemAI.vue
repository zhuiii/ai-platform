<template>
  <div class="item-ai">
    <p :class="itemCls" :style="fontStyle" @click="handleItemClick">
      <i></i>{{ item.title }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    fontStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    itemCls() {
      return this.item && this.item.isNew === "Y"
        ? "link-hover new"
        : "link-hover";
    },
  },
  data() {
    return {};
  },
  methods: {
    handleItemClick() {
      this.$emit("handleClick", this.item);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.link-hover {
  display: flex;
  align-items: center;
  color: #242527;
  &:hover {
    color: #4A81FF !important;
  }
}
.new {
  &:after {
    content: "NEW";
    display: block;
    border: 1px solid rgb(241, 51, 51);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 2px;
    color: rgb(241, 51, 51);
    transform: scale(0.7);
    text-align: center;
  }
}
.active {
  .link-hover {
    color: #4A81FF !important;
  }
}
</style>