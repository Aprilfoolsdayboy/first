<template>
    <div class="popup_wrap">
        <div class="popup">
            <h2>기획사정보 추가</h2>
            <input type="text" placeholder="기획사 명" v-model="name">
            <p>{{ errMsg }}</p>
            <button @click="saveInfo()">저장</button>
            <button @click="cancel()">취소</button>
        </div>
    </div>
</template>
<script>
    export default {
        name:"CompanyPopup",
        props:{
            mode: String,
            company: Object
        },
        data() {
            return {
                seq:"",
                name:"",
                errMsg:"",
                type:""
            }
        },
        mounted() {
            // alert(this.mode);
            if(this.company != null && this.company != undefined) {
                this.type = "수정";
                this.seq = this.company.seq;
                this.name = this.company.name;
            } else {
                this.type = "추가";
                console.log("else")
                this.seq = null;
                this.name = "";
            }
        },
        methods:{
            saveInfo() {
                let url = "";
                let reqMethod = "";
                if(this.mode == "add") {url = "/api/company/add?name="+this.name; reqMethod = "put"}
                if(this.mode == "update") {url = "/api/company/update?name="+this.name+"&no"+this.seq; reqMethod = "patch"}
                // this.$http.put("/api/genre/add?name="+this.name)
                this.$http ({method:reqMethod,url:url})
                .then((r) => {
                    if(r.data.status) {
                        alert("기획사 정보를 추가하였습니다.")
                        location.reload(); // 새로고침 (F5)
                    }
                    else {
                        this.errMsg = r.data.message;
                    }
                })
            },
            cancel() {
                if(!confirm("취소 하시겠습니까?\n입력된 정보는 사라집니다.")) return;
                // 부모 컴포넌트에 closePopup 이벤트가 발생했음을 알림.
                this.$emit('closePopup');
            }
        }
    }
</script>
<style>
    .popup_wrap {
        position: fixed; width: 100vw; height: 100vh;
        left: 0; top: 0; z-index: 9999; background-color:#55555570;
    }
    .popup {
        position: absolute; left: 50%; top: 50%; margin-left: -150px; margin-top: -130px;
        background-color: #fff; padding:30px;
    }
</style>