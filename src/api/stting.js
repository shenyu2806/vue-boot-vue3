import instance from "@/http/index";

//获取是否允许注册
export const getReatCode = () => {
    return instance({
        url: '/set/getReatCode',
        method: 'post',
    })
}
//修改是否允许注册
export const changeReatCode = (set_value) => {
    return instance({
        url: '/set/changeReatCode',
        method: 'post',
        data:{
            set_value
        }
    })
}
//获取全部轮播图数据
export const getAllSwiper = () => {
    return instance({
        url: '/set/getAllSwiper',
        method: 'post',
    })
}
//获取公司名称
export const getCompanyName = () => {
    return instance({
        url: '/set/getCompanyName',
        method: 'post',
    })
}
//修改公司名称
export const changeCompanyName = (set_value) => {
    return instance({
        url: '/set/changeCompanyName',
        method: 'post',
        data:{
            set_value
        }
    })
}
//编辑公司介绍
export const changeCompanyIntroduce = (set_text,set_name) => {
    return instance({
        url: '/set/changeCompanyintroduce',
        method: 'post',
        data:{
            set_text,
            set_name
        }
    })
}
//获取公司介绍
export const getCompanyIntroduce = (set_name) => {
    return instance({
        url: '/set/getCompanyintroduce',
        method: 'post',
        data:{
            set_name
        }
    })
}
//获取所有公司信息
export const getAllCompanyIntroduce = () => {
    return instance({
        url: '/set/getAllCompanyintroduce',
        method: 'post',
    })
}
//部门设置
export const setDepartment = data => {
    return instance({
        url: '/set/setDepartment',
        method: 'post',
        data:{
            set_value:data
        }
    })

}
//获取部门
export const getDepartment = () => {
    return instance({
        url: '/set/getDepartment',
        method: 'post',
    })

}
//产品类别设置
export const setproductment = data => {
    return instance({
        url: '/set/setproductment',
        method: 'post',
        data:{
            set_value:data
        }
    })

}
//获取类别设置
export const getproductment = () => {
    return instance({
        url: '/set/getproductment',
        method: 'post',
    })

}