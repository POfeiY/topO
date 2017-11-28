<template>
	<div class="updateStudioBox">
		<h1>修改影院信息</h1>
		<div style="width: 300px">
			<el-input v-model="createdId" placeholder="影院_id" readonly="readonly"></el-input>
		</div>
		<div style="margin-top: 10px;width: 300px">
			<el-input v-model="createdName" placeholder="请输入影院名称"></el-input>
		</div>
		<div style="margin-top: 10px;width: 300px">
			<el-input v-model="createdAddress" placeholder="请输入影院地址"></el-input>
		</div>
		<div style="margin-top: 10px">
		  <el-button type="primary" @click="updateClick()">修改</el-button>
		  <el-button @click="resetClick()">重置</el-button>
		</div>
	</div>
</template>


<script>

	import router from "../../../router/router"//此处是在链接最外层的路由
	import { mapState, mapActions } from "vuex"

	export default{
		name:"updateStudio",
		data(){
			return {
				createdId:this.$route.params._id,
				createdName:this.$route.params.name,//v-model中绑定数据因做常规数据绑定不上做了转化
				createdAddress:this.$route.params.address
			}
		},
		methods: {
			updateClick() {
				console.log("iiiiiiii"+this.createdId+":"+this.createdName+":"+this.createdAddress)
		      	this.updateStudioAsync({
		      		_id:this.createdId,//此处id不用修改
		      		name: this.createdName,
                    address: this.createdAddress
		      	});
		      },resetClick() {
			       this.createdName="",
			       this.createdAddress=""
		      },
			...mapActions("updateStudio",["updateStudioAsync"])//第一个为状态机名称，第二个为方法名	      
	    }
	}
	 
</script>

<style>
	.updateStudioBox{
		margin-left:20px;
	}
</style>