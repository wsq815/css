<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>用户表单
    </h3></br>
    <!-- 列表 -->
    <div>
      <x-quote>
        <x-form>
          <x-form-item label="用户名称">
            <x-input v-model="params.username" placeholder="请输入用户名称"></x-input>
          </x-form-item>
          <x-form-item label="用户密码">
            <x-input v-model="params.password" input-type="password" placeholder="请输入用户密码"></x-input>
          </x-form-item>
          <x-form-item>
            <x-button type="primary" @click="save">提交</x-button>
            <router-link to="/user-administer">
              <x-button>取消</x-button>
            </router-link>
          </x-form-item>
        </x-form>
      </x-quote>
    </div>
  </div>
</template>

<script>

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
          await this.$ajax('user/create', {
            method: 'post',
            data: this.params
          });
          this.$notice('添加成功');
          this.$router.push('/user-administer');
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('user/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/user-administer');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          this.params = await this.$ajax('user/get', {
            method: 'post',
            data: {
              id: this.id
            }
          });
        } catch (error) {
          this.$notice.danger('获取失败');
        }
      }
    },
    mounted () {
      if (this.id) this.getData();
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

