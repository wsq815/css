<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>添加产品
    </h3>
    <!-- 列表 -->
    <div>
      <div class="row-title">添加</div>
      <x-quote>
        <x-form>
          <x-form-item label="产品名称">
            <x-input v-model="params.name" placeholder="请输入产品名称"></x-input>
          </x-form-item>
          <x-form-item label="产品图片">
            <div class="product-img">
              <file-upload :cur-img-path="params.imageUrl" @upload-end="imgUploadEnd"></file-upload>
            </div>
          </x-form-item>
          <x-form-item label="厂商id">
            <x-select v-model="params.factoryId" placeholder="请选择厂商id">
              <x-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></x-option>
            </x-select>
          </x-form-item>
          <x-form-item label="产品类型">
            <x-select v-model="type" placeholder="请选择产品类型">
              <x-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.id"></x-option>
            </x-select>
          </x-form-item>
          <x-form-item label="型号">
            <x-input v-model="params.model" placeholder="请输入型号"></x-input>
          </x-form-item>
          <x-form-item label="pcb">
            <x-input v-model="params.pcb" placeholder="请输入pcb"></x-input>
          </x-form-item>
          <x-form-item label="固件">
            <x-input v-model="params.firmware" placeholder="请输入固件信息"></x-input>
          </x-form-item>
          <x-form-item label="产品备注">
            <x-textarea v-model="params.remarks" placeholder="请输入备注信息..."></x-textarea>
          </x-form-item>
          <x-form-item>
            <x-button type="primary" @click="save">提交</x-button>
            <router-link to="/product-list">
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
        type: '',
        params: {
          imageUrl: '',
          name: '',
          factoryId: '',
          model: '',
          pcb: '',
          firmware: '',
          remarks: '',
          productType: {}
        },
        list: [],
        typeList: []
      };
    },
    methods: {
      async getTypeList () {
        try {
          const data = {
            pageSize: 100,
            pageNum: 0,
            level: 2
          };
          let res = await this.$ajax('product_type/list', { data });
          this.typeList = res.content;
        } catch (error) {
          this.$notice.danger('列表获取失败');
        }
      },
      async getList () {
        try {
          let res = await this.$ajax('factory/list', {
            data: {
              pageSize: 100,
              pageNum: 0
            }
          });
          this.list = res.content;
        } catch (error) {
          this.$notice.danger('列表获取失败');
        }
      },
      imgUploadEnd (path) {
        this.params.imageUrl = path;
      },
      // 保存
      save () {
        this.params.productType = {
          id: this.type
        };
        // 判断是添加还是更新
        if (this.id) {
          this.update();
        } else {
          this.add();
        }
      },
      async add () {
        try {
          await this.$ajax('product/create', {
            method: 'post',
            data: this.params
          });
          this.$notice('添加成功');
          this.$router.push('/product-list');
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      async update () {
        try {
          await this.$ajax('product/update', {
            method: 'post',
            data: this.params
          });
          this.$notice('保存成功');
          this.$router.push('/product-list');
        } catch (error) {
          this.$notice.danger('更新失败');
        }
      },
      async getData () {
        try {
          this.params = await this.$ajax('product/get', {
            method: 'post',
            data: {
              id: this.id
            }
          });
          this.type = this.params.productType.id;
        } catch (error) {
          this.$notice.danger('获取失败');
        }
      }
    },
    components: {
      fileUpload
    },
    mounted () {
      if (this.id) this.getData();
      this.getList();
      this.getTypeList();
    }
  };
</script>


<style lang="scss" scope>
  .product-img {
    width: 200px;
    height: 240px;
  }
</style>

