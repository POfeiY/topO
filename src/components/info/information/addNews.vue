<template>
	<div style="display:flex;">
		<div style="margin-right:20px">
			标题：<el-input v-model="title" placeholder="请输入内容" ref="todo"></el-input>
			<div style="margin: 20px 0;"></div>
			内容：<el-input
			  type="textarea"
			  :autosize="{ minRows: 10, maxRows: 20}"
			  placeholder="请输入内容"
			  v-model="content" ref="todo2">
			</el-input>
			<div style="margin-top: 20px">
				<el-button @click="addNews">保存</el-button>
				<el-button style="margin-left:153px"@click="reset">重置</el-button>
			</div>
			<el-upload
			style="margin-top:50px"
			  class="upload-demo"
			  :data="uploadNews"
			  action="/imgFiles/upload"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :file-list="fileList2"
			  list-type="picture">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
		<div>
			<el-table
		      :data="news.data"
		      border
		      style="width: 600px;">
		      <el-table-column
		        fixed
		        prop="title"
		        label="主标题">
		      </el-table-column>
		      <el-table-column
		        prop="para"
		        label="段落文字">
		      </el-table-column>
		      <el-table-column
		        fixed="right"
		        label="操作"
		        width="100">
		        <template slot-scope="scope">
		          <el-button @click="updateNews(scope.row)" type="text" size="small">修改</el-button>
		          <el-button @click="deleteNews(scope.row)"type="text" size="small">删除</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
		       <div class="block">
		          <span class="demonstration"></span>
		          <el-pagination
		            @size-change="handleSizeChange"
		            @current-change="handleCurrentChange"
		            :current-page="news.curPage"
		            :page-sizes="[5, 10, 20, 40]"
		            :page-size="news.eachPage"
		            layout="total, sizes, prev, pager, next, jumper"
		            :total="news.count">
		          </el-pagination>
		        </div>
		</div>
	</div>
</template>
<script>
	import router from "../../../router/router.js"
	import { mapState, mapActions } from "vuex"
	export default {
		name: "addNews",
		data() {
			return {
				title: "",
				content: "",
				fileList2:[],
				movieId:"",
				uploadNews:{
					img:""
				}
			}
		},
		computed: { 
			...mapState("addNewsStore",["name", "newsCnt","news"])
		},
		created() {
	      this.movieId = this.$route.params.movieId
	      this.getNewssAsync({movieId:this.movieId})
	      this.uploadNews.img = JSON.stringify({movieId:this.movieId})
    	},
		methods: {
			changes(val){
				texts.title = val
			},
			changged(val){
				texts.content = val
			},
			addNews() {
				this.addNewsAsync({title:this.title,para:this.content,movieId:this.movieId})
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
		      },
		      handleExceed(files, fileList) {
		        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		      },
			reset() {
				console.log("in");
				this.$refs.todo.value= "",
				this.$refs.todo2.value= ""
			},
			handleSizeChange(val) {
	            this.getNewssAsync({
	              curPage: 1,
	              eachPage: val,
	              movieId:this.movieId
	            })
	        },
	         handleCurrentChange(val) {
	            this.getNewssAsync({
	              curPage: val,
	              eachPage: this.eachPage,
	              movieId:this.movieId
	            })
	        },
	        updateNews(row){
	        	this.title = row.title
	        	this.content = row.para
	        },
	        deleteNews(row){
	        	this.delateAsync({_id:row._id,movieId:this.movieId})
	        },
			...mapActions("addNewsStore",["addNewsAsync","getNewssAsync","delateAsync"])
		}
	}
</script>