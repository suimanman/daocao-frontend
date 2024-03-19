// 封装axios，做请求处理
//导入axios
import axios from "axios";

let token="ssa";

//创建axios
const request=axios.create({
    //根请求地址
    baseURL:'http://localhost:8080',
    withCredentials:false,//用于配置请求接口跨域时是否需要凭证
    timeout:30000 //超时时间，单位毫秒
})

//配置请求头的参数类型和编码格式
axios.defaults.headers['Content-Type']='application/json?charset=utf-8'
//配置请求拦截器
request.interceptors.request.use((config)=>{

    //在请求头中添加token，判断是否需要发送token
    //token应该从pinia中获取
    if(token){
        config.headers['Daocao-Authorization']=token;
    }
    return config;
    },(error)=>{
        //发生异常
        console.log("请求异常-----》",error);
        return Promise.reject(error);
    }

)

//配置响应拦截器
request.interceptors.response((response)=>{
    //判断响应码，后端返回的数据 code，data，msg
    
})