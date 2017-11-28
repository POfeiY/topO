<template>
	<div class="addStudioBox">
		<h1>影院信息</h1>
		<div style="width: 300px">
			<el-input v-model="name" placeholder="请输入影院名称"></el-input>
		</div>
		<div style="margin-top: 10px;width: 300px">
			<el-input v-model="address" placeholder="请输入影院地址"></el-input>
		</div>
		<div style="margin-top: 10px">
		  <el-button type="primary" @click="addClick()">新增</el-button>
		  <el-button @click="resetClick()" disable>重置</el-button>
		</div>
	</div>
</template>


<script>

	import router from "../../../router/router"//此处是在链接最外层的路由
	import { mapState, mapActions } from "vuex"

	export default{
		name:"addStudio",
		data(){
			return {
                 name:'红瓦寺影院',
                 address:'共和村'
			}
		},
	    computed: {
	      
	    },
	    created() {
	      
	    },
		methods: {
			addClick() {
		        console.log(this.name);
		        console.log(this.address);
		      	this.addStudioAsync({
		      		name: this.name,
                    address:this.address
		      	});
		      },
		    resetClick() {
			       this.name="",
			       this.address=""
		    },
			...mapActions("addStudio",["addStudioAsync"])//第一个为状态机名称，第二个为方法名  
	    }
	}
	 
</script>

<style>
	.addStudioBox{
		margin-left:20px;
	}
</style>