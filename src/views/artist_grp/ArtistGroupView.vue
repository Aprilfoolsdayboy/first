<template>
    <!-- .view_wrap>((#list_area>table)+.search_area+.pager_area) -->
    <div class="view_wrap">
        <h1>아티스트 그룹 관리</h1>
        <div id="list_area">
            <table>
                <thead>
                    <tr>
                        <th>번호</th><th>대표이미지</th><th>그룹명</th><th>데뷔연도</th><th>기획사</th><th>번호</th>
                        <th>
                            <button @click="add()">그룹 추가</button>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="grp in list" :key="grp.agiSeq" >
                            <td>{{ grp.agiSeq }}</td>
                            <td style="width: :250px;">
                                <div style="width: 210px; height: 100px; display: inline-block; background-size: 105% auto; background-position: center;"
                                    :style="{'background-image':'url(http://localhost:8585/images/artist_group/'+grp.agiImg+')'}">
                                </div>
                            </td>
                            <td @click="artistGrpDetail(grp.agiSeq)" >{{ grp.agiName }}</td>
                            <td>{{ grp.agiDebutYear }}</td>
                            <td span v-if="grp.company !=null">{{ grp.company.name }}</td>
                            <td>
                                <button @click="deleteGrp(grp.agiSeq)">삭제</button>
                            </td>
                        </tr>
                    </tbody>
        </table>
        </div>
          <div class="search_area">
      <input type="text" v-model="keyword" @change="search()">
      <button @click="search()">검색</button>
    </div>
    <div class="pager_area">

      <button  class="pager" :class="{'current' : currentPage == p-1}"
      v-for="p in totalPage" :key="p" @click="pagerClick(p-1)">{{ p }}</button>
    </div>
    <ArtistGroupPopup :grpInfo="grpInfo" v-if="popup" :mode="mode" @close = "close"/>
    </div>
</template>


<script>
import ArtistGroupPopup from '@/components/artist_grp/ArtistGroupPopup.vue';
    export default {
     name: "ArtistGroupView",
     components:{
        ArtistGroupPopup
     },
     data() {
        return {
            list:null,
            currentPage:0 , keyword:"", totalPage:0, artistGrpPopup:false, mode:"" , popup:false , grpInfo:null
        }
     },
     watch:{
        currentPage() {
            this.getList();
        }
     },
       created(){
            this.getList()
    },
     methods: {
        artistGrpDetail(grpNo) {
             let token = sessionStorage.getItem("userToken")
            this.popup = true
            this.mode = "수정"
            this.$http.get("api/artist/group/"+grpNo,{
                headers:{Authorization : `Bearer ${token}`}
            })
            .then((r) => {
                console.log(r.data)
               this.grpInfo =r.data
            })
        },
        deleteGrp(grpNo) {
            if(!confirm("그룹정보를 삭제하시겠습니까?\n작업은 되돌릴 수 없습니다.")) return
            let token = sessionStorage.getItem("userToken")
            this.$http.delete("/api/artist/group/"+grpNo ,{
                headers:{Authorization : `Bearer ${token}`}
            })
            .then((r) => {
                alert(r.data.message)
                if(r.data.status){
                    location.reload()
                }
            })
        },
        // openArtistGroupPopup() {
        //     artistGrpPopup:true
        // },
        close() {
            if(!confirm("입력을 취소하시겠습니까\n입력한 정보는 저장되지 않습니다.")) return;
            this.popup =false
        },
        getList() {
            let  token = sessionStorage.getItem('userToken')
            this.$http.get("/api/artist/group/list",
             {
                  headers:{
                      Authorization : `Bearer ${token}`
                    },
                params: { page: this.currentPage, keyword: this.keyword }
              })
              .then((r) => {
                    console.log(r)
                  this.list = r.data.list;
                  this.currentPage = r.data.currentPage;
                  this.totalPage = r.data.totalPage;
              });
        },
         pagerClick(page) {
              this.currentPage = page;
              this.getList();
          },
          search() {
              this.currentPage = 0;
              this.getList();
          },
          add() {
            this.popup = true
            this.mode = "추가"
          }
     }

    }
</script>
<style scope>
/* scoped: 이 vue 파일에서만 유효한 css로 설정 */
    .view_wrap tbody td{height: 100%; vertical-align: middle;}
    .view_wrap {width: 1500px; margin:0 auto; position: relative;}
    .img{border: 1px solid#ccc; box-sizing: border-box; background-repeat: no-repeat; }

</style>