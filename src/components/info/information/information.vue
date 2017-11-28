<template>
  <div>
  <div>
    <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="title"
        label="主标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="para"
        label="段落文字"
        width="470">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="amendClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteClick(scope.row._id)"type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
       <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="~~curPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="~~eachPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="~~count">
          </el-pagination>
        </div>
  </div>
        <div id="amend" class="amend" style="display:none;margin-top: 30px">
      标题：<el-input
          type="textarea"
          autosize
          placeholder="请输入要修改的主标题"
          v-model="textarea2" ref="todo">
      </el-input>
      <div style="margin: 20px 0;"></div>
      内容：<el-input
          type="textarea"
         :autosize="{ minRows: 10, maxRows: 20}"
         placeholder="请输入要修改的段落文字"
         v-model="textarea3" ref="todo2">
      </el-input>
      <div style="margin-top: 20px">
        <el-button  @click="amendSave">保存</el-button>
        <el-button  @click="amendReset">重置</el-button>
      </div>
    </div>
</div>
</template>
<script>
	import router from "../../../router/router"
	import { mapState, mapActions } from "vuex"
  export default {
    name: "information",
    data() {
      return {
        textarea2: "",
        textarea3: "",
        movieId:"",
        newId:''
      }
    },
    created() {
      this.movieId = this.$router.params.movieId
      this.getNewssAsync({movieId:this.movieId})
    },
    computed: {
      // 提取后台数据
      ...mapState("informationStore", ["curPage", "eachPage", "maxPage", "count", "data"])
    },
    methods: {
      // 修改部分
      amendClick(row){
        this.newId=row._id
        document.getElementById("amend").style.display="block"
        this.$data.textarea2 = row.title
        this.$data.textarea3 = row.para
      },
      // 修改后保存
      amendSave() {
        this.updNewsAsync({
          title: this.$data.textarea2,
          para: this.$data.textarea3,
          _id: this.newId,
          movieId:this.movieId
        })
        //隐藏修改框
        document.getElementById("amend").style.display="none";
      },
      amendReset() {
        this.$data.textarea2 = ''
        this.$data.textarea3 = ''
      },
      // 删除
      deleteClick(_id) {
        this.delateAsync({_id:_id,movieId:this.movieId})
      },
          // 分页部分
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
            // 提取数据渲染到列表    
      ...mapActions("informationStore", ["getNewssAsync","delateAsync","updNewsAsync"]),
    }
  }</script>