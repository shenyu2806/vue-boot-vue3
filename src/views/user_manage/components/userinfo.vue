<template>
  <el-dialog v-model="dialogUserVisible" title="用户信息" width="500px" center draggable>
      <el-container>
        <el-aside width="200px">
          <el-avatar shape="square" :size="160" :src="userData.imageUrl" />
        </el-aside>
        <el-main>
          <div>账号：{{ userData.account }}</div>
          <div>姓名：{{ userData.name }}</div>
          <div>性别：{{ userData.sex }}</div>
          <div>部门：{{ userData.department }}</div>
          <div>邮箱：{{ userData.email }}</div>
          <div>状态：
          <span v-if="userData.status== 0">正常</span>
            <span v-else>冻结</span>
          </div>
        </el-main>
      </el-container>
    <el-footer>
    <span @click="opnUserP(userData.id)">编辑</span>
    <span @click="openPromote(userData.id,userData.identity)">赋权</span>
    <span @click="delest(userData.id,userData.account)">删除用户</span>
  </el-footer>
  </el-dialog>
  <promote ref="promoteP"></promote>
  <userifon ref="UserP"></userifon>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import promote from './promote.vue'
import userifon from './edit_admin.vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteUser} from '@/api/userinfor'

bus.on('userId',(row: any)=>{
  userData.id = row.id
  userData.imageUrl = row.image_url
  userData.account = row.account
  userData.name = row.name
  userData.sex = row.sex
  userData.email = row.email
  userData.department = row.department
  userData.status = row.status
  userData.identity = row.identity
})

const userData = reactive({
  id:'',
  imageUrl:'',
  account:'',
  name:'',
  sex:'',
  email:'',
  department:'',
  identity:'',
  status:0,
})
//赋权
const promoteP = ref()
const openPromote = (id,identity) =>{
  const user = {
    id:id,
    identity:identity
  }
  bus.emit("Promote",user)
  promoteP.value.open()
}

//删除用户
const delesUser = async (id,account) =>{
  const res = await deleteUser(id,account)
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:res.message+"!请刷新页面"
    })
  }else{
    ElMessage.error('出现异常~')
  }
}
const delest = (id,account) =>{
  ElMessageBox.confirm(
      '确认删除吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        delesUser(id,account)
        dialogUserVisible.value = false
        bus.emit('offDialog','1')//刷新列表
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消',
        })
      })
}
bus.on('dialogUser',(id)=>{
  if(id=="1"){
    dialogUserVisible.value = false
  }
})
bus.on('FghjUser',(id)=>{
  if(id=="1"){
    bus.emit('offDialog','1')//刷新列表数据
    dialogUserVisible.value = false
  }
})
//编辑用户
const UserP = ref()
const opnUserP = (id) =>{
  bus.emit('editId',id)
  UserP.value.open()
}

//控制弹窗
const dialogUserVisible = ref(false)

//打开创建管理员弹窗
const open = () =>{
  dialogUserVisible.value = true
}
defineExpose({
  open
})
</script>
<style scoped lang="scss">
.el-main>div{
  --el-main-padding:0px;
  margin-bottom: 8px;
}
  .el-footer{
    display: flex;
    justify-content: flex-end;
    --el-footer-height:8px;
    margin-bottom: 8px;
    span{
      margin-left: 8px;
      color: #409eff;
      cursor: pointer;

    }
  }
</style>

