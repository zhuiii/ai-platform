<template>
  <div class="demo-upload">
    <!-- 画布展示 -->
    <div :class="scanCls" :style="{ height: canvasHeight }">
      <canvas class="cvs" :id="uniqueIdCompu"></canvas>
      <!-- 拖拽上传 -->
      <el-upload
        class="upload-drag"
        drag
        :action="uploadUrl"
        :show-file-list="false"
        :name="uploadFileKey"
        :auto-upload="autoUpload"
        :before-upload="beforeUpload"
        :on-success="handleLocalImgUploadSuccess"
        :on-error="handleLocalImgUploadError"
        :on-change="uploadChange"
        @click.native.prevent=""
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处</div>
      </el-upload>
    </div>
    <div class="img-input">
      <div class="img-input-cont">
        <!-- 操作选择 -->
        <div class="flex-center-center action-wrap" v-if="!showRemoteUrl">
          <!-- <button class="upload-btn" @click="showRemoteUrl = true">
            URL上传
          </button>
          <span style="margin: 0 20px; color: #fff">或</span> -->
          <!-- 上传文件 -->
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :name="uploadFileKey"
            :auto-upload="autoUpload"
            :before-upload="beforeUpload"
            :on-success="handleLocalImgUploadSuccess"
            :on-error="handleLocalImgUploadError"
            :on-change="uploadChange"
          >
            <el-button class="upload-btn"
              ><i class="fa fa-plus"></i>上传本地图片</el-button
            >
          </el-upload>
        </div>
        <!-- 输入网络URL -->
        <div class="input-remote-url" v-else>
          <el-input
            class="img-el-input"
            placeholder="请输入网络图片URL"
            v-model="imgRemoteSrc"
          >
            <template slot="append">
              <div
                class="test-btn"
                @click="confirmTest"
                :disabled="scanLoading"
              >
                检测
              </div>
            </template>
          </el-input>
          <div class="el-icon-close close-btn" @click="handleRemoteClose"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { canvasDrawImg, canvasDrawRect } from "@/assets/js/mycanvas.js";

import {
  readBlobAsDataURL,
  isHttpOrHttps,
  getMinScaleRatio,
} from "@/assets/js/utils.js";
export default {
  props: {
    // 唯一id标识
    uniqueId: {
      type: String,
      default: () => "",
    },
    uploadUrl: {
      type: String,
      default: () => "",
    },
    uploadFileKey: {
      type: String,
      default: () => "image",
    },
    autoUpload: {
      type: Boolean,
      default: () => true,
    },
    scanLoading: {
      type: Boolean,
      default: () => false,
    },
    // 外部传入图片地址进行绘制
    drawImgSrc: {
      type: String,
      default: () => "",
    },
    canvasHeight: {
      type: String,
      default: () => "",
    },
    toggleReset: Boolean,
  },
  computed: {
    uniqueIdCompu() {
      return `image-canvas-${this.uniqueId}`;
    },
    scanCls() {
      return this.scanLoading ? "canvas-wrap g-scan" : "canvas-wrap";
    },
    autoUploadComputed() {
      return this.autoUpload;
    },
  },
  watch: {
    drawImgSrc(newVal, oldVal) {
      canvasDrawImg(this.uniqueIdCompu, newVal, {}, () => {
        this.shrinkRatio = this.setCanvasShrink();
      });
    },
    toggleReset() {
      this.handleToggleReset();
    },
  },
  data() {
    return {
      messageOffset: 200,
      cvs: null,
      showRemoteUrl: false,
      imgRemoteSrc: "",
      shrinkRatio: 1,
    };
  },
  methods: {
    // 点击检测按钮
    confirmTest() {
      if (!this.imgRemoteSrc || !isHttpOrHttps(this.imgRemoteSrc)) {
        return this.$message.warning("无效的网络地址！");
      }
      this.$emit("handleTestClick", this.imgRemoteSrc);
    },
    // 文件上传前操作
    beforeUpload(file) {
      readBlobAsDataURL(file, (fileDataUrl) => {
        this.imgDisplaySrc = fileDataUrl;
        canvasDrawImg(this.uniqueIdCompu, fileDataUrl, {}, () => {
          this.shrinkRatio = this.setCanvasShrink();
        });
        this.$emit("beforeUpload");
      });
    },
    // 文件上传识别成功
    handleLocalImgUploadSuccess(res, file) {
      this.$emit("uploadSuccess", res.data);
    },
    handleLocalImgUploadError(err, file, fileList) {
      this.$emit("uploadError", res.data);
      this.$message({
        message: "上传失败，请重试",
        type: "error",
        offset: this.messageOffset,
      });
    },
    // 手动上传获取上传文件
    uploadChange(file, fileList) {
      this.$emit("handleChange", file);
    },
    handleRemoteClose() {
      this.showRemoteUrl = false;
      this.imgRemoteSrc = "";
    },
    // 设置画布居中、缩放比
    setCanvasShrink() {
      let ratio = 1;
      if (this.cvs) {
        const cW = this.cvs.width;
        const cH = this.cvs.height;
        const parentW = this.cvs.parentElement.clientWidth;
        const parentH = this.cvs.parentElement.clientHeight;
        ratio = getMinScaleRatio({
          width: cW,
          height: cH,
          parentWidth: parentW,
          parentHeight: parentH,
        });
        this.cvs.style.transform = `translate(-50%, -50%) scale(${ratio})`;
      }
      return ratio;
    },
    handleToggleReset() {
      canvasDrawImg(this.uniqueIdCompu, this.drawImgSrc, {}, () => {
        this.shrinkRatio = this.setCanvasShrink();
      });
    },
  },
  created() {},
  mounted() {
    this.cvs = document.querySelector(`#${this.uniqueIdCompu}`);
  },
};
</script>
<style scoped lang='less'>
.demo-upload {
  position: relative;
  &:hover {
    .canvas-wrap {
      .upload-drag {
        opacity: 1;
      }
    }
  }
  .canvas-wrap {
    overflow: hidden;
    position: relative;
    background: rgb(218 218 218 / 45%);
    .cvs {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    .upload-drag {
      width: 100%;
      height: 100%;
      position: absolute;
      transition: all 0.2s;
      opacity: 0;
      /deep/ .el-upload-dragger {
        cursor: default;
        border: 0;
        padding-top: 20%;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #00000042;
        border-radius: 0;
        .el-icon-upload,
        .el-upload__text {
          color: #fff;
        }
      }
    }
  }
  .img-input {
    width: 100%;
    padding: 12px;
    background: rgba(49, 49, 49, 0.68);
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    .img-input-cont {
      display: flex;
      align-items: center;
      justify-content: center;
      .input-remote-url {
        display: flex;
        align-items: center;
        .img-el-input {
          /deep/ input,
          /deep/ .el-input-group__append {
            border-radius: 0;
            background-color: rgba(0, 0, 0, 0.45);
            border: 1px solid #666;
            color: #ffffff;
            outline: 0;
          }
          /deep/ input {
            border-right: 0;
          }
          .test-btn {
            text-align: center;
            cursor: pointer;
          }
        }
        .close-btn {
          font-size: 20px;
          color: #fff;
          cursor: pointer;
          margin-left: 10px;
        }
      }
      .upload-btn {
        border: 1px solid #4a81ff;
        background: #4a81ff;
        width: 160px;
        height: 42px;
        /deep/ span,
        /deep/ i {
          font-size: 16px;
          color: #fff;
        }
        i {
          margin-right: 6px;
        }
        &:hover {
          /deep/ span {
            color: #fff;
          }
        }
      }
    }
    .input-tip {
      margin-top: 10px;
      color: #ccc;
      font-size: 12px;
    }
  }
}
</style>