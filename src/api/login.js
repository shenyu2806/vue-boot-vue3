import instance from "@/http/index";

//注册
export const register = data => {
    const {
        account,
        email,
        password
    } = data
    return instance({
        url: '/api/register',
        method: 'post',
        data: {
            account,
            email,
            password
        }
    })
}
//登录
export const login = data => {
    const {
        account,
        password
    } = data
    return instance({
        url: '/api/login',
        method: 'post',
        data: {
            account,
            password
        }
    })
}
//路由表
export const returnMenuList = (id) => {
    return instance({
        url: '/api/returnMenuList',
        method: 'post',
        data:{
            id
        }
    })
}
//忘记密码验证
export const verify = data => {
    const {
        account,
        email
    } = data
    return instance({
        url: '/user/verifyAccountAndEmail',
        method: 'post',
        data: {
            account,
            email
        }
    })
}
//密码重置
export const resetPassword = (id,newpassword) => {
    return instance({
        url: '/user/changePasswordInLogin',
        method: 'post',
        data: {
            id,
            newpassword
        }
    })
}