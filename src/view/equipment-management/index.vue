<template>
  <div class="equipment-list">
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>设备管理
    </h3>
    <x-quote class="margin-t-15">
      <h4>设备管理</h4>
      </br>
      <div class="instruction-box">
        <span>通过本页，您可以增删改查设备，从而实现云平台对设备的管控功能：</span>
        <ul>
          <li>设备可以在允许的情况下入网，从而保证用户的设备安全；</li>
          <li>设备的数据均存在在数据库中；</li>
          <li>为开发者提供的调试功能: 自定义数据发送给数据、也可以监控设备产生的数据</li>
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
          <x-table-column label="设备编码" :width="120" name="id"></x-table-column> 
          <x-table-column label="设备名称" name="name"></x-table-column>
          <x-table-column label="当前状态" :width="90" name="isOnline">
            <template scope="data">
              <x-tag :type="data ? 'primary' : 'danger'">{{data ? '在线' : '离线'}}</x-tag>
            </template>
          </x-table-column>
          <x-table-column label="所属产品" name="product">
            <template scope="data">
              {{data && data.name}}
            </template>
          </x-table-column>
          <x-table-column label="设备类型" name="type"></x-table-column>
          <x-table-column label="厂家" name="factory"></x-table-column>
          <x-table-column label="所在地" name="location"></x-table-column>
          <x-table-column label="绑定时间" name="bindTime"></x-table-column>
          <x-table-column label="出厂日期" name="productionDate"></x-table-column>
          <x-table-column :width="100" label="操作" name="id">
            <template scope="data">
              <router-link :to="`/update-equipment/${data}`">
                <x-button size="mini" type="primary">修改</x-button>
              </router-link>
              <x-button size="mini" type="danger" @click="deleteProduct(data)">删除</x-button>
            </template>
          </x-table-column>
        </x-table>
        <div class="x-text-r x-clear-float margin-t-15">
          <router-link to="/add-equipment">
            <x-button class="x-float-l">添加</x-button>
          </router-link>
          <x-page class="x-float-r" @change="pageChange" :total="totalNumber" :page-size="pageSize"></x-page>
        </div>
      </x-quote>
    </div>
    <!-- 新设备 -->
    <!-- <div>
      <div class="row-title">新设备</div>
      <x-quote>
        <div class="table-head x-clear-float margin-t-10">
          <x-input placeholder="请输入搜索关键字" class="search-input x-float-l" inline></x-input>
          <div class="x-float-r">
            <x-button type="primary">允许所有</x-button>
            <x-button type="danger">删除所有</x-button>
          </div>
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="设备名" name="$index"></x-table-column> 
          <x-table-column label="设备唯一编码" name="name"></x-table-column>
          <x-table-column label="位置" name="age"></x-table-column>
          <x-table-column label="操作" name="age"></x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15">
          <x-page :total="500"></x-page>
        </div>
      </x-quote>
    </div> -->
    <!-- 向设备发数据/消息 -->
    <!-- <div class="send-msg">
      <div class="row-title">向设备发数据/消息</div>
      <x-quote>
        <div class="equipment">
          <div class="left-box">
            <div>
              <h5>目的设备编号</h5>
              <div class="equipment-list margin-t-10">
                <ul>
                  <li>0001</li>
                  <li>0001</li>
                  <li>0001</li>
                  <li>0001</li>
                  <li>0001</li>
                  <li>0001</li>
                </ul>
              </div>
            </div>
            <div class="margin-t-10">
              <x-textarea class="textarea"></x-textarea>
            </div>
          </div>
          <div class="right-box">
            <h5>目的设备编号</h5>
            <x-textarea class="textarea margin-t-10"></x-textarea>
          </div>
        </div>
        <div class="margin-t-10 x-text-r">
          <x-button type="primary">发送</x-button>
        </div>
      </x-quote>
    </div> -->
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
          let res = await this.$ajax('client/list', {
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
            await this.$ajax('client/delete', {
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

<style lang="scss">
  .equipment-list {

    // 发送信息
    .send-msg {
      .equipment {
        display: flex;

        & > div {
          flex: 1;
        }
      }

      .left-box {
        padding-right: 10px;

        .equipment-list {
          height: 120px;
          box-sizing: border-box;
          padding: 5px;
          border: 1px solid #e2e2e2;

          ul {
            display: block;
            height: 100%;
            overflow: auto;
          }

          li {
            cursor: pointer;
            padding: 2px;

            &:hover {
              background: #eee;
            }
          }
        }

        .textarea {
          height: 120px;
        }
      }

      textarea {
        height: 100%;
      }

      // right
      .right-box {
        height: 100%;
        padding-left: 10px;

        .textarea {
          height: 250px;
        }
      }
    }
  }
</style>

