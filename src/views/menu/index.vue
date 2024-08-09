<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">团星网后台管理系统</div>
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="overview">
            <el-icon><Document /></el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3" v-if="userStore.identity=='管理员'">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="/user/user_product_manage">产品管理员</el-menu-item>
              <el-menu-item index="/user/users_manage">用户管理员</el-menu-item>
              <el-menu-item index="/user/message_manage">信息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="/user/users_list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4" v-if="userStore.identity=='管理员'">
            <template #title>
              <el-icon><TakeawayBox /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="/product/product_manage">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="/product/out_produc_manage">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5" v-if="userStore.identity=='管理员'">
            <template #title>
              <el-icon><ChatLineRound /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="/403">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="/403">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="/403" v-if="userStore.identity=='管理员'">
            <el-icon><Folder /></el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-sub-menu index="11" v-if="userStore.identity=='管理员'">
            <template #title>
              <el-icon><ChatLineRound /></el-icon>
              <span>ao管理</span>
            </template>
            <el-menu-item-group title="用户管理">
              <el-menu-item index="/403">用户设置</el-menu-item>
              <el-menu-item index="/403">管理员设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="权限管理">
              <el-menu-item index="/403">权限管理</el-menu-item>
              <el-menu-item index="/403">权限信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="12" v-if="userStore.identity=='管理员'">
            <template #title>
              <el-icon><ChatLineRound /></el-icon>
              <span>日志管理</span>
            </template>
            <el-menu-item-group title="常规日志">
              <el-menu-item index="/longs/longs_long">登录日志</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="高危日志">
              <el-menu-item index="/403">操作管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
<!--          用户操作-->
          <el-menu-item index="/403" v-if="userStore.identity !='管理员'">
            <el-icon><Folder /></el-icon>
            <span>待办事项</span>
          </el-menu-item>
          <el-menu-item index="/403" v-if="userStore.identity !='管理员'">
            <el-icon><Folder /></el-icon>
            <span>ao系统</span>
          </el-menu-item>
          <el-menu-item index="set">
            <el-icon><setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的 {{ userStore.name }} 欢迎您登录本系统</span>
          <div class="header-right-content">
            <el-icon :size="20"><Message/></el-icon>
            <el-avatar :size="34" :src="userStore.imageUrl" />
            <el-dropdown>
            <span class="el-dropdown-link">
            设置
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="gologin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {
  House,
  Document,
  User,
  ChatLineRound,
  TakeawayBox,
  Folder,
  DocumentCopy,
  Memo,
  Setting, Message,
} from '@element-plus/icons-vue'
import ref from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()
import { userinfor } from '@/store/userinfor';
const userStore = userinfor()

const gologin = () =>{
  localStorage.clear()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-aside {
  width: 210px;
  height: 100vh;
  background: #2b303b;
  overflow-X: hidden;
  .el-menu{
    background: #2b303b;
    width: 210px;
    height: 100vh;
    border-right: 0;
  }
  .title{
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: #2b303b;
  }
  .el-menu-item{
    color: #fff;
  }
}
.el-header{
  display: flex;
  height: 55px;
  background: #262f3e;
  color: #c1c6c8;
  align-items: center;
  justify-content: space-between;
  .header-left-content{
    font-size: 14px;
  }
  .header-right-content{
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.el-main{
  --el-main-padding: 0;
  background: #f3f4fa;
}
.el-menu-item:hover{
  background: #006eff;
}
:deep(.el-sub-menu__title){
  color: #fff;
}
:deep(.el-sub-menu__title:hover){
  background: #006eff;
}
:deep(.el-menu--inline){
  background: #2b303b;
}
</style>