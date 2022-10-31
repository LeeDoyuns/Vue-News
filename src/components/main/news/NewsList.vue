<template>
    <ul id="newsListWrap">
            <li class="newsList" v-for="item in newsList" :key="item.id" v-on:click="viewNews(item.id);">{{item.title}}</li>
    </ul>
</template>

<script>
import http from "@/js/news"

    export default{
        props: {
            newsList: {require:true, type: Array}
        },
        methods: {
            viewNews(id){
                console.log(id);
                http.viewNews()
                .then((res)=>{
                    console.log(res);
                })
            }
        }
    }
</script>
<style>
    .newsList{font-size: 3em;padding:5px;border:1px solid #e1d0d05c;text-align: justify;}
    #newsListWrap{padding:0px;margin:0;}
</style>