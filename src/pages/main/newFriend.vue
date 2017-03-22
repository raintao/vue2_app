<template>
	<div class="newFriend">
		<div id="header-btn-nav" class="header-btn-nav">
			<span @click="goBack" class="goBack"><</span>
			&nbsp;&nbsp;&nbsp;新的好友
		</div>
		<div class="newFriend-content">
			<ul>
				<li class="newFriend-list">
					<p class="newFriend-list-top">
						<span>小明</span>
						<span>王小明</span>
						<span>
							<router-link to=""><b>添加</b></router-link>
						</span>
					</p>
					<p class="newFriend-from">[手机联系人]王小明</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'newFriend-page',
		methods: {
			goBack(){
				window.history.back();
			}
		}
	}
</script>
<style lang='scss' scoped>
	.newFriend{
		width:100%;
		display:flex;
		flex-direction:column;
		.header-btn-nav{
			width:100%;
			height:40px;
			line-height:40px;
			padding-left:20px;
			box-sizing:border-box;
			border-bottom:1px solid #D9D9D9;
			.goBack{
				color:#1397F4;
			}
		}
		.newFriend-content{
			width:100%;
			flex:1;
			padding:15px;
			box-sizing:border-box;
			background:#F7F7F7;
			ul{
				.newFriend-list{
					width:100%;
					height:120px;
					border-radius:5px;
					background:#fff;
					box-shadow:0px 0px 3px 3px rgba(217, 217, 217, 0.4);
					padding:0 25px;
					box-sizing:border-box;
					.newFriend-list-top{
						height:80px;
						padding-top:20px;
						span{
							display:inline-block;
							float:left;
							&:nth-of-type(1){
								width:42px;
								height:42px;
								border-radius:50%;
								background:green;
								color:#fff;
								font-size:13px;
								text-align:center;
								line-height:42px;
								margin-right:15px;
							}
							&:nth-of-type(2){
								margin-top:10px;
							}
							&:nth-of-type(3){
								width:55px;
								height:25px;
								background:#38ADFF;
								text-align:center;
								line-height:25px;
								color:#fff;
								border-radius:5px;
								font-size:12px;
								float:right;
								margin-top:9px;
								a{
									text-decoration:none !important;
									color:#fff;
								}
							}
						}
					}
					.newFriend-from{
						text-align:center;
						font-size:13px;
						color:#b0b0b0;
					}
				}
			}
		}
	}
	
</style>