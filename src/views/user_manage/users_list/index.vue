<template>
  <!--用户列表-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="left-wrapped">
        <div class="search-wrapped">
          <el-input
              v-model="adminAccount"
              style="width: 240px"
              size="large"
              placeholder="输入账号进行搜索"
              :prefix-icon="Search"
              @change="searchuser"
          />
        </div>
          <div class="select-wrapped">
            <el-select v-model="Department" placeholder="请选择部门" style="width: 200px;"
                       clearable @change="searchForDepartment" @clear="searchForclear">
              <el-option :label="item" :value="item" v-for="item in departmentData" />
            </el-select>
          </div>
          <div class="text-wrapped">
            <span>*注:双击列表可查看账号详情</span>
          </div>
        </div>
        <div class="button-wrapped">
          <el-button type="primary" plain @click="sexuser">筛选冻结用户</el-button>
          <el-button type="primary" plain @click="userAll">显示全部用户</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData"  style="width: 100%" border @row-dblclick="openuse">
          <el-table-column type="index" width="50" align="center"/>
          <el-table-column prop="account" label="账号" align="center" width="150px"/>
          <el-table-column prop="name" label="姓名" align="center"/>
          <el-table-column prop="sex" label="性别" align="center"/>
          <el-table-column prop="department" label="部门" align="center"/>
          <el-table-column prop="email" label="邮箱" align="center" width="200px"/>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="{row}">
              <div>
                  <el-tag v-if="row.status=='1'" class="ml-2">冻结</el-tag>
                  <el-tag class="ml-2" type="success" v-else>正常</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center">
            <template #default="{row}">
              <div v-if="row.create_time">{{ row.create_time?.slice(0,10) +"  "+row.create_time?.slice(11,16) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间" align="center">
            <template #default="{row}">
              <div v-if="row.update_time">{{ row.update_time?.slice(0,10) +"  "+row.update_time?.slice(11,16) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template #default="{row}">
              <div>
                <el-button type="primary" @click="HotUser(row.id)" :disabled="row.status==0">解冻</el-button>
                <el-button type="success" @click="BanUser(row.id)" :disabled="row.status==1">冻结</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">
      <el-pagination
          :page-size="10"
          :current-page= paginationData.currentPage
          :pager-count="7"
          :page-count= paginationData.pageCount
          layout="prev, pager, next"
          :total= adminTotal
          @current-change= currentchange
      />
    </div>
  </div>
  <userinfo ref="useri" ></userinfo>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { Search } from '@element-plus/icons-vue'
import create from '../components/creadte_admin.vue'
import edit from '../components/edit_admin.vue'
import { bus } from '@/utils/mitt'
import { getAdminList,searchUser,searchDepartment,banUser,hotUser
  ,getAdmingListLength,returnListData,getBanList,deleteUser} from '@/api/userinfor'
import { getDepartment } from '@/api/stting'
import { ElMessage, ElMessageBox } from 'element-plus'
import userinfo from '../components/userinfo.vue'

//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
const breadcrumb =ref()
const item = ref({
  first:'用户管理',
  second:'用户列表'
})

//搜索框数据
const adminAccount = ref<string>('')
//表格数据
const tableData = ref([])

//部门数据
const departmentData = ref([])
//获取部门数据
const getdepartment = async () =>{
  departmentData.value = await getDepartment()

}
getdepartment()
//选择部门后对应数据
const searchForDepartment =  async () =>{
  if(Department.value != null){
    tableData.value = await searchDepartment(Department.value)
  }
}
//清空状态
const searchForclear = async () =>{
  getFirstPageList()
}

const searchuser = async ()=>{
  const res = await searchUser(adminAccount.value,'用户')
  tableData.value = res
}
//部门
const Department = ref()

// 分页
const paginationData = reactive({
  // 总页数
  pageCount:1,
  //当前页面
  currentPage:1,
})


//查询最后的id
const zhuihoid = ref([])
//查询数量
const  adminTotal = ref<number>()
const getAdminglistLength = async ()=>{
  const res = await getAdmingListLength("用户")
  adminTotal.value = res.length
  paginationData.pageCount = Math.ceil(res.length / 10)
}
//默认获取第一页数据
const getFirstPageList = async ()=>{
  paginationData.currentPage=1
  getAdminglistLength()
  const res = await returnListData("1",0,'用户')
  if(res != null){
    const oid = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid].id
  }
}
getFirstPageList()
//监听换页
const klope  = ref()
const currentchange = async (value:number) =>{
  if(value >=2){
     klope.value = zhuihoid.value[value - 2]
  }else{
    klope.value = "0"
  }
  paginationData.currentPage=value
  console.log(zhuihoid.value,klope.value)
  const res = await returnListData(klope.value,0,'用户')
  if(res != null){
    const oid = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid].id
  }
}

bus.on('offDialog',(id)=>{
  if(id=="1"){
    getFirstPageList()
  }
})

//筛选冻结用户
const sexuser = async () => {
  const res = await getBanList()
  tableData.value = res
}
//显示全部用户
const userAll = async () =>{
  getFirstPageList()
}
//解冻用户
const HotUser = async (id) =>{
  const res = await hotUser(id)
  if(res.status == 0){
    ElMessage({
      message:res.message,
      type:"success"
    })
  }else{
    ElMessage.error("解冻失败")
  }
  getFirstPageList()
}
// 冻结用户
const BanUser = async (id) =>{
  const res = await banUser(id)
  if(res.status == 0){
    ElMessage({
      message:res.message,
      type:"success"
    })
  }else{
    ElMessage.error("冻结失败")
  }
  getFirstPageList()
}

//用户信息弹窗
const useri = ref()
const openuse = (row : any) =>{
  bus.emit("userId",row)
  useri.value.open()
}
</script>
<style scoped lang="scss">

</style>