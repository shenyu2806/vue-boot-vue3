<template>
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
<!--  系统概览-->
  <div class="overview-wrapped">
    <div class="top-content-wrapped">
      <div class="person-infor">
        <div class="person-avatar-wrapped">
          <el-avatar :size="100" :src="state.circleUrl" />
          <span class="department">所属部门：{{ userDate.department }}</span>
          <span class="company">所属公司：团星科技有限公司</span>
        </div>
        <div class="line-wrapped">
          <div class="line"></div>
        </div>
        <div class="detail-infor-wrapped">
            <p>姓名：{{userDate.name }}</p>
            <p>性别：{{ userDate.sex }}</p>
            <p>身份：{{ userDate.senfen }}</p>
            <p>分管领域：{{ userDate.liyue }}</p>
            <p>权限：{{ userDate.qx }}</p>
        </div>
      </div>
      <!-- 管理员与用户比值饼状图pie
第一个类用于创建图例，第二个类修改样式 -->
      <div class="manage-user pie"></div>
    </div>
    <div class="mid-content-wrapped">
      <div class="product-category-bar mid-content-left"></div>
        <div class="mid-content-right">
          <div class="title">常用管理</div>
          <el-row :gutter="20">
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="user" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">用户管理</span>
            </div></el-col>
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="chanping" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">产品管理</span>
            </div></el-col>
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="xiaoxi" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">系统消息</span>
            </div></el-col>
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="use" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">个人管信息</span>
            </div></el-col>
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="bumen" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">部门信息</span>
            </div></el-col>
            <el-col :span="6"><div class="button-area" >
              <SvgIcon icon-name="set" style="width: 24px; height: 24px"></SvgIcon>
              <span class="buttom-name">系统设置</span>
            </div>
            </el-col>
          </el-row>
        </div>
    </div>
    <div class="footer-content-wrapped">
      <div class="massage-level footer-content-left"></div>
      <div class="userlogin-week footer-content-right"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref,onMounted} from "vue";
import { userinfor } from '@/store/userinfor.js'
import * as echarts from 'echarts';
import SvgIcon from '@/components/Swglcon.vue'
import { getuserInfor } from '@/api/userinfor'
import  { setuerse } from'@/api/tury'

const userStore = userinfor()

onMounted(() => {
  manageUser()
  productCategoryBar()
  massageLevel()
  massageAllDay()
})

//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
const breadcrumb =ref()
const item = ref({
  first:'系统概览'
})
const state = reactive({
  circleUrl:userStore.imageUrl,
})

//获取用户信息
const getUserInfor = async (id) =>{
  const res = await getuserInfor(id)
  if(res != null){
    userDate.name = res.name
    userDate.sex = res.sex
    userDate.identity = res.identity
    userDate.department = res.department
  }
}
getUserInfor(userStore.id)
//登录数据
const userDate  = reactive({
  name:'',
  sex:'',
  identity:'',
  department:'',
  senfen:'超级管理员',
  liyue:'超级管理',
  qx:'最高权限'
})
// 管理员与用户比值图
const manageUser = () => {
  // 通过类名 初始化
  const mu = echarts.init(document.querySelector('.manage-user'))
  document.querySelector('.manage-user').setAttribute('_echarts_instance_', '')
  // 设置基本的参数
  mu.setOption({
    title: {
      text: '管理与用户对比图',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: [20, 20, 20, 20]
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        data:[
          {
            "value": 2,
            "name": "产品管理员"
          },
          {
            "value": 2,
            "name": "信息管理员"
          },
          {
            "value": 24,
            "name": "用户"
          },
          {
            "value": 2,
            "name": "用户管理员"
          },
          {
            "value": 1,
            "name": "管理员"
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  // 用于echarts响应式
  window.addEventListener('resize', function () {
    mu.resize()
  })
}

// 产品类别图
const productCategoryBar = async () => {
  const pcb = echarts.init(document.querySelector('.product-category-bar'))
  document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
  pcb.setOption({
    title: {
      text: "产品类别库存总价图",
      top: "3%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      // 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
      data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 40,
        colorBy: "data"
      },
    ]
  })
  window.addEventListener('resize', function () {
    pcb.resize()
  })
}
// 公告等级分布图
const massageLevel = () => {
  const ml = echarts.init(document.querySelector('.massage-level'))
  document.querySelector('.massage-level').setAttribute('_echarts_instance_', '')
  ml.setOption({
    title: {
      text: "公告等级分布图",
      top: "3%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['35%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
        ],
      }
    ]
  })
  window.addEventListener('resize', function () {
    ml.resize()
  })
}
// 消息每日总量图
const massageAllDay = () => {
  // 底部日期的实现
 /* let dd = new Date()
  let week = []
  for (let i = 1; i < 8; i++) {
    dd.setDate(dd.getDate() - 1)
    // 得到日期并且把斜杠替换成横杠
    week.push(dd.toLocaleDateString().replace(/\//g, "-"))
  }

  let number = []
  week.forEach(async (e) => {
    // 如果在Moment中不加'YYYY-MM-DD'会提示警告
    let day = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
    // 调用每天登录人数的接口
    const res = await everydaynumberofpeople(day)
    number.push(res.number)
  })*/
  const mad = echarts.init(document.querySelector('.userlogin-week'))
  document.querySelector('.userlogin-week').setAttribute('_echarts_instance_', '')
  mad.setOption({
    title: {
      text: "每日登录人数图",
      top: "3%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
  window.addEventListener('resize', function () {
    mad.resize()
  })
}
</script>
<style scoped lang="scss">
// 总览内容
.overview-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f8f8f8;

  // 上部分内容 个人资料 + 饼状图
  .top-content-wrapped {
    height: 30%;
    display: flex;

    // 个人信息
    .person-infor {
      height: 100%;
      margin-right: 8px;
      width: calc(50% - 8px);
      display: flex;
      background: #fff;

      // 头像区域
      .person-avatar-wrapped {
        display: flex;
        width: 50%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // 公司
        .company {
          margin: 10px 0px;
          font-size: 12px;
        }

        // 职务
        .department {
          margin-top: 8px;
          font-size: 12px;
        }

      }

      // 分割线
      .line-wrapped {
        height: 100%;
        display: flex;
        align-items: center;

        .line {
          height: 170px;
          border: 1px solid #D3D3D3;
        }
      }

      // 详细信息区域
      .detail-infor-wrapped {
        height: 100%;
        width: calc(50% - 1px);
        margin-left: 50px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
      }
    }

    // 饼状图
    .pie {
      width: calc(50%);
      height: 100%;
      background: #fff;
    }
  }

  // 中间部分内容 消息阅读量图 产品类别图
  .mid-content-wrapped {
    margin-top: 8px;
    height: calc(32% - 8px);
    display: flex;

    // 中间左部分
    .mid-content-left {
      margin-right: 8px;
      width: calc(60% - 8px);
      background: #fff;
    }

    // 中间右部分
    .mid-content-right {
      width: calc(40%);
      background: #fff;
      padding: 8px;

      // 标题
      .title {
        font-size: 14px;
        margin-bottom: 8px;
      }

      // 按钮区域
      .button-area {
        margin-bottom: 8px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #F5F5F5;

        // 按钮名字
        .button-area {
          margin-top: 10px;
        }
      }

      // 按钮变色
      .button-area:hover {
        background: #e4efff;
      }
    }
  }

  // 底部内容
  .footer-content-wrapped {
    margin-top: 8px;
    height: calc(38% - 8px);
    display: flex;

    // 底部左部分
    .footer-content-left {
      margin-right: 8px;
      height:100%;
      width: calc(30% - 8px);
      background: #fff;
    }

    // 底部右部分
    .footer-content-right {
      height:100%;
      width: calc(70%);
      background: #fff;
    }
  }
}
</style>