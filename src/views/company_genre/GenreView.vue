<template>
    <div>
        <CompanyGenreView :title="title" :apiUrl="url"/>
    </div>
</template>
<script>
    import CompanyGenreView from '../company_genre/CompanyGenreView.vue';
    export default{
        name:"GenreView",
        components:{CompanyGenreView},
        data(){
            return{
                title:"장르",
                url:"/api/genre"
            }
        }
    }
</script>