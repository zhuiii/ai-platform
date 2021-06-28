<template>
  <div class="ocr-wrap">
    <div class="ocr-banner">
      <div class="g-center">
        <div class="ocr-info">
          <h2 class="ocr-title">卡证文字识别</h2>
          <p class="ocr-desc">
            基于业界领先的深度学习技术，提供对身份证、银行卡、营业执照等常用卡片及证照的文字内容进行结构化识别的服务
          </p>
          <div class="banner-btns">
            <div class="commBtn commBtn-primary">立即使用</div>
            <div class="commBtn commBtn-ghost">技术文档</div>
            <div class="commBtn commBtn-ghost">产品价格</div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="ocr-navi-compare"
      v-scrollFix="['ocr-navi', 'ocr-navi-compare']"
    ></div>
    <div id="ocr-navi" class="ocr-nav">
      <el-menu
        :default-active="activeIndex"
        :active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">产品列表</el-menu-item>
        <el-menu-item index="2">应用场景</el-menu-item>
        <el-menu-item index="3">特色优势</el-menu-item>
        <el-menu-item index="4">使用方式</el-menu-item>
        <el-menu-item index="5">支持交流</el-menu-item>
        <el-menu-item index="6">相关推荐</el-menu-item>
      </el-menu>
    </div>
    <div class="g-center">
      <!-- 产品列表 -->
      <div class="paddingTop product-wrap" id="dest1">
        <h2 class="title">产品列表</h2>
        <div class="p-list">
          <ImgText1
            class="pitem"
            v-for="(product, pindex) in productList"
            :key="pindex"
            width="380px"
            :title="product.title"
            :src="product.src"
            :desc="product.desc"
            @click.native="handleProductClick(product)"
          ></ImgText1>
          <div style="width: 380px; height: 0"></div>
        </div>
      </div>

      <!-- 应用场景 -->
      <div class="paddingTop apply-wrap" id="dest2">
        <h2 class="title">应用场景</h2>
        <div class="apply-main">
          <div class="apply-main-nav">
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo"
              @select="handleApplyNavSelect"
            >
              <el-menu-item
                v-for="(an, anindex) in applyNav"
                :key="anindex"
                :index="anindex + ''"
              >
                <span slot="title">{{ an.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="apply-main-cont">
            <ImgText2 :data="applyCont"></ImgText2>
            <div class="co-case">
              <h3 class="co-title">合作案例</h3>
              <ul>
                <template v-if="applyCont.cooperations">
                  <li
                    v-for="(co, coindex) in applyCont.cooperations"
                    :key="coindex"
                  >
                    <img :src="co.src" alt="" />
                  </li>
                </template>
                <li v-else>
                  <img src="@/static/comming-soon.png" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 特色优势 -->
      <div class="paddingTop special-wrap" id="dest3">
        <h2 class="title">特色优势</h2>
        <ul class="g-mg-t-md hori-list special-list">
          <li v-for="(specialItem, speIndex) in specialList" :key="speIndex">
            <ImgTextLink :title="specialItem.title" :desc="specialItem.desc">
              <div
                class="icon-wrap"
                slot="icon"
                :style="{ backgroundImage: `url(${specialItem.src})` }"
              ></div>
            </ImgTextLink>
          </li>
          <li style="width: 330px"></li>
        </ul>
      </div>
      <div class="paddingTop" id="dest4">
        <h2 class="title">使用方式</h2>
        <ul class="g-mg-t-md hori-list">
          <li v-for="(item, index) in usetypesList" :key="index">
            <ImgTextLink
              :title="item.title"
              :desc="item.desc"
              :linkText="item.linkText"
              :jumpUrl="item.url"
              :showLink="true"
              descHeight="72px"
            >
            </ImgTextLink>
          </li>
          <li style="width: 330px"></li>
        </ul>
      </div>
      <div class="paddingTop" id="dest5">
        <h2 class="title">支持交流</h2>
        <ul class="g-mg-t-md hori-list support">
          <li v-for="(item, index) in usetypesList" :key="index">
            <ImgTextLink
              :title="item.title"
              :desc="item.desc"
              linkText="查看详情 >"
              :jumpUrl="item.url"
              :showLink="true"
              descHeight="72px"
            >
            </ImgTextLink>
          </li>
          <li style="width: 330px"></li>
        </ul>
      </div>
      <div class="paddingTop free-experience">
        <h2 class="title">开始体验免费套餐</h2>
        <p class="fe-desc">注册即可领取产品免费体验套餐</p>
        <el-button type="primary" @click="toFreeExperience">立即使用</el-button>
      </div>
      <div class="paddingTop" id="dest6">
        <h2 class="title">相关推荐</h2>
        <ul class="g-mg-t-md hori-list recommend">
          <li
            class="bottomline-movable"
            v-for="(item, index) in usetypesList"
            :key="index"
            @click="handleRecommendClick(item)"
          >
            <ImgTextLink
              :title="item.title"
              :desc="item.desc"
              :jumpUrl="item.url"
            >
            </ImgTextLink>
          </li>
          <li style="width: 330px"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ImgText1 from "@/components/list/ImgText1.vue";
import ImgText2 from "@/components/list/ImgText2.vue";
import ImgTextLink from "@/components/list/ImgTextLink.vue";
import { pageMoveTo } from "@/assets/js/utils.js";
import { requestUseTypeApi } from "@/assets/js/apis/ocr-api.js";
import { productList, applyNav, specialList, usetypesList } from '@/assets/js/apis/mockData.js'
export default {
  components: {
    ImgText1,
    ImgText2,
    ImgTextLink,
  },
  data() {
    return {
      activeIndex: "-1",
      productList,
      applyNav,
      specialList,
      applyCont: {},
      scrollToDomInfoArr: [
        {
          id: "#dest1",
          index: 1,
        },
        {
          id: "#dest2",
          index: 2,
        },
        {
          id: "#dest3",
          index: 3,
        },
        {
          id: "#dest4",
          index: 4,
        },
        {
          id: "#dest5",
          index: 5,
        },
        {
          id: "#dest6",
          index: 6,
        },
      ],
      usetypesList,
    };
  },
  // async fetch({ app: {$axios} }) {
  //   try{
  //     const {methods: {requestUseTypeApiFn}} = this
  //     const {data: usetypesReturn = []} = await Function.prototype.call(this, requestUseTypeApiFn)
  //     // const {data: usetypesReturn = []} = await requestUseTypeApiFn()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // },
  methods: {
    handleSelect(key, keyPath) {
      pageMoveTo(`#dest${key}`, 500);
    },
    handleProductClick({url}) {
      console.log(url);
      if(!url) return
      this.$router.push({
        path: url
      })
    },
    handleApplyNavSelect(index, indexPath) {
      this.applyCont = this.applyNav[index].cont;
    },
    // param: [{id: '', index: 1}]
    handleMouseWheel(infoArr = []) {
      const currentScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const reverseArr = infoArr.sort((a, b) => b.index - a.index);
      for (let i = 0; i < reverseArr.length; i++) {
        const { id, index } = reverseArr[i];
        const destTop = $(id).offset().top;
        if (currentScrollTop > destTop - 100)
          return (this.activeIndex = `${index}`);
      }
    },
    // 请求使用方式列表数据
    requestUseTypeApiFn() {
      requestUseTypeApi().then(({ data }) => {
        this.usetypesList = data;
      });
    },
    // 免费体验点击
    toFreeExperience() {
      this.$router.push({
        path: "#",
      });
    },
    // 相关推荐项点击
    handleRecommendClick(item) {
      this.$router.push({
        path: `#${item.id}`,
      });
    },
  },
  created() {
    // this.requestUseTypeApiFn();
  },
  mounted() {
    const _this = this;
    this.handleApplyNavSelect(0);
    $(document).on("mousewheel", (event) => {
      _this.handleMouseWheel(_this.scrollToDomInfoArr);
    });
  },
  destroyed(){
    $(document).unbind('mousewheel')
  }
};
</script>

<style lang='less' scoped>
.ocr-wrap {
  padding-bottom: 100px;
  .paddingTop {
    padding-top: 120px;
  }
  .ocr-banner {
    height: 450px;
    background-image: url(https://ai.bdstatic.com/file/04A43D3A29E847F49EC4AE78539FDBA4);
    background-size: cover;
    display: flex;
    align-items: center;
    .ocr-info {
      width: 730px;
      .ocr-title {
        height: 67px;
        font-size: 48px;
        letter-spacing: 2px;
        color: #fff;
        position: relative;
      }
      .ocr-desc {
        margin: 30px 110px 0 0;
        font-size: 16px;
        line-height: 26px;
        color: #fff;
      }
      .banner-btns {
        margin-top: 86px;
        button {
          width: 130px;
          height: 38px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          margin-right: 20px;
          border-radius: 0;
        }
      }
    }
  }
  .ocr-nav {
    width: 100%;
  }
  /deep/ .el-menu-demo {
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    .el-menu-item {
      font-size: 16px;
      color: #000000;
      padding-left: 0;
      padding-right: 0;
      margin-left: 11px;
      margin-right: 43px;
      &.is-active {
        font-weight: 700;
        border-bottom: 4px solid #000000;
      }
    }
  }

  .title {
    line-height: 46px;
    font-size: 32px;
    color: #000;
    letter-spacing: 0;
    text-align: center;
  }
  .product-wrap {
    .p-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 60px;
      .pitem {
        margin-bottom: 20px;
      }
    }
  }
  .apply-wrap {
    .apply-main {
      display: flex;
      justify-content: space-between;
      position: relative;
      .apply-main-nav {
        width: 180px;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: #f7f7f7;
        /deep/ .el-menu {
          background-color: #f7f7f7;
          border-right: none;
          .is-active {
            background-image: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#2081fc),
              to(#036fe2)
            );
            background-image: -webkit-linear-gradient(left, #2081fc, #036fe2);
            background-image: -moz-linear-gradient(
              left,
              #2081fc 0,
              #036fe2 100%
            );
            background-image: linear-gradient(90deg, #2081fc, #036fe2);
            color: #fff;
          }
          .el-menu-item {
            background-color: transparent;
            &:not(.is-active):hover {
              background-color: transparent;
              color: #2081fc;
            }
          }
        }
      }
      .apply-main-cont {
        width: 1000px;
        margin-left: 280px;
        .co-case {
          margin-top: 40px;
          .co-title {
            font-size: 22px;
            height: 38px;
            line-height: 38px;
            font-weight: 700;
          }
          ul {
            margin-top: 20px;
            li {
              width: 130px;
              height: 72px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
  .hori-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > li {
      width: 330px;
    }
  }
  .special-wrap {
    .special-list {
      & > li {
        .icon-wrap {
          width: 30px;
          height: 38px;
          background: no-repeat 50%;
          background-size: 30px 30px;
          margin-right: 45px;
        }
      }
    }
  }
  .support {
    & > li:not(:last-child) {
      width: 380px;
      padding: 30px 49px 40px;
      border: 1px solid #eee;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      letter-spacing: 0;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        box-shadow: 0 6px 8px rgb(241, 241, 241);
        /deep/ .itl-title {
          color: #036fe2;
        }
      }
    }
  }
  .free-experience {
    text-align: center;
    .fe-desc {
      margin-top: 23px;
      margin-bottom: 37px;
    }
    /deep/ .el-button {
      border-radius: 0;
      width: 180px;
      font-size: 18px;
      line-height: 28px;
      background-color: #036fe2;
    }
  }
  .recommend {
    & > li:not(:last-child) {
      cursor: pointer;

      /deep/ .itl-title {
        font-weight: normal;
      }
      &:hover {
        /deep/ .itl-title {
          color: #036fe2;
        }
      }
    }
  }
}
</style>
