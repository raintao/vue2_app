<template>
	<div class="footer">
		<router-link to="/mainMsg" class="footerNav">
			<p><i class="icon iconfont icon-xiaoxi"></i></p>
			<p>消息</p>
		</router-link>

		<router-link to="/mainDing" class="footerNav">
			<p><i class="icon iconfont icon-icon-test"></i></p>
			<p>DING</p>
		</router-link>

		<router-link to="/mainWork" class="footerNav">
			<p><i class="icon iconfont icon-gongzuo"></i></p>
			<p>工作</p>
		</router-link>
		
		<router-link to="/mainContacts" class="footerNav">
			<p><i class="icon iconfont icon-lianxiren"></i></p>
			<p>联系人</p>
		</router-link>
		
		<router-link to="/mainMy" class="footerNav">
			<p><i class="icon iconfont icon-liebiao"></i></p>
			<p>我的</p>
		</router-link>
	</div>
</template>
<script>
	
	export default{
		name: 'd-footer'
	}

</script>
<style lang='scss' scoped>
	.footer{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		border-top:1px solid #E3E3E3;
		display:flex;
		display:-webkit-flex;
		.footerNav{
			flex:1;
			text-align: center;
			vertical-align: middle;
			justify-content: center;
			padding:8px 0;
			color:#7D8790;
			text-decoration:none;
			p{
				&:nth-of-type(2){
					font-size:12px;
				}
			}
		}
		.my-active{
	      	color:#38ADFF !important;
    		text-decoration:none !important;
	    }

	}
	
</style>