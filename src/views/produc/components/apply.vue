<template>
  <el-dialog v-model="dialogVisible" title="申请出库" width="600px" align-center draggable>
      <div class="product-name">您申请出库的库存编号/产品是：{{ ruleForData.product_id +" / "+ ruleForData.product_name}}</div>
      <div class="dialog-content">
        <el-form ref="ruleForDataRef" style="max-width: 600px" :model="ruleForData" :rules="rules" label-width="100px">
          <el-form-item label="申请出库编号" prop="account">
            <el-input v-model="ruleForData.product_out_id" />
          </el-form-item>
          <el-form-item label="出库数量" prop="account">
            <el-input v-model="ruleForData.product_out_number" />
          </el-form-item>
          <el-form-item label="出库单价" prop="email">
            <el-input v-model="ruleForData.product_out_price"/>
          </el-form-item>
          <el-form-item label="出库备注" prop="email">
            <el-input v-model="ruleForData.apply_memo" type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addAdmin" >
      确认
      </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import { applyOutProduct,setad300,updateproduct } from '@/api/produc'
import {ElMessage} from "element-plus";


bus.on('applyID',(res)=>{
  ruleForData.product_id = res.product_id
  ruleForData.product_name = res.product_name
})

//缓存
import { userinfor } from '@/store/userinfor';
const userStore = userinfor()

interface ruleForData{
  product_id:string,
  product_out_id:string,
  product_out_price:string,
  product_name:string,
  product_out_number:string,
  product_out_apply_person:string,
  apply_memo:string
}

const ruleForData = reactive({
  product_id:'',
  product_out_id:'',
  product_out_price:'',
  product_name:'',
  product_out_number:'',
  product_out_apply_person:userStore.name,
  apply_memo:''
})

const rules = reactive({
  account:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  password:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  name:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  sex:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  email:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  department:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
})
//修改状态
const iop = async () =>{
  const res = await setad300(ruleForData.product_id)
  console.log(res)
}
//入库操作
const addAdmin = async () =>{
  const resT = await updateproduct(ruleForData.product_id,ruleForData.product_out_number)
  if(resT.status == 1) {
    ElMessage.error("库存不足")
  }else{
    const res = await applyOutProduct(ruleForData)
    if(res.status==0){
      ElMessage({
        message: "申请成功！请刷新页面",
        type: 'success',
      })
      if(resT.uio==0){
        iop()
      }
      bus.emit("eradIC",'3')
    }else{
      ElMessage.error('申请失败啦~')
    }
  }
  dialogVisible.value=false
}

//控制弹窗
const dialogVisible = ref(false)

//打开创建管理员弹窗
const open = () =>{
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>
<style scoped lang="scss">
.dialog-content{
  display: flex;
  padding: 20px 30px;
}
.product-name{
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #333;
}
:deep(.el-form-item){
  margin: 30px;
}
</style>