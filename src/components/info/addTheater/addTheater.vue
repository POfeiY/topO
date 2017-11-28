<template>
	<div>
		<div style="width:300px;text-align: center;padding-bottom: 40px;">
				<div style="color: #878D99;width: 300px">
					<span>影厅名称:</span>
					<el-input style="width: 70%"
					  v-model.name = "theaterName"
					  placeholder="请输入内容">
					  <i
					    class="el-icon-edit el-input__icon"
					    slot="suffix">
					  </i>
					</el-input>
				</div>
				<div style="color: #878D99;width: 300px;padding:20px 0">
					<span>座位行数:</span>
					<template>
					  <el-input-number style="width: 70%"  v-model="num1" label="座位行数"></el-input-number>
					</template>
				</div>
				<div style="color: #878D99;width: 300px">
					<span>座位列数:</span>
					<template>
					  <el-input-number style="width: 70%"  v-model="num1" label="座位列数"></el-input-number>
					</template>
				</div>
				<div style="color: #878D99;width: 300px;padding-top: 20px">
					 <el-button style="width: 40%" @click="addTheater" type="info">保存</el-button>
					 <el-button style="width:  40%" @click="resetting" type="info">重置</el-button>
				</div>
		</div>
		<div style="width: 900px; margin-top: 20px">
			<el-table
				border
			  :span-method="objectSpanMethod"
			  :data="theaters.data"
			  style="width: 100%">
			  <el-table-column
			    align="center"
			  	prop="studioId.name"
			    label="影院名称"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    align="center"
			  	prop="name"
			    label="影厅名称"
			    width="180">
			  </el-table-column>
			  <el-table-column
			  	align="center"
			  	prop="state"
			    label="状态">
			  </el-table-column>
			  <el-table-column 
			  	align="center"
			  	label="操作">
		      <template slot-scope="data">
		      	<el-button
		          size="mini"
		          @click="getSeats(data.row)">查看座位</el-button>
		        <el-button
		          size="mini"
		          >编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="del(data.row)"
		         >删除</el-button>
		      </template>
		    </el-table-column>
			</el-table>
			<div class="block">
		    <el-pagination
		      @size-change="theatersSizeChange"
		      @current-change="theatersCurrentChange"
		      :current-page="theaters.curPage"
		      :page-sizes="[10, 20, 30]"
		      :page-size="theaters.eachPage"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="theaters.count">
		    </el-pagination>
		  </div>
		</div>
		<div style="width: 900px;" class="dels">
			<el-table
			  :data="seats.data"
			  border
			  :span-method="objectSpanMethod"
			  style="width: 500px;">
			  <el-table-column
			  	align="center"
			  	prop="theaterId.name"
			    label="影厅名称"
			    width="180">
			  </el-table-column>
			  <el-table-column
			  	align="center"
			  	prop="displayName"
			    label="座位名称">
			  </el-table-column>
			  
			</el-table>
			<div class="block">
		    <el-pagination
		      @size-change="seatsSizeChange"
		      @current-change="seatsCurrentChange"
		      :current-page="seatCurPage"
		      :page-sizes="[10,20]"
		      :page-size="seatEachPage"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="seats.count">
		    </el-pagination>
		  </div>
		</div>
		
	</div>
</template>

<script>
  import { mapState,mapActions, mapMutations } from "vuex"
	const values = {}
	export default{
		name:"addTheater",
		data() {
	      return { 
	      	num1:1,
	      	theaterName:"",
	       	studioId:"",
	       	theaterId:""
	      }
	    },
	  	created() {
	  		this.studioId = this.$route.params.studioId
	  		this.getTheatersAsync({studioId:this.studioId})
	  	},
	  	computed:{
			...mapState('addTheater',['theaters','seats']),
			seatEachPage(){
				return ~~this.$store.state.addTheater.seats.eachPage
			},
			seatCurPage(){
				return ~~this.$store.state.addTheater.seats.curPage
			}


		},
		methods:{
      ...mapActions('addTheater',["getTheatersAsync","getSeatsAsync","addTheaterAsync","delTheater"]),
      addTheater(){
      	this.addTheaterAsync({name:this.theaterName,colNo:this.num1,rowNo:this.num1,studioId:this.studioId})
      	this.getTheatersAsync({studioId:this.studioId})
      },
      seatsSizeChange(val){
      	this.$store.state.addTheater.seats.eachPage = val
      	this.getSeatsAsync({theaterId:this.theaterId})

      },
      seatsCurrentChange(val){
      	this.$store.state.addTheater.seats.curPage = val
      	this.getSeatsAsync({theaterId:this.theaterId})
      },
      theatersSizeChange(val){
      	this.$store.state.addTheater.theaters.eachPage = val
      	this.getTheatersAsync({studioId:this.studioId})
      },
      theatersCurrentChange(val){
      	this.getTheatersAsync({page:val,studioId:this.studioId})
      },
      resetting(){
      	this.num1 = "1"
      	this.theaterName = ""
      	console.log("重置")
      },
      getSeats(row){
      	this.theaterId = row._id
      	this.getSeatsAsync({theaterId:this.theaterId})
      },
      del(row){
      	console.log(row._id)
      	this.delTheater({theaterId:row._id,studioId:this.studioId})
      	this.getTheatersAsync({studioId:this.studioId})
      	this.getSeats({theaterId:''})
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 10 === 0) {
            return {
              rowspan: 10,
              colspan: 1
            };
          }else {
            return {
              rowspan: 0,
              colspan: 0
            }
        	}
       	}
			}
		}
	}
</script>

<style>
	.dels{
		display: inline-block;
	}
</style>