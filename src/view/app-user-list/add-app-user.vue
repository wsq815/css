<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>用户表单
    </h3></br>
    <!-- 列表 -->
    <div>
      <x-quote>
        <x-form>
          <x-form-item label="手机号码">
            <x-input v-model="params.user" placeholder="请输入手机号码"></x-input>
          </x-form-item>
          <x-form-item label="用户密码">
            <x-input v-model="params.password" input-type="password" placeholder="请输入用户密码"></x-input>
          </x-form-item>
          <x-form-item label="性别"> 
            <x-radio-group v-model="params.sex">
              <x-radio label="男">男</x-radio></x-radio>
              <x-radio label="女">女</x-radio></x-radio>
              <x-radio label="保密">保密</x-radio></x-radio>
            </x-radio-group>
          </x-form-item>
          <x-form-item label="年龄">
              <x-slider v-model="params.age"></x-slider>
          </x-form-item>
          <x-form-item label="在线状态">
            <x-switch v-model='params.isOnline' ></x-switch>
          </x-form-item>
          <x-form-item label="房子图片">
            <div class="product-img">
              <file-upload :cur-img-path="params.houseImage" @upload-end="imgUploadEnd"></file-upload>
            </div>
          </x-form-item> 
          <x-form-item label="房屋名称">
            <x-input v-model="params.houseName" placeholder="请输入房屋名称"></x-input>
          </x-form-item> 
          <x-form-item label="房主姓名">
            <x-input v-model="params.name" placeholder="请输入房主姓名"></x-input>
          </x-form-item> 
          <x-form-item label="房主邮箱">
            <x-input v-model="params.mail" placeholder="请输入邮箱账号"></x-input>
          </x-form-item>
          <x-form-item label="房主备用手机">
            <x-input v-model="params.phone2" placeholder="请输入备用手机"></x-input>
          </x-form-item>
          <x-form-item>
            <x-button type="primary" @click="save">提交</x-button>
            <router-link to="/app-user-list">
              <x-button>取消</x-button>
            </router-link>
          </x-form-item> 
        </x-form>
      </x-quote>
    </div>
  </div>
</template>

<script>
  import fileUpload from 'components/qiniu-file-upload';
  
  export default {
    data () {
      return {
        id: this.$route.params.id,
        params: {}
      };
    },
    methods: {
      // 保存
      save () {
        // 判断是添加还是更新
        if (this.id) {
          this.update();
        } else {
          this.add();
        }
      },
      async add () {
        try {
          await this.$ajax('phone/create', {
            method: 'post',
            data: this.params
          });
          this.$notice('添加成功');
          this.$router.push('/app-user-list');
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('phone/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/app-user-list');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          this.params = await this.$ajax('phone/get', {
            method: 'post',
            data: {
              id: this.id
            }
          });
        } catch (error) {
          this.$notice.danger('获取失败');
        }
      },
      imgUploadEnd (path) {
        this.params.houseImage = path;
      }
    },
    watch: {
      params: {
        handler (curVal, oldVal) {
          if (oldVal.isOnline) {
            oldVal.isOnline = 1;
          } else {
            oldVal.isOnline = 0;
          }
        },
        deep: true
      }
    },
    mounted () {
      if (this.id) this.getData();
    },
    components: {
      fileUpload
    }
  };
</script>


<style lang="scss" scope>
  .product-img {
    width: 200px;
    height: 240px;
    border: 1px solid #eee;
    cursor: pointer;
  }
</style>

