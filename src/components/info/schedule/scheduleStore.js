import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

import axios from 'axios'

export default{
	namespaced: true,
	state:{
		studios:{
			curPage:1,
			eachPage:10,
			maxPage:0,
			count:0,
			data:[]
		},
		theaters:{
			curPage:1,
			eachPage:10,
			maxPage:0,
			count:0,
			data:[]
		},
		cascaderInfo:{
			movies:[]
		}
	},
	getters:{},
	mutations:{
		getStudiosByMovieId({studios},data){
			for(let key in data){
				studios[key] = data[key]
			}
		},
		getTheaterByStudioId({theaters},data){
			for(let key in data){
				if(key==="eachPage"||key==='curPage'){
					theaters[key] = ~~data[key]
					continue;
				}
				theaters[key] = data[key]
			}
		},
		getCascaderInfo({cascaderInfo},data){
			for(let item of data){
				cascaderInfo.movies.push(item)
			}
		}
	},
	actions:{
		async getStudiosByMovieIdAsync({commit,dispatch},{curPage = this.state.scheduleStore.studios.curPage, eachPage = this.state.scheduleStore.studios.eachPage, movieId='59ee1660af3c74581cdaef3f'}={}){
			const {data} = await axios.get('/schedule/getStudiosByMovieId',{
				params:{
					curPage,
					eachPage,
					movieId
				}
			})
			commit('getStudiosByMovieId',data)
		},
		async getTheaterByStudioIdAsync({commit,dispatch},{curPage = this.state.scheduleStore.theaters.curPage, eachPage = this.state.scheduleStore.theaters.eachPage, movieId, studioId }={}){
			const {data} = await axios.get('/schedule/getTheaterByStudioId',{
				params:{
					curPage,
					eachPage,
					movieId,
					studioId,
					showTime:new Date()
				}
			})
			commit('getTheaterByStudioId',data)
		},
		async getCascaderInfo({commit,dispatch},{curPage = this.state.scheduleStore.theaters.curPage, eachPage = this.state.scheduleStore.theaters.eachPage}={}){
			const moviesData = await axios.get('/movies/getMovies',{
				params:{
					curPage,
					eachPage,
				}
			})
			const studiosData = await axios.get('/studio/studioList',{
				params:{
					curPage,
					eachPage,
				}
			})
			const cascaderInfo = moviesData.data.data.map((item)=>{
				return {
					value:item._id,
				 	label:item.cName,
				 	children:studiosData.data.data.map((item)=>{
								return {
									value:item._id,
								 	label:item.name,
								 	children:item.theaters.map((item)=>{
								 		return {
								 			value:item._id,
								 			label:item.name,
								 		}
								 	})
								}
							})
				}
			})

			commit('getCascaderInfo',cascaderInfo)
		},

		async delScheduleAsync({commit,dispatch}, {scheduleId, movieId, studioId}){
			await axios.post('/schedule/updateSchedule',{
				scheduleId
			})
			dispatch('getTheaterByStudioIdAsync',{movieId,studioId})
			dispatch('getStudiosByMovieIdAsync',{movieId})
		},

		async addScheduleAsync({commit,dispatch},schedule){
			await axios.post('/schedule/addSchedule',schedule)
			dispatch('getStudiosByMovieIdAsync',{movieId:schedule.movieId})
		}
	}
}