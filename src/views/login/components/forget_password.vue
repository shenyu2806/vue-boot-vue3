<template>
  <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px">
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入你的注册账号" prop="account">
        <el-input v-model="forgetDate.account" placeholder=""/>
      </el-form-item>
      <el-form-item label="输入您的个人邮箱" prop="email">
        <el-input v-model="forgetDate.email" placeholder=""/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
      <el-button type="primary" @click="verifyAccount">
      下一步
      </el-button>
      </span>
    </template>
  </el-dialog>
<!--  忘记密码2-->
  <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入你的新密码" prop="password">
        <el-input v-model="forgetDate.password" placeholder=""/>
      </el-form-item>
      <el-form-item label="确认你的新密码" prop="repassword">
        <el-input v-model="forgetDate.repassword" placeholder=""/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="state.changePasswordDialog = false">取消</el-button>
      <el-button type="primary" @click="resetPaassword" >
      确认修改
      </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import{verify,resetPassword} from '@/api/login'
import { ElMessage } from 'element-plus'
const forgetPasswordDialog = ref(false)

//对齐方式
const labelPosition = ref('top')

interface forgetDate{
  account:number;
  email:string;
  password:string;
  repassword:string;
}

const forgetDate = reactive({
  account:null,
  email:'',
  password:'',
  repassword:''
})
//表单校验
const rules = reactive({
  account: [
    { required: true, message: '请输入你的账号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请设置你的密码', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请再次输入你的密码', trigger: 'blur' },
  ]
})
//控制弹窗 默认关闭
const state = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false
})

const resetPaassword = async () =>{
  if(forgetDate.repassword==forgetDate.password){
    const res = await resetPassword(localStorage.getItem('id'),forgetDate.password)
    if(res.data.message=="更新成功"){
      ElMessage({
        message: '修改成功',
        type: 'success',
      }),
      (state.forgetPasswordDialog = false)()
    }else{
      ElMessage.error('服务器异常!')
    }
  }else{
    ElMessage.error('密码不一致')
  }
}

//打开弹窗
const open = () =>{
  state.forgetPasswordDialog = true
}
//打开修改密码
const verifyAccount = async () =>{
  const res = await verify(forgetDate)
  if(res.data.status==0){
    ElMessage({
      message: '一切正常',
      type: 'success',
    })
    localStorage.setItem('id',res.data.id)
    state.forgetPasswordDialog = false
    state.changePasswordDialog = true
  }else{
    ElMessage.error('你记错了')
  }
}


defineExpose({
  open
})
</script>
<style lang="sass" scoped>

</style>