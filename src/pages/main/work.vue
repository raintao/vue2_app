<template>
	<div class="cont-wap">this is work page
		<p><button @click="jump">应用商店</button></p>
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
				router.push({path:'/recommend/children/application'});
			}
		}

	}
</script>
<style>

</style>
