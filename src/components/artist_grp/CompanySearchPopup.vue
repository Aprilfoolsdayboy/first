<template>
    <div class="popup_wrap">
        <div class="popup">
            <h1>소속사 검색</h1>
            <div class="search_area">
                <input type="text" v-model="keyword">
                <button @click="search">검색</button>
            </div>
                <div class="list">
                    <button v-for="company in list" :key="company.seq" :data-seq="company.seq"
                     @click="selectCompany">{{ company.name }}</button>
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
        name: "CompanySearchPopup",
        data() {
            return {
                keyword:"", list: null, currentPage:0 ,totalPage:0
            }
        },
        created() {
            this.loadCompanies()
        },
        watch: {
            currentPage() {this.loadCompanies()}
        },
        methods :{
            closePopup() {
                this.$emit("closeCompanyPopup")
            },
            loadCompanies() {
                const token = sessionStorage.getItem("userToken")
                this.$http.get("/api/company/list",{
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
              this.loadCompanies();
          },
              search() {
              this.currentPage = 0;
              this.loadCompanies();
          },
          selectCompany(e) {
            // console.log(e.target.attributes['data-seq'].value)
            // console.log(e.target.innerHTML)
            // 부모 컴포넌트(vue)에 onSelectCompany 이름의 이벤트 전달
            this.$emit("onSelectCompany",e.target.attributes['data-seq'].value,e.target.innerHTML)
          }
        }
    }
</script>
<style scoped>
.search_area{position: static;}
.list button{display: block; width: 100%;}
</style>