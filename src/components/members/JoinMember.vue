<template>
    <div class="form">
        <h1>Join us</h1>
        <div class="inputDiv">
            <p>
                <label for="loginId">아이디</label>
                <input type="text" name="loginId" v-model="loginId"  id="loginId">
            </p>
            <p>
                <label for="nickname">닉네임</label>
                <input type="text" name="nickname" v-model="nickname" id="nickname">
            </p>
            <p>
                <label for="password">비밀번호</label>
                <input type="password" name="password" v-model="password" id="password">
            </p>
            <p>
                <label for="password2">비밀번호 확인</label>
                <input type="password" name="password2" id="password2">
            </p>
            <p>
                <label for="" id="userTypeLbl">타입 선택</label>
                <span v-for="item in inputs" :key="item.type" class="radioBtn" >
                    <input type="radio" name="userType" id="userType" :value="item.type" v-model="userType" >  
                    <label for="userType" id="userTypeLbl" >{{item.typeName}}</label>
                </span>
            </p>
            <button style="border-radius: 40% 56%;" @click="backMain();" >Home</button>
            <button style="margin-right:0px;border-radius: 56% 40%;" @click="joinMember();" >Join Us</button>
        </div>
    </div>
    
</template>

<style scoped>
    .form{height:800px;text-align: center;}
    .form .inputDiv p{margin:2em 0 2em 0}
    .form h1{font-family: Cafe24Ssurround;}
    .form .inputDiv label{margin-right: 20px;font-size: 20px;font-family: Cafe24Ssurround;}
    .form .inputDiv input[type=text]{height: 30px;float:right; width:200px}
    .form .inputDiv input[type=password]{height: 30px;float:right; width:200px}
    .form .inputDiv .radioBtn{float: right;}
    input[type=radio]{height: 25px;width:30%}
    .inputDiv{width:350px;display: inline-block;}
    .radioBtn label{float: right;}
    .form .inputDiv button{width:100px;margin:60px 50px 0 0;heighT:50px;background: cornflowerblue;border:none;cursor: pointer;font-size:25px;}
    
    @font-face {
            font-family: 'Cafe24Ssurround';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
            font-weight: normal;
            font-style: normal;
    }
</style>
<script>
import common from "@/js/common";

export default {
    name: 'JoinMember',
    created() {
        this.getRadioEl();
    },
    data(){
       var InputList =[];
        return {
            inputs: InputList,
            loginId : '',
            password: '',
            nickname: '',
            userType: ''
        }
    },
    methods: {
        //라디오 요소 조회
        getRadioEl(){
            common.get("/member/memberType")
                        .then((res)=>{
                            var arr = res.data;
                            for(var i=0;i<arr.length;i++){
                                this.inputs.push({'type': arr[i].userType, 'typeName': arr[i].typeName});
                            }

                        })
                        .catch((err)=>{
                            console.log(err);
                        });

        },
        joinMember(){
            this.validate();

            let members = {};

            var password = document.getElementById('password').value;
            var checkPassword = document.getElementById('password2').value;

            if(password != checkPassword){
                document.getElementById('password2').value = "";
                return false;
            }

            members.loginId = this.loginId;
            members.password = this.password
            members.nickname = this.nickname;
            members.userType = this.userType;

            common.http.post('/member/join-user',JSON.stringify(members))
                    .then((res)=>{
                        if(res.data.result){
                            alert('가입 완료되었습니다.');
                            //메인으로 가기
                            common.EventBus.$emit('main');
                        }else{
                            console.log(res.data);
                            alert('회원등록이 실패했습니다. 다시 시도해주세요.');
                        }
                    })
            

            //가입처리 후에는  common.EventBus.$emit('main');

        },
        backMain(){
            common.EventBus.$emit('main');
        },
        validate(){
            if(this.loginId == '' || this.password == '' || this.nickname == '' || this.userType ==''){
                alert('입력하지 않은 필드가 있습니다.')
                return false;
            }
            
        }

    }
}
</script>