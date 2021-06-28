<template>
  <section
    class="list-effect-wrap"
    @click="handleEvent"
    @mouseover="handleEvent"
  >
    <MyButtonEffect
      :class="[
        `animate__animated ${animateCssName} le-item`,
        item.children && item.children.length === 0 ? 'nouse' : '',
      ]"
      v-for="(item, index) in list"
      :key="'le' + index"
      :item="item"
      :data-i="index"
      bgColor="#006de3"
      color="#fff"
      :active="currentIndex === index"
      :disable="item.children && item.children.length === 0"
    >
      {{ item[labelKey] }}<i class="wait">（敬请期待）</i>
    </MyButtonEffect>
  </section>
</template>

<script>
import MyButtonEffect from "@/components/MyButton/MyButtonEffect.vue";
export default {
  components: {
    MyButtonEffect,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: () => "",
    },
    animateCssName: {
      type: String,
      default: () => "animate__bounceIn",
    },
    // 交互类型：hover | click
    interactType: {
      type: String,
      default: () => "hover",
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    handleEvent(ev) {
      const target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() === "div") {
        const index = Number(target.dataset.i);
        const item = this.list[index];
        if (item.children && item.children.length === 0) return;
        this.currentIndex = index;
        switch (this.interactType) {
          case "hover":
            this.$emit("handleMouseover", item);
            break;
          case "click":
            this.$emit("handleClick", item);
            break;
        }
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.list-effect-wrap {
  .le-item {
    margin-bottom: 10px;
    .wait {
      display: none;
      font-size: 13px;
      color: #00ff08;
    }
  }
  .nouse {
    .wait {
      display: inline-block;
    }
  }
}
</style>