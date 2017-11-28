<template>
  <div id="app">
  	<div class='header'>
  		<div class="logoWrap">
  			<i class='logo'></i>
  		</div>
  	</div>
  	<div class="emptyHolder"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import router from "./router/router.js"
  export default {
    name: 'app'
  }
</script>

<style>

	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	}
	.header{
		position:fixed;
		width:100%;
		height:60px;
		background-color:#444444;
		z-index: 10;
	}
	.logoWrap{
		width: 1198px;
		height:60px;
		margin: auto;
		text-align: left;
	}
	.logo{
		display:inline-block;
		margin-top: 15px;
		width: 215px;
		height: 31px;
		background: url('./img/logo.png');
	}
	.emptyHolder{
		height: 60px;
		width: 100%;
	}
</style>
