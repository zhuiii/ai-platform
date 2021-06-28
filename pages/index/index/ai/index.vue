<template>
  <div class="g-pd-b-xl home-ai">
    <div class="g-center ai-wrap">
      <div class="g-mg-b-xs ai-banner"></div>
      <el-tabs
        class="elm-el-tabs"
        v-model="activeName"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          :label="item.title"
          :name="String(index)"
          v-for="(item, index) in allAIsFilter"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
      <div class="ai-list">
        <transition-group class="ai-ul" appear name="trans-up" tag="ul">
          <li
            :class="[
              'api-item',
              item.isReady === 'Y' ? 'ready' : '',
              item.isNew === 'Y' ? 'new' : '',
            ]"
            v-for="(item, index) in apiList"
            :key="item.title + index"
          >
            <nuxt-link
              :to="{
                path: item.url,
                query: aesEncrypt({
                  i: item.id,
                  n: item.title,
                }),
              }"
              ><i class="fa fa-long-arrow-right g-color--theme"></i
              >{{ item.title }}<sup class="kf-twinkle-word">New</sup></nuxt-link
            >
          </li>
        </transition-group>
      </div>
      <!-- <WrapperTitle title="AI服务列表">
        <div class="ai-cont" slot="cont">
          <div class="ai-left">
            <ListEffect
              :list="allAIs"
              labelKey="title"
              @handleMouseover="handleAiNavHover"
            ></ListEffect>
          </div>
          <div class="ai-right">
            <WrapperStreamBorder>
              <div class="ai-right-list">
                <transition-group class="ai-ul" appear name="trans-up" tag="ul">
                  <li
                    :class="[
                      'api-item',
                      item.isReady === 'Y' ? 'ready' : '',
                      item.isNew === 'Y' ? 'new' : '',
                    ]"
                    v-for="(item, index) in apiList"
                    :key="item.title + index"
                  >
                    <nuxt-link
                      :to="{
                        path: item.url,
                        query: aesEncrypt({
                          i: item.id,
                        }),
                      }"
                      >{{ item.title
                      }}<sup class="kf-twinkle-word">New</sup></nuxt-link
                    >
                  </li>
                </transition-group>
              </div>
            </WrapperStreamBorder>
          </div>
        </div>
      </WrapperTitle> -->
    </div>
  </div>
</template>

<script>
import WrapperTitle from "@/components/Wrapper/WrapperTitle.vue";
import ListEffect from "@/components/list/ListEffect.vue";
import WrapperTransitionGroup from "@/components/Wrapper/WrapperTransitionGroup.vue";
// import { allAIs } from "@/assets/js/apis/mockData.js";
import { requestAIList } from "@/assets/js/apis/ai-api.js";
export default {
  components: {
    WrapperTitle,
    ListEffect,
    WrapperTransitionGroup,
  },
  data() {
    return {
      allAIs: [],
      apiList: [],
      activeName: "0",
    };
  },
  computed: {
    allAIsFilter() {
      return this.allAIs.filter(
        (item) => item.children && item.children.length > 0
      );
    },
  },
  methods: {
    handleAiNavHover(item) {
      this.apiList = item.children || [];
    },
    handleTabClick(tab, ev) {
      const index = Number(tab.name);
      this.apiList = this.allAIs[index].children || [];
    },
  },
  created() {
    // this.initFirstList();
  },
  mounted() {},
};
</script>
<style scoped lang='less'>
@import url("~assets/less/element-custom.less");
.home-ai {
  color: #fff;
  font-size: 16px;
  .ai-cont {
    display: flex;
    .ai-left {
      width: 30%;
    }
    .ai-right {
      margin-left: 30px;
      width: 70%;
      .ai-right-list {
        height: 500px;
        border-radius: 10px;
        padding: 10px;
        position: relative;
        .ai-ul {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          height: 100%;
          overflow-x: auto;
          .api-item {
            margin-right: 20px;
            margin-top: 20px;
            display: none;
            a {
              color: #e3e3e3;
              position: relative;
            }
            .nouse {
              color: rgb(105, 105, 105);
              cursor: not-allowed;
            }
            .kf-twinkle-word {
              margin-left: 6px;
              font-size: 13px;
              display: none;
              position: absolute;
              top: -5px;
              right: -30px;
            }
            &.ready {
              display: block;
            }
            &.new {
              a {
                color: #fff;
              }
              .kf-twinkle-word {
                display: block;
              }
            }
          }
        }
      }
    }
  }

  /deep/ .el-tabs__nav-scroll {
    padding-left: 30px;
    padding-right: 30px;
  }
  .ai-list {
    height: 500px;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    padding-left: 60px;
    padding-right: 60px;
    .ai-ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      height: 100%;
      overflow-x: auto;
      .api-item {
        margin-right: 20px;
        margin-top: 20px;
        display: none;
        a {
          color: #646464;
          position: relative;
        }
        .nouse {
          color: rgb(105, 105, 105);
          cursor: not-allowed;
        }
        .kf-twinkle-word {
          margin-left: 6px;
          font-size: 12px;
          display: none;
          position: absolute;
          top: 0;
          right: -30px;
        }
        &.ready {
          display: block;
        }
        &.new {
          .kf-twinkle-word {
            display: block;
          }
        }
        .fa-long-arrow-right {
          margin-right: 10px;
          display: inline-block;
        }
      }
    }
  }
  .ai-banner{
    height: 300px;
    background: url('~static/banner/banner-ai.png') no-repeat;
    background-size: cover;
  }
}
</style>