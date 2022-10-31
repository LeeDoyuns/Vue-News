<template>
    
    <div class="editors">
        <Viewer v-if="contents != null" :initialValue="contents" />
    </div>
 
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
            param : {require:true}
        }
        ,
        mounted(){
          //console.log(this.param);
        },
        data(){
           console.log();
           return {
               contents : this.param.contents
           }
        }
    } 
</script>