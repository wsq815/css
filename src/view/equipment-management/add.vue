<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>添加设备
    </h3>
    <!-- 列表 -->
    <div>
      <div class="row-title">添加</div>
      <x-quote>
        <x-form>
          <!-- <x-form-item label="设备编码">
            <x-input v-model="params.id" placeholder="请输入设备编码"></x-input>
          </x-form-item> -->
          <x-form-item label="名称">
            <x-input v-model="params.name" placeholder="请输入名称"></x-input>
          </x-form-item>
          <x-form-item label="状态">
            <x-switch v-model="params.isOnline"></x-switch>
          </x-form-item>
          <x-form-item label="所属产品">
            <x-select v-model="params.product.id" placeholder="请选择厂商id">
              <x-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></x-option>
            </x-select>
          </x-form-item>
          <x-form-item label="设备类型">
            <x-input v-model="params.type" placeholder="请输入设备类型"></x-input>
          </x-form-item>
          <x-form-item label="厂家">
            <x-input v-model="params.factory" placeholder="请输入厂家"></x-input>
          </x-form-item>
          <x-form-item label="所在地">
            <x-input v-model="params.location" placeholder="请输入所在地"></x-input>
          </x-form-item>
          <x-form-item label="绑定时间">
            <date-picker :date="bindTime" placeholder="请输入绑定时间"></date-picker>
          </x-form-item>
          <x-form-item label="出厂日期">
            <date-picker :date="productionDate" placeholder="请输入出厂日期"></date-picker>
          </x-form-item>
          <x-form-item>
            <x-button type="primary" @click="save">提交</x-button>
            <router-link to="/equipment-list">
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
        params: {
          product: {
            id: ''
          }
        },
        bindTime: {
          time: ''
        },
        productionDate: {
          time: ''
        },
        bindOptions: {
          placeholder: '请输入绑定时间',
          format: 'YYYY-MM-DD HH:mm'
        },
        productionOptions: {
          placeholder: '请输入出厂日期',
          format: 'YYYY-MM-DD HH:mm'
        }
      };
    },
    methods: {
      async getList () {
        try {
          const res = await this.$ajax('product/list', {
            method: 'post',
            data: {
              pageSize: 100,
              pageNum: 0
            }
          });
          this.list = res.content;
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      // 保存
      save () {
        this.params.isOnline = this.params.isOnline ? 1 : 0;
        this.params.bindTime = this.bindTime.time + ':00';
        this.params.productionDate = this.productionDate.time + ':00';
        // 判断是添加还是更新
        if (this.id) {
          this.update();
        } else {
          this.add();
        }
      },
      async add () {
        try {
          await this.$ajax('client/create', {
            method: 'post',
            data: this.params
          });
          this.$notice('添加成功');
          this.$router.push('/equipment-list');
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('client/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/equipment-list');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          this.params = await this.$ajax('client/get', {
            method: 'post',
            data: {
              id: this.id
            }
          });
          this.params.isOnline = this.params.isOnline ? 1 : 0;
          this.bindTime.time = this.params.bindTime;
          this.productionDate.time = this.params.productionDate;
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

