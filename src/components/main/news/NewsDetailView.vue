<template>
    <div>
        {{NewsView.title}}
        <Viewer v-bind:jsonData="jsonData"  style="margin-top:30px;text-align: left;" />
    </div>
    




</template>


<script>
//import common from "@/js/common";
import Viewer from "@/components/editor/ViewerComp.vue";

export default {
    components: {
            Viewer
    },
    props: {
        NewsView: {require:true}
    },
    data(){
        let jsonData = {
            newsId : this.NewsView.newsId,
            title : this.NewsView.title,
            contents : this.NewsView.contents,
            author : this.NewsView.author
        };
        console.log(jsonData);
       return jsonData
    }
}
</script>
