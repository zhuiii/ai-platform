<template>
  <div class="btn-cyber" :style="{width, height, lineHeight: height, fontSize}" @click="handleClick">
    {{ title }}
    <div class="btn-cyber-inner">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    width: {
      type: String,
      default: () => "",
    },
    height: {
      type: String,
      default: () => "88px",
    },
    fontSize: {
      type: String,
      default: () => "36px",
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit('handleClick')
    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.btn-cyber {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 5%, #af01ff 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px #00e0f6;
  outline: transparent;
  text-align: center;
  position: relative;
  cursor: pointer;
  .btn-cyber-inner {
    width: 100%;
    height: 100%;
    font-size: 36px;
    border: 0;
    color: #fff;
    letter-spacing: 3px;
    line-height: 88px;
    box-shadow: 6px 0px 0px #00e0f6;
    outline: transparent;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 3%,
      #00e0f6 3%,
      #00e0f6 5%,
      #af01ff 5%
    );
    text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);
    clip-path: var(--slice-0);
  }
  &:hover {
    .btn-cyber-inner {
      animation: glitch 0.3s infinite;
    }
  }
  @keyframes glitch {
    0% {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }

    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }

    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }

    30% {
      clip-path: var(--slice-3);
      transform: translate(0px, 5px);
    }

    40% {
      clip-path: var(--slice-2);
      transform: translate(-5px, 0px);
    }

    50% {
      clip-path: var(--slice-3);
      transform: translate(5px, 0px);
    }

    60% {
      clip-path: var(--slice-4);
      transform: translate(5px, 10px);
    }

    70% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 10px);
    }

    80% {
      clip-path: var(--slice-5);
      transform: translate(20px, -10px);
    }

    90% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 0px);
    }

    100% {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
}
</style>