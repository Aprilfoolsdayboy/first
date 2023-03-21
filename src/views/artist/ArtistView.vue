<template>
    <div class="view_wrap">
        <h1>아티스트  관리</h1>
        <div id="list_area">
            <table>
                <thead>
                    <tr>
                        <th>번호</th><th>대표이미지</th><th>아티스트명</th><th>생일</th><th>그룹명</th><th>삭제</th>
                        <th>
                            <button @click="openArtistPopup()">그룹 추가</button>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="artist in list" :key="artist.artSeq" >
                            <td>{{ artist.artSeq }}</td>
                            <!-- <td style="width: :350px;"> -->
                                <td @click="artistDetail(artist.artSeq)"  style="width: 300px;">
                                <div class="artist_img"
                                    :style="{'background-image':'url(http://localhost:8585/images/artist/'+artist.artImg+')'}">
                                </div>
                            </td>
                            <td>{{ artist.artName }}</td>
                            <td>{{ artist.artBirth }}</td>
                            <td span v-if="artist.group !=null">{{ artist.group.agiName }}</td>
                            <td>
                                <button @click="deleteArt(artist.artSeq)">삭제</button>
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
    <ArtistPopup :artistInfo="artistInfo" v-if="artistPopup" :mode="mode" @closeArtistPopup="closeArtistPopup" />
    </div>
</template>
<script>
import ArtistPopup from '@/components/artist/ArtistPopup.vue'
    export default {
        name:"ArtistView",
        components:{
             ArtistPopup},
        data() {
            return {
            list:null, currentPage:0,totalPage:0, artistPopup:false,mode:"" ,keyword:"", artistInfo:null
            }
        },
        created () {
            this.loadList()
        },
        methods:{
            search() {
              this.currentPage = 0;
              this.loadList();
            },
            closeArtistPopup() {
                this.artistPopup=false
            },
            deleteArt(artNo) {
            if(!confirm("아티스트 정보를 삭제하시겠습니까?\n작업은 되돌릴 수 없습니다.")) return
            let token = sessionStorage.getItem("userToken")
            this.$http.delete("/api/artist/info/"+artNo ,{
                headers:{Authorization : `Bearer ${token}`}
            })
            .then((r) => {
                alert(r.data.message)
                if(r.data.status){
                    location.reload()
                }
            })
        },
            openArtistPopup() {
            this.artistPopup = true
            this.artistInfo=null
            this.mode = "추가"

            },
            loadList() {
            let  token = sessionStorage.getItem('userToken')
            this.$http.get("/api/artist/info/list",
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
        artistDetail(artNo) {
            let token = sessionStorage.getItem("userToken")
            this.artistPopup = true
            this.mode = "수정"
            this.$http.get("api/artist/info/"+artNo,{
                headers:{Authorization : `Bearer ${token}`}
            })
            .then((r) => {
                console.log(r.data)
               this.artistInfo =r.data
            })

        }
        }
    }

</script>
<style scoped>
    .view_wrap tbody td{height: 100%; vertical-align: middle;}
    .view_wrap {width: 1500px; margin:0 auto; position: relative;}
    /* .img{border: 1px solid#ccc; box-sizing: border-box; background-repeat: no-repeat; } */
    .artist_img{width: 160px; height: 180px; display: inline-block; background-size: 100% auto; background-position: center top;
                border-radius: 5%;}
</style>