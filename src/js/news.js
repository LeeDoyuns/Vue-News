import axios from "axios";

const http = axios.create({
   baseURL: 'http://localhost:9081/api',
   withCredentials: false,
   headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
   } 
});

export default{
    getNewsDetail(id){
        let data = {newsId:id};
        return http.post("/news/view-news",data);
    }
    
}
