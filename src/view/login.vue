<template>
  <div class="login-box">
    <div class="form-box">
      <div class="text-box">
        <div>
          <h3>江西利思比智能家居云平台</h3>
          <p>团结一心, 其利断金！团结一致，再造佳绩</p>
          <p>忠诚合作, 积极乐观, 努力开拓、勇往直前。</p>
          <p>往事日华，日清日高。</p>
          <p>每天进步一点点。</p>
          <p>每一分私下的努力都会得到成倍的回报。</p>
          <p>永不言退, 我们是最好的团队。</p>
        </div>
      </div>
      <!--表单-->
      <div class="form">
        <h4 class="x-text-l">登录</h4>
        <x-form class="form-el" label-position="top">
          <x-form-item label="账号" class="input-row">
            <x-input v-model="params.username" placeholder="请输入账号"></x-input>
          </x-form-item>
          <x-form-item label="密码" class="input-row">
            <x-input v-model="params.password" placeholder="请输入密码"></x-input>
          </x-form-item>
          <x-form-item class="input-row">
            <x-button block type="primary" @click="login">登  陆</x-button>
          </x-form-item>
        </x-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Validation from '../utils/data-validation';

  export default {
    data () {
      return {
        params: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      async login () {
        let dataSchema = new Validation(this.params, {
          username: [
            { required: true, message: '请输入用户名' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        });
        // 验证
        try {
          dataSchema.passes();
          // 请求
          try {
            const res = await this.$ajax('login', {
              method: 'post',
              data: this.params
            });
            this.$notice('登陆成功');
            this.$router.push('/');
            // 存储token
            window.localStorage.setItem('token', res.token);
            setTimeout(() => {
              this.$router.push('/');
            }, 1000);
          } catch (error) {
            this.$notice.danger(error || '登陆失败');
          }
        } catch ({ message }) {
          this.$notice.danger(message);
        }
      }
    }
  };
</script>


<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-box {
      width: 100%;
      box-sizing: border-box;
      padding: 0 15%;
      text-align: center;
      display: flex;
      align-items: center;

      .text-box,
      .form {
        display: inline-block;
      }

      .text-box {
        flex: 1;
        padding-right: 60px;
        text-align: left;

        h3 {
          color: #a90329;
          margin: 0;
          padding-bottom: 20px;
        }
          
        p {
          margin-bottom: 10px;
        }
      }

      .form {
        width: 360px;
        height: 100%;
        border: 1px solid #ddd;

        h4 {
          padding: 14px 15px !important;
          font-size: 16px;
          font-weight: 300;
          color: #232323;
          margin: 0;
          background: rgba(248,248,248,.9);
          border-bottom: 1px solid #ddd;
        }

        .form-el {
          padding: 20px 15px;

          .input-row {
            padding-bottom: 5px;
          }
        }
      }
    }
  }
</style>
