import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '../views/FilmLists.vue'
import Film from '../views/FilmView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: Films
  },
  {
    path: '/film/:id',
    name: 'Film',
    component: Film,
  }
]

const router = new VueRouter({
  routes
})

export default router
