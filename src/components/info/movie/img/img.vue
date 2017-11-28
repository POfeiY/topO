<template>
	<div>
		<div>图片类型：
			<el-select @change="updateType" v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"
		      limit="1">
		    </el-option>
		  </el-select>
		</div>
		<div>
			<div id="index" style="display:none;">
				<el-upload
				  class="upload-demo"
				  action="/files/upload"
				  :on-success="indexUpload"
				  :data="uploadImgs"
				  :on-remove="handleRemove"
				  :file-list="counter.fileList"
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</div>
			<div id="director" style="display:none;">
				导演名字：<el-input id="directorName" placeholder='请输入导演名字' style="width:200px;"></el-input>
				<div style="margin-bottom:10px;">
					<el-button type="primary" @click="saveDirector" plain>确认</el-button>
				</div>
				<div>
					<el-upload
						:disabled="dirStatus"
						:on-success="directorUpload"
					  class="upload-demo"
					  action="/files/uploadDirector"
					  :data="uploadImgs"
					  :on-remove="handleRemove"
					  :file-list="counter.fileList"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
			</div>
			<div style="display:none" id="actor">
				演员名字：<el-input id="actorName" style="margin-bottom:10px;width:200px;" placeholder='请输入演员名字'></el-input>
				角色名字：<el-input id="roleName" style="width:200px;" placeholder='请输入角色名字'></el-input>
				<div style="margin-bottom:10px;">
					<el-button type="primary" @click="saveActor" plain>确认</el-button>
				</div>
				<div>
					<el-upload
						:disabled="actorStatus"
						:on-success="actorUpload"
					  class="upload-demo"
					  action="/files/uploadCasts"
					  :data="uploadImgs"
					  :on-remove="handleRemove"
					  :file-list="counter.fileList"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
			</div>
		</div>	
	</div>

</template>

<script>
	
	import {mapActions, mapState, mapMutations} from "vuex"

	export default{
		name:"addImg",
		data(){
			return{
				movieId:"",
				options: [{
          value: '主页图片',
          label: '主页图片'
        }, {
          value: '导演图片',
          label: '导演图片'
        }, {
          value: '演员图片',
          label: '演员图片'
        }],
        value: '',
        uploadImgs:{
        	img:''
        },
        dirStatus:true,
        actorStatus:true,
			}
		},
		created(){
	    this.movieId = this.$route.params.movieId
	    console.log(this.counter.fileList)
	  },
	  beforeUpdate(){
	  	if (this.value === '导演图片') {
	  		director.style.display = "block"
	  		index.style.display = "none"
	  		actor.style.display = "none"
	  		// this.getImgByMovieId({movieId:this.movieId,type:this.value})
	  	}else if(this.value === '演员图片'){
	  		director.style.display = "none"
	  		index.style.display = "none"
	  		actor.style.display = "block"
	  		// this.getImgByMovieId({movieId:this.movieId,type:this.value})
	  	}else if(this.value === "主页图片"){
	  		director.style.display = "none"
	  		actor.style.display = "none"
	  		index.style.display = "block"
	  		this.uploadImgs.img = JSON.stringify({movieId:this.movieId,type:this.value})
	  		// this.getImgByMovieId({movieId:this.movieId,type:this.value})
	  	}
	  },
	  methods: {
      handleRemove(file, fileList) {
      },
      updateType(){
      	console.log(this.value)
      	this.getImgByMovieId({movieId:this.movieId,type:this.value})
      },
      saveDirector(){
      	this.uploadImgs.img = JSON.stringify({movieId:this.movieId,type:this.value,name:directorName.value})
      	this.dirStatus = false
      },
      saveActor(){
      	this.uploadImgs.img = JSON.stringify({movieId:this.movieId,type:this.value,name:actorName.value,role:roleName.value})
      	this.actorStatus = false
      },
      indexUpload(){
      	alert("图片上传成功！")
      },
      directorUpload(){
      	alert("图片上传成功！")
      	directorName.value = ""
      	this.dirStatus = true
      },
      actorUpload(){
      	alert("图片上传成功！")
      	actorName.value = ""
      	roleName.value = ""
      	this.actorStatus = true
      },
      ...mapActions(["getImgByMovieId"])
    },
    computed:{
    	...mapState(["counter"])
    }
	}
</script>

<style>
</style>