<template>
    <div>
        <div class="main">
            <!-- <component></component> -->
            <!-- <h1>To-Do List</h1>
            <ul>
            <li v-for="item in ToDoItems" :key="item.test">
                <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>  
            </li>
            </ul>-->
            <div class="newsWrap">
                <keep-alive v-if="mainViewComponent == 'DefaultNewsList'">
                    <component v-bind:is="mainViewComponent" v-bind:newsList="newsList"  ></component>
                </keep-alive>
                <keep-alive v-else-if="mainViewComponent == 'NewsView'">
                    <component v-bind:is="mainViewComponent" v-bind:NewsView="newsViewData"  ></component>
                </keep-alive>
                <keep-alive v-else >
                    <component v-bind:is="mainViewComponent" ></component>
                </keep-alive>
            </div>
            
        </div>
        
        <div class="botmComp">
            <ul>
                <li v-for="(item,index) in BottomItems" :key="item.id" >
                    <bottom-comp :href="bindIcon(item.href)" v-bind:param="BottomItems[index]" ></bottom-comp> <!--import한 파일 명 BottomComp -->
                </li>
            </ul>
        </div>
        <!-- <button v-on:click="mainViewComponent='NewsView'">뉴스뷰로 체인지</button> -->
    </div>
      
</template>





<script>
import NewsList from './news/NewsList.vue';
import BottomComp from "../BottomItem.vue"
import NewsView from "../main/news/NewsDetailView.vue";
import common from '@/js/common';
import WriteNewsVue from '../members/reporter/WriteNews.vue';
import FindNewsVue from '../main/news/FindNews.vue';


export default {
    name: "MainComponent",
    components: {
    DefaultNewsList: NewsList,
    BottomComp,
    NewsView,
    WriteNewsVue,
    FindNewsVue
    },
    created(){
        this.getNewsList();
        
    },
    
    mounted(){
        common.EventBus.$on("write", ()=>{
            this.mainViewComponent = 'WriteNewsVue';
            this.getNewsList();
        });
        
        common.EventBus.$on("search", ()=>{
            this.mainViewComponent = "FindNewsVue"; 

        });

        common.EventBus.$on("ranking", ()=>{

        });

        common.EventBus.$on("myPage", ()=>{

        });

        common.EventBus.$on("record", ()=>{

        });

        common.EventBus.$on("newsList", ()=>{
            this.mainViewComponent = 'DefaultNewsList';
            this.getNewsList();
        });

        common.EventBus.$on("newsView", (data) => {
            this.newsViewData = data;
            this.mainViewComponent = 'NewsView';
        })

    },
    data() {
        let newsList = [];

        var div = 'record';
        let session = JSON.parse(sessionStorage.getItem("member"));
        if(session != null &&session.userType != undefined && session.userType != null && session.userType == 'REPORTER'){
            div = 'write'
        }   

        let BottomItems = [
            {href:'icon/home.png', type:'newsList'},
            {href:'icon/search.png',type:'search'},
            {href:'icon/ranking.png', type:'ranking'},
            {href:'icon/'+div+'.png', type:div},
            {href:"icon/myPage.png", type:'myPage'}
        ];

        let newsViewData={};

        return {
            newsList,
            BottomItems,
            newsViewData,
            mainViewComponent: "DefaultNewsList"
        }
    },
    methods: {
        bindIcon(icon) {
            return require("@/assets/"+icon);
        },
        getNewsList(){
            
            common.http.get('/news/selectNewsList')
                        .then((res) => {
                            this.newsList = [];
                            res.data.result.forEach((it)=>{
                                var json = {};
                                json.id = it.id;
                                json.title =it.title;
                                json.hits = it.hits;
                                this.newsList.push(json);
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
            
            /*
          this.newsList = [{id:1, title: '제목입니당'},
                    {id:2, title: '제목입니당2'},
                    {id:3, title: '제목입니당3'},
                    {id:4, title: '제목입니당4'},
                    {id:5, title: '제목입니당5'},
                    {id:6, title: '제목입니당6'},
                    {id:7, title: '제목입니당7'},
                    {id:8, title: '제목입니당8'},
                    {id:9, title: '제목입니당9'},
                    {id:10, title: '제목입니당10'}
            ];*/
        }
    }
    
}

</script>
<style>
    .newsWrap{height:700px;overflow-y:scroll;overflow-x:hidden;}
    .botmComp{height:100px;background:#ffe9c02e;}
    .botmComp ul{list-style-type: none;padding:0px;}
    .botmComp ul li{width:20%;display:inline-block;margin-top: 2%;}
    .botmComp img{width:25%}
</style>