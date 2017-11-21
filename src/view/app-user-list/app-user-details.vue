<template>
  <div>
    <h3 class="view-title">
      <i class="x-icon-laptop"></i>详情
    </h3>
    </br>
    <div>
      <x-quote class="x-clear-float">
        <x-form :data="list" class="x-float-l form-left" label-position="top" >
          <x-form-item label="房屋图片：">
            <div class="img">
              <img :src="list[0].houseImage" alt="">
            </div>
          </x-form-item>
        </x-form>
        <x-form :data="list" class="x-float-l form-right">
          <x-form-item label="房屋名称：">{{list[0].houseName}}</x-form-item>
          <x-form-item label="账号：">{{list[0].user}}</x-form-item>
          <x-form-item label="房主姓名：">{{list[0].name}}</x-form-item>
          <x-form-item label="房主邮箱：">{{list[0].mail}}</x-form-item>
          <x-form-item label="房主备用手机：">{{list[0].phone2}}</x-form-item>
          <x-form-item class="return">
            <router-link to="/app-user-list">
              <x-button type="primary">返回</x-button>
            </router-link>
          </x-form-item>
        </x-form>
      </x-quote>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        // userInfo: {
        //   houseImage: '',
        //   houseName: '',
        //   user: 0,
        //   name: '',
        //   mail: '',
        //   phone2: 0
        // },
        list: []
      };
    },
    methods: {
      async getData () {
        try {
          let res = await this.$ajax('phone/list', {
            method: 'post',
            data: {
              id: this.id
            }
          });
          this.list = res.content;
          this.$notice('获取成功');

          if (!this.list[0].houseName) this.list[0].houseName = '暂无';
          if (!this.list[0].user) this.list[0].user = '暂无';
          if (!this.list[0].name) this.list[0].name = '暂无';
          if (!this.list[0].mail) this.list[0].mail = '暂无';
          if (!this.list[0].phone2) this.list[0].phone2 = '暂无';
          // this.$router.push('/user-administer');
        } catch (error) {
          this.$notice.danger(error);
        }
      }
    },
    mounted () {
      if (this.id) this.getData();
    }
  }
</script>

<style lang="scss" scope>
  .x-quote{
    padding-left: 25px;
    padding-right: 25px;
  }
  .form-left{
    width: 43%;
    .x-form-item{
      .x-form-label{
        padding-bottom: 13px;
      }
      .x-form-content{
        .img {
          max-width: 500px;
          min-height: 300px;
          height: auto;
          border: 1px solid #eee;
          overflow: hidden;
          border-radius: 4px;
        }
      }
    }
  }
  .form-right{
    width: 57%;
    padding-top: 29px;
    .x-form-item{
      //border: 1px solid #e2e2e2;
      width: 100%;
      background: #f5f5f5;
      .x-form-label{
        background: #e6e6e6;
        //border-right: 1px solid #e2e2e2;
        text-align: right;
        padding: 10px 12px;
        width: 130px;
      }
    }
    .return{
      background: none;
      .x-form-content{
        padding-left: 20px!important;
      }
    }
  }
  .form-right .x-form-item .x-form-content{
    padding-left: 30px;
  }
</style>

