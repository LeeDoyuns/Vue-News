<template>
    <div class="editors">
        <Editor
            ref="toastEditor"
            initialEditType="wysiwyg"
            height="700px"
            previewStyle="vertial"
            widht="70%">
        </Editor>
        
    </div>
    

</template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
<style>
</style>
<script>
    import {Editor} from '@toast-ui/vue-editor';
    import '@toast-ui/editor/dist/toastui-editor.css'
    import common from "@/js/common";


    export default {
        components: {
            Editor
        },
        methods: {
            getContent(){
                common.EventBus.$emit('imgIdArr',this.imgIdArr);
                return this.$refs.toastEditor.invoke('getMarkdown');
            },
            setContent(content){
                this.$refs.toastEditor.invoke('setMarkdown',content);
            }
        },
        mounted(){
            const instance = this.$refs.toastEditor;
            instance.invoke("addHook", "addImageBlobHook", async (file, callback) => {

                let formData = new FormData();
                formData.append("files", file);

                const axios = common.axios.create({
                    headers:{
                    } ,
                    baseURL: 'http://localhost:9081/api'
                });

                var session = JSON.parse(sessionStorage.getItem("member"));
                formData.append("member", JSON.stringify(session));
                
                await axios.post('/news/saveNewsImage', formData)
                                .then((res) =>{
                                    callback(res.data.url) //이미지를 서버로 업로드 후 보여줄 url입력
                                    if(this.imgIdArr == undefined){
                                        this.imgIdArr = [];
                                    }
                                    this.imgIdArr.push(res.data.id)
                                })
                                .catch((err) => {
                                    console.log(err);
                                }); 
            });
        },
        data(){
            let imgIdArr = [];
            return imgIdArr
        }
    } 
</script>