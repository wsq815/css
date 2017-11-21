<template>
  <div class="admin-box">
    <header>
      <div class="header-box">
        <router-link class="logo" to="/">智能家居后台管理系统</router-link>
        <nav class="nav-box">
          <ul>
            <li
              v-for="(item, index) in nav"
              :key="index"
              @click="switchNav(index, item.link)"
              :class="{
                'active': $route.name === item.link
              }"
            >
              <span>{{item.name}}</span>
            </li>
          </ul>
        </nav>
      </div>
      <!-- 二级导航 -->
      <div class="sub-nav">
        <ul>
          <li v-for="(item, index) in nav[curNav].sub" :key="index">
            <router-link
              :to="{
                name: item.path
              }"
            >{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="view-router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // 菜单
        nav: [
          {
            name: '用户管理',
            link: 'user-administer',
            sub: [
              {
                name: '添加用户',
                path: 'add-user'
              },
              {
                name: '用户列表',
                path: 'user-administer'
              }
            ]
          },
          // app用户列表
          {
            name: 'app用户',
            link: 'app-user-list',
            sub: [
              {
                name: '添加app用户',
                path: 'add-app-user'
              },
              {
                name: 'app用户列表',
                path: 'app-user-list'
              }
            ]
          },
          {
            name: '设备管理',
            link: 'equipment-list',
            sub: [
              {
                name: '添加设备',
                path: 'add-equipment'
              },
              {
                name: '设备列表',
                path: 'equipment-list'
              }
            ]
          },
          {
            name: '产品管理',
            link: 'product-list',
            sub: [
              {
                name: '添加产品',
                path: 'add-product'
              },
              {
                name: '产品列表',
                path: 'product-list'
              },
              {
                name: '添加分类',
                path: 'add-product-classification'
              },
              {
                name: '产品分类',
                path: 'product-classification'
              }
            ]
          },
          {
            name: '厂家信息',
            link: 'factory-list',
            sub: [
              {
                name: '添加厂家',
                path: 'add-factory'
              },
              {
                name: '列表',
                path: 'factory-list'
              }
            ]
          }
        ],
        // 当前菜单
        curNav: 0
      };
    },
    methods: {
      switchNav (index, link) {
        this.curNav = index;
        this.$router.push({
          name: link
        });
      }
    }
  };
</script>


<style lang="scss" scoped>
  // 导航栏高度
  $header-height: 60px;
  // 二级菜单高度
  $sub-nav-height: 50px;

  .admin-box {
    width: 100%;

    // header
    header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      background: #4399ff;
      height: $header-height;
      z-index: 99;
      
      .logo {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        line-height: $header-height;
      }

      .header-box{
        margin: 0 30px;
        position: relative;
      }

      .nav-box {
        margin: 0 auto;

        ul {
          display: block;
          vertical-align: top;
          text-align: center;
          
          li {
            display: inline-block;
            font-size: 14px;
            padding: 0 15px;
            line-height: $header-height;
            color: #fff;
            cursor: pointer;
            position: relative;
            overflow: hidden;

            span {
              display: inline-block;
              position: relative;
              z-index: 50;
            }

            &::after {
              content: '';
              display: inline-block;
              width: 160px;
              height: 160px;
              position: absolute;
              left: 50%;
              top: 50%;
              background: #000;
              z-index: 5;
              opacity: 0.15;
              border-radius: 100%;
              margin-top: -80px;
              margin-left: -80px;
              transition: transform 0.5s;
              transform: scale(0);
            }
          }

          .active {
            &::after {
              transform: scale(1);
            }
          }
        }
      }

      // 二级菜单
      .sub-nav {
        width: 100%;
        line-height: $sub-nav-height;
        background: #fff;
        text-align: center;
        border-bottom: 1px solid #dddee1;

        li {
          display: inline-block;

          a {
            color: #495060;
            display: inline-block;
            padding: 0 15px;
            position: relative;

            // 激活状态
            &.router-link-exact-active {
              color: #4399ff;

              &::after {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 100%;
                border-bottom: 1px solid #4399ff;
              }
            }
          }
        }
      }
    }

    // 路由容器
    .view-router{
      position: fixed;
      left: 15px;
      bottom: 15px;
      right: 15px;
      top: $header-height + $sub-nav-height + 15px;
      overflow: auto;
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
    }
  }
</style>
