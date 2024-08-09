<template>
  <el-dialog v-model="dialogVisible" title="修改产品" width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form ref="ruleForDataRef" style="max-width: 600px" :model="ruleForData" :rules="rules" label-width="100px">
        <el-form-item label="入库编号" prop="account">
          <el-input v-model="ruleForData.product_id" disabled/>
        </el-form-item>
        <el-form-item label="产品名称" prop="account">
          <el-input v-model="ruleForData.product_name" />
        </el-form-item>
        <el-form-item label="产品类别" prop="department">
          <el-select v-model="ruleForData.product_category" placeholder="请选择产品类别">
            <el-option :label="item" :value="item" v-for="item in departmentData" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位" prop="name">
          <el-input v-model="ruleForData.product_unit" />
        </el-form-item>
        <el-form-item label="产品库存" prop="sex">
          <el-input v-model="ruleForData.product_inwarehouse_number" />
        </el-form-item>
        <el-form-item label="产品单价" prop="email">
          <el-input v-model="ruleForData.product_single_price" />
        </el-form-item>
        <el-form-item label="入库备注" prop="email">
          <el-input v-model="ruleForData.in_memo" type="textarea" />
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
import { editProduct } from '@/api/produc'
import { getproductment } from '@/api/stting'
import {ElMessage} from "element-plus";


bus.on('editID',(res)=>{
  ruleForData.product_id = res.product_id
  ruleForData.product_name = res.product_name
  ruleForData.product_category = res.product_category
  ruleForData.product_unit = res.product_unit
  ruleForData.product_inwarehouse_number = res.product_inwarehouse_number
  ruleForData.product_single_price = res.product_single_price
  ruleForData.product_create_person = res.product_create_person
  ruleForData.in_memo = res.in_memo
})

//缓存
import { userinfor } from '@/store/userinfor';
const userStore = userinfor()

interface ruleForData{
  product_id:string,
  product_name:string,
  product_category:string,
  product_unit:string,
  product_inwarehouse_number:string,
  product_single_price:string,
  product_create_person:string,
  in_memo:string
}

const ruleForData = reactive({
  product_id:'',
  product_name:'',
  product_category:'',
  product_unit:'',
  product_inwarehouse_number:'',
  product_single_price:'',
  product_create_person:userStore.name,
  in_memo:''
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

//入库操作
const addAdmin = async () =>{
  const rest = await editProduct(ruleForData)
  if(rest.status == 0){
    ElMessage({
      message: "修改成功！请刷新页面",
      type: 'success',
    })
    bus.emit("eradIC",'1')
  }else{
    ElMessage.error('修改失败啦~')
  }
  dialogVisible.value=false
}
//类别数据
const departmentData = ref([])
//获取类别数据
const getdepartment = async () =>{
  departmentData.value = await getproductment()

}
getdepartment()

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