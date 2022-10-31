<template>
  <div id="app">
    <HeaderComponent :nickname="nickname" />
    <component v-bind:is="curComponent">
      <h1>default MainComponent</h1>
    </component>
  </div>
</template>

<script>
//import uniqueId from "lodash.uniqueid"


import MainComponent from "./components/main/MainComponent.vue";
import LoginComponent from "./components/members/MemberLogin.vue";
import HeaderComponent from "./components/header.vue";
import JoinComponent from "./components/members/JoinMember.vue"
import common from "@/js/common";



export default {
  name: 'App',
  components: {
    mainComp: MainComponent,
    LoginComponent,
    HeaderComponent,
    JoinComponent
},
  data(){
  /*  var ToDoItems;
    ToDoItems = [
        {id: uniqueId('todo-'), label: 'david', done: true},
        {id: uniqueId('todo-'), label: 'lengi', done: false},
        {id: uniqueId('todo-'), label: 'han', done: true},
        {id: uniqueId('todo-'), label: 'greck', done: false},
        {id: uniqueId('todo-'), label: 'joris', done: true},
        {id: uniqueId('todo-'), label: 'brown', done: false},
        {id: uniqueId('todo-'), label: 'gloria', done: false}
      ];*/
      if(sessionStorage.getItem('id') != null && sessionStorage.getItem('id') != undefined){
        common.http.get('/test')
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    

    return {
      //ToDoItems,
      curComponent: 'mainComp',
      nickname: ''
    }
  },
  methods: {
    bindIcon(icon) {
      return require("@/assets/"+icon);
    }
  },
  //이벤트 버스 수신
  mounted(){
    common.EventBus.$on('login', ()=>{
        this.curComponent = 'LoginComponent';
    });
    common.EventBus.$on('join',()=>{
      this.curComponent = 'JoinComponent';
    });
    common.EventBus.$on('main',()=>{
      this.curComponent = 'mainComp';
    });
    let session = JSON.parse(sessionStorage.getItem("member"));

    if(session != null){
      common.EventBus.$emit('loginHeader');
      this.nickname = session.nickname;
    }
  },
  created(){
    common.EventBus.$emit('loginHeader');
    let session = JSON.parse(sessionStorage.getItem("member"));

    if(session != null){
      this.nickname = session.nickname;
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:inline-block;
  width:1000px;
  border:1px solid black;
  z-index: 1;
}
ul{list-style:none;}
body{text-align: center;background:#ffe9c02e;}
.main{min-height: 600px;}
</style>
