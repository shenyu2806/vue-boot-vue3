<template>
<!--登录日志-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="search-wrapped">

        </div>
        <div class="button-wrapped">
          <el-button type="danger" @click="LongDete">清空日志</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" border  style="width: 100%" @row-dblclick="openuse">
          <el-table-column prop="operating_name" label="账号" align="center"/>
          <el-table-column prop="operating_email" label="邮箱" align="center"/>
          <el-table-column prop="operating_content" label="日志内容" align="center"/>
          <el-table-column prop="operating_time" label="登录时间" align="center">
            <template #default="{row}">
              <div v-if="row.operating_time">{{ row.operating_time?.slice(0,10) +"  "+row.operating_time?.slice(11,16) }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import { getlongInfo,longDelete } from '@/api/logs'

//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {Search} from "@element-plus/icons-vue";
const breadcrumb =ref()
const item = ref({
  first:'日志管理',
  second:'登录日志'
})

const tableData = ref([])

//获取内容
const LongReckon = async () =>{
  tableData.value = await getlongInfo()
}
LongReckon()
//清空内容
const LongDete = async () =>{
  const res = await longDelete()
  if(res.status == 0){
    ElMessage({
      type: 'success',
      message:"清空成功",
    })
  }else{
    ElMessage.error("出现异常！")
  }
  LongReckon()
}
</script>
<style scoped lang="scss">

</style>