<template>
<!--  首页-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="home-wrapped">
    <div class="swiper-wrapped">
      <el-carousel :interval="4000" indicator-position="outside" type="card" height="320px">
        <el-carousel-item v-for="(item,index) in imagesurl" :key="index">
          <img v-if="item" :src="item" class="swiper">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in companyintroduces" :key="index"  @click="openIntrouce(index +1)" >
          <div class="company-message-area">
            <span>{{ item.set_name }}</span>
            <div v-html="item.set_text" class="company-intoroduce"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="two-table-wrapped">
      <div class="company-notice">
        <span>公司公告</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="system-message">
        <span>系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
  <introduce ref="intor"></introduce>
</template>
<script lang="ts" setup>
//面包屑
import { ref } from "vue";
import bread_Crumb from '@/components/bread_crumb.vue'
import {getAllSwiper,getAllCompanyIntroduce} from '@/api/stting'
import {ElNotification} from "element-plus";
import { bus } from "@/utils/mitt.js"
import introduce from './components/introduce.vue'

const breadcrumb =ref()
const item = ref({
  first:'首页'
})

const tableData = []

//获取轮播图
const imagesurl = ref([])
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
//获取公司介绍
const companyintroduces =ref([])
const getAllCompanyintroduce = async ()=>{
  const res = await getAllCompanyIntroduce()
  if(res.status==0){
    const [name,...intro] = res.result
    companyintroduces.value = intro
  }
}
getAllCompanyintroduce()

// 弹窗
const intor =ref()
const openIntrouce = (id) =>{
bus.emit('introduce',id)
  intor.value.open()
}
</script>

<style lang="scss" scoped>
@mixin table-class{
  height: 232px;
  width: 48%;
  display: flex;
  flex-direction: column;

  span{
    font-size: 14px;
    margin: 5px;
    border-bottom: 1px solid #ea0709;
  }
}
.home-wrapped{
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .swiper-wrapped {
      padding: 0 20px;
      background: #fff;
      margin-bottom: 8px;
      .swiper{
        width: 100%;
        height: 100%;
      }
    }
  .layout-wrapped{
      padding: 8px;
      margin-bottom: 8px;
      background: #fff;
    .company-message-area{
      background: #f5f5f5;
      height: 200px;
      padding: 8px;
      cursor: pointer;
      span{
        font-size: 14px;
        border-bottom: 1px solid #409eff;
      }
    }
    .company-intoroduce{
      margin-top: 15px;
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .company-message-area:hover{
      cursor: pointer;
      background: #eef5ff;
    }
    }
  .two-table-wrapped{
      height: 230px;
      width: 100%;
      display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
      .company-notice{
        @include table-class;
      }
    .system-message{
      @include table-class;
    }
    }
  }
//轮播图
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>