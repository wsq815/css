<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>添加工厂
    </h3>
    <!-- 列表 -->
    <div>
      <div class="row-title">添加</div>
      <x-quote>
          <x-form>
            <x-form-item label="名称">
              <x-input v-model="params.name" placeholder="请输入名称"></x-input>
            </x-form-item>
            <x-form-item label="联系方式">
              <x-input v-model="params.contact" placeholder="请输入联系方式"></x-input>
            </x-form-item>
            <x-form-item label="手机号">
              <x-input v-model="params.phone" placeholder="请输入手机号"></x-input>
            </x-form-item>
            <x-form-item label="地区">
              <x-input inline v-model="params.province" placeholder="请输入省份"></x-input>
              <span>-</span>
              <x-input inline v-model="params.city" placeholder="请输入市"></x-input>
              <span>-</span>
              <x-input inline v-model="params.area" placeholder="请输入区"></x-input>
            </x-form-item>
            <x-form-item label="详细地址">
              <x-input v-model="params.address" placeholder="请输入详细地址"></x-input>
            </x-form-item>
            <x-form-item>
              <x-button type="primary" @click="save">提交</x-button>
              <router-link to="/factory-info">
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
        params: {
          imageUrl: 'http://img.pipaw.net/wy/editor/news/2016/01/27/9ce0b27fc7aa2bc89ba2a1ee20f764ef.jpg',
          name: '',
          factoryId: '',
          model: '',
          pcb: '',
          firmware: '',
          remarks: ''
        }
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
          await this.$ajax('factory/create', {
            method: 'post',
            data: this.params
          });
          this.$dialog.confirm('添加成功, 是否继续添加', () => {}, () => {
            this.$router.push('/factory-list');
          });
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('factory/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/factory-list');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          this.params = await this.$ajax('factory/get', {
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

