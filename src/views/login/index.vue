<template>
	<div class="common-layout">
	<el-container>
	<el-header class="header-wrapper">
    <div class="header-content">
      <h3>团星网后台管理系统</h3>
      <span class="welcome">欢迎登录</span>
    </div>
  </el-header>
	<el-main>
    <div class="login-wrapper">
      <el-card class="box-card">
        <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
          <el-tab-pane label="登录" name="first">
            <el-form class="login-form">
              <el-form-item label="账号">
                <el-input v-model="loginDate.account" placeholder="请输入账号"/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginDate.password" placeholder="请输入密码"/>
              </el-form-item>
              <div class="footer-wrapped">
                <div class="forget-password">
                  <span class="forget-password-button" @click="openForget">忘记密码</span>
                </div>
                <div class="footer-button">
                  <el-button type="primary" @click="Login">登录</el-button>
                </div>
                <div class="footer-go-register">
                  还没有账号?<span class="go-register" @click="xzregister">马上注册</span>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second" :rules="rules" :disabled="stopse" style="margin-top: -10px">
            <el-form class="login-form">
              <el-form-item label="账号">
                <el-input v-model="registerDate.account" placeholder="账号长度6~12位"/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="registerDate.password" placeholder="密码长度6~12位包含字母"/>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="registerDate.repassword" placeholder="请再次输入密码"/>
              </el-form-item>
              <div class="footer-wrapped">
                <div class="footer-button">
                  <el-button type="primary" @click="Register">注册</el-button>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </el-main>
	<el-footer>
    <div class="footer-wrapper">
      <div class="footer-content">
        <div class="title">
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span><br>
          <span style="margin-left:85px">Copyright @ 团星网版仅所有</span>
        </div>
      </div>
    </div>
  </el-footer>
	</el-container>
	</div>
  <forget ref="forgetP"></forget>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter()
import {login,register,returnMenuList} from '@/api/login'
import {getReatCode} from '@/api/stting'
import forget from './components/forget_password.vue'
import { userinfor } from '@/store/userinfor';
import { useMenu } from '@/store/menu'
//日志
import { longReckon } from '@/api/logs'

const usemenu = useMenu()
const store = userinfor()
const activeName = ref('first')
const stopse = ref(true)
const xzregister = () =>{
  if(stopse.value === true){
   ElMessage.error('注册不可用')
  }else{
    activeName.value='second'
  }
}
//查询是否允许注册
const getreatCode = async () =>{
  const res = await getReatCode()
  if(res != null){
    if(res.rety == "0"){
      stopse.value = false
    }else{
      stopse.value = true
    }
  }
}
getreatCode()

//忘记密码
const forgetP = ref()
const openForget = () =>{
  forgetP.value.open()
}
// 表单接口
interface formDate {
  account: string;
  password: string;
  repassword ?: string;
}
//登录数据
const loginDate : formDate = reactive({
  account:null,
  password:''
})
//注册数据
const registerDate : formDate = reactive({
  account:null,
  password:'',
  repassword:''
})

const rules = reactive({
  account:[
    {required:true,message:'请输入您的注册账号',trigger:'blur'},
],
password:[
    {required:true,message:'请输入您的密码',trigger:'blur'},
],
repassword:[
  {required:true,message:'请再次确认您的密码',trigger:'blur'},
],
})

const Login = async () => {
  if (loginDate.account == null | loginDate.password == null) {
    ElMessage.error('输入不要留下空白！')
  }else{
    const res = await login(loginDate)
    if(res.status==0){
      const { token } = res
      const { id } = res.results
      localStorage.setItem('id',id)
      localStorage.setItem('token',token)
      const asd = await returnMenuList(id) as any
      usemenu.setrouteriop(asd)
      store.userinfor(id)
      await longReckon(store.account,store.email,store.name+"登录成功!")
      //跳转
      router.push('/home')
    }else{
      ElMessage.error('你输入的内容不正确！')
    }
  }
}
const Register = async () => {
  if(registerDate.account == null|registerDate.password == null|registerDate.repassword == null){
    ElMessage({
      message: '不要留空!',
      type: 'warning',
    })
  }else{
    if(registerDate.password==registerDate.repassword){
      const res = await register(registerDate)
      activeName.value ='first'
    }else{
      ElMessage.error('密码不一致！')
    }
  }
}

</script>

<style lang="scss" scoped>
.header-wrapper{
  .header-content{
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .welcome{
    font-size: 13px;
  }
}
.el-main{
  width: 100%;
  height: 600px;
  background: url("@/assets/codeuis.jpg") no-repeat center;
  --el-main-padding:0;
  .box-card{
    width: 350px;
    height: 375px;
    float: right;
    position: relative;
    top:14%;
    border-radius: 15px;
    .login-form{
      .footer-wrapper {
        display: flex;
        flex-direction: column;
      }
        .forget-password{
          display: flex;
          justify-content: flex-end;
          margin: 10px 0;
          .forget-password-button{
            font-size: 12px;
            color: #409eff;
            //鼠标效果
            cursor: pointer;
          }
        }
      .footer-button{
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .footer-go-register{
        font-size: 12px;
        margin: 12px 0;
        display: flex;
        justify-content: center;
      }
      .go-register{
        margin-left: 5px;
        font-size: 12px;
        color: #409eff;
        //鼠标效果
        cursor: pointer;
      }
    }
  }
  .login-wrapper{
      width: 1200px;
      height: 600px;
      margin: 0 auto;
  }
}
.footer-wrapper{
  margin-top: 10px;
  .footer-content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
      color: #666;
    }
    span{
      color: #666;
      font-size: 12px;
    }
  }
}
.login-form{
  margin-top: 30px;
}
:deep(.el-tabs__item){
  color: #333;
  font-size: 18px;
}
:deep(.el-input__inner){
  height: 40px;
}
:deep(.el-form-item-label){
  height: 40px;
  line-height: 40px;
}
:deep(.el-button){
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>