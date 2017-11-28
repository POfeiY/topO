 import axios from "axios"
 import Vuex from "vuex"
 import Vue from "vue"
 import router from "../../../router/router"

Vue.use(Vuex)

 export default {
 	namespaced:true,
 	state: {
 		name: "",
 		newsCnt: "",
 		fileList:[],
 		title:'',
 		news:{
 			curPage: 1,
			eachPage: 10,
			maxPage: 0,
			count: 0,
			data: []
 		}
 	},
 	mutations:{
 		getNewss({news}, data) {
		  for(let key in data){
		  	news[key] = data[key]
		  }
		},
 	},
 	actions: {
 		async addNewsAsync({commit,dispatch},{title,para,movieId}){
 			await axios.post("/news/addNews", {
 				title,
 				para,
 				movieId
 			})
 			dispatch('getNewssAsync',{movieId})
 		},
 		// 查询news数据并渲染
		async getNewssAsync({commit,dispatch}, {curPage = this.state.addNewsStore.news.curPage, eachPage = this.state.addNewsStore.news.eachPage,movieId} = {}) {
			const {data} = await axios.get("/news/getNews", {
				params: {
					curPage,
					eachPage,
					movieId
				}
			})
			commit("getNewss", data)
		},
		// 修改news数据 
		async updNewsAsync({commit,dispatch}, {para,title,_id,movieId}) {
			await axios.post("/news/updNews", {para,title,_id})
			dispatch("getNewssAsync", {movieId})
		},
		// 删除news数据
		async delateAsync({commit,dispatch}, {_id,movieId}) {
			console.log(_id,movieId)
			await axios.post("/news/delNews",{
				_id
			})
			dispatch("getNewssAsync",{movieId})
		}
 	}
 }