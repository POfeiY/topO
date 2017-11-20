
<template>
	<div class='info-wrap'>
		<div>
			 <el-menu
			  style='width:240px;'
			  router
			  :default-openeds=arr
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>信息管理</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="/info/counter">新增电影</el-menu-item>
		          <el-menu-item index="/info/todoList">电影列表</el-menu-item>
		          <el-menu-item index="/info/empList">新增影院</el-menu-item>
		          <el-menu-item index="/info/empList_ant">影院列表</el-menu-item>
		          <el-menu-item index="/info/addEmp">新增排片</el-menu-item>
		          <el-menu-item index="/info/imgUpLoad">排片列表</el-menu-item>
		        </el-menu-item-group>
		        
		      </el-submenu>
		      <el-menu-item index="2">
		        <i class="el-icon-menu"></i>
		        <span slot="title">导航二</span>
		      </el-menu-item>
		     
		    </el-menu>

		</div>
		<router-view></router-view>

	</div>
</template>

<script>

	import router from "../../router/router"

	export default{
		name:"info",
		data(){
			return {
				arr:['1']
			}
		},
		methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    }
	}
</script>

<style>
	.info-wrap{
		display: flex;
	}
</style>