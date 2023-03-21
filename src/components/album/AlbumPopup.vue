<template>
    <div class="album_popup_area">
        <div class="album_popup">
            <h1>앨범 정보 {{ type ==1?'추가':'수정' }}</h1>
            <div class="row">
                <span>앨범 아티스트</span>
                <span>선택된 아티스트 없음</span>
            </div>
            <div class="album_info_box">
                <div class="album_img_box"></div>
                <input type="file" accept="image/*">
                <div class="row">
                    <span>앨범 명</span>
                    <input type="text">
                </div>
                <div class="row">
                    <span>발매 국가</span>
                    <select>
                        <option value="0">선택</option>
                        <option value="1">한국</option>
                        <option value="2">중국</option>
                        <option value="3">일본</option>
                        <option value="4">미국</option>
                        <option value="5">유럽</option>
                        <option value="6">영국</option>
                        <option value="7">기타</option>
                    </select>
                    <span>발매일</span>
                    <input type="text" placeholder="yyyy-MM-dd">
                </div>
                <div class="row">
                    <p>앨범 소개 글</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="music_info_list_box">
                <button>음원 추가</button>
                <div class="music_info_box">
                    <span>1</span>
                    <span>
                        <span class="title">TITLE</span>
                        <span>Don't Cry</span>
                    </span>
                    <span>
                        <button class="playpause">▶</button>
                        <button class="stop">■</button>
                    </span>
                    <div class="progressbar">
                        <div class="progress"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        name:"AlbumPopup",
        data() {
            return {
                type:1
            } 
    }
}
</script>
<style scoped>
.album_popup_area{width: 100vw; height: 100vh;position: fixed; left: 0; top: 0; background-color: rgba(0, 0, 0, 0.2);} 
.album_popup {background-color: aliceblue; position: absolute; }
.album_img_box{width: 200px; height: 200px; background-image: url('@/assets/images/noimage.png'); background-size: 100%;}
.progress{height: 10px; width: 50%; background-color: rgb(50, 146, 255);}
.album_info_box{border-right: 1px solid #ddd; }
.album_info_box, .music_info_list_box{display: inline-block; vertical-align: top; padding: 10px 30px;}
.music_info_list_box{width: 300px;}
.album_popup{width: 1000px;}
.row{margin: 10px 0;}
</style>