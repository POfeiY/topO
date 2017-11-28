<template>
	<div class="cla">
		<h2>新增电影</h2>
		<div>中文名称：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入中文名称"
        suffix-icon="el-icon-edit"
        id="cName">
      </el-input>
    </div>
		<div>英文名称：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入英文名称"
        suffix-icon="el-icon-edit"
        id="eName" >
      </el-input>
    </div>
		<div>影片类型：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入影片类型"
        suffix-icon="el-icon-edit"
        id="type" >
      </el-input>
    </div>
		<div>国家地区：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入国家地区"
        suffix-icon="el-icon-edit"
        id="country" >
      </el-input>
    </div>
		<div>电影片长：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入电影片长"
        suffix-icon="el-icon-edit"
        id="duration" >
      </el-input>
    </div>
		<div>上映时间：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入上映时间"
        suffix-icon="el-icon-edit"
        id="release" >
      </el-input>
    </div>
		<div>电影评分：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入电影评分"
        suffix-icon="el-icon-edit"
        id="average" >
      </el-input>
    </div>
		<div>评分人数：
			<el-input
        size="small"
        style="width:200px;"
        placeholder="请输入评分人数"
        suffix-icon="el-icon-edit"
        id="collect" >
      </el-input>
    </div>
		<div>
			<span>电影类型：</span>
			<el-radio-group v-model="radio" ref="subtype">
		    <el-radio label="即将上映">即将上映</el-radio>
		    <el-radio label="正在上映">正在上映</el-radio>
		    <el-radio label="top250">top250</el-radio>
		  </el-radio-group>
		</div>
		<div><span style='vertical-align:top;'>电影简介：</span><el-input style='width:400px;' size="small" type="textarea" :value="synopsis" placeholder="请输入电影剧情简介" id="synopsis"></el-input></div>
		<div id="imgBtn" style="display:block">
			<el-button id="imgBtn" size="mini" :disabled="status" type="primary" @click="addImg" >上传<i class="el-icon-upload el-icon--right"></i></el-button>
		</div>
		<div id="saveBtn" style="display:block;">
			<el-button  type="primary" @click="addMovie" plain>保存</el-button>
		</div>
		<div id="updateBtn" style="display:none;">
			<el-button  type="primary" @click="updateMovie" plain>确认修改</el-button>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState, mapMutations} from "vuex"

	export default{
		name:"counter",
		created(){
			this.movieId = this.$route.params.movieId
			this.$store.commit("initMovie")
			if (this.movieId) {
				this.getMovieById(this.movieId)
			}
		},
		mounted(){
			if (this.movieId) {
				saveBtn.style.display = "none"
				updateBtn.style.display = "block"
				cName.value = this.data[0].cName
				eName.value = this.data[0].eName
				type.value = this.data[0].type
				country.value = this.data[0].country
				duration.value = this.data[0].duration
				release.value = this.data[0].release
				average.value = this.data[0].average
				this.radio = this.data[0].subtype
				collect.value = this.data[0].collect
				this.synopsis = this.data[0].synopsis
			}else{
				saveBtn.style.display = "block"
				updateBtn.style.display = "none"
			}
		},
		data(){
			return{
				radio: "即将上映",
				status:true,
				movieId:"",
				data:this.$store.state.counter.data,
				synopsis:""
			}
		},
		methods:{
			...mapActions(["getMovieById"]),
			async addMovie(){
    		await this.$store.dispatch("addMovie",{
	    		cName:cName.value,
	    		eName:eName.value,
	    		type:type.value,
	    		country:country.value,
	    		duration:duration.value,
	    		release:release.value,
	    		synopsis:synopsis.value,
	    		average:average.value,
	    		collect:collect.value,
	    		subtype:this.$refs.subtype.value
	    	})
	    	if(this.$store.state.counter.movie._id){
	    		this.status = false
	    	}
			},
			async updateMovie(){
				await this.$store.dispatch("updateMovie",{
					id:this.movieId,
	    		cName:cName.value,
	    		eName:eName.value,
	    		type:type.value,
	    		country:country.value,
	    		duration:duration.value,
	    		release:release.value,
	    		synopsis:synopsis.value,
	    		average:average.value,
	    		collect:collect.value,
	    		subtype:this.$refs.subtype.value
	    	})
	    	if(this.$store.state.counter.movie._id){
	    		alert("修改成功")
	    	}
			},
			addImg(){
				this.$router.push({
					name:"addImg",
					params:{
						movieId:this.$store.state.counter.movie._id
					}
				})
			}
		}
	}
</script>

<style>
	.cla>*{
		width:580px;
		font-size:14px;
		text-align:left;
		margin-top: 20px;
		margin-left: 60px;
	}
</style>