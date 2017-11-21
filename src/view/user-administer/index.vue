<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>用户管理
    </h3>
    <x-quote class="margin-t-15">
      <h4>用户管理</h4>
      </br>
      <div class="instruction-box">
        <span>通过本页，您可以增删改查用户，从而实现云平台对用户的管控功能：</span>
        <ul>
          <li>列出用于；</li>
          <li>设置用户权限；</li>
        </ul>
      </div>
    </x-quote>
    <!-- 活跃设备 -->
    <div>
      <div class="row-title">活跃设备</div>
      <x-quote>
        <!-- <div class="table-head x-clear-float margin-t-10">
          <x-input placeholder="请输入搜索关键字" class="search-input x-float-l" inline></x-input>
          <x-select class="x-float-r" v-model="params.entries">
            <x-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            ></x-option>
          </x-select>
        </div> -->
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="id" name="id" :width="120"></x-table-column>
          <x-table-column label="名称" name="username"></x-table-column>
          <x-table-column label="创建时间" name="createTime"></x-table-column>
          <x-table-column label="更新时间" name="updateTime"></x-table-column>
          <x-table-column :width="100" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/update-user/${data}`">
                <x-button size="mini" type="primary">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15 x-clear-float">
          <router-link to="/add-user" class="x-float-l">
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
          let res = await this.$ajax('user/list', {
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
            await this.$ajax('user/delete', {
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
