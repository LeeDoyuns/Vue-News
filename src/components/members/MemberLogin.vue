<template>
    <div class="loginWrap">
        <h1 style="font-family:Cafe24Ssurround">Login</h1>
        <p>
            <label for="loginId">ID</label>
            <input type="text" name="" id="" v-model="loginId">
        </p>
        <p>
            <label for="password">Password</label>
            <input type="password" name="" id="" v-model="password">
        </p>

        <button style="border-radius: 40% 56%;" @click="login();" >로그인</button>
        

    </div>
</template>

<style>
    @font-face {
            font-family: 'Cafe24Ssurround';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
            font-weight: normal;
            font-style: normal;
    }
    .loginWrap input[type=text]{height: 30px;float:right; width:200px}
    .loginWrap input[type=password]{height: 30px;float:right; width:200px}
    .loginWrap{width:390px;display: inline-block;height: 500px;}
    .loginWrap label{margin-right: 20px;font-size: 20px;font-family: Cafe24Ssurround;}
    .loginWrap p{margin: 20px 0px 40px 0px;}
    .loginWrap button{width:100px;margin:60px 50px 0 0;heighT:50px;background: cornflowerblue;border:none;cursor: pointer;font-size:25px;}
</style>

<script>
import common from "@/js/common";

export default {
    data(){
        return {
            loginId : '',
            password : ''
        }
            

    },
    methods: {
        login(){
            if(this.loginId == '' || this.password == ''){
                alert('로그인 정보를 입력하세요.');
                return false;
            }
            let login = {};
           /* login.id = 3;
            login.nickname = '기자1';
            login.userType = 'REPORTER';


            sessionStorage.setItem("member",JSON.stringify(login));
            common.EventBus.$emit('main');
            common.EventBus.$emit('loginHeader');*/
            login.loginId = this.loginId;
            login.password = this.password;


            
            common.http.post('/member/login', login)
                    .then((res)=>{
                        let result = res.data.result;
                        sessionStorage.setItem("member",JSON.stringify(result));

                        common.EventBus.$emit('main');
                        common.EventBus.$emit('loginHeader');
                    })
                    .catch((err)=>{
                        alert(err.response.data.message);
                    })
            


        }
    }
}
</script>