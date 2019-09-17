import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/General/Home.vue'
import About from './views/About.vue'
import AllPhotos from "./views/AllPhotos.vue"
import EditUserPage from "./views/EditUserPage.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: "/allPhotos",
      name: "allPhotos",
      component: AllPhotos
    },
    {
      path: "/editUser/:id",
      name: "editUser",
      component: EditUserPage
    }
  ]
})
