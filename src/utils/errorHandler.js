//访问测试接口来判断后台是否正常
import axios from "axios";
import {ElNotification} from "element-plus";

const source = axios.CancelToken.source()
setTimeout(() => {
    source.cancel('后台连接超时')
    console.log('6000ms');
}, 6000);
axios({
    url: '/tp/',	// 后端的接口地址
    method: 'post',
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    cancelToken: source.token,
    dataType: "json"
})
    .then(res => {
        // ElNotification({
        //     title: '提示',
        //     message: res.data.massage,
        //     type: 'success',
        // })
    // res 是后端回传的数据，如果连接成功，可以把res打印出来。
    })
    .catch(error=>{
        ElNotification({
            title: '错误',
            message: '连接错误',
            type: 'error',
        })
        // 如果连接失败，会抛出错误信息。
    })
// 异常处理模块
export default function errorHandler(error) {
    // 根据不同的错误类型进行处理
    if (error.response) {
        // 后端返回错误
        const { status } = error.response;
        if (status === 403) {
            // 处理权限不足的情况
            alert('无权限使用此功能');
        } else if (status === 500) {
            // 处理服务器内部错误
            alert('服务器内部错误');
        } else {
            // 处理其他错误
            alert('请求错误');
        }
    } else if (error.request) {
        // 请求发送失败
        alert('请求发送失败');
    } else {
        // 其他错误
        alert('发生错误');
    }
}