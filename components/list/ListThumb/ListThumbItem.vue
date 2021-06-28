<template>
  <div
    class="list-thumb-item"
    @mouseover="handleBriefOver($event)"
    @mouseleave="handleBriefLeave($event)"
  >
    <div :class="briefStyle" :style="{ backgroundImage: `url(${src})` }">
      <p class="title">{{ title }}</p>
    </div>
    <div :class="contStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    title: String,
  },
  data() {
    return {
      showCont: false,
    };
  },
  computed: {
    briefStyle() {
      return this.showCont ? "thumb-item-brief hide" : "thumb-item-brief";
    },
    contStyle() {
      return this.showCont ? "thumb-item-cont show" : "thumb-item-cont";
    },
  },
  methods: {
    handleBriefOver(ev) {
      this.showCont = true;
    },
    handleBriefLeave(ev) {
      this.showCont = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.list-thumb-item {
  .thumb-item-brief {
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    height: 100%;
    min-width: 100px;
    cursor: pointer;
    &.hide {
      display: none;
    }
    .title {
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      font-weight: 700;
    }
  }
  .thumb-item-cont {
    width: 0;
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(87, 87, 87, 0.2);
    &.show {
      width: 100%;
    }
  }
}
</style>