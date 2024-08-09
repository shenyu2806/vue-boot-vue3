import instance from "@/http/index";

//计入登录日志
export const longReckon = (operating_name, operating_email, operating_content) => {
    return instance({
        url: '/logs/longReckon',
        method: 'post',
        data: {
            operating_name,
            operating_email,
            operating_content
        }
    })
}
//获取登录日志
export const getlongInfo = id => {
    return instance({
        url: '/logs/getlongInfo',
        method: 'post',
        data: {
            id
        }
    })
}
//清空登录日志
export const longDelete = id => {
    return instance({
        url: '/logs/longDelete',
        method: 'post',
        data: {
            id
        }
    })
}