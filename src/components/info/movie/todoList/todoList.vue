<template>
	<div>
    <h1>电影列表</h1>
     <el-table
      :data="counter.data"
      style="width:100%;">
      <el-table-column
        align='center'
        prop="cName"
        label="中文名称"
        width="120">
      </el-table-column>
      <el-table-column
        align='center'
        prop="eName"
        label="英文名称"
        width="120">
      </el-table-column>
      <el-table-column
        align='center'
        prop="country"
        label="国家地区"
        width="80">
      </el-table-column>
      <el-table-column
        align='center'
        prop="duration"
        label="片长"
        width="80">
      </el-table-column>
      <el-table-column
        align='center'
        prop="release"
        label="上映时间"
        width="120">
      </el-table-column>
      <el-table-column
        align='center'
        prop="type"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        align='center'
        prop="average"
        label="评分"
        width="80">
      </el-table-column>
      <el-table-column
        align='center'
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button @click="goImg(scope.row._id)" type="text" size="small">查看图片</el-button>
          <el-button @click="goNews(scope.row._id)" type="text" size="small">添加资讯</el-button>
          <el-button @click="goMovie(scope.row._id)" type="text" size="small">修改</el-button>
          <el-button @click="delMovies(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="counter.curPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="counter.eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="counter.count">
    </el-pagination> 
  </div>
</template>

<script>

	import {mapActions, mapState, mapMutations} from "vuex"

	export default{
		name:"todoList",
    created(){
      this.getMovies()
    },
    methods:{
      ...mapActions(["getMovies","delMovies"]),
      handleSizeChange(val) {
         this.getMovies({page:1,rows:val})
      },
      handleCurrentChange(val) {
         this.getMovies({page:val})
      },
      goMovie(id){
        this.$router.push({
          name:"counter",
          params:{
            movieId:id
          }
        })
      },
      goImg(id){
        this.$router.push({
          name:"addImg",
          params:{
            movieId:id
          }
        })
      },
      goNews(id){
        this.$router.push({
          name:"addNews",
          params:{
            movieId:id
          }
        })
      }
    },
    computed:{
      select:{
        get(){
          return this.$store.state.counter.curPage
        },
        set(value){
          this.$store.dispatch("getMovies",{
            curPage:value
          })
        }
      },
      input:{
        get(){
          return this.$store.state.counter.eachPage
        },
        set(value){
          this.$store.dispatch("getMovies",{
            curPage:1,
            eachPage:value
          })
        }
      },
      ...mapState(["counter"])
    }
	}

</script>
<style>
</style>