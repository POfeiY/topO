<template>
	<div>
		<h2>影院列表</h2>
		<el-table 
    border
    :data="data"
    style="width: 100%">
      <el-table-column
        fixed
        align='center'
        prop="name"
        label="影院名称"
        width="200">
      </el-table-column>
      <el-table-column
        align='center'
        prop="address"
        label="影院地址"
        width="300">
      </el-table-column>
      <el-table-column
        align='center'
        prop="state"
        label="状态"
        :formatter="stateFormat"  
        width="100">
      </el-table-column>
      <el-table-column
        align='center'
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看影厅</el-button>
          <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="updateClick(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="~~curPage"
      :page-sizes="[5, 10,20, 40, 80, 100]"
      :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
	</div>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  export default{
    name:"studioList",
    computed: {
      ...mapState("studioList", ["curPage", "eachPage", "maxPage", "count", "data","_id"])
    },
    created() {
      this.studioListAsync()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.studioListAsync({
          curPage: 1,
          eachPage: val
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.studioListAsync({
          curPage: val,
          eachPage: this.eachPage
        })
      },
      handleClick(row) {//查看按钮
        this.$router.push({
            name: 'addTheater',
            params: {
              studioId:row._id,
              studioName:row.name 

            }
        })
      },
      delClick(row) {//删除按钮
        console.log("删除"+row._id);
        this.delClickAsync({
              _id:row._id
        })
      },
      updateClick(row) {//修改按钮
        console.log("修改"+row._id);
        router.push({
            name: 'updateStudio',
            params: {
              _id:row._id,
              name:row.name,
              address:row.address
            }
        })
      },
        //格式化  ,
      stateFormat:function(row, column) {  
          var state = row[column.property];  
          if (state == '1') {  
             return "在线";  
          }  
          return "下线";  
        },
      ...mapActions("studioList", ["studioListAsync","delClickAsync","useClickAsync"])
    }
  }
</script>

<style>
</style>