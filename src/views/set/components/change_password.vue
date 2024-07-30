<template>
  <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入你的旧密码" prop="oldPassword">
        <el-input v-model="forgetDate.oldPassword" placeholder="输入你的旧密码"/>
      </el-form-item>
      <el-form-item label="输入你的新密码" prop="newpassword">
        <el-input v-model="forgetDate.newpassword" placeholder="输入你的新密码"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="state.changePasswordDialog = false">取消</el-button>
      <el-button type="primary" @click="changeuserPaassword" >
      确认修改
      </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import{ ChangePassword } from '@/api/userinfor'
import { ElMessage } from 'element-plus'

//对齐方式
const labelPosition = ref('top')

interface forgetDate{
  oldPassword:string;
  newpassword:string;
}

const forgetDate = reactive({
  oldPassword:'',
  newpassword:''
})
//表单校验
const rules = reactive({
  oldPassword: [
    { required: true, message: '输入你的旧密码', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: '输入你的新密码', trigger: 'blur' },
  ],
})
//控制弹窗 默认关闭
const state = reactive({
  changePasswordDialog:false
})

const changeuserPaassword = async () => {
const id =localStorage.getItem('id')
  if(forgetDate.oldPassword && forgetDate.newpassword){
    const res = await ChangePassword(localStorage.getItem('id'),forgetDate.oldPassword,forgetDate.newpassword)
    if(res.data.message==="修改成功"){
      ElMessage({
        message: '修改成功',
        type:'success'
      })
    }else{
      ElMessage.error("修改失败！"+res.data.message)
    }
  }else{
    ElMessage.error("不允许有空值")
  }
}

//打开弹窗
const open = () =>{
  state.changePasswordDialog = true
}


defineExpose({
  open
})
</script>

<style lang="scss" scoped>

</style>