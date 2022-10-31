<template>
   <div>
       <h3>이게뭐야아ㅏ아</h3>
     {{jsonData}}   
     <Viewer v-if="jsonData != null" :initialValue="content" />
    </div>    
    <!--
    <div class="editors">
        {{jsonData}}
        <Viewer v-if="contents != null" :initialValue="content" />
        
    </div>
 -->
</template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
<style>
</style>
<script>
    import {Viewer} from '@toast-ui/vue-editor';
    import '@toast-ui/editor/dist/toastui-editor.css'


    export default {
        components: {
           Viewer
        },
        methods: {
        
        },
        props : {
            jsonData : {require:true}
        },
        mounted(){
          console.log(this.jsonData);
        },
        data(){
            console.log(this.jsonData);
           return {
               contents : "테스트 컨텐츠"
           }
        }
    } 
</script>