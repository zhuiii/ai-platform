<template>
  <div class="login-container">
    <div class="center">
      <div class="up">
        <i class="bg-decoration"></i>
        <div class="up-cont">
          <div class="logo"><nuxt-link :to="routerPath.home"><img src="mv-logo.png" alt="" /></nuxt-link></div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-left">
          <div class="middle-left-desc">
            <h3>盛视智能云，计算无限可能</h3>
            <p>全面、落地的 AI</p>
            <p>开放、安全的 Big Data</p>
            <p>持续、先进的 Cloud</p>
          </div>
          <div class="middle-left-img">
            <nuxt-link to="">
              <img
                src="https://bce.bdstatic.com/login/banner_20210108.png"
                alt=""
              />
            </nuxt-link>
          </div>
        </div>
        <div class="middle-right">
          <div class="middle-right-cont">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="盛视账号" name="first">
                <div class="flex-between-center" style="margin-bottom: 17px">
                  <span>{{ loginTypeBind.label }}</span>
                  <div
                    class="flex-between-center toggle-login"
                    @click="handleToggleLoginType"
                  >
                    <div class="toggle-label">
                      {{ loginTypeBind.toggleLabel }}
                    </div>
                    <i><img :src="loginTypeBind.iconSrc" alt="" /></i>
                  </div>
                </div>
                <!-- 扫码登录 -->
                <div class="qr-login" v-if="activeLoginType === 0">
                  <div class="qrimg-wrap">
                    <img
                      src="https://passport.baidu.com/v2/api/qrcode?sign=v1_9c49ebad1876e0b82ba313b03916d&lp=pc&qrloginfrom=pc"
                      alt=""
                    />
                  </div>
                  <p>
                    请使用<nuxt-link to="">盛视智能云App</nuxt-link>扫码登录
                  </p>
                </div>
                <!-- 密码登录 -->
                <div class="pwd-login" v-else>
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="0"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="" prop="account">
                      <el-input
                        v-model="ruleForm.account"
                        placeholder="手机/邮箱/用户名"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                      <el-input
                        v-model="ruleForm.password"
                        placeholder="密码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        class="submit-btn"
                        type="primary"
                        round
                        @click="submitForm('ruleForm')"
                        >登录</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <div class="other-info">
                  <nuxt-link to="">立即注册</nuxt-link>
                  <div class="divide-line"></div>
                  <nuxt-link to="">子用户登录</nuxt-link>
                  <div class="divide-line"></div>
                  <nuxt-link to="">忘记密码</nuxt-link>
                  <div class="divide-line"></div>
                  <nuxt-link to="">忘记账号</nuxt-link>
                </div>
                <div class="tip-wrap"></div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="down">
        <CopyRight></CopyRight>
      </div>
    </div>
  </div>
</template>

<script>
import CopyRight from "@/components/CopyRight.vue";
import qrcodelogin from "@/static/qrcodelogin.png";
import normallogin from "@/static/normallogin.png";
export default {
  components: {
    CopyRight,
  },
  data() {
    return {
      activeName: "first",
      activeLoginType: 0,
      loginType: [
        {
          label: "账号登录",
          toggleLabel: "扫码登录",
          iconSrc: qrcodelogin,
        },
        {
          label: "扫码登录",
          toggleLabel: "密码登录",
          iconSrc: normallogin,
        },
      ],
      loginTypeBind: {},
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
    },
    handleToggleLoginType() {
      this.activeLoginType = this.activeLoginType === 0 ? 1 : 0;
      this.loginTypeBind = this.loginType[this.activeLoginType];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        }
      });
    },
  },
  created() {
    this.loginTypeBind = this.loginType[this.activeLoginType];
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #f6f8fb;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlMAAAABCAYAAAD6mCs9AAAAAXNSR0IArs4c6QAAACZJREFUSA1jVMn49J9hFIyGwGgIjIbAaAiMhsBoCIyGwGgIkBUCADDGAn+LX8bjAAAAAElFTkSuQmCC);
  background-repeat: repeat-y;
  background-size: 30% 100%;
  background-position: 100% 0;
  width: 100%;
  min-height: 100vh;
  .center {
    width: 1150px;
    margin: 0 auto;
    .up {
      display: flex;
      align-items: center;
      .bg-decoration {
        margin-left: -166px;
        width: 166px;
        height: 178px;
        background: url(~@/static/decoration1@2x.png) no-repeat 0 0;
        background-size: 166px 178px;
      }
      .logo {
        width: 120px;
        height: 40px;
        margin-left: 30px;
        img {
          width: 100%;
        }
      }
    }
    .middle {
      display: flex;
      justify-content: space-between;
      .middle-left {
        width: 366px;
        .middle-left-desc {
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(216, 216, 216, 0.5);
          color: #2e3341;
          & > h3 {
            font-family: PingFangSC-Medium;
            font-size: 30px;
            line-height: 36px;
            margin: 32px 0;
          }
          & > p {
            opacity: 0.6;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            line-height: 30px;
          }
        }
        .middle-left-img {
          width: 100%;
          margin-top: 32px;
          img {
            width: 100%;
          }
        }
      }
      .middle-right {
        padding-top: 45px;
        width: 420px;
        height: 492px;
        background-color: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
        box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.05);
        position: relative;
        left: 0;
        top: -30px;
        .middle-right-cont {
          width: 300px;
          margin: 0 auto;
          /deep/ .el-tabs__item {
            line-height: 36px;
            font-family: PingFangSC-Medium;
            font-size: 18px;
          }
          .toggle-login {
            cursor: pointer;
            .toggle-label {
              padding: 0 3px;
              text-align: center;
              width: 70px;
              height: 30px;
              line-height: 30px;
              color: #333;
              font-size: 12px;
              background: #f5f5f5;
              position: relative;
              &::after {
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                right: -6px;
                top: 9px;
                border-left: 6px solid #f5f5f5;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
              }
            }
            & > i {
              display: block;
              width: 24px;
              height: 22px;
              margin-left: 20px;
              img {
                width: 100%;
              }
            }
          }
          .qr-login {
            text-align: center;
            .qrimg-wrap {
              img {
                margin: 5px 0;
                width: 134px;
                height: 134px;
                border: 1px solid #000000;
              }
            }
            & > p {
              font-size: 12px;
              margin-top: 5px;
              color: #999;
              a {
                color: #000000;
              }
            }
          }
          .pwd-login {
            .submit-btn {
              width: 100%;
              background: #2468f2;
              &:hover {
                background: #4684ff;
              }
            }
          }
          .other-info {
            margin-top: 30px;
            a {
              font-size: 12px;
              color: #333;
            }
          }
          .tip-wrap {
            border-top: 1px solid #d4d4d4;
            margin-top: 50px;
            opacity: 0.27;
          }
        }
      }
    }
    .down {
      background: url(~@/static/decoration2@2x.png) no-repeat 90% 0;
      background-size: 125px;
      padding-bottom: 30px;
      margin-top: -20px;
      /deep/ .copy-right {
        color: rgba(46, 51, 65, 0.66);
        position: relative;
        left: 0;
        top: -65px;
      }
    }
  }
}
</style>
