<template>
	<div class="addDing">
		<div class="addDing-head">
			<span><i><</i>&nbsp;&nbsp;&nbsp;新建DING</span>
			<span>发送</span>
		</div>
		<textarea class="addText" id="" rows="5" placeholder="请输入文字或语音"></textarea>
		<div class="checkDiv">
			<div class="takeIn">
				<span>接收人</span>
				<div class="takeIn-list">
					<b>+</b>
				</div>
			</div>
			<div class="sendType">
				<span>发送方式</span>
				<ul>
					<li><span>应用内</span></li>
					<li><span>短信</span></li>
					<li><span>电话</span></li>
				</ul>
			</div>
			<div class="setPro">
				<span>设为任务</span>
				<mt-switch :value.sync="value" class="dingSwitch"></mt-switch>
			</div>
			<div class="setMore">更多选项</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "d-addDing"
	}
</script>
<style lang='scss' scoped>
	.addDing{
		width:100%;
		height:100%;
		background:#EFEFF4;
		.addDing-head{
			width:100%;
			height:55px;
			line-height:55px;
			padding:0 15px;
			box-sizing:border-box;
			background:#fff;
			span{
				&:nth-of-type(1){
					color:#545759;
					i{
						color:#38ADFF;
						font-style:normal;
					}
				}
				&:nth-of-type(2){
					display:inline-block;
					float:right;
					width:80px;
					height:40px;
					background:#CBCBCB;
					color:#fff;
					text-align:center;
					line-height:40px;
					margin-top:8px;
					border-radius:3px;
				}
			}
		}
		.addText{
			width:100%;
			height:130px;
			margin-top:23px;
			border:none;
			border-top:1px solid #D4D4D6;
			border-bottom:1px solid #D4D4D6;
			padding:10px 15px;
		}
		.checkDiv{
			width:100%;
			height:130px;
			border-top:1px solid #D4D4D6;
			border-bottom:1px solid #D4D4D6;
			margin-top:23px;
			background:#fff;
			padding-left:15px;
			.takeIn{
				height:66px;
				border-bottom:1px solid #D4D4D6;
				line-height:66px;
				span{
					display:inline-block;
					float:left;
					font-size:16px;
					color:#949494;
				}
				.takeIn-list{
					display:inline-block;
					padding-top:13px;
					margin-left:59px;
					b{
						float:left;
						width:40px;
						height:40px;
						border-radius:50%;
						border:1px solid #D4D4D6;
						text-align:center;
						line-height:35px;
						font-size:30px;
						font-style:normal;
						font-weight:normal;
						color:#D4D4D6;
					}
				}
			}
			.sendType{
				overflow:hidden;
				zoom: 1;
				span,ul{
					float:left;
					line-height:65px;
					font-size:16px;
				}
				span{
					color:#949494;
				}
				ul{
					margin-left:47px;
					li{
						float:left;
						padding:0 23px;
						&:first-child{
							padding-left:0;
						}

					}
				}
			}
		}
	}
</style>