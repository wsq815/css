<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>用户分享详情
    </h3>
    </br>
    <div>
      <h4>我的分享</h4>
      <x-quote class="margin-t-10">
        <x-table class="margin-t-10" :data="list" bordered>
          <x-table-column label="序号" name="$index" :width="90"></x-table-column>
          <x-table-column label="时间" name="text"></x-table-column>
          <x-table-column label="用户" name="text"></x-table-column>
          <x-table-column label="功能" name="text"></x-table-column>
        </x-table>
      </x-quote>
      </br>
      <h4 class="margin-t-15">收到的分享</h4>
      <x-quote class="margin-t-10">
        <x-table class="margin-t-10" :data="list" bordered>
          <x-table-column label="序号" name="$index" :width="90"></x-table-column>
          <x-table-column label="时间" name="text"></x-table-column>
          <x-table-column label="用户" name="text"></x-table-column>
          <x-table-column label="功能" name="text"></x-table-column>
        </x-table>
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
            text: '内容。。。'
          }
        ]
      };
    }
  };
</script>

