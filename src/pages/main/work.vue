<template>
	<div class="cont-wap">
		<p>this is work page</p>
		<p><button @click="jump">点击跳转应用商店</button></p>
		<main-footerNav></main-footerNav>
	</div>

</template>
<script>
	import MainFooterNav from '../../components/main/footer.vue'
	import router from '../../router'
	export default{
		name: 'd-msg',
		components: {
			MainFooterNav
		},
		methods:{
			jump:function(){
				router.push({path:'/appstore'});
			}
		}

	}
</script>
<style lang="scss" scoped>
	.cont-wap{
		text-align: center;
		>p{font-size: 3rem;}
	}
</style>
