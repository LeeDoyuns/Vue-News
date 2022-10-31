<template>
            <img :src="href"  v-on:click="loadView();"> 
</template>


<script>
import common from "@/js/common"

 export default {
    name : 'BottomComp',
    props: {
        href: {require:true, type: String},
        param: {require:true} 
    },
    methods: {
        loadView(){
            let  data = this.param.type;
            let session = JSON.parse(sessionStorage.getItem("member"));
            if((data != 'newsList' && data != 'ranking' && data != 'search') 
            && (session == null || session.id == null)){
                alert('로그인 후 이용하실 수 있습니다.')
            }

            common.EventBus.$emit(data);
            /*
            http.getMemberMainData()
            .then((res)=>{
                console.log(res);
            })
            .catch((error)=>{
                console.log(error);
            })*/
        }
    }
    
}

 </script>