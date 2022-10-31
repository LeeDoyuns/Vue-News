import axios from "axios";
import Vue from "vue";
//import VueCookies from "vue-cookies";

const http = axios.create({
   baseURL: 'http://localhost:9081/api',
   withCredentials: false,
   headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
   } 
});

/*

axios.interceptors.request.use(async (config)=>{

    config.headers.token = VueCookies.get('token');
    config.headers.refresh_token = VueCookies.get('refresh_token');

    return config
}, (err)=>{
    return Promise.reject(err);
});

axios.interceptors.response.use((response)=>{
    return response;
}, async (err)=>{
    console.log(err.config);
    const errorAPI = err.config;
    if(err.response.data.status == 401 && errorAPI.retry == undefined){
        errorAPI.retry = true;
        await refreshToken();
        return await axios(errorAPI);
    }
    return Promise.reject(err);
})*/



const EventBus = new Vue();



export default{
    //get방식
    get(url){
        return http.get(url);
    },
    post(url){
        return http.post(url);
    },
    EventBus,
    http,
    axios
}