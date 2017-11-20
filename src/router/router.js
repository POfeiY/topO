import Vue from 'vue'
import Router from 'vue-router'
import Info from "../components/info/info"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: Info,
    }
  ]
})
