import Vue from "vue"
import Vuex from "vuex"
import router from "../../../../router/router"//此处是在链接最外层的路由

Vue.use(Vuex)

import axios from "axios"

export default {
	namespaced: true,
	state: {
		_id:'',
		name:'',
		address:'',
		data:{}
	},
	mutations: {
		updateStudio(state,data){
			Object.assign(state,data)
			console.log("in");
		}
	},
	actions: {
		async updateStudioAsync(context,  
			{_id = this.state.updateStudio._id, name = this.state.updateStudio.name, address = this.state.updateStudio.address} = {}) {
			console.log(_id+":"+name+":"+address);
			const {
				data
			} = await axios.post("/studio/updateStudio", {
				"_id":_id,
				"name":name,
				"address":address
			})
			console.log(data);
			context.commit("updateStudio", data)//updateStudio是同步里面方法
			if(data.n==1){
                  alert("修改成功");
                  router.push("/info/studioList");
			}else{
				 alert("修改失败");
			}
		}
	}
}