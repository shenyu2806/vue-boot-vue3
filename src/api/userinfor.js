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
//----------用户管理
//添加管理员
export const createAdmin = data => {
    const {
        account,
        ...identity
    } = data
    return instance({
        url: '/user/createAdmin',
        method: 'post',
        data: {
            account,
            ...identity
        }
    })
}
//获取管理员列表
export const getAdminList = identity => {
    return instance({
        url: '/user/getAdminList',
        method: 'post',
        data: {
            identity
        }
    })
}
//编辑管理员列表
export const editAdmin = data => {
    const {
        id,
        ...department
    } = data
    return instance({
        url: '/user/editAdmin',
        method: 'post',
        data: {
            id,
            ...department
        }
    })
}
//对管理员取消
export const changeIdentityToUser = id => {
    return instance({
        url: '/user/changeIdentityToUser',
        method: 'post',
        data: {
            id
        }
    })
}
//对用户赋权
export const changeIdentityToAdmin = (id,identity) => {
    return instance({
        url: '/user/changeIdentityToAdmin',
        method: 'post',
        data: {
            id,
            identity
        }
    })
}
//对用户搜索
export const searchUser = (account,identity) => {
    return instance({
        url: '/user/searchUser',
        method: 'post',
        data: {
            account,
            identity
        }
    })
}
//对用户搜索
export const searchDepartment = (department) => {
    return instance({
        url: '/user/searchDepartment',
        method: 'post',
        data: {
            department
        }
    })
}
//冻结用户
export const banUser = (id) => {
    return instance({
        url: '/user/banUser',
        method: 'post',
        data: {
            id
        }
    })
}
//解冻用户
export const hotUser = (id) => {
    return instance({
        url: '/user/hotUser',
        method: 'post',
        data: {
            id
        }
    })
}
//获取冻结用户
export const getBanList = () => {
    return instance({
        url: '/user/getBanList',
        method: 'post',
    })
}
//删除用户
export const deleteUser = (id,account) => {
    return instance({
        url: '/user/deleteUser',
        method: 'post',
        data: {
            id,
            account
        }
    })
}
//获取对应身份的人数
export const getAdmingListLength = (identity) => {
    return instance({
        url: '/user/getAdmingListLength',
        method: 'post',
        data: {
            identity
        }
    })
}
//监听换页
export const returnListData = (zhid,pager,identity) => {
    return instance({
        url: '/user/returnListData',
        method: 'post',
        data: {
            zhid,
            pager,
            identity
        }
    })
}
//获取全部用户
export const getUsersList = () => {
    return instance({
        url: '/user/getUsersList',
        method: 'post',
    })
}