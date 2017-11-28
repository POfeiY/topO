
<template>
	<div class='info-wrap'>
		<div class="navLeft">
			 <el-menu
			  style='width:260px;'
			  background-color='#333333'
			  text-color='#ffffff'
			  router
			  :default-openeds=arr
		      default-active="1"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-menu"></i>
		          <span>电影信息管理</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="/info/counter"><i class="el-icon-d-arrow-right"></i>新增电影</el-menu-item>
		          <el-menu-item index="/info/todoList"><i class="el-icon-d-arrow-right"></i>电影列表</el-menu-item>
		          <el-menu-item index="/info/addStudio"><i class="el-icon-d-arrow-right"></i>新增影院</el-menu-item>
		          <el-menu-item index="/info/studioList"><i class="el-icon-d-arrow-right"></i>影院列表</el-menu-item>
		          <el-menu-item index="/info/addEmp"><i class="el-icon-d-arrow-right"></i>新增排片</el-menu-item>
		          <el-menu-item index="/info/schedule"><i class="el-icon-d-arrow-right"></i>排片列表</el-menu-item>
		          <el-menu-item index="/"><i class="el-icon-d-arrow-right"></i>Default</el-menu-item>
		          <el-menu-item index="/"><i class="el-icon-d-arrow-right"></i>Default</el-menu-item>
		          <el-menu-item index="/"><i class="el-icon-d-arrow-right"></i>Default</el-menu-item>
		        </el-menu-item-group>
		        
		      </el-submenu>
		      <el-menu-item index="2">
		        <i class="el-icon-menu"></i>
		        <span slot="title">Default</span>
		      </el-menu-item>
		    </el-menu>
		</div>
		<div class="emptyHolderInfo"></div>
		<router-view class='router-wrap'>
			
		</router-view>
	</div>
</template>

<script>

	import router from "../../router/router.js"

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
	.router-wrap{
		margin-top:25px;
		margin-left:20px; 
		margin-right:20px;
	}
	.navLeft{
		position:fixed;
	}
	.emptyHolderInfo{
		width:260px;
		height:100%;
	}
</style>