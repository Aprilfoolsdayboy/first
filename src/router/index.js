import { createRouter, createWebHistory } from 'vue-router'
import GenreView from "@/views/company_genre/GenreView.vue";
import CompanyView from "@/views/company_genre/CompanyView.vue";
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import ArtistGroupView from "@/views/artist_grp/ArtistGroupView.vue";
import ArtistView from "@/views/artist/ArtistView.vue";
import AlbumView from "@/views/album/AlbumView.vue";
const routes = [
  { path: "/", name: "loginview", component: LoginView },
  {
    path: "/main",
    name: "mainview",
    component: MainView,
    children: [
      {
        // /main/genre
        path: "genre",
        name: "genreview",
        component: GenreView,
      },
      {
        // /main/company
        path: "company",
        name: "companyview",
        component: CompanyView,
      },
      { path: "artistgrp", name: "artistgrbciew", component: ArtistGroupView },
      { path: "artist", name: "artistview", component: ArtistView },
      { path: "album", name: "albumview", component: AlbumView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
