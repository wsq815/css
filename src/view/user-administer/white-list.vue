<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>白名单管理
    </h3>
    <x-quote class="margin-t-15">
      <h4>白名单管理</h4>
      </br>
      <div class="instruction-box">
        <span>输入设备编号,作为平台信任的设备,当新设备入网时,平台会检查设备编号是否在白名单中,如果在则自动允许入网,否则需要管理员手动允许入网。</span>
      </div>
    </x-quote>
    <div class="row-title">增加白名单</div>
    <x-quote>
      <x-textarea></x-textarea>
      <p>备注: 请输入白名单ID,用英文半角逗号分割;</p>
      <div class="x-text-r margin-t-10">
        <x-button type="primary">添加</x-button>
      </div>
    </x-quote>
    <!-- 白名单列表 -->
    <div>
      <div class="row-title">白名单列表</div>
      <x-quote>
        <div class="table-head x-clear-float margin-t-10">
          <x-input placeholder="请输入搜索关键字" class="search-input x-float-l" inline></x-input>
          <x-button class="x-float-r" type="danger">删除所有</x-button>
        </div>
        <x-table class="margin-t-15" :data="list" bordered>
          <x-table-column label="设备名" name="$index"></x-table-column> 
          <x-table-column label="设备唯一编码" name="name"></x-table-column>
          <x-table-column label="当前状态" name="age"></x-table-column>
          <x-table-column label="设备消息数量" name="age"></x-table-column>
          <x-table-column label="位置" name="age"></x-table-column>
          <x-table-column label="登记时间" name="age"></x-table-column>
          <x-table-column label="操作" name="age"></x-table-column>
        </x-table>
        <div class="x-text-r margin-t-15">
          <x-page :total="500"></x-page>
        </div>
      </x-quote>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            name: '名称01',
            age: 21,
            sex: 0,
            state: 1
          }, {
            name: '名称02',
            age: 22,
            sex: 1,
            state: false
          }, {
            name: '名称03',
            age: 23,
            sex: 0,
            state: true
          }, {
            name: '名称04',
            age: 24,
            sex: 0,
            state: false
          }, {
            name: '名称05',
            age: 25,
            sex: 1,
            state: false
          }
        ]
      };
    }
  };
</script>

