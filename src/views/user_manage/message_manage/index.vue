<template>
  <!--用户管理员-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="search-wrapped">
          <el-input
              v-model="userAccount"
              style="width: 240px"
              size="large"
              placeholder="输入账号进行搜索"
              :prefix-icon="Search"
              @change="searchAdmin()"
          />
          <div class="text-wrapped">
            <span>*注:双击列表可查看账号详情</span>
          </div>
        </div>
        <div class="button-wrapped">
          <el-button type="primary" @click="openCreate(2)">添加信息管理员</el-button>
        </div>

      </div>
      <div class="table-content">
        <el-table :data="tableData" border  style="width: 100%" @row-dblclick="openuse">
          <el-table-column type="index" width="50" align="center"/>
          <el-table-column prop="account" label="账号" align="center" width="150px"/>
          <el-table-column prop="name" label="姓名" align="center"/>
          <el-table-column prop="sex" label="性别" align="center"/>
          <el-table-column prop="department" label="部门" align="center"/>
          <el-table-column prop="email" label="邮箱" align="center" width="250px"/>
          <el-table-column prop="update_time" label="更新时间" align="center">
            <template #default="{row}">
              <div v-if="row.update_time">{{ row.update_time?.slice(0,10) +"  "+row.update_time?.slice(11,16) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250px">
            <template #default="{row}">
              <div>
                <el-button type="success" @click="openEdit(row.id)">编辑</el-button>
                <el-button type="danger" @click="delest(row.id)">降级</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">
      <el-pagination
          :page-size="10"
          :current-page="paginationData.currentPage"
          :pager-count="7"
          :page-count="paginationData.pageCount"
          layout="prev, pager, next"
          :total="adminTotal"
          @current-change="currentchange"
      />
    </div>
  </div>
  <create ref="Create"></create>
  <edit ref="Edit" ></edit>
  <userinfo ref="useri" ></userinfo>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { Search } from '@element-plus/icons-vue'
import create from '../components/creadte_admin.vue'
import { bus } from '@/utils/mitt'
import edit from '../components/edit_admin.vue'
import userinfo from '../components/userinfo.vue'
import { getAdminList,changeIdentityToUser,searchUser,
  getAdmingListLength,returnListData } from '@/api/userinfor'
//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
import {ElMessage, ElMessageBox} from "element-plus";
const breadcrumb =ref()
const item = ref({
  first:'用户管理',
  second:'信息管理员'
})

const input1 = ref('')

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
  const res = await getAdmingListLength("信息管理员")
  adminTotal.value = res.length
  paginationData.pageCount = Math.ceil(res.length / 10)
}
//默认获取第一页数据
const getFirstPageList = async ()=>{
  paginationData.currentPage=1
  getAdminglistLength()
  const res = await returnListData("1",0,'信息管理员')
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
  const res = await returnListData(klope.value,0,'信息管理员')
  if(res != null){
    const oid = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid].id
  }
}

//搜索框数据
const userAccount = ref<string>('')

const tableData = ref([])
//搜索框
const searchAdmin = async ()=>{
  const res = await searchUser(userAccount.value,item.value.second)
  tableData.value = res
}

const Create = ref()
const openCreate = (id:number) =>{
  bus.emit('createId',id)
  Create.value.open()
}
const Edit = ref()
const openEdit = (id:number) =>{
  bus.emit('editId',id)
  Edit.value.open()
}
const delesUser = async (id) =>{
  const res = await changeIdentityToUser(id)
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:"降级成功",
    })
  }else{
    ElMessage.error('出现异常~')
  }
  getFirstPageList()
}
const delest = (id) =>{
  ElMessageBox.confirm(
      '确认降级吗？会降级为用户',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        delesUser(id)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消',
        })
      })
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