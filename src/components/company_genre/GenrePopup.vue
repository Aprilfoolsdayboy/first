<template>
    <div class="popup_wrap">
        <div class="popup">
            <h2>장르 정보 {{ type }}</h2>
            <input type="text" placeholder="장르명" v-model="name">
            <p>{{ errMsg }}</p>
            <button @click="saveInfo()">저장</button>
            <button @click="cancel()">취소</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import { it } from 'node:test'
    export default{
        name:"GenrePopup",
        props:{
            mode:String,
            genre: Object
        },
        data() {
            return{
                seq:"",
                name:"",
                errMsg:"",
                type:""
            }
        },
        mounted(){
            console.log(this.genre)
            if(this.genre != null && this.genre != undefined){
                this.type="수정"; this.seq = this.genre.genreSeq
                this.name = this.genre.genreName
            }
            else{
                this.type = "추가"
                this.seq = null; this.name="";
            }
        },
        methods:{
            saveInfo() {
                let url = ""
                let reqMethod = ""
                if(this.mode == "add"){ url = "/api/genre/add?name="+this.name; reqMethod="put"}
                if(this.mode == "update"){ url = "/api/genre/update?name="+this.name+"&no="+this.seq; reqMethod="patch"}
                // this.$http.put("/api/genre/add?name="+ this.name)
                this.$http({
                    method:reqMethod,
                    url:url
                })
                .then((r) => {
                    if(r.data.status){
                        alert("장르 정보를 "+this.type+" 하였습니다.")
                        location.reload() // 새로고침(F5)
                        // this.$emit("dataSaveComplete")
                    }
                    else{
                        this.errMsg = r.data.message
                    }
                })
            },
            cancel(){
                if(!confirm("취소 하시겠습니까?\n 입력된 정보는 사라집니다.")) return
                // 부모 컴포넌트에 closePop 이벤트가 발생하였음을 알림.
                this.$emit("closePopup")
            }
        }
    }
</script>
<style>
    .popup_wrap {
        position: fixed; width: 100vw; height: 100vh;
        left: 0; top: 0; z-index: 9999; background-color: #ffffff70;
    }
    .popup{
        position: absolute; left: 50%;
        top: 50%;
        margin-left: -150px; margin-top: -130px;
        background-color: #ffdada;
        padding: 30px;
    }
</style>