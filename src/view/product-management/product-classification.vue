<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>产品分类
    </h3>
    <!-- 活跃设备 -->
    <div>
      <div class="row-title">列表</div>
      <x-quote>
        <div class="x-text-r">
          <x-select class="x-text-l" v-model="type" @change="getList">
            <x-option label="全部" :value="0"></x-option>
            <x-option label="一级分类" :value="1"></x-option>
            <x-option label="二级分类" :value="2"></x-option>
          </x-select>
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="序号" name="id" :width="120"></x-table-column>
          <x-table-column label="类型id" name="id"></x-table-column>
          <x-table-column label="名称" name="name"></x-table-column>
          <x-table-column label="父级产品id">
            <template scope="data">
              <span>{{data.row.parent && data.row.parent.id}}</span>
            </template>
          </x-table-column>
          <x-table-column label="产品级别" name="level">
            <template scope="data">
              <x-tag>{{data}}级</x-tag>
            </template>
          </x-table-column>
          <x-table-column :width="100" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/update-product-classification/${data}`">
                <x-button size="mini" type="primary">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15 x-clear-float">
          <router-link to="/add-product-classification" class="x-float-l">
            <x-button class="x-float-l">新增</x-button>
          </router-link>
          <x-page class="x-float-r" @change="pageChange" :total="totalNumber" :page-size="pageSize"></x-page>
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
        list: [],
        // 总条数
        totalNumber: 0,
        type: 0
      };
    },
    methods: {
      pageChange (curPage) {
        this.curPage = curPage - 1;
        this.getList();
      },
      async getList () {
        try {
          const data = {
            pageSize: 10,
            pageNum: this.curPage
          };
          if (this.type) {
            data.level = this.type;
          }
          let res = await this.$ajax('product_type/list', { data });
          this.list = res.content;
          this.totalNumber = res.totalElements;
        } catch (error) {
          this.$notice.danger('列表获取失败');
        }
      },
      // 删除
      deleteProduct (id) {
        this.$dialog.confirm('是否确定删除?', async () => {
          try {
            await this.$ajax('product_type/delete', {
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
