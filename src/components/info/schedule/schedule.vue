
<template>
	
	<div style='margin-left:20px'>
		<div class='infoWrap'>
			<div style='margin-right:20px;'>
				<span class="textWord">电影/ 影院/ 影厅 :</span>
				<el-cascader
					style="width:300px;"
				    ref='mixInfo'
				  	show-all-levels
				    placeholder="试试搜索：羞羞的电影名"
				    :options="cascaderInfo.movies"
				    filterable
				    change-on-select
				    @change="handleCascader"
				  ></el-cascader>
			</div>

			<br/>

			<div style='margin-right:20px;'>
				<span class="textWord">排片时间 :</span>
				<el-date-picker
				  ref='showTime'
			   	  @blur="handleTimeChoose"
		   		  v-model="showTime"
			      type="datetime"
			      placeholder="选择日期时间"
			      align="right"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
			</div>
			<div style='margin-right:20px;'>
				<span class="textWord">票价：</span>
				<el-input 
					style='width:140px;'
					ref='price'
					placeholder="价格">
						<template slot="append">元</template>
					</el-input>
			</div>
			<div> 
				<el-button
					@click="saveBtn" 
					type="primary"
					>保存</el-button>
			</div>
		   
		</div>

	 <el-table
	 	border
	    :data="studios.data"
  		 stripe
	    border>
	    <el-table-column
	      align='center'
	      prop="_id"
	      label="编号"
	      width="280">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="name"
	      label="影院名称"
	      width="320">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="address"
	      label="地址"
	      width="320">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      fixed="right"
	      label="操作"
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="handleClickStudio(scope.row)" type="text" size="small">查看</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination
	      @size-change="handleSizeChangeStudio"
	      @current-change="handleCurrentChangeStudio"
	      :current-page="~~studios.curPage"
	      :page-sizes="[10, 2, 50, 100]"
	      :page-size="~~studios.eachPage"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="studios.count">
	    </el-pagination>


	    <el-table
	    :data="theaters.data"
  		 stripe
	    border>
	    <el-table-column
	      align='center'
	      prop="_id"
	      label="编号"
	      width="280">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="theaterId.name"
	      label="影厅名称"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="show_time"
	      label="上映时间"
	      width="320">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="price"
	      label="票价"
	      width="160">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      fixed="right"
	      label="操作"
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="handleClickTheaters(scope.row)" type="text" size="small">查看</el-button>
	        <el-button @click='handleSchedule(scope.row)' type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination
	      @size-change="handleSizeChangeTheater"
	      @current-change="handleCurrentChangeTheater"
	      :current-page="~~theaters.curPage"
	      :page-sizes="[10, 20, 50, 100]"
	      :page-size="~~theaters.eachPage"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="theaters.count">
	    </el-pagination>
	</div>
</template>

<script>
	import moment from 'moment'	
	import axios from "axios"
	import { mapActions ,mapState} from 'vuex'
	export default{
		name:"schedule",
		data(){
			  return {
		        pickerOptions1: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        },
		        value1: '',
		        value2: '',
		        showTime:'',
		        movieId:''
		      };
		},
		created(){
			this.getCascaderInfo()
			// this.getStudiosByMovieIdAsync()
		},
		computed:{
			...mapState('scheduleStore',['studios','theaters','cascaderInfo'])
		},
		methods:{
			...mapActions('scheduleStore',['getStudiosByMovieIdAsync','getTheaterByStudioIdAsync','getCascaderInfo','addScheduleAsync','delScheduleAsync']),
			handleClickStudio(row) {
		        this.getTheaterByStudioIdAsync({
		        	movieId:this.movieId,
		        	studioId:row._id
		        });
		    },
		    handleClickTheaters(row) {
		        console.log(row)
		    },
		    handleCascader(row) {
		    	//判断是否更换电影，true则重新获取后台数据，false则保持当前数据
		    	if(row[0]!=this.movieId){
		    		this.movieId = row[0]
		    		this.getStudiosByMovieIdAsync({movieId:row[0]})
		    		this.getTheaterByStudioIdAsync()
		    	}else{
		    		console.log('保持数据')
		    	}
		        
		    },
		    handleTimeChoose(row) {
		    	console.log(row.value)
		    },
		    handleSizeChangeStudio(val) {
	        	console.log(`每页 ${val} 条`);
	        	this.getStudiosByMovieIdAsync({curPage:this.studios.curPage,eachPage:val,movieId:this.movieId})
		    },
	      	handleCurrentChangeStudio(val) {
	        	console.log(`当前页: ${val}`);
	        	this.getStudiosByMovieIdAsync({curPage:val,eachPage:this.studios.eachPage,movieId:this.movieId})
	      	},
	      	handleSizeChangeTheater(val) {
	        	console.log(`每页 ${val} 条`);
	        	this.getTheaterByStudioIdAsync({curPage:this.theaters.curPage,eachPage:val,movieId:this.movieId})
		    },
	      	handleCurrentChangeTheater(val) {
	        	console.log(`当前页: ${val}`);
	        	this.getTheaterByStudioIdAsync({curPage:val,eachPage:this.theaters.eachPage,movieId:this.movieId})
	      	},
	      	saveBtn(){
	      		this.addScheduleAsync({
	      			movieId:this.$refs.mixInfo.currentValue[0],
	      			studioId:this.$refs.mixInfo.currentValue[1],
	      			theaterId:this.$refs.mixInfo.currentValue[2],
	      			showTime:this.showTime,
	      			price:this.$refs.price.$refs.input.value
	      		})
	      	},
	      	handleSchedule(row){
	      		this.delScheduleAsync({
	      			movieId:row.movieId,
	      			studioId:row.studioId,
	      			scheduleId:row._id
	      		})
	      	}
		}
	}
</script>

<style>
	.infoWrap{
		display: flex;
		margin-bottom:20px
	}
	.textWord{
		font-size:14px;
	}
</style>