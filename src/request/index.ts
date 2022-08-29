import axios from "axios";
const service=axios.create({
    // baseURL:"http://127.0.0.1/api",
    baseURL:"https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})

service.interceptors.request.use(config=>{
    
    config.headers=config.headers||{}
    
    // 为null
    if(localStorage.getItem("token")){
        
        config.headers.token=localStorage.getItem("token")||""
    }
    return config
})
// import jwtDecode from "jwt-decode";
service.interceptors.response.use(res=>{
    const code:number=res.data.code
    // console.log(code);
    // interface IUser{
    //     user:object
    // }
    if(code===200){
        //解析token
        // const data:object=(jwtDecode(res.data.token) as IUser).user
        //返还数据
        return res.data
    }else{
        return Promise.reject(res.data)
    }
},(err)=>{
    console.log(err);
    
})
export default service