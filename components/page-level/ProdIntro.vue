<template>
  <div class="g-border prod-intro">
    <div class="intro-cont intro-l">
      <div class="bg-icon"></div>
      <p>产品介绍</p>
    </div>
    <el-scrollbar :class="sbCls" ref="sb">
      <div class="intro-cont intro-r">
        <p>{{ desc }}</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
/* 产品介绍组件 */
export default {
  props: {
    desc: String,
  },
  data() {
    return {
      isOverstep: false,
    };
  },
  computed: {
    sbCls() {
      return this.isOverstep ? "sb overstep" : "sb";
    },
  },
  methods: {
    setOverstep() {
      const introR = document.querySelector(".sb .el-scrollbar__view");
      if (!introR) return;
      const parent = introR.offsetParent;
      if (introR.offsetHeight > parent.offsetHeight) {
        this.isOverstep = true;
      }
    },
  },
  created() {},
  mounted() {
    this.setOverstep();
  },
};
</script>
<style scoped lang='less'>
.prod-intro {
  height: 160px;
  display: flex;
}
.intro-cont {
  display: flex;
  align-items: center;
}
.intro-l {
  flex-direction: column;
  justify-content: center;
  width: 210px;
  border-right: 1px solid #eeeeee;
  .bg-icon {
    width: 64px;
    height: 64px;
    background: url("~static/prod-intro.png") no-repeat;
    background-size: contain;
  }
  p {
    color: #333333;
    font-size: 20px;
    margin-top: 7px;
  }
}

.sb {
  height: 160px;
  flex: 1;
  padding: 6px 0;
  /deep/ .el-scrollbar__wrap {
    display: flex;
    align-items: center;
  }
}
.overstep {
  /deep/ .el-scrollbar__wrap {
    align-items: flex-start;
  }
}
.intro-r {
  padding-left: 60px;
  & > p {
    line-height: 24px;
    max-width: 843px;
    color: #666666;
    text-align: justify;
  }
}
</style>