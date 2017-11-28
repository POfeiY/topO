import Vue from 'vue'
import Router from 'vue-router'
import Info from "../components/info/info"



//引入登录模块
import Login from "../components/login/login"

//引入注册模块
import Reg from "../components/reg/reg"

//引入排片模块
import Schedule from "../components/info/schedule/schedule"

//引入影院模块
import AddStudio from "../components/info/studio/addStudio"
import StudioList from "../components/info/studio/studioList"
import UpdateStudio from "../components/info/studio/updateStudio"

//引入影厅模块
import AddTheater from "../components/info/addTheater/addTheater"

//引入电影模块
import TodoList from "../components/info/movie/todoList/todoList.vue"
import Counter from "../components/info/movie/counter/counter.vue"
import AddImg from "../components/info/movie/img/img.vue"

//引入咨询模块
import AddNews from "../components/info/information/addNews.vue"
import Information from "../components/info/information/information.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
    },
    {
      path: '/info',
      name: 'info',
      component: Info,
      children:[{
          path: 'schedule',
          component: Schedule,
      },
      {
        path:"addStudio",
        name:"addStudio",
        component:AddStudio
      },
      {
        path:"updateStudio",
        name:"updateStudio",
        component:UpdateStudio
      },
      {
        path:"studioList",
        name:"studioList",
        component:StudioList,
      },
      {
        path: 'todoList',
        component: TodoList
      },{
        path: 'counter',
        name:"counter",
        component: Counter
      },{
        path: 'addImg',
        name:"addImg",
        component: AddImg
      },
      {
        path: 'addTheater',
        name: 'addTheater',
        component: AddTheater
      },{
        path: 'addNews',
        name: 'addNews',
        component: AddNews
      },{
        path: 'information',
        name: 'information',
        component: Information
      }]
    },
  ]
})
