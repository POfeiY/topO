import axios from "axios"
export default {
	namespaced:true,
	state: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0,
		data: []
	},
	mutations: {
		// 查询数据，修改数据结构的赋值情况
		getNewss(state, data) {
		  for(let key in data){
		  	state[key] = data[key]
		  }
		},
	},
	actions: {
		// 查询news数据并渲染
		async getNewssAsync({commit,dispatch}, {curPage = this.state.curPage, eachPage = this.state.eachPage,movieId} = {}) {
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