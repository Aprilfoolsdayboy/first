<template>
    <div class="view_wrap">
    <h1>{{title}}정보 관리</h1>
      <div id ="list_area">
          <table>
              <thead>
                  <tr>
                      <th>번호</th>
                      <th>{{title}} 명</th>
                      <th><button @click="add()">{{title}}추가</button></th>
                  </tr>
                  </thead>
                      <tbody>
                          <tr v-for="item in list" :key="item.seq">
                              <td>{{ item.seq }}</td>
                              <td>
                                <button class="name" @click="detail(item.seq)">{{ item.name }}</button>
                              </td>
                              <td>
                                <button @click="deleteData(item.seq)">삭제</button>
                              </td>
                               </tr>
              </tbody>
          </table>
        <div class="search_area">
      <input type="text" v-model="keyword">
      <button @click="search()">검색</button>
    </div>
    <div class="pager_area">

      <button  class="pager" :class="{'current' : currentPage == p-1}"
      v-for="p in totalPage" :key="p" @click="pagerClick(p-1)">{{ p }}</button>
    </div>
  </div>
  <CompanyGenrePopup
      :title="title" :mode="popupMode" :data="selected" :apiUrl="apiUrl" v-if="popup" @closePopup="closePopup()"/>
    </div>
  </template>
  <script>
  import CompanyGenrePopup from '@/components/company_genre/CompanyGenrePopup.vue';
      export default {
      name: "CompanyGenreView",
      // components:{CompanyPopup},
      components:{
        CompanyGenrePopup
      },
      props:{title:String, apiUrl:String},
      data() {
          return {
              list: null,
              currentPage: 0,
              totalPage: 0,
              keyword: null,
              popup: false,
              popupMode: "add",
              selected: null
          };
      },
      watch:{
          currentPage(){
              this.loadList()
          }
      },
      created() {
          this.loadList();
      },
      mounted(){
        if(sessionStorage.getItem('userToken') == ''|| sessionStorage.getItem('userToken') == null) {
            alert("로그인이 필요합니다.")
            location.href="/"
        }
      },
      methods: {
          loadList() {
              let  token = sessionStorage.getItem('userToken')
              console.log(token)
              this.$http.get(this.apiUrl+"/list", 
              {
                  headers:{
                      Authorization : `Bearer ${token}`
                    },
                params: { page: this.currentPage, keyword: this.keyword }
              })
                  .then((r) => {
                  this.list = r.data.list;
                  this.currentPage = r.data.currentPage;
                  this.totalPage = r.data.totalPage;
              });
          },
          deleteData(seq) {
              let token = sessionStorage.getItem('userToken')
              if (!confirm("삭제하시겠습니까\n삭제된 데이터는 되돌릴 수 없습니다."))
                  return;
              this.$http.delete(this.apiUrl+"/"+seq,
              {
                  headers:{
                      Authorization: `Bearer ${token}`
                  }
              })
                  .then((r) => {
                  alert(r.data.message);
                  location.reload();
              });
          },
          detail(seq) {
              this.popup = true;
              // list에 있는 요소들을 순차적으로 조회하면서, genreSeq 값이 파라미터의 seq값과 일치하는 것만
              // 걸러 낸 새로운 리스트를 만들어서 selected에 저장한다.
              this.selected = this.list.filter((data) => data.seq == seq)[0]; // 결과 중 첫번째 것만 가져옴
              this.popupMode = "update";
              console.log(this.list);
              console.log(this.selected, seq);
          },
          pagerClick(page) {
              this.currentPage = page;
              this.loadList();
          },
          search() {
              this.currentPage = 0;
              this.loadList();
          },
          add() {
              this.popup = true;
              this.popupMode = "add";
          },
          closePopup() {
              this.popup = false;
              this.selected = null;
          }
      },
  }
  </script>
  <style>
    .view_wrap tr{box-shadow: 0; transition: 0.2s;}
    .view_wrap tr:hover{
        box-shadow: 0 2px 5px #00000055;
        background-color: #f7f7f7;
    }
      .view_wrap {width: 960px; margin:0 auto; position: relative;}
    .view_wrap h1 {
        font-size: 24px; font-weight: bold; padding:30px 0;
    }
    .view_wrap table {width: 100%;}
    .view_wrap table th {
        background-color: #999; color: #fff;
        border-bottom: 1px solid #ddd;
        padding:10px; text-align: center;
    }
    .view_wrap table td {
        border-bottom: 1px solid #eee;
        padding:10px; text-align: center;
    }
    .view_wrap table td:nth-child(2) {
        width:700px;
    }
    .view_wrap td:nth-child(2) button {
        border: 0; font-size: 16px; background-color: transparent;
        cursor:pointer; 
    }
    .view_wrap td:nth-child(2) button:hover {
        text-decoration: underline;
    }
    .view_wrap table th:nth-child(3) button {
        border: 0;
        cursor:pointer; background-color: rgb(224, 224, 224); color: #333;
        padding:5px 10px; border-radius: 5px;
    }
    .view_wrap table th:nth-child(3) button:hover {
        background-color: rgb(79, 79, 79);  color: #fff;
    }
    .view_wrap td:nth-child(3) button {
        border: 0;
        cursor:pointer; background-color: rgb(255, 141, 141); color: #fff;
        padding:5px 10px; border-radius: 5px;
    }
    .view_wrap td:nth-child(3) button:hover {
        background-color: rgb(255, 70, 70);
    }

    .search_area {text-align: center; padding:10px; position: absolute; right: 0; top: 20px;}
    .search_area input {
        box-sizing: border-box; height: 30px; vertical-align: middle; margin-right: 10px; border: 0;
        border-bottom: 1px solid #aaa;
    }
    .search_area button {height:30px; vertical-align: middle;
        border: 0;padding:2px 10px; border-radius: 5px; background-color: #333; color: #fff;
        cursor:pointer;
    }
    .pager_area {text-align: center; padding:10px; margin-top: 30px;}
    .pager {
        border: 0; background-color: transparent;
        font-size: 16px; vertical-align: middle;
    }
    .pager:hover {
        font-weight: bold; text-decoration: underline; cursor: pointer;
    }
    .pager.current {
        font-weight: bold; text-decoration: underline; font-size: 25px;
    }
  </style>