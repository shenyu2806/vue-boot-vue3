import instance from "@/http/index";

//圆饼图
export const setuerse = () => {
    return instance({
        url: '/tur/setuerse',
        method: 'post',
    })
}