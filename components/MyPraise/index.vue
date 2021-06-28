<template>
  <div class="praise">
    <div class="btn good">
      <MyButtonIcon
        :disable="disable"
        :active="isActiveGood"
        title="赞"
        @handleClick="handlePraise(1)"
      >
        <i class="fa fa-thumbs-up" slot="btn-default"></i>
        <i class="fa fa-thumbs-up active" slot="btn-active"></i>
      </MyButtonIcon>
      <p :class="{ active: isActiveGood }">{{ goodNumComputed }}</p>
    </div>
    <div class="btn bad">
      <MyButtonIcon
        :disable="disable"
        :active="isActiveBad"
        title="踩"
        @handleClick="handlePraise(0)"
      >
        <i class="fa fa-thumbs-down" slot="btn-default"></i>
        <i class="fa fa-thumbs-down active" slot="btn-active"></i>
      </MyButtonIcon>
      <p :class="{ active: isActiveBad }">{{ badNumComputed }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Number,
      default: () => -1,
    },
    goodNum: {
      type: Number,
      default: () => 0,
    },
    badNum: {
      type: Number,
      default: () => 0,
    },
    isGood: {
      type: Boolean,
      default: () => false,
    },
    isBad: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      disable: false,
      // isActiveGood: false,
      // isActiveBad: false,
      stime: Date.now(),
    };
  },
  computed: {
    goodNumComputed() {
      return this.goodNum;
    },
    badNumComputed() {
      return this.badNum;
    },
    isActiveGood() {
      return this.isGood;
    },
    isActiveBad() {
      return this.isBad;
    },
  },
  methods: {
    praiseCbk() {
      this.disable = false;
    },
    handlePraise(isLike) {
      const etime = Date.now();
      if (etime - this.stime > 300) {
        this.stime = etime;
        if (this.isActiveGood && isLike == 1) {
          console.log("111111")
          this.$emit("cancelPraise");
        } else if(this.isActiveBad && isLike == 0){
          console.log("222222")
          this.$emit("cancelPraise");
        } else {
          this.$emit(
            "handlePraise",
            isLike
            // ,
            // () => {
            //   isLike
            //     ? (this.isActiveGood = !this.isActiveGood)
            //     : (this.isActiveBad = !this.isActiveBad);
            // }
          );
        }
        this.praiseCbk;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='less'>
.praise {
  display: flex;
  align-items: center;
  .btn {
    display: flex;
    align-items: center;
  }
  .good {
    margin-right: 15px;
  }
  .fa {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.5);
    margin-right: 6px;
  }
  .active {
    color: #0073eb;
  }
}
</style>