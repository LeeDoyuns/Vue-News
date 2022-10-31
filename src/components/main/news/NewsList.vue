<template>
    <ul id="newsListWrap">
            <li class="newsList" v-for="item in newsList" :key="item.id" v-on:click="viewNews(item.id);">{{item.title}}</li>
    </ul>
</template>

<script>
import http from "@/js/news"
import common from "@/js/common";

    export default{
        props: {
            newsList: {require:true, type: Array}
        },
        methods: {
            viewNews(id){
                http.getNewsDetail(id)
                .then((res)=>{
                    common.EventBus.$emit("newsView", res.data.result);
                })
                .catch((err)=>{
                    console.log(err);
                });


            }
        }
    }
</script>
<style>
    .newsList{font-size: 3em;padding:5px;border:1px solid #e1d0d05c;text-align: justify;}
    #newsListWrap{padding:0px;margin:0;}
</style>