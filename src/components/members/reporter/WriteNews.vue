<template>
    <div>
        <h1>register news</h1>
        <div class="editor-warp">
                    <input type="text" name="" id="" v-model="newsTitle" placeholder="기사 제목을 입력하세요.">
                    <label for="category"> 카테고리 </label>
                    <select v-model="category" id="">
                        <option v-for="item in categoryList" :value="item.type" :key="item.type" id="category">{{item.name}}</option>
                    </select>
                    <br />
                    <label for="category"> 게시일자 </label>
                    <datetime format="YYYY-MM-DD h:i:s" width="80%" class="datepicker" v-model="postingDateTime">

                    </datetime>
                    <EditorComp ref="editor" style="margin-top:30px;text-align: left;" />
                    <button @click="writeNews();" class="newsSaveBtn">등록</button>


        </div>
    </div>
        

</template>
<style>
    input[type=text]{width:96%;height:30px;text-align: center;display: block;}
    label{margin-top:20px;}
    select{width:80%;height:30px;margin-top:20px;text-align: center;}
    .editor-warp{height:900px;}
    .newsSaveBtn{float:right; padding:10px;margin-top:10px;}
    .datepicker{display: inline-block;height: 30px;margin-top: 30px;}
</style>
<script>
    
    /* editor */
    import EditorComp from "@/components/editor/EditorComp.vue";
    import common from "@/js/common";
    import datetime from 'vuejs-datetimepicker';


    export default {
        components: {
            EditorComp,
            datetime
        },
        name: 'writeNews',
        methods: {
            writeNews(){
                let content = this.$refs.editor.getContent();
                let param = {};
                param.title = this.newsTitle;
                param.category = this.category;
                param.postingTime = this.postingDateTime;
                param.newsStatus = 'POSTING'    //이거 연주씨가 정의해야함
                param.contents = content;
                param.imgIdArr = this.imgArr;
                var session = JSON.parse(sessionStorage.getItem("member"));
                param.reporterId = session.id;

                console.log(param);

                common.http.post('/news/createNews',JSON.stringify(param))      
                    .then((res) => {
                        if(res.status == 200){
                            alert('등록되었습니다.');
                            common.EventBus.$emit('newsList');
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        },
        data(){
            let imgArr=[];
            let categoryList = [
                {type: 'social', name:'사회'},
                {type: 'economic', name:'경제'},
                {type: 'sports', name:'스포츠'},
                {type: 'entertainment', name:'연예'},
                {type: 'science', name:'과학'}
            ];
            //let now = new Date().now();
            return {
                newsTitle : '',
                imgArr,
                categoryList,
                postingDateTime: null,
                category:''
            }
        },
        mounted(){
            common.EventBus.$on('imgIdArr', (imgIdArr) => { 
                if(imgIdArr == undefined){
                    imgIdArr=[];
                }
                this.imgArr = imgIdArr;
            });
        }
    } 

</script>