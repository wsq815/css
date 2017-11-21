<template>
  <div class="product-list">
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>厂家信息
    </h3>
    <!-- 列表 -->
    <div>
      <div class="row-title">列表</div>
      <x-quote>
        <!-- <div class="table-head x-clear-float margin-t-10">
          <div class="x-float-r">
            <x-input placeholder="请输入厂家信息" class="x-float-l" inline></x-input>
            <x-button type="primary" class="margin-l-5">搜索</x-button>
          </div>
        </div> -->
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="厂家名称" name="$index"></x-table-column> 
          <x-table-column label="所属地区">
            <template scope="data">
              {{data.row.province}} - {{data.row.city}} - {{data.row.area}}
            </template>
          </x-table-column>
          <x-table-column label="详细地址" name="address"></x-table-column>
          <x-table-column label="联系方式" name="contact"></x-table-column>
          <x-table-column label="手机号" name="phone"></x-table-column>
          <x-table-column label="厂家入驻时间" name="createTime"></x-table-column>
          <x-table-column :width="100" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/update-factory/${data}`">
                <x-button size="mini" type="primary">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15 x-clear-float">
          <router-link to="/add-factory" class="x-float-l">
            <x-button class="x-float-l">新增</x-button>
          </router-link>
          <x-page class="x-float-r" @change="pageChange" :total="totalNumber" :page-size="pageSize"></x-page>
        </div>
      </x-quote>
      <!-- 信息 -->
      <x-quote class="margin-t-15">
        <h4>详情</h4>
        <ul class="info-list">
          <li>在线产品: </li>
          <li>产品入驻时间: </li>
          <li>已经生产设备数量: </li>
          <li>已经出售产品数量: </li>
          <li>产品故障率: </li>
          <li>售后好评率: </li>
        </ul>
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
          let res = await this.$ajax('factory/list', {
            data: {
              pageSize: 10,
              pageNum: this.curPage
            }
          });
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
            await this.$ajax('factory/delete', {
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

<style lang="scss" scope>
  .info-list {
    padding-top: 10px;

    li {
      padding-left: 8px;
      padding-top: 5px;
    }
  }
</style>

