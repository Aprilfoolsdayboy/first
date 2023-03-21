<template>
    <div class="view_wrap">
        <h1>앨범 정보 관리</h1>
        <div class="list_area">
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>자켓이미지</th>
                    <th>앨범명</th>
                    <th>아티스트명</th>
                    <th>발매국</th>
                    <th>발매일</th>
                    <th>수록곡 수</th>
                </tr>
            </thead>
        </table>
        <AlbumPopup />
        </div>
    </div>
</template>
<script>
    import AlbumPopup from '@/components/album/AlbumPopup.vue'
    export default {
        name:"AlbumView",
        components:{AlbumPopup}
    }
</script>
<style>
</style>