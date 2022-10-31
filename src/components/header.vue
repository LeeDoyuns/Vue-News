<template>
    <div>
        <h1>NewsTogether</h1>
        <img src="../assets/icon/login.png" alt="로그인"  v-on:click="loginView();" v-show="beforeLogin" class="headerIcon"/>
        <img src="../assets/icon/join.png" alt="회원가입" v-on:click="joinView();" v-show="beforeLogin"  class="headerIcon"/>
        <img src="../assets/icon/logout.png" alt="logout" v-on:click="logout();" v-show="afterLogin"  class="headerIcon"/>
        <img src="../assets/icon/home.png" alt="Home" v-on:click="moveMain();" v-show="afterLogin"  class="headerIcon"/>

        <input type="text" v-model="nickname" class="hideBorder"  v-show="afterLogin"/>
    </div>
</template>

<script>
import common from "@/js/common";

export default {
    name : 'HeaderComp',
    methods: {
        loginView(){
            common.EventBus.$emit('login');
        },
        joinView(){
            common.EventBus.$emit('join');
        },
        moveMain(){
            common.EventBus.$emit('newsList');
        },
        logout(){
            sessionStorage.removeItem('member');
            this.afterLogin = false;
            this.beforeLogin = true;
            common.EventBus.$emit('main');
        }
    },
    mounted(){
        common.EventBus.$on('loginHeader',()=>{
            var session = JSON.parse(sessionStorage.getItem("member"));
            if(session.id != null){
                this.afterLogin = true;
                this.beforeLogin = false;
                this.nickname = "어서오세요 "+session.nickname+" 님";
            }
        });
     
    },
    data(){
        return {
            afterLogin : false,
            beforeLogin : true,
            nickname : ''
        }
    }

}


</script>
<style scoped>
    div{width:100%;background:cyan;z-index: 5;height:90px;padding-top:25px;}
    h1{margin: 0 0 20px 0px;}
    .headerIcon{width:3%;float:right;margin-right: 30px;cursor: pointer;}
    .hideBorder{border: none;background: none;display:inline-block;width: 50%;text-align: center;}
</style>