<template>
    <div class="login_box">
        <h1>Admin Login</h1>
        <p>Admin Id <span>(관리자 아이디)</span></p>
        <input type="text" v-model="id">
        <p>Admin Pwd <span>(관리자 비밀번호)</span></p>
        <input type="password" v-model="pwd">
        <button @click="$event => login()">로그인</button>

    </div>
</template>
<script>
    export default{
        name: 'LoginView',
        data(){
            return {id:"",pwd:""}
        },
          beforeCreate() {
        if(sessionStorage.getItem('userToken') != ''&& sessionStorage.getItem('userToken') != null) {
            // alert("로그인이 필요합니다.")
            location.href="/main"
        }
      },
        methods:{
            login(){
                // alert(`아이디: ${this.id}/ 비밀번호 ${this.pwd}`) // 요기 쓴 거는 ' 아니고 `
                this.$http.post("/api/admin/login",{
                        "id":this.id, "pwd":this.pwd
                    }
                    )
                    .then((r)=>{
                        // 로그인 성공
                        // this.$userToken = r.data.token.accessToken
                        // console.log(this.$userToken)
                        sessionStorage.setItem("userToken", r.data.token.accessToken)
                        // 사용자 상세정보 요청
                        this.$http.get("/api/admin/details/"+this.id,
                        {
                            // 발급받은 토큰 설정
                            headers : {
                                Authorization : `Bearer ${r.data.token.accessToken}`
                            }
                        }).then((info) =>{
                            // 세션에 사용자 정보 기록
                            sessionStorage.setItem("userinfo",JSON.stringify(info.data))
                            location.href="/main"
                        })

                })
                .catch((e) => {
                    //로그인 실패
                    alert(e.response.data.message)
                })
            }
        }
    }
</script>
<style scoped>
    .login_wrap {
        /* background-color:#f1f1f1; */
        background: radial-gradient(ellipse at center,  rgba(255,255,255,1) 0%,rgb(237, 237, 237) 51%,rgba(255,255,255,1) 100%);
        width: 100vw; height: 100vh;
        position: relative;
    }
    .login_box {
        background: #fff;
        position: absolute; padding:50px; width:300px;
        border-radius:5px; left: 50%; top: 50%; margin-left: -200px;
        margin-top: -280px; box-shadow:0 0 10px rgba(0,0,0,0.05)
    }
    .login_box h1 {
        font-family: 'Roboto';
        font-size: 36px; margin-left:-5px;
        margin-bottom: 20px; color: #333;
    }
    .login_box input {
        width: 100%;
        border: 0; border-bottom: 1px solid #ddd; font-size: 20px;
        padding:5px 10px; box-sizing: border-box; font-weight: 100;
    }
    .login_box button {
        border: 0; width: 100%; height: 55px; margin-top: 40px;
        font-size: 16px; font-weight: 300; cursor:pointer;
        border-radius: 5px; background-color: #434343; color: #fafafa;
    }
    .login_box p {
        font-size: 22px; font-family: 'Roboto'; font-weight: 300;
        color: #333; padding:20px 0;
    }
    .login_box p:nth-of-type(2) {
        margin-top: 20px;
    }
    .login_box p span {
        font-family: 'Noto Sans KR'; font-size: 14px; font-weight: 300;
    }
</style>