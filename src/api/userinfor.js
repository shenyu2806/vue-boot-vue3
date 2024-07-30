import instance from "@/http/index";

//获取用户数据
export const getuserInfor = id => {
    return instance({
        url: '/user/getuserInfo',
        method: 'post',
        data: {
            id
        }
    })
}
//绑定账号
export const bindes = (account,onlyid,url) => {
    return instance({
        url: '/user/bindAccount',
        method: 'post',
        data: {
            account,
            onlyid,
            url
        }
    })
}
//修改用户密码
export const changePassword = (id,oldPassword,newpassword) => {
    return instance({
        url: '/user/changePassword',
        method: 'post',
        data: {
            id,
            oldPassword,
            newpassword
        }
    })
}
//修改姓名
export const changeName = (id,name) => {
    return instance({
        url: '/user/changeName',
        method: 'post',
        data: {
            id,
            name
        }
    })
}
//修改性别
export const changeSex = (id,sex) => {
    return instance({
        url: '/user/changeSex',
        method: 'post',
        data: {
            id,
            sex
        }
    })
}
//修改邮箱
export const changeEmail = (id,email) => {
    return instance({
        url: '/user/changeEmail',
        method: 'post',
        data: {
            id,
            email
        }
    })
}
//后台修改密码
export const ChangePassword = (id,oldPassword, newpassword) => {
    return instance({
        url: '/user/changePassword',
        method: 'post',
        data: {
            id,
            oldPassword,
            newpassword
        }
    })
}