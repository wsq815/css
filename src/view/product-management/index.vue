<template>
  <div class="product-list">
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>产品列表
    </h3>
    <!-- 列表 -->
    <div>
      <div class="row-title">列表</div>
      <x-quote>
        <div class="table-head x-clear-float margin-t-10">
          <router-link to="/add-product">
            <x-button>添加</x-button>
          </router-link>
          <x-select class="x-float-r" v-model="pageSize" @change="getList">
            <x-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            ></x-option>
          </x-select>
          <!-- <div class="x-float-r">
            <x-input placeholder="请输入ID..." class="x-float-l" inline></x-input>
            <x-button type="primary" class="margin-l-5">搜索</x-button>
          </div> -->
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="序号" :width="65" name="$index"></x-table-column>
          <x-table-column label="产品id" name="factoryId"></x-table-column>
          <x-table-column :width="102" label="图片" name="imageUrl">
            <template scope="data">
              <div class="img-box">
                <img :src="data" alt="">
              </div>
            </template>
          </x-table-column>
          <x-table-column label="名称" name="name"></x-table-column>
          <x-table-column label="类型">
            <template scope="data">
              {{data.row.productType && data.row.productType.name}}
            </template>
          </x-table-column>
          <x-table-column label="创建时间" name="createTime"></x-table-column>
          <x-table-column label="厂商id" name="factoryId"></x-table-column>
          <x-table-column label="pcb" name="pcb"></x-table-column>
          <x-table-column label="固件" name="firmware"></x-table-column>
          <x-table-column :width="100" name="id" label="操作">
            <template scope="data">
              <router-link :to="`/update-product/${data}`">
                <x-button size="mini" type="primary">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15">
          <x-page @change="pageChange" :total="totalNumber" :page-size="pageSize"></x-page>
        </div>
      </x-quote>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageSize: 10,
        // 当前分页
        curPage: 0,
        options: [10, 15, 50, 100],
        list: [],
        // 总条数
        totalNumber: 0
      };
    },
    methods: {
      pageChange (curPage) {
        this.curPage = curPage - 1;
        this.getList();
      },
      async getList () {
        try {
          const res = await this.$ajax('product/list', {
            method: 'post',
            data: {
              pageSize: this.pageSize,
              pageNum: this.curPage
            }
          });
          this.list = res.content;
          this.totalNumber = res.totalElements;
        } catch (error) {
          this.$notice.danger(error);
        }
      },
      // 删除
      deleteProduct (id) {
        this.$dialog.confirm('是否确定删除?', async () => {
          try {
            await this.$ajax('product/delete', {
              method: 'post',
              data: {
                id: id
              }
            });
            this.$notice('删除成功');
            this.getList();
          } catch (error) {
            this.$notice.danger(error);
          }
        }, () => {});
      }
    },
    mounted () {
      this.getList();
    }
  };
</script>

<style lang="scss" scoped>
  .img-box {
    width: 100px;
    height: 40px;
    overflow: hidden;
  }
</style>

