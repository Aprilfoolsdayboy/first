<template>
    <div class="popup_wrap">
        <div class="popup">
            <h1>그룹 검색</h1>
            <div class="search_area">
                <input type="text" v-model="keyword">
                <button @click="search">검색</button>
            </div>
                <div class="list">
                    <button v-for="group in list" :key="group.agiSeq" :data-seq="group.agiSeq"
                     @click="selectGroup">{{ group.agiName }}</button>
                </div>
                <div class="pager_area">
                    <button  class="pager" :class="{'current' : currentPage == p-1}"
                    v-for="p in totalPage" :key="p" @click="pagerClick(p-1)">{{ p }}</button>
                </div>
                <button id="close" @click="closePopup">&times;</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GroupSearchPopup",
        data() {
            return {
                keyword:"", list: null, currentPage:0 ,totalPage:0
            }
        },
        created() {
            this.loadGroups()
        },
        watch: {
            currentPage() {this.loadGroups()}
        },
        methods :{
            closePopup() {
                this.$emit("closeCompanyPopup")
            },
            loadGroups() {
                const token = sessionStorage.getItem("userToken")
                this.$http.get("api/artist/group/list",{
                    headers : {
                        Authorization: `Bearer ${token}`
                    }, 
                    params: {page:this.currentPage, keyword:this.keyword }
                })
                .then((r) => {
                    this.list = r.data.list
                    this.currentPage = r.data.currentPage;
                    this.totalPage = r.data.totalPage;
                    // console.log(r.data.list)
                })
            },
            pagerClick(page) {
              this.currentPage = page;
              this.loadGroups();
          },
              search() {
              this.currentPage = 0;
              this.loadGroups();
          },
          selectGroup(e) {
            // console.log(e.target.attributes['data-seq'].value)
            // console.log(e.target.innerHTML)
            // 부모 컴포넌트(vue)에 onSelectCompany 이름의 이벤트 전달
            this.$emit("onSelectGroup",e.target.attributes['data-seq'].value,e.target.innerHTML)
          }
        }
    }
</script>
<style scoped>
.search_area{position: static;}
.list button{display: block; width: 100%;}
</style>