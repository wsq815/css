<template>
  <div class="file-upload-box">
    <input type="file" style="display: none" @change="inputChange" ref="input">
    <div class="button-box" @click="inputClick">
      <img :src="imgPath" v-if="imgPath" alt="">
      <!--替换-->
      <span
        :class="{
          'upload-loading': uploadState === false && imgPath
        }"
        v-if="!uploadState"
      >
        <!--上传中-->
        <p v-if="uploadState === false && imgPath">
          <span>上传中</span>
        </p>
        <!--上传-->
        <p v-else>
          <span>上传图片</span>
        </p>
      </span>
      <!--替换-->
      <span class="replace" v-if="uploadState && imgPath">
        <p>
          替换图片
        </p>
      </span> 
    </div>
    <div class="message" v-if="message">{{message}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      curImgPath: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      type: {
        type: [String, Boolean],
        default: 'images'
      },
      customType: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default () {
          return 2000;
        }
      },
      qiniuResource: {
        type: String,
        default: 'linklawsImage'
      },
      path: {
        type: String,
        default: ''
      },
      Index: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        fileList: [],
        fileType: '',
        imgPath: this.curImgPath,
        uploadState: '',
        disable: false,
        baseUrl: ''
      };
    },
    methods: {
      inputClick () {
        this.$refs.input.value = '';
        this.$refs.input.click();
      },
      // input change
      inputChange (event) {
        let file = event.target.files[0];
        let name = escape(file.name);
        if (this.disable) return;
        this.disable = true;
        // 类型判断
        const type = this.customType ? 'customType' : this.type;
        if (type && !this.validationType(name, type)) {
          // 文件类型错误
          return this.error('type-error', '文件类型错误');
        }
        // size验证
        if (this.size && file.size / 1024 > this.size) {
          return this.error('size-error', `文件大小不能超过${this.size}kb`);
        }
        // 图片才进行预览和分辨率读写
        if (this.validationType(name, 'images')) {
          let reader = new FileReader();
          reader.onload = (path) => {
            // 调用上传
            this.imgPath = path.target.result;
            this.upload(file);
          };
          reader.readAsDataURL(file);
        } else {
          // 调用上传
          this.upload(file);
        }
      },
      // 获取token
      async getToken (callback) {
        try {
          const token = await this.$ajax('file/get_token', {
            data: {}
          });
          this.baseUrl = token.cloudUrl;
          callback(token.token);
        } catch (error) {
          this.error('', '七牛token获取失败');
        }
      },
      // 类型验证
      validationType (name, type) {
        switch (type) {
          case 'video':
            if (RegExp('\\w\\.(' + ('avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(name)) {
              return true;
            }
            break;
          case 'audio':
            if (RegExp('\\w\\.(' + ('mp3|wav|mid|flac') + ')$', 'i').test(name)) {
              return true;
            }
            break;
          case 'images':
            if (RegExp('\\w\\.(' + ('jpg|png|jpeg') + ')$', 'i').test(name)) {
              return true;
            }
            break;
          case 'ppt':
            if (RegExp('\\w\\.(' + ('ppt|pptx') + ')$', 'i').test(name)) {
              return true;
            }
            break;
          case 'apk':
            if (RegExp('\\w\\.(' + ('apk') + ')$', 'i').test(name)) {
              return true;
            }
            break;
          // 自定义验证
          case 'customType':
            if (RegExp('\\w\\.(' + (this.customType) + ')$', 'i').test(name)) {
              return true;
            }
            break;
        }
      },
      // 上传
      upload (file, path) {
        // 先获取七牛token
        this.getToken((qiniuToken) => {
          // 上传错误
          function error () {
            this.imgPath = this.uploadState = '';
            this.error('upload-error', '图片上传失败');
          }

          this.uploadState = false;
          let data = new FormData();
          let xhr = new XMLHttpRequest();
          let params = {
            file: file,
            index: this.Index
          };
          // 添加图片路径
          this.imgPath && (params.path = this.imgPath);
          this.$emit('upload-start', params);
          xhr.open('POST', 'http://up-z2.qiniu.com', true);
          // 添加数据
          data.append('token', qiniuToken);
          data.append('file', file);

          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                this.uploadState = true;
                this.disable = false;
                this.$notice('上传成功');
                this.$emit('upload-end', this.baseUrl + '/' + JSON.parse(xhr.responseText).key);
              } else {
                this::error();
              }
            }
          };
          // 进度条
          xhr.upload.onprogress = this.progress;
          // 错误
          xhr.onerror = () => {
            // 上传失败
            this::error();
          };
          xhr.send(data);
        });
      },
      // 进度条
      progress (event) {
        if (event.lengthComputable) {
          this.$emit('upload-progress', event.loaded / event.total * 100 | 0);
        }
      },
      // 错误
      error (type, message) {
        this.uploadState = this.disable = false;
        this.imgPath = '';
        this.$notice.danger(message);
      }
    },
    watch: {
      path: {
        immediate: true,
        handler (value) {
          if (value) {
            this.uploadState = true;
            this.imgPath = this.path;
          } else {
            this.uploadState = false;
            this.imgPath = '';
          }
        }
      },
      curImgPath: {
        immediate: true,
        handler (value) {
          if (value) {
            this.uploadState = true;
            this.imgPath = value;
          }
        }
      }
    }
  };
</script>


<style lang="scss" scoped>
  .file-upload-box{
    width: 100%;
    height: 100%;

    .button-box{
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      cursor: pointer;
      text-align: center;
      position: relative;
      overflow: hidden;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: bottom;

      // 上传中
      .upload-loading{
        background: rgba(51, 51, 51, 0.6);
      }

      & > img{
        display: block;
        width: 100%;
        height: 100%;
      }

      // 替换图片
      &:hover .replace{
        display: block;
      }

      & > span{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: block;
        line-height: 1;
        z-index: 999;

        &::after{
          content: '';
          height: 100%;
          display: inline-block;
          vertical-align: middle;
        }

        p{
          display: inline-block;
          vertical-align: middle;
        }

        i{
          display: block;
          margin-bottom: 4px;
        }

        font-size: 14px;
        color: #929292;

        &.replace{
          background: rgba(51, 51, 51, 0.6);
          color: #fff;
        }
      }
    }

    .message{
      display: inline-block;
      font-size: 14px;
      color: #B5B5B5;
      vertical-align: bottom;
      padding-left: 20px;
      line-height: 1;
      padding-bottom: 10px;
    }
  }
</style>
