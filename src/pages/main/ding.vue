<template>
	<div class="dingcont-wap">
		 <div class="dingCont-head">
		 	<div class="contSel">全部</div>
		 	<ul class="dingCont-head-left">
		 		<router-link to="/addDing">
		 			<li>
			 			<i class="icon iconfont icon-plus"></i>
			 		</li>
		 		</router-link>
		 		
		 		<li>
		 			<i class="icon iconfont icon-chazhao"></i>
		 		</li>
		 		<li>
		 			<mt-switch :value.sync="value" class="dingSwitch"></mt-switch>
		 		</li>
		 	</ul>
		 </div>
		<main-footerNav></main-footerNav>
	</div>
</template>
<script>
	import MainFooterNav from '../../components/main/footer.vue'
	export default {
		name: 'd-ding',
		components: {
			MainFooterNav
		},
		data: function(){  
			return {
				value: true
			}
		}
	}
</script>
<style lang='scss' scoped>
	.dingcont-wap{
		.dingCont-head{
			width:100%;
			height:55px;
			border-bottom: 1px solid #D2D2D2;
			.contSel{
				float:left;
				padding-left:20px;
				color: #666;
				line-height:55px;
			}
			.dingCont-head-left{
				float:right;
				margin-right:10px;
				li{
					float:right;
					line-height:50px;
					margin:0 8px;
					color:#38ADFF;
					i{
						font-size:21px;
					}
					.dingSwitch{
						margin-top:10px;
					}
				}
			}
		}
	}
</style>