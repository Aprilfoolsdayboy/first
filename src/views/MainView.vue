<template>
<div>
    <nav class="router_area">
    <router-link to = "/main/genre"> 장르 정보</router-link>
    <router-link to = "/main/company"> 기획사 정보</router-link>
    <router-link to = "/main/artistgrp"> 아티스트 그룹 정보</router-link>
    <router-link to = "/main/artist"> 아티스트 정보</router-link>
    <router-link to = "/main/album"> 앨범 정보</router-link>
  </nav>
  <div class="user_box">
    <span>{{ userinfo.admin_id }}</span><span>({{ userinfo.admin_name }})님</span><button @click="logout()">로그아웃</button>

  </div>
</div>
<router-view></router-view>
</template>
<script>
    export default{
        name:"MainView",
        data() {
          return {
            userinfo:null
          }
        },
        beforeCreate() {
        if(sessionStorage.getItem('userToken') == ''||sessionStorage.getItem('userToken') == null) {
            alert("로그인이 필요합니다.")
            location.href="/"
        }
      },
      created(){
      this.userinfo=JSON.parse(sessionStorage.getItem("userinfo"))
      },
      methods:{
      logout() {
        if(confirm("로그아웃할래?")) {
          sessionStorage.removeItem('userToken')
          sessionStorage.removeItem('userinfo')
          location.href="/"
         }
        }
      }
    }
</script>
<style>
/* 라우터 링크 기본 스타일 */
.router_area {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.router_area a{
  display: inline-block; margin: 5px;
  text-decoration: none; color: #999; padding: 10px;
  border-radius: 3px;
}
/* 마우스를 올려 둔 라우터 링크의 스타일 */
.router_area a:hover{
  background-color: #999; color: #fff;
}
/* 현재 표시되고 있는 페이지의 링크 스타일 */
.router_area a.router_link-active{
  background-color: #000; color: #fff;
}
.user_box{
  position: absolute; right: 20px; top: 20px;
}
.user_box > * {margin-left: 5px;}
</style>