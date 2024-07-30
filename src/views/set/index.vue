<template>
    <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="common-wrapped">
      <div class="common-content">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="账号详情" name="first">
            <div class="account-info-wrapped">
              <span>用户头像：</span>
              <div class="account-info-content">
                <el-upload
                    class="avatar-uploader"
                    :action = "apiUrl+'/user/uploadAvatar'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                  <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户账号：</span>
              <div class="account-info-content">
                <el-input v-model="AccountDateilDate.account" style="width: 240px" disabled placeholder="Please input"/>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户密码：</span>
              <div class="account-info-content">
                <el-button type="primary" @click="passworopsd">修改密码</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户姓名：</span>
              <div class="account-info-content">
                <el-input v-model="AccountDateilDate.name" style="width: 240px" placeholder="Please input"/>
              </div>
              <div class="account-save-button">
                <el-button type="primary" @click="saveName">保存</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户性别：</span>
              <div class="account-info-content" style="width: 240px">
                <el-select
                    v-model="AccountDateilDate.sex"
                    placeholder="性别"
                    size="large"
                    style="width: 240px"
                >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
              <div class="account-save-button">
                <el-button type="primary" @click="saveSex">保存</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户身份：</span>
              <div class="account-info-content">
                <el-input v-model="AccountDateilDate.identity" style="width: 240px" disabled placeholder="Please input"/>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户部门：</span>
              <div class="account-info-content">
                <el-input v-model="AccountDateilDate.depatment" style="width: 240px" disabled placeholder="Please input"/>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>用户邮箱：</span>
              <div class="account-info-content">
                <el-input v-model="AccountDateilDate.email" style="width: 240px" placeholder="Please input"/>
              </div>
              <div class="account-save-button">
                <el-button type="primary" @click="saveEmail">保存</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <div class="account-info-wrapped">
              <span>公司名称：</span>
              <div class="account-info-content">
                <el-input v-model="companyName" style="width: 240px" placeholder="Please input"/>
              </div>
              <div class="account-save-button">
                <el-button type="primary" @click="companyname">编辑公司名称</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司介绍：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEdit(1)">编辑公司介绍</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司架构：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEdit(2)">编辑公司架构</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司战略：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEdit(3)">编辑公司战略</el-button>
              </div>
            </div>
            <div class="account-info-wrapped">
              <span>公司高层：</span>
              <div class="account-info-content">
                <el-button type="success" @click="openEdit(4)">编辑公司高层</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="首页管理" name="third">
            <div class="home-wrapped">
<!--              提示-->
              <div class="tips">
                <span>提示：点击图片框进行切换首页轮播图</span>
              </div>
              <div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
                <div class="swiper-name">轮播图{{ index +1 }}:</div>
                <el-upload
                    class="avatar-uploader"
                    :action="apiUrl+'/set/uploadSwiper'"
                    :show-file-list="false"
                    :on-success="handleSwiperSuccess"
                    :before-upload="beforeAvatarUpload" :data="item">
                  <template #trigger>
                    <img v-if="imagesurl[index]" :src="imagesurl[index]" class="swiper">
                    <img src="@/assets/lbt_xhtu.png" alt="加载失败" v-else>
                  </template>
                </el-upload>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
        </el-tabs>
      </div>
  </div>
<!--  修改密码-->
  <change ref="changeP"></change>
  <editor ref="editorP"></editor>
</template>
<script lang="ts" setup>
import bread_Crumb from '@/components/bread_crumb.vue';
import { getCurrentInstance, reactive, ref } from "vue";
import { bindes } from '@/api/userinfor'
import change from './components/change_password.vue'
import { userinfor } from '@/store/userinfor';
import editor from './components/editor.vue'
import { bus } from "@/utils/mitt.js"
import {getCompanyName,changeCompanyName} from'@/api/stting'

const userStore = userinfor()
const changeP =ref()
//面包屑
const breadcrumb =ref()
const item = ref({
  first:'系统设置'
})
import {ElMessage, ElNotification} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { changeName,changeSex,changeEmail } from '@/api/userinfor'
import {getAllSwiper} from '@/api/stting'
import type { UploadProps } from 'element-plus'


//使用全局变量
const app = getCurrentInstance()
const apiUsr = app.appContext.config.globalProperties.$apiUsr
const apiUrl = apiUsr;

//执行绑定操作
const scjk = async (account,onlyid,url) => {
  const res = await bindes(account,onlyid,url)
  console.log(res)
}
//头像
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
 if(response.status == 0){
   userStore.$patch({
     imageUrl: response.url
   })
   ElMessage({
     message: '更新头像成功！',
     type: 'success',
   }),
    scjk(userStore.account,response.onlyid,response.url)
 }else{
   ElMessage.error('更新头像失败!请重新上传')
 }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('必须是jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片必须小于2MB!')
    return false
  }
  return true
}
const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
]
//首页管理
const imagesurl = ref([])
//获取轮播图
const  getAllswiper = async ()=>{
  const res = await getAllSwiper()
  if(res!=null){
    imagesurl.value = res.array
  }else{
    ElNotification({
      title: '错误',
      message: '后台异常',
      type: 'error',
    })
  }
}
getAllswiper()

const  swiperData = [{set_name:'swiper1'},{set_name:'swiper2'},
  {set_name:'swiper3'},{set_name:'swiper4'},{set_name:'swiper5'},{set_name:'swiper6'}]

// 上传轮播图成功
const handleSwiperSuccess: UploadProps['onSuccess'] = (
    response
)=>{
  ElMessage({
    message:response.message,
    type:'success'
  })
  getAllswiper()
}

//修改密码
const passworopsd = () =>{
  changeP.value.open()
}
const saveName = async () =>{
 const res = await changeName(localStorage.getItem('id'),AccountDateilDate.name)
 if(res.status == 0){
    ElMessage({
      message:res.message,
      type:'success'
    })
   userStore.$patch({
      name:AccountDateilDate.name
   })
 }else{
   ElMessage.error("用户名只允许设置中文并且2~6位！")
 }
}
//修改性别
const saveSex = async () =>{
  const res = await changeSex(localStorage.getItem('id'),AccountDateilDate.sex)
  if(res.status == 0){
    ElMessage({
      message:res.message,
      type:'success'
    })
    userStore.$patch({
      sex: AccountDateilDate.sex
    })
  }else{
    ElMessage.error("修改性别失败！")
  }
}
//修改邮箱
const saveEmail = async () =>{
  const res = await changeEmail(localStorage.getItem('id'),AccountDateilDate.email)
  if(res.status == 0){
    ElMessage({
      message:res.message,
      type:'success'
    })
    userStore.$patch({
      email:AccountDateilDate.email
    })
  }else{
    ElMessage.error("修改邮箱失败！")
  }
}

//默认打开标签页
const activeName = ref('first')

const AccountDateilDate = reactive({
  account: userStore.account,
  identity: userStore.identity,
  depatment: userStore.department,
  name: userStore.name,
  sex: userStore.sex,
  email: userStore.email
})
const companyName = ref()
//获取公司名字
const getCompanyname = async () =>{
  const res =  await getCompanyName()
  if(res!=null){
    companyName.value = res
  }else{
    ElNotification({
      title: '错误',
      message: '后台异常',
      type: 'error',
    })
  }
}
getCompanyname()
//编辑公司名称
const companyname = async () =>{
  const res =  await changeCompanyName(companyName.value)
  if(res.status==0){
    ElNotification({
      title: '成功',
      message: res.message,
      type: 'success',
    })
  }else{
    ElNotification({
      title: '错误',
      message: '修改失败',
      type: 'error',
    })
  }
}

const editorP = ref()
//打开富文本
const openEdit= (id) =>{
  //id是标记
  bus.emit("editorTitle",id)
  editorP.value.open()
}
</script>
<style lang="scss" scoped>
.common-wrapped{
  padding: 8px;
  background: #f5f5f5;
  //计算
  height: calc(100vh - 101px);
  .common-content{
    padding: 0 10px;
    height: 100vh;
    background: #fff;

    //账号信息
    .account-info-wrapped{
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-left: 50px;
      margin-bottom: 24px;
    }
    .account-info-content{
      margin-left: 24px;
      margin-right: 16px;
    }
    .account-save-button{
      //margin-left: 16px;
    }

    :deep(.el-input){
      width: 240px;
    }
  }
  .home-wrapped{
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    //提示
    .tips{
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      span{
        font-size: 14px;
        color: silver;
      }
    }
    //轮播图
    .swiper-wrapped{
      display: flex;
      margin-bottom: 16px;
      .swiper-name{
        margin-right: 15px;
        font-size: 14px;
        margin-bottom: 24px;
      }
      .swiper{
        width: 336px;
        height: 96px;
      }
    }
  }

}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-tabs>.el-tabs__content{
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
<!--2-->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>