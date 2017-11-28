import Vue from "vue"
import Vuex from "vuex"
import router from "../../../../router/router"//此处是在链接最外层的路由
Vue.use(Vuex)

import axios from "axios"

export default {
	namespaced: true,
	state: {
		name:'',
		address:'',
		data:{}
	},
	mutations: {
		addStudio(state,data){
			Object.assign(state,data)
			console.log("in");
		}
	},
	actions: {
		async addStudioAsync(context,  {name = this.state.addStudio.name, address = this.state.addStudio.address} = {}) {
			console.log(name+":"+address);
			const {
				data
			} = await axios.post("/studio/addStudio", {
				"name":name,
				"address":address
			})
			console.log(data);
			context.commit("addStudio", data)//addStudio是同步里面方法
			if(data._id!=''){
                  alert("新增成功");
                  router.push("/info/studioList");
			}else{
				 alert("新增失败");
			}
		}
	}
}