<template>
  <div class="register-container">
    <div class="regist-header">
      <div class="header-cont">
        <div class="flex-between-center header-center">
          <img class="mv-logo" src="@/static/mv-logo.png" alt="" />
          <nuxt-link :to="routerPath.home">返回首页</nuxt-link>
        </div>
      </div>
    </div>
    <div class="regist-form">
      <div class="regist-title">
        <h2>欢迎注册盛视智能云帐号</h2>
        <p>准备开启您的云计算之旅</p>
      </div>
      <div class="form-error-right regist-form-fill">
        <div class="form-center">
          <p class="has-account">
            已有账号？<nuxt-link :to="routerPath.login">立即登录</nuxt-link>
          </p>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="ruleForm.username"
                autocomplete="off"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                placeholder="确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
              <el-input
                v-model="ruleForm.phone"
                autocomplete="off"
                placeholder="手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
              <el-input
                v-model="ruleForm.checkPass"
                autocomplete="off"
                placeholder="短信验证码"
                style="width: 290px"
              ></el-input>
              <el-button type="primary" plain :disabled="isWrongPhone"
                >获取验证码</el-button
              >
            </el-form-item>
            <el-form-item label="">
              <el-checkbox v-model="accept"
                >我已阅读并接受以下条款：</el-checkbox
              >
              <div class="clause">
                <nuxt-link to="">《盛视商业产品注册协议》</nuxt-link>
                <nuxt-link to="">《盛视推广服务合同》</nuxt-link>
                <nuxt-link to="">《盛视隐私权保护声明》</nuxt-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                :disabled="!accept"
                style="width: 100%"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="footer">
        <CopyRight color="#b8b8b8" opacity="1"></CopyRight>
      </div>
    </div>
  </div>
</template>

<script>
import CopyRight from "@/components/CopyRight.vue";
import { regexp_phone } from "@/assets/js/regexp.js";
export default {
  components: {
    CopyRight,
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!regexp_phone.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        phone: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [{ message: "请输入验证码", trigger: "blur" }],
      },
      accept: false,
      isWrongPhone: true,
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 请求注册
          }
        });
      },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.register-container {
  a {
    color: #108cee;
  }
  .regist-header {
    height: 337px;
    background: url(~@/static/bg-1920x1080.png) no-repeat center center #000;
    .header-cont {
      background-color: rgba(23, 23, 23, 0.35);
      .header-center {
        padding: 10px 0;
        width: 980px;
        margin: 0 auto;
        a {
          color: #ffffff;
        }
      }
    }
  }
  .regist-form {
    width: 835px;
    margin: 0 auto;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    .regist-title {
      text-align: center;
      color: #fff;
      h2 {
        font-size: 32px;
        margin: 0;
      }
      p {
        font-size: 14px;
        opacity: 0.6;
        margin: 10px 0;
      }
    }
    .regist-form-fill {
      font-size: 14px;
      padding: 45px 20px 20px;
      background: #fff;
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.09);
      margin-top: 50px;
      .form-center {
        width: 417px;
        margin: 0 auto;
        .has-account {
          text-align: right;
          margin-bottom: 30px;
        }
        .clause {
          a {
            font-size: 12px;
          }
        }
      }
    }
    .footer{
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
