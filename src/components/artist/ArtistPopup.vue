<template>
    <div class="popup_wrap">
        <div class="popup">
            <h2>아티스트 {{ mode }}</h2>
            <div class="img_side">
                <div class="img" style="width: 320px; height: 180px; border: 1px solid #000;"  ref="imgbox">
                    <img src="" id="preview">
                 </div>
                 <input type="file" accept="image/*" @change="imageChange">
            </div>
            <div class="content_side"> 
                <p>아티스트 명</p>
                <input type="text" v-model="name">
                <p>탄생년도</p>
                <input type="number" min="1000" max="2100" v-model="bitrh">
                <p>소속그룹</p>
                <input type="text" v-model="group" hidden>
                <p @click="openGroupPopup()">{{ groupName == null?'선택된 그룹 없음':groupName}}</p>
            </div>
            <button v-if="mode == '추가'" @click="save()">저장</button> 
            <button v-if="mode == '수정'" @click="update()">수정</button> 
            <button id="close" @click="close">&times;</button>
        </div>
        <GroupSearchPopup @onSelectGroup="onSelectGroup" v-if="grouppopup" @closeGroupPopup="closeGroupPopup"/>
    </div>
</template>
<style scoped>
.img{border: 1px solid#ccc; box-sizing: border-box; background-repeat: no-repeat; }
</style>

<script>
// 자식에서 부모에게로 데이터 전송해야합니다.
import GroupSearchPopup from './GroupSearchPopup.vue'
    export default {
        name: "ArtistPopup",
        props: {mode:String, grpInfo:Object, artistInfo:Object},
        components:{GroupSearchPopup},
        data() {return {
                imgData:null, name:"", bitrh:"", group:"", grouppopup:false , groupName:null
             }
          },
          watch:{
            // grpInfo에 데이터가 변경이 있을 때
            artistInfo() {
                // 실행
                console.log(this.artistInfo)
                this.name = this.artistInfo.name
                this.group = this.artistInfo.group.agiSeq
                this.groupName = this.artistInfo.group.agiName
                this.bitrh = this.artistInfo.birthYear
                const imgbox = this.$refs.imgbox
                imgbox.style.backgroundImage = `url('http://localhost:8585/images/artist/${this.artistInfo.imgFile}')`
                 imgbox.style.backgroundSize = '100% auto'
                imgbox.style.backgroundPosition = 'center'
            }
          },
          mounted () {
            if(this.artistInfo != null) {
                  console.log(this.artistInfo)
                this.name = this.artistInfo.name
                this.group = this.artistInfo.group.agiSeq
                this.groupName = this.artistInfo.group.agiName
                this.bitrh = this.artistInfo.birthYear
                const imgbox = this.$refs.imgbox
                imgbox.style.backgroundImage = `url('http://localhost:8585/images/artist/${this.artistInfo.imgFile}')`
                 imgbox.style.backgroundSize = '100% auto'
                imgbox.style.backgroundPosition = 'center'
            }
          },
        methods: {
            update() {
            const formdata = new FormData()
            formdata.append("artNo", this.artistInfo.no)
            formdata.append("artName", this.name)
            formdata.append("birthYear", this.bitrh)
            formdata.append("grpNo", this.group)
            formdata.append("img", this.imgData)

            console.log(formdata.get("artNo"))
            // console.log(formdata.get("name"))
            // console.log(formdata.get("debutYear"))
            // console.log(formdata.get("company"))
            // console.log(formdata.get("img"))
            this.$http.patch("api/artist/info", formdata, {
                headers:
                    {
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    }
            })
            .then((r)=>{
                console.log(r)
                if(r.data.status){
                    alert("아티스트 정보가 수정되었습니다.")
                    location.reload() //새로고침
                }
                else{
                    alert(r.data.message)
                }   
            })
            .catch((e) => {
                alert("그룹 정보 수정 작업중 오류가 발생했습니다.")
            })

            },
             close() {
                if(!confirm("입력을 취소하시겠습니까?\n입력된 정보는 사라집니다.")) return
                this.$emit("closeArtistPopup")
            },
            closeGroupPopup() {
                this.grouppopup = false
            },
            openGroupPopup() {
                this.grouppopup = true
            },
            onSelectGroup(seq, name) {
                this.groupName = name
                this.group = seq
                this.grouppopup = false
            },
            imageChange(event) { // file input의 선택 파일이 변경되었을 때 실행
                const imgbox = this.$refs.imgbox // imgbox ref를 가진 div
                if(event.target.files && event.target.files[0]) { // 파일이 있는지 검사
                    const reader = new FileReader() // 파일을 읽어들이는 역할을 하는 클래스
                    // reader.onload((e) => {
                    //     imgbox.style.backgroundImage = e.target.result
                    // })
                    reader.addEventListener("load", function(e){
                        // 이미지 로드가 완료되었을 때 
                        imgbox.style.backgroundImage = `url('${e.target.result}')`
                        // 배경이미지를 설정하고
                        imgbox.style.backgroundSize = '100% auto'
                        // 크기를 설정하고
                        imgbox.style.backgroundPosition = 'center'
                        // 가운데로

                    })
                    // 이미지 로드 명령 내리기
                    this.imgData = event.target.files[0]
                    reader.readAsDataURL(event.target.files[0])
                }
                else{
                    // 선택된 파일이 없으면 이미지 초기화
                      this.imgData = imgbox.style.backgroundImage = ""
                }
            },
            save() {
            const formdata = new FormData()
            formdata.append("artName", this.name)
            formdata.append("birthYear", this.bitrh)
            formdata.append("grpNo", this.group)
            formdata.append("img", this.imgData)
            this.$http.put("api/artist/info", formdata, {
                headers:
                    {
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    }
            })
            .then((r)=>{
                console.log(r)
                if(r.data.status){
                    alert("아티스트 정보가 저장되었습니다.")
                    location.reload() //새로고침
                }
                else{
                    alert(r.data.message)
                }   
            })
            .catch((e) => {
                alert("아티스트 정보 추가 작업중 오류가 발생했습니다.")
            })
            }
        },

    }
</script>