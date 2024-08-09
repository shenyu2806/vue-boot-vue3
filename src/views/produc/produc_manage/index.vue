<template>
  <!--产品列表-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="产品列表" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                      v-model="producId"
                      style="width: 240px"
                      size="large"
                      placeholder="输入入库编号进行搜索"
                      :prefix-icon="Search"
                  />
                </div>
                <div class="button-wrapped">
                  <el-button type="primary" @click="openCreadte()">入库产品</el-button>
                </div>
              </div>
              <div class="module-common-table">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column type="index" width="50" align="center"/>
                  <el-table-column prop="product_id" label="入库编号" width="200" align="center"/>
                  <el-table-column prop="product_name" label="产品名称" width="160" align="center"/>
                  <el-table-column prop="product_category" label="产品类别" width="100" align="center"/>
                  <el-table-column prop="product_unit" label="单位" align="center"/>
                  <el-table-column prop="product_inwarehouse_number" label="库存数量" width="100" align="center"/>
                  <el-table-column prop="product_single_price" label="产品单价" width="150" align="center"/>
                  <el-table-column prop="product_all_price" label="库存总价" width="100" align="center"/>
                  <el-table-column prop="product_status" label="库存状态" width="100" align="center">
                    <template #default="{row}">
                      <div>
                        <el-tag type="success" v-if="row.product_inwarehouse_number >= 150">库存充足</el-tag>
                        <el-tag type="danger" v-else>库存不足</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_create_person" label="入库负责人" width="100" align="center"/>
                  <el-table-column prop="product_create_time" label="入库时间" width="200" align="center">
                    <template #default="{row}">
                      <div v-if="row.product_create_time">{{ row.product_create_time?.slice(0,10) +"  "+row.product_create_time?.slice(11,16) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_update_time" label="最后修改时间" width="200" align="center">
                    <template #default="{row}">
                      <div v-if="row.product_update_time">{{ row.product_update_time?.slice(0,10) +"  "+row.product_update_time?.slice(11,16) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="in_memo" label="入库备注" width="200" align="center"/>
                  <el-table-column  label="操作" width="300" align="center" fixed="right">
                    <template #default="{row}">
                      <div>
                        <div v-if="row.product_status == 300">
                          <el-button type="primary" disabled>申请出库</el-button>
                          <el-button type="success" disabled>修改</el-button>
                          <el-button type="danger" disabled>删除</el-button>
                        </div>
                        <div v-else>
                          <el-button type="primary" @click="sqproduc(row.product_id,row.product_name)" >申请出库</el-button>
                          <el-button type="success" @click="editops(row)">修改</el-button>
                          <el-button type="danger" @click="delest(row.product_id)">删除</el-button>
                        </div>
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
        </el-tab-pane>
        <el-tab-pane label="审核列表" name="second">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                      v-model="producId2"
                      style="width: 240px"
                      size="large"
                      placeholder="输入申请出库编号进行搜索"
                      :prefix-icon="Search2"
                  />
                </div>
                <div class="button-wrapped">
                  <el-button type="danger" @click="delecku">清空已出库</el-button>
                </div>
              </div>
              <div class="module-common-table">
                <el-table :data="tableData2" border style="width: 100%">
                  <el-table-column type="index" width="50" align="center"/>
                  <el-table-column prop="product_out_id" label="申请出库编号" width="200" align="center"/>
                  <el-table-column prop="product_name" label="产品名称" width="200" align="center"/>
                  <el-table-column prop="product_out_number" label="申请出库数量" width="180" align="center"/>
                  <el-table-column prop="product_out_price" label="申请出库单价" width="180" align="center"/>
                  <el-table-column prop="product_all_price" label="申请出库总价" width="180" align="center"/>
                  <el-table-column prop="product_out_apply_person" label="申请人" width="100" align="center"/>
                  <el-table-column prop="product_apply_date" label="申请出库时间" width="200" align="center">
                    <template #default="{row}">
                      <div v-if="row.product_apply_date">{{ row.product_apply_date?.slice(0,10) +"  "+row.product_apply_date?.slice(11,16) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="apply_memo" label="出库状态" width="200" align="center"/>
                  <el-table-column  label="操作" width="300" align="center" fixed="right">
                    <template #default="{row}">
                      <div v-if="row.apply_memo=='审核通过'">
                        <el-button type="danger" disabled>取消申请</el-button>
                        <el-button type="success" disabled>审核通过</el-button>
                      </div>
                      <div v-else>
                        <el-button type="danger" @click="qxsq(row.product_id,row.product_out_id,row.product_out_number)">取消申请</el-button>
                        <el-button type="success" @click="shtg(row)">审核通过</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-footer">
              <el-pagination
                  :page-size="10"
                  :current-page="paginationData2.currentPage"
                  :pager-count="7"
                  :page-count="paginationData2.pageCount"
                  layout="prev, pager, next"
                  :total="adminTotal2"
                  @current-change="currentchange2"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <ProducCrea ref="producCrea"></ProducCrea>
  <Apply ref="appLy"></Apply>
  <editpem ref="EditPem"></editpem>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox, TabsPaneContext} from 'element-plus'
import { getProductListLength,returnProdcutListData,
  getApplyProdcutListLength,returnApplyProdcutListData
,deletProductForId,setadnull,WithdrawApplyProduct,
  upopesproduct,auditProduct,deletProductOutId} from '@/api/produc'
import ProducCrea from '../components/produc_in_warehouse.vue'
import Apply from '../components/apply.vue'
import editpem from '../components/edit_productvue.vue'
import { bus } from '@/utils/mitt'

//缓存
import { userinfor } from '@/store/userinfor';
const userStore = userinfor()

const producId = ref()
const producId2 = ref()
const tableData = ref([])
const tableData2 = ref([])

const activeName = ref('first')
//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
import {Search} from "@element-plus/icons-vue";
const breadcrumb =ref()
const item = ref({
  first:'产品管理',
  second:'产品列表'
})


// 分页 出库申请
const paginationData2 = reactive({
  // 总页数
  pageCount:1,
  //当前页面
  currentPage:1,
})
//查询最后的id
const zhuihoid2 = ref([])
//查询数量
const  adminTotal2 = ref<number>()
const getAdminglistLength2 = async ()=>{
  const res = await getApplyProdcutListLength()
  adminTotal2.value = res.length
  paginationData2.pageCount = Math.ceil(res.length / 10)
}
//默认获取第一页数据
const getFirstPageList2 = async ()=>{
  paginationData2.currentPage=1
  getAdminglistLength2()
  const res = await returnApplyProdcutListData("1",0)
  if(res != null){
    const oid = res.oid
    tableData2.value = res.result
    zhuihoid2.value[Math.ceil(paginationData2.currentPage - 1)] = res.result[oid].product_out_id
  }
}
getFirstPageList2()
//监听换页
const klope2  = ref()
const currentchange2 = async (value:number) =>{
  if(value >=2){
    klope2.value = zhuihoid2.value[value - 2]
  }else{
    klope2.value = "0"
  }
  paginationData2.currentPage=value
  console.log(zhuihoid2.value,klope2.value)
  const res = await returnApplyProdcutListData(klope2.value,0)
  if(res != null){
    const oid = res.oid
    tableData2.value = res.result
    zhuihoid2.value[Math.ceil(paginationData2.currentPage - 1)] = res.result[oid].product_out_id
  }
}

// 分页 库存
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
  const res = await getProductListLength()
  adminTotal.value = res.length
  paginationData.pageCount = Math.ceil(res.length / 10)
}
//默认获取第一页数据
const getFirstPageList = async ()=>{
  paginationData.currentPage=1
  getAdminglistLength()
  const res = await returnProdcutListData("1",0)
  if(res != null){
    const oid2 = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid2].product_id
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
  const res = await returnProdcutListData(klope.value,0)
  if(res != null){
    const oid2 = res.oid
    tableData.value = res.result
    zhuihoid.value[Math.ceil(paginationData.currentPage - 1)] = res.result[oid2].product_id
  }
}
//入库弹窗
const producCrea = ref()
const openCreadte = () =>{
  producCrea.value.open()
}
bus.on("eradIC",async (id)=>{
  if(id==1){
    getFirstPageList()
  }
  if(id==2){
    getFirstPageList2()
  }
  if(id==3){
    getFirstPageList()
    getFirstPageList2()
  }
})
//申请出库
const appLy = ref()
const sqproduc = (product_id,product_name) =>{
  const res = {
    product_id,
    product_name
  }
 bus.emit("applyID",res)
  appLy.value.open()
}
//删除
const delesUser = async (id) =>{
  const res = await deletProductForId(id)
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
const Search2 = ref()
//取消申请
//状态改变
const iop = async (product_id) =>{
  const res = await setadnull(product_id)
}

const qxsq = async (product_id,product_out_id,product_out_number) =>{
  const reT = await upopesproduct(product_id,product_out_number)
  if(reT.status == 1){
    ElMessage.error('取消失败~')
  }else{
    const res = await WithdrawApplyProduct(product_out_id)
    if(res.status==0){
      ElMessage({
        type: 'success',
        message:res.message+"!请刷新页面"
      })
      iop(product_id)
      getFirstPageList()
      getFirstPageList2()
    }else{
      ElMessage.error('出现异常~')
    }
  }
}
//修改
const EditPem = ref()
const editops = (row) =>{
  bus.emit("editID",row)
  EditPem.value.open()
}
//审核通过
const shtg = async (row) =>{
  const date = {
    product_out_id:row.product_out_id,
    product_out_status:"同意",
    audit_memo:"审核通过",
    product_out_audit_person:row.product_out_apply_person,
    product_out_price:row.product_out_price,
    product_out_apply_person:userStore.name,
    product_out_number:row.product_out_number
  }
  const res = await auditProduct(date)
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:"审核通过!请刷新页面"
    })
    getFirstPageList2()
  }else{
    ElMessage.error('审核异常~')
  }
}
//清空已出库
const delecku = async () =>{
  const res = await deletProductOutId()
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:"清空成功!请刷新页面"
    })
    getFirstPageList2()
  }else{
    ElMessage.error('清空异常~')
  }
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