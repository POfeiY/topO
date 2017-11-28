import axios from 'axios'

export default {
	namespaced: true,
	state: {
		theaters:{
			eachPage:10,
			curPage:1,
			count:0,
			maxPage:0,
			data:[],
		},
		seats:{
			eachPage:10,
			curPage:1,
			count:0,
			maxPage:0,
			data:[],
		},
    },
	mutations: {
		getTheaters({theaters},data){
			for(let key in data){
				theaters[key] = data[key]
			}
		},
		getSeats({seats},data){
			for(let key in data){
				seats[key] = data[key]
			}
		}
	},
	actions: {
		async addTheaterAsync({dispatch,commit},{name, colNo, rowNo, studioId}) {
			const {data} = await axios.post("/theaters/addTheater", {
						name,
						colNo,
						rowNo,
						studioId
			})
		},
		async getTheatersAsync({dispatch,commit},{curPage = this.state.addTheater.theaters.curPage,eachPage = this.state.addTheater.theaters.eachPage,studioId}){
			const {data} = await axios.get("/theaters/getTheaters", {
				params: {
					studioId,
					page:curPage,
					rows:eachPage,
				}
			})
			commit("getTheaters", data)
		},
		async getSeatsAsync({dispatch,commit},{curPage = this.state.addTheater.seats.curPage, eachPage = this.state.addTheater.seats.eachPage,theaterId}){
			const {data} = await axios.get("/seats/getSeats",{
				params: {
					theaterId,
					curPage, 
					eachPage
				}
			})
			commit("getSeats", data)
		},
		async delTheater({dispatch,commit},{theaterId,studioId}){
			const {data} = await axios.post("/theaters/delTheater",{
				_id:theaterId,
				studioId
 			})
		},
		async reTheaterAsync({dispatch,commit},theaterId){
			const {data} = await axios.get("/theaters/reTheater",{
				params: {
					_id:theaterId
				}
			})
			commit("reTheater", data)
		}
	}
}