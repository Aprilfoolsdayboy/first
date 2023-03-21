<template>
    <div class="popup_wrap">
        <div class="popup">
            <h2>{{title}} 정보 {{ type }}</h2>
            <input type="text" placeholder="기획사명" v-model="name">
            <p>{{ errMsg }}</p>
            <button @click="saveInfo()">저장</button>
            <button @click="cancel()">취소</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"CompanyGenrePopup",
    props:{
        mode:String,
        data : Object,
        title:String,
        apiUrl:String
    },
    data() {
        return{
            seq:"",
            name:"",
            errMsg:"",
            type:""
        }
    },
    mounted() {
        if(this.data != null && this.data != undefined) {
            this.type = "수정"
            this.seq = this.data.seq;
            this.name = this.data.name
        }
        else {
            this.seq = null ;
            this.type = "추가"
        }
    },
    methods:{
        saveInfo() {
            let url = "";
            let reqMethod = ""
            let token = sessionStorage.getItem('userToken')
            if(this.mode == "add") {url = `${this.apiUrl}${this.name}`; reqMethod ="put"}
            if(this.mode == "update") {url = `${this.apiUrl}/${this.seq}/${this.name}`; reqMethod = "patch"}
            // this.$http.put("/api/genre/add?name="+this.name)
            this.$http({
                method:reqMethod,url:url,
                headers:{
                      Authorization : `Bearer ${token}`
                  }
            })
            .then((r) =>{
                if(r.data.status) {
                    alert(this.title+ "정보를 "+this.type+"하였습니다.")
                    // this.$emit("dataSaveComplete")
                    location.reload(); // 새로고침
                }
                else {
                    this.errMsg = r.data.message
                }
            })
        },
        cancel() {
            if(!confirm("취소하시겠습니까 \n 입력된 정보는 사라집니다.")) return
            // 부모 컴포넌트쪽에 closePopup 이벤트가 발생했음을 알림
            this.$emit('closePopup');
    }
    }
}
</script>
<style>
.popup_wrap {
  position: fixed; width: 100vw; height: 100vh;
  left: 0; top: 0; z-index: 9999; background-color: rgba(240, 248, 255, 0.836);
}
.popup {
  position: absolute; left: 50%;
  top: 50%;
  margin-left: -150px; margin-top: -130px;
  background-color:coral;
  padding: 35px;
}
</style>