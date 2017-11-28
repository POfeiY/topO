import axios from "axios"

export default{
	state:{
		curPage:1,
    eachPage:10,
    count:0,
    maxPage:0,
    data:[],
    movie:{},
    fileList:[],
	},
  mutation:{
    update(state,attr,text){
      state.attr = text
    }
  },
	mutations:{
		initMovie(state){
			state.movie = {}
		},
		updateMovieId(state,id){
			state.movie._id = id
		},
    getState(state,data){
      for(let key in data){
        if (key === "curPage" || key === "eachPage") {
          state[key] = ~~data[key]
          continue;
        }
        state[key] = data[key]
      }
    },
    updateFileList(state,{data}){
      data.map((item)=>{
        if (item.url[0] === ".") {
          item.url = item.url.substring(1)
        }
        item.name = item.url.split("/")[item.url.split("/").length-1]
        item.url = "http://172.20.10.9:3000" + item.url
      })
      state.fileList = data
    }
	},
	actions:{
		async addMovie(context,{cName,eName,type,country,duration,release,synopsis,average,collect,subtype}){
			const {data} = await axios.post("movies/addMovie",{
  			cName,
  			eName,
  			type,
  			country,
  			duration,
  			release,
  			synopsis,
  			average,
  			collect,
  			subtype
  		})
  		context.commit("updateMovieId",data._id)
		},
    async getMovies(context,{page = context.state.curPage,rows = context.state.eachPage} = {}){
      const {data} = await axios.get("movies/getMovies",{
        params:{
          page,
          rows
        } 
      })
      context.commit("getState",data)
    },
    async delMovies(context,id){
      await axios.post("movies/upDateMovie",{
        id,
        isDel: 1
      })
      context.dispatch("getMovies")
    },
    async getMovieById(context,id){
      const {data} = await axios.get("movies/getMovieById",{
        params:{
          id
        }
      })
      context.commit("getState",data)
    },
    async getImgByMovieId(context,{movieId,type}){
      console.log(type)
      if (type === "主页图片") {
        const {data} = await axios.get("imgs/getImgsByMovieId",{
          params:{
            movieId,
            type
          }
        })
        console.log(data)
        context.commit("updateFileList",data)
      }else if(type === "导演图片"){
        const {data} = await axios.get("imgs/getDirectorImgsByMovieId",{
          params:{
            movieId,
            type
          }
        })
        context.commit("updateFileList",data)
      }else if(type === "演员图片"){
        const {data} = await axios.get("imgs/getCastsImgsByMovieId",{
          params:{
            movieId,
            type
          }
        })
        context.commit("updateFileList",data)
      }
    },
    async updateMovie(context,{id,cName,eName,type,country,duration,release,synopsis,average,collect,subtype}){
      const {data} = await axios.post("movies/upDateMovie",{
        id,
        cName,
        eName,
        type,
        country,
        duration,
        release,
        synopsis,
        average,
        collect,
        subtype
      })
      context.commit("updateMovieId",data.nModified)
    }
	}
}


