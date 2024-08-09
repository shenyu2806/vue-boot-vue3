<template>
  <!--出库列表-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="search-wrapped">
          <el-input
              v-model="producId"
              style="width: 240px"
              size="large"
              placeholder="输入出库编号进行搜索"
              :prefix-icon="Search"
          />
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50" align="center"/>
          <el-table-column prop="product_out_id" label="出库编号" width="200" align="center"/>
          <el-table-column prop="product_out_number" label="出库数量" width="180" align="center"/>
          <el-table-column prop="product_out_price" label="出库总价" width="180" align="center"/>
          <el-table-column prop="product_out_apply_person" label="出库申请人" width="100" align="center"/>
          <el-table-column prop="product_out_audit_person" label="审核人" width="150" align="center"/>
          <el-table-column prop="product_audit_time" label="出库时间" width="200" align="center">
            <template #default="{row}">
              <div v-if="row.product_audit_time">{{ row.product_audit_time?.slice(0,10) +"  "+row.product_audit_time?.slice(11,16) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="audit_memo" label="审核备注" width="180" align="center" />
          <el-table-column  label="操作" width="80" align="center" fixed="right">
            <template #default="{row}">
              <div>
                <el-button type="danger" @click="delest(row.product_out_id)" >删除</el-button>
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
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { getoutprofuctListLength,returnoutprofuctListData,deletProductfopsForId } from '@/api/produc'

const producId = ref()
const tableData = ref ([
  {
    id:1
  }
])

//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
import {Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
const breadcrumb =ref()
const item = ref({
  first:'产品管理',
  second:'出库列表'
})

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
  const res = await getoutprofuctListLength()
  adminTotal.value = res.length
  paginationData.pageCount = Math.ceil(res.length / 10)
}
//默认获取第一页数据
const getFirstPageList = async ()=>{
  paginationData.currentPage=1
  getAdminglistLength()
  const res = await returnoutprofuctListData("1",0)
  if(res != null){
    const oid = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid].product_out_id
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
  const res = await returnoutprofuctListData(klope.value,0)
  if(res != null){
    const oid = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid].product_out_id
  }
}

//删除
const delesUser = async (id) =>{
  const res = await deletProductfopsForId(id)
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:res.message+"!请刷新页面"
    })
  }else{
    ElMessage.error('出现异常~')
  }
}
const delest = (id) =>{
  ElMessageBox.confirm(
      '确认删除吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        delesUser(id)
        getFirstPageList()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消',
        })
      })
}
</script>
<style scoped lang="scss">
.module-common-wrapped{
  padding: 8px;
  background: #F5F5F5;
  height: calc(100vh - 101px);
  .module-common-content{
    padding: 0 10px;
    height: 100%;
    background: #fff;
    //分页内容
    .pane-content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - 166px);
      background: #fff;
      .pane-top{
        .module-common-header{
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .module-common-table{
          min-height: 10px;
          padding: 10px 20px 20px;
          margin-bottom: 8px;
          background: #fff;
        }
      }
      //分页
      .table-footer{
        display: flex;
        justify-content: flex-end;
        background: #fff;
      }
    }
  }
}
:deep(.el-table .cell){
  font-weight: 400;
}
</style>