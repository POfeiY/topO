import Vue from "vue"
import Vuex from "vuex"
import router from "../../../../router/router"//此处是在链接最外层的路由

Vue.use(Vuex)

import axios from "axios"

export default {
	namespaced: true,
	state: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0,
		data: [],

		_id:""
	},
	mutations: {
		studioList(state,page){
			Object.assign(state,page)
		}
	},
	actions: {
		async studioListAsync(context, {curPage = this.state.studioList.curPage, eachPage = this.state.studioList.eachPage} = {}) {
			const {
				data
			} = await axios.get("/studio/studioList", {
				params: {
					curPage,
					eachPage
				}
			})
			console.log(data);
			context.commit("studioList", data)
		},

		async delClickAsync(context, { _id = this.state.studioList._id} = {}) {
			console.log("_id"+_id);
			const {
				data
			} = await axios.post("/studio/delStudio", {
				"id":_id
			})
			console.log(data);
			context.commit("studioList", data);
			if(data.n==1){
                  alert("删除成功");
                  const {
						data
					} = await axios.get("/studio/studioList", {
						params: {
							"page":this.state.studioList.curPage,//如果删除完成之后要回到第n页，则"page":n,让这个状态机值发生改变，让页面数据从新渲染
							"rows":this.state.studioList.eachPage
						}
					})
					console.log(data);
					context.commit("studioList", data)
			}else{
				 alert("删除失败");
			}
		},

		async useClickAsync(context, { _id = this.state.studioList._id} = {}) {
			console.log("_id"+_id);
			const {
				data
			} = await axios.post("/studio/useStudio", {
				"id":_id
			})
			console.log(data);
			context.commit("studioList", data);
			if(data.n==1){
                  alert("启用成功");
                  const {
						data
					} = await axios.get("/studio/studioList", {
						params: {
							"page":this.state.studioList.curPage,
							"rows":this.state.studioList.eachPage
						}
					})
					context.commit("studioList", data)
			}else{
				 alert("启用失败");
			}
		},
	}
}