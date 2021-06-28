<template>
  <div class="home">
    <!-- 轮播 -->
    <div class="carousel-wrap">
      <el-carousel
        indicator-position="none"
        height="500px"
        @change="handleCarouselChange"
      >
        <el-carousel-item
          v-for="(item, index) in bannerList"
          :key="'banner' + index"
        >
          <div
            class="banner-main"
            :style="{ backgroundImage: `url(${item.src})` }"
          >
            <div
              :class="[
                'slide slide-1',
                carouselActiveIndex === 0 ? 'active' : '',
              ]"
              v-show="index === 0"
            >
              <div class="text">
                <h2>人工智能算法</h2>
                <p class="g-mg-t-sm desc">安全、高效</p>
                <div class="g-btn-common btn">查看详情</div>
              </div>
            </div>
            <div
              :class="[
                'slide slide-2',
                carouselActiveIndex === 1 ? 'active' : '',
              ]"
              v-show="index === 1"
            >
              <div class="text">
                <h2>行业领先</h2>
                <p class="g-mg-t-sm desc">值得信赖</p>
                <div class="g-btn-common btn">去看看</div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 盛视大脑 -->
    <div class="g-mg-t-md g-center">
      <h2
        class="animate__animated animate__lightSpeedInLeft top-title"
        style="animation-delay: 0.2s"
      >
        让智能产品遍地开花
      </h2>
      <div class="g-mg-t-lg circle-wrap">
        <div
          class="circle-pos"
          v-for="(item, index) in circleList"
          :key="`crl${index}`"
        >
          <MyCircleLayout
            :list="item.data"
            :rBig="item.rBig"
            :rSmall="item.rSmall"
            :rotate="item.rotate"
            :class="item.cusCls"
          >
            <img
              slot="pointCenter"
              src="@/static/arrow-blue.png"
              alt=""
              v-if="item.showArrow"
            />
          </MyCircleLayout>
        </div>
        <div class="circle-pos">
          <div class="g-no-select circle-center">盛视大脑</div>
        </div>
      </div>
    </div>
    <!-- 行业场景 -->
    <div class="g-mg-t-lg g-pd-t-lg g-pd-b-xl industry-scene">
      <div class="g-center">
        <div class="section-title">行业场景</div>
        <div class="flex-center g-mg-t-md">
          <div class="industry-scene-list">
            <ListThumbItem
              v-for="(item, index) in industrySceneList"
              :key="'is' + index"
              :title="item.title"
              :src="item.src"
            >
              <div class="industry-scene-cont">
                <p>{{ item.title }}</p>
              </div>
            </ListThumbItem>
          </div>
        </div>
      </div>
    </div>
    <!-- 应用案例 -->
    <div class="case">
      <div class="g-ceter">
        <div class="section-title g-pd-t-md g-pd-b-md">应用案例</div>
        <div class="flex-center">
          <div
            class="case-item"
            v-for="(item, index) in caseList"
            :key="'case' + index"
          >
            <nuxt-link to="#">
              <div class="case-bg">
                <img :src="item.src" alt="" />
              </div>
              <div class="case-cont">
                <h3 class="case-title">{{ item.title }}</h3>
                <p class="case-desc">{{ item.desc }}</p>
                <div class="case-btn">
                  <span>查看详情</span>
                  <i class="el-icon-right"></i>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 开发者社区 -->
    <div class="g-pd-b-lg social">
      <div class="g-center">
        <div class="section-title g-pd-t-md g-pd-b-md">开发者实践</div>
        <div class="flex-between-center social-cont">
          <div
            class="cont-item"
            v-for="(item, index) in socilaList"
            :key="'s' + index"
            @click="handleSocialClick(item)"
          >
            <div class="g-fl img-wrap">
              <img :src="item.src" alt="" />
            </div>
            <div class="g-mg-t-xs text-wrap">
              <div class="text">
                <h4 class="title">{{ item.title }}</h4>
                <p class="desc">
                  {{ item.desc }}
                </p>
              </div>
              <div class="btn">
                <nuxt-link to="#"
                  >查看详情 <i class="el-icon-arrow-right"></i
                ></nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新动态 -->
    <div class="g-pd-t-lg g-pd-b-lg" style="background: #fff;">
      <div class="g-pd-b-lg news">
        <div class="g-center section-title g-pd-t-md g-pd-b-md news-title">
          最新动态
        </div>
        <div class="g-center">
          <div class="n-left">
            <div class="n-list">
              <div
                class="list-item"
                v-for="(item, index) in newsList"
                :key="'n' + index"
                @click="handleTimerItemClick(index)"
              >
                <div class="item-text">
                  <div class="item-title">{{ item.title }}</div>
                  <div
                    class="move-wrap"
                    :class="[currentNewsIndex === index ? 'show' : '']"
                  >
                    <div class="item-desc">{{ item.desc }}</div>
                    <div class="more">
                      <nuxt-link to="#"
                        >了解更多 <i class="el-icon-right"></i
                      ></nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="progress-line">
                  <MyProgressTimer
                    :time="time"
                    :start="currentNewsIndex === index"
                  ></MyProgressTimer>
                </div>
              </div>
            </div>
          </div>
          <div class="n-right">
            <div
              class="right-img"
              :class="[currentNewsIndex === index ? 'show' : '']"
              v-for="(item, index) in newsList"
              :key="'img' + index"
            >
              <img :src="item.src" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import industryScene1 from "@/static/industry-scene/industry-scene-1.jpg";
import industryScene2 from "@/static/industry-scene/industry-scene-2.jpg";
import industryScene3 from "@/static/industry-scene/industry-scene-3.jpg";
import banner2 from "@/static/banner/banner-2.jpg";
import banner3 from "@/static/banner/banner-3.jpg";
import bgBlock3 from "@/static/bg/bg-block-3.jpg";
import social1 from "@/static/social-1.jpg";
import social2 from "@/static/social-2.jpg";
/* 首页 */
export default {
  data() {
    return {
      carouselActiveIndex: 0,
      bannerList: [
        {
          src: banner2,
        },
        {
          src: banner3,
        },
      ],
      circleList: [
        {
          data: [
            {
              label: "智慧口岸",
            },
            {
              label: "智慧小区",
            },
            {
              label: "智慧机场",
            },
            {
              label: "智慧商业",
            },
            {
              label: "智慧景区",
            },
          ],
          rBig: 350,
          rSmall: 40,
          rotate: 0,
        },
        {
          data: [
            {
              label: "生态合作",
            },
            {
              label: "智能终端",
            },
            {
              label: "离线SDK",
            },
            {
              label: "机器人",
            },
            {
              label: "云服务",
            },
          ],
          rBig: 270,
          rSmall: 30,
          rotate: 45,
        },
        {
          data: [
            {
              label: "生物识别",
              isIcon: true,
              iconCls: "el-icon-user-solid",
            },
            {
              label: "物体识别",
              isIcon: true,
            },
            {
              label: "字符识别",
              isIcon: true,
            },
            {
              label: "语音识别",
              isIcon: true,
              iconCls: "el-icon-mic",
            },
            {
              label: "行为分析",
              isIcon: true,
            },
          ],
          rBig: 190,
          rSmall: 20,
          rotate: -45,
        },
        {
          data: [
            {
              label: "算法",
            },
            {
              label: "训练平台",
            },
            {
              label: "数据",
            },
          ],
          rBig: 120,
          rSmall: 20,
          rotate: 45,
          showArrow: true,
          cusCls: "arrow",
        },
      ],
      industrySceneList: [
        {
          title: "口岸",
          src: industryScene1,
        },
        {
          title: "交通",
          src: industryScene2,
        },
        {
          title: "大数据",
          src: industryScene3,
        },
      ],
      caseList: [
        {
          src: bgBlock3,
          title: "案例名称",
          desc: "案例描述",
        },
        {
          src: bgBlock3,
          title: "案例名称",
          desc: "案例描述",
        },
        {
          src: bgBlock3,
          title: "案例名称",
          desc: "案例描述",
        },
      ],
      socilaList: [
        {
          src: social1,
          title: "视频教学",
          desc: "AI专属学习平台，为用户提供全面的开发支持。",
          url: "",
        },
        {
          src: social2,
          title: "开发者社区",
          desc: "发布、回答各类问题，帮助用户解决各类疑难问题。",
          url: "",
        },
      ],
      newsList: [
        {
          id: "n1",
          title: "动态1",
          desc: "描述描述描述描述描述描述描述描述描述描述描述1",
          src: banner2,
        },
        {
          id: "n2",
          title: "动态2",
          desc: "描述描述描述描述描述描述描述描述描述描述描述2",
          src: banner3,
        },
        {
          id: "n3",
          title: "动态3",
          desc: "描述描述描述描述描述描述描述描述描述描述描述3",
          src: bgBlock3,
        },
      ],
      currentNewsIndex: 0,
      timer: null,
      time: 8,
    };
  },
  methods: {
    handleCarouselChange(index) {
      this.carouselActiveIndex = index;
    },
    handleSocialClick(item) {},
    handleTimerItemClick(index) {
      this.currentNewsIndex = index;
      this.clearTimer();
      this.handleSetTimer(this.time);
    },
    handleSetTimer(time) {
      this.timer = setInterval(() => {
        this.currentNewsIndex++;
        if (this.currentNewsIndex >= this.newsList.length)
          this.currentNewsIndex = 0;
      }, time * 1000);
    },
    clearTimer() {
      if (this.timer) clearInterval(this.timer);
    },
  },
  created() {},
  mounted() {
    this.handleSetTimer(this.time);
  },
};
</script>
<style scoped lang='less'>
.home {
  .banner-main {
    height: 100%;
    background-size: 100% 100%;
    .slide {
      position: relative;
      height: 100%;
      .text {
        text-align: center;
        width: 300px;
        opacity: 0;
        transition: all 0.3s 0.5s ease-in-out;
        & > h2 {
          font-size: 30px;
          color: #fff;
        }
        .desc {
          font-size: 15px;
          color: rgb(223, 223, 223);
        }
        .btn {
          margin: 20px auto;
        }
      }
      &.slide-1 {
        .text {
          position: absolute;
          left: 20%;
          top: 20%;
          transform: translateY(100px);
        }
        &.active {
          .text {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
      &.slide-2 {
        .text {
          position: absolute;
          left: 20%;
          top: 20%;
          transform: translateY(-100px);
          .btn {
            background-color: #fff;
            color: #3636eb;
          }
        }
        &.active {
          .text {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }
  .top-title {
    font-size: 30px;
    color: #fff;
    text-shadow: 3px 3px 10px #001e8a;
    font-weight: 600;
    letter-spacing: 10px;
    text-align: center;
  }
  .catas {
    width: 60%;
    margin: 20px auto;
    img {
      max-width: 100%;
    }
  }
  .circle-wrap {
    position: relative;
    height: 700px;
    .circle-pos {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      .circle-center {
        width: 110px;
        height: 110px;
        background: #0085fe;
        border-radius: 100%;
        text-align: center;
        line-height: 110px;
        color: #fff;
        font-size: 20px;
      }
    }
    /deep/ .arrow {
      .c-item {
        &:nth-of-type(1) {
          .point-center {
            transform: rotate(-120deg);
            left: -85%;
            top: -47%;
          }
        }
        &:nth-of-type(3) {
          .point-center {
            transform: rotate(124deg);
            left: -5%;
            top: 125%;
          }
        }
      }
    }
  }
  .section-title {
    text-align: center;
    font-size: 30px;
  }
  .industry-scene {
    background-color: #5ba2b236;
    .industry-scene-list {
      display: flex;
      height: 300px;
      & > div {
        &:not(:last-child) {
          margin-right: 2px;
        }
      }
      .industry-scene-cont {
        width: 300px;
        height: 340px;
      }
    }
  }
  .case {
    padding: 30px;
    padding-bottom: 100px;
    background-color: #fff;
    // border-radius: 0 0 10% 10%;
    .case-item {
      position: relative;
      width: 300px;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 30px;
      }
      &:hover {
        .case-bg img {
          transform: scale(1.2);
        }
        .case-btn i {
          transform: translateX(6px);
        }
      }
      .case-bg img,
      .case-btn i {
        transition: all 0.2s ease-in;
      }
      .case-bg {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .case-cont {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translateX(-50%);
        border-radius: 6px;
        box-shadow: 0 0 10px #8fa7ff;
        background-color: #fff;
        text-align: center;
        width: 94%;
        padding: 30px 20px;
        .case-title {
          font-size: 18px;
        }
        .case-desc {
          font-size: 13px;
          color: #929292;
          margin-top: 10px;
          max-height: 54px;
          overflow: hidden;
        }
        .case-btn {
          margin: 10px auto 0;
          width: 130px;
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
          border: 1px solid blueviolet;
          color: blueviolet;
          font-size: 15px;
        }
      }
    }
  }
  .social {
    background: url("~static/bg/bg-block-4.jpg") no-repeat;
    background-size: cover;
    .social-cont {
      flex-wrap: nowrap;
      align-items: flex-start;
    }
    .cont-item {
      background-color: #fff;
      padding: 20px;
      cursor: pointer;
      width: 49%;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 10px #728dbe;
      }
      .img-wrap {
        width: 140px;
        height: 140px;
        overflow: hidden;
        img {
          max-height: 100%;
        }
      }
      .text-wrap {
        margin-left: 160px;
        .text {
          .title {
            margin-bottom: 12px;
            font-size: 18px;
            line-height: 28px;
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desc {
            font-size: 14px;
            line-height: 24px;
            color: #666;
          }
        }
        .btn {
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid #e5e5e5;
          a,
          i {
            font-size: 14px;
            color: #00a4ff;
            line-height: 24px;
          }
        }
      }
    }
  }
  .news {
    background-color: #000;
    position: relative;
    .news-title {
      text-align: left;
      line-height: 48px;
      font-size: 32px;
      color: #fff;
      font-weight: 400;
    }
    .n-left {
      width: 43%;
      .n-list {
        border-top: 1px solid #28404f;
        .list-item {
          position: relative;
          padding: 10px 0;
          .item-text {
            .item-title {
              font-size: 24px;
              font-weight: 400;
              color: #fff;
              cursor: pointer;
            }
            .move-wrap {
              height: 0;
              overflow: hidden;
              transition: all 0.5s ease-in-out;
              &.show {
                height: 100px;
              }
            }
            .item-desc {
              margin-top: 12px;
              line-height: 26px;
              color: rgba(255, 255, 255, 0.4);
              max-height: 52px;
              overflow: hidden;
            }
            .more {
              a {
                color: #00a4ff;
                text-decoration: none;
              }
            }
          }
          .progress-line {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
          }
        }
      }
    }
    .n-right {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      width: 50%;
      height: 100%;
      .right-img,
      img {
        width: 100%;
        height: 100%;
      }
      .right-img {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: all 0.5s ease-in-out;
        &.show {
          opacity: 1;
          z-index: 2;
        }
      }
    }
  }
}
</style>