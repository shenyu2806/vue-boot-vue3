import axios from 'axios'

const instance = axios.create({
	//后端地址
	baseURL:'http://127.0.0.1:9090',
	timeout:6000,
	headers:{
		"Content-Type":"application/x-www-form-urlencoded"
		}
});

instance.interceptors.request.use(function (config){
	return config;
},function (error){
	return Promise.reject(error);
})
instance.interceptors.response.use(function (response){
	return response;
},function (error){
	return Promise.reject(error);
})

export default instance