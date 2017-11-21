<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>新建任务
    </h3>
    <x-form class="margin-t-15" label-position="left">
      <x-quote>
        <!-- 1、选择产品 -->
        <h4>1、选择产品</h4>
        <x-form-item class="margin-t-10 form-item" label-width="0">
          <x-radio v-model="params.products" :label="1">选项一</x-radio>
          <x-radio v-model="params.products" :label="2">选项二</x-radio>
        </x-form-item>
        <!-- 2、任务信息 -->
        <h4>2、任务信息</h4>
        <x-form-item class="margin-t-10 form-item" label="任务名称:">
          <div class="form-item-box">
            <x-input placeholder="请输入用户名称"></x-input>
          </div>
        </x-form-item>
        <x-form-item class="margin-t-10 form-item" label="任务描述:">
          <div class="form-item-box">
            <x-input placeholder="请输入任务描述"></x-input>
          </div>
        </x-form-item>
        <!-- 3、升级详情 -->
        <h4>3、升级详情</h4>
        <x-form-item class="margin-t-10 form-item" label="固件类型:">
          <x-radio v-model="params.firmwareType" :label="1">WIFI</x-radio>
          <x-radio v-model="params.firmwareType" :label="2">MCU</x-radio>
          <x-radio v-model="params.firmwareType" :label="3">子设备</x-radio>
        </x-form-item>
        <!-- 3、升级模式 -->
        <h4>3、升级模式</h4>
        <x-form-item class="margin-t-10 form-item" label="升级模式:">
          <x-radio v-model="params.updateMode" :label="1">自动升级</x-radio>
          <x-radio v-model="params.updateMode" :label="2">手动升级</x-radio>
        </x-form-item>
        <x-form-item class="margin-t-10 form-item">
          <x-button type="primary">立即升级</x-button>
        </x-form-item>
      </x-quote>
    </x-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          products: 1,
          firmwareType: 1,
          updateMode: 1
        }
      };
    }
  };
</script>


<style lang="scss" scoped>
  .form-item {
    padding-left: 30px;

    .form-item-box {
      width: 100%;
    }
  }
</style>
