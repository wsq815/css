<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>类型表单
    </h3>
    <!-- 列表 -->
    <div class="margin-t-15">
      <x-quote>
        <x-form>
          <x-form-item label="类型名称">
            <x-input v-model="params.name" placeholder="请输入类型名称"></x-input>
          </x-form-item>
          <x-form-item label="类型级别">
            <x-radio v-model="params.level" :label="1">一级</x-radio>
            <x-radio v-model="params.level" :label="2">二级</x-radio>
          </x-form-item>
          <x-form-item label="父级产品" v-show="params.level === 2">
            <x-select v-model="parent">
              <x-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></x-option>
            </x-select>
          </x-form-item>
          <x-form-item>
            <x-button type="primary" @click="save">提交</x-button>
            <router-link to="/product-classification">
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
        list: [],
        parent: '',
        params: {
          level: 1,
          name: ''
        }
      };
    },
    methods: {
      // 保存
      save () {
        // 判断是添加还是更新
        if (this.params.level === 2) {
          this.params.parent = {
            id: this.parent
          };
        }
        if (this.id) {
          this.update();
        } else {
          this.add();
        }
      },
      async getList () {
        try {
          let res = await this.$ajax('product_type/list', {
            data: {
              pageSize: 100,
              pageNum: 0,
              level: 1
            }
          });
          this.list = res.content;
        } catch (error) {
          this.$notice.danger('列表获取失败');
        }
      },
      async add () {
        try {
          await this.$ajax('product_type/create', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/product-classification');
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('product_type/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/product-classification');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          const data = await this.$ajax('product_type/get', {
            method: 'post',
            data: {
              id: this.id
            }
          });
          if (data.level === 2) {
            this.parent = data.parent.id;
          }
          this.params = data;
        } catch (error) {
          this.$notice.danger('获取失败');
        }
      }
    },
    mounted () {
      if (this.id) this.getData();
      this.getList();
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

