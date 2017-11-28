<template>
	<div class="regs">
		<h1>注册界面</h1>
		<div>
		  <el-input placeholder="请输入账号" v-model="username">
		  <template slot="prepend"><i class="el-icon-edit"></i></template>
		  </el-input>
		</div>
		<div>
		  <el-input placeholder="请输入密码" type="password" style="margin-top:30px" v-model="password">
		    <template slot="prepend"><i class="el-icon-view"></i></template>
		  </el-input>
		</div>
		<el-button style="margin-top:30px"@click="reg">注册</el-button>
	</div>
</template>

<script>
	import router from "../../router/router"
	import axios from "axios"
	export default {
		name: "reg",
		data() {
			return {
				username: "",
				password:"",
			}
		},
		created(){
			console.log(this)  
		},
		methods: {
			async reg() {
				const username=this.username
				const password=this.password

				console.log(username,password)
				const data = await axios.post("/users/reg", {
						username,
						password
				})
				console.log(data)

				if(!data.data){
					this.$message({
				        showClose: true,
				        message: '该用户名已存在!',
				        type: 'error'
			        });
				}else {
					this.$router.push({
						name: "login",
					})
				}
			}
		}
	}
</script>

<style>
	.regs{
		height: 300px;
		width: 300px;
		margin:auto;
	}
</style>