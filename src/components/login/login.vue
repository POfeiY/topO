<template>
	<div class="logins">
		<h1>登陆界面</h1>
		<div>
		  <el-input placeholder="请输入账号" v-model="username">
		    <template slot="prepend"><i class="el-icon-edit"></i></template>
		  </el-input>
		</div>
		<div>
		  <el-input placeholder="请输入密码" style="margin-top:20px" v-model="password">
		    <template slot="prepend"><i class="el-icon-view"></i></template>
		  </el-input>
		</div>
		<el-button @click="login">登陆</el-button>
		<el-button @click="reg" style="margin-left:153px;margin-top:20px">注册</el-button>

	</div>
</template>

<script>

	import router from "../../router/router"
	import axios from "axios"

	export default{
		name:"login",
		data(){
			return{
				username: "",
				password: ""
			}
		},
		methods:{
		async login({username=this.username,password=this.password}={}){
					const data = await axios.post("/users/login",{
						  	username,
						  	password
						})
					console.log(data)
					if(data.data.isLogin==false){
							this.$message({
				        showClose: true,
				        message: '帐号或密码输入错误!',
				        type: 'error'
			        });
					}else{
						this.$router.push("/info")
					}
					
				},
				reg(){
					this.$router.push("/reg")
				}
			},
			
		}

	
</script>

<style>
	.logins{
		height: 300px;
		width: 300px;
		margin:auto;
	}
</style>