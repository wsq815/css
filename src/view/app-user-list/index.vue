<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>app用户列表
    </h3>
    <!-- app用户列表 -->
    <div>
      <div class="row-title">用户列表</div>
      <x-quote>
        <div class="x-clear-float">
          <div class="x-float-l">
            <x-select v-model="value">
              <x-option label="安卓" value="安卓"></x-option>
              <x-option label="ios" value="ios"></x-option>
            </x-select>
          </div>
          <div class="x-float-r x-text-r">
            <x-input v-model="searchId" inline placeholder="请输入id"></x-input>
            <x-button type="primary" @click="handleSearch()">搜索</x-button>
          </div>
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="id" name="id"></x-table-column>
          <x-table-column label="图片" :width="100" name="houseImage">
            <template scope="data">
              <div class="img-box">
                <img :src="data">
              </div>
            </template>
          </x-table-column>
          <x-table-column label="名称" name="name"></x-table-column>
          <x-table-column label="手机号码" name="user"></x-table-column>
          <x-table-column label="性别" name="sex"></x-table-column>
          <x-table-column label="年龄" name="age"></x-table-column>
          <x-table-column label="在线状态" name="isOnline"></x-table-column>
          <x-table-column label="创建时间" name="createTime"></x-table-column>
          <x-table-column label="修改时间" name="updateTime"></x-table-column>
          <x-table-column :width="135" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/app-user-details/${data}`">
                <x-button size="mini" type="primary">详细</x-button>
              </router-link>
              <router-link :to="`/add-app-user/${data}`">
                <x-button size="mini" type="success">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div :class="{'tip': true,'tip-sel': isShow}">暂无数据</div>
        <div class="x-text-r margin-t-15 x-clear-float">
          <x-page class="x-float-r" @change="pageChange" :total="totalNumber" :page-size="pageSize"></x-page>
        </div>
      </x-quote>
    </div>
    <!-- 用户关系查询 -->
    <div>
      <div class="row-title">用户关系列表</div>
      <x-quote>
        <div class="x-text-r">
          <x-input inline placeholder="请输入id"></x-input>
         <!--  <x-button type="primary">搜索</x-button> -->
          <x-button type="primary" @click="handleSearch()">搜索</x-button>
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="id" name="id" :width="120"></x-table-column>
          <x-table-column label="收到的分享" name="username"></x-table-column>
          <x-table-column label="分享出去的" name="createTime"></x-table-column>
          <x-table-column label="时间" name="updateTime"></x-table-column>
          <x-table-column label="位置" name="updateTime"></x-table-column>
          <x-table-column :width="100" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/app-sharing-details/`">
                <x-button size="mini" type="primary">详细</x-button>
              </router-link>
                      
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15 x-clear-float">
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
        value: '',
        pageSize: 10,
        // 当前分页
        curPage: 0,
        list: [],
        // 总条数
        totalNumber: 0,
        searchId: '',
        params: {
          pageSize: 10,
          pageNum: this.curPage
        },
        isShow: false
      };
    },
    methods: {
      pageChange (curPage) {
        this.curPage = curPage - 1;
        this.getList();
      },
      async getList () {
        try {
          let res = await this.$ajax('phone/list', {
            data: this.params
          });
          this.list = res.content;
          this.totalNumber = res.totalElements;
        } catch (error) {
          this.$notice.danger('列表获取失败');
        }
      },
      // 查询单个用户
      async getSingle () {
        try {
          let res = await this.$ajax('phone/list', {
            data: {
              id: this.searchId
            }
          });
          this.list = res.content;
          this.totalNumber = res.totalElements;
          if (this.list.length === 0) {
            this.$notice.danger('该id不存在');
            this.isShow = true;
            return;
          } else {
            this.isShow = false;
          }
        } catch (error) {
          this.$notice.danger('该id不存在');
        }
      },
      // 删除
      deleteProduct (id) {
        this.$dialog.confirm('是否确定删除?', async () => {
          try {
            await this.$ajax('phone/delete', {
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
      },
      handleSearch () {
        this.getSingle(8);
      }
    },
    mounted () {
      this.getList();
    }
  };
</script>

<style lang="scss" scoped>
  .img-box {
    width: 85px;
    height: 55px;
    border: 1px solid #eee;
    overflow: hidden;
  }
  .x-text-r{
    font-size: 0;
    button{
      display: inline-block;
      vertical-align: top;
    }
  }
  .tip{
    display: none;
    text-align: center;
    padding: 10px 0;
    border: 1px solid #e6e6e6 {
      top: none;
    }
  }
  .tip-sel{
    display: block;
  }
</style>

