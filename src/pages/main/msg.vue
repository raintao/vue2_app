<template>
	<div class="cont-wap">
		<div class="msg-wap">
			<div class="msg-head">
				<div class="msg-head-log">
					<b><i class="icon iconfont icon-logozhuanhuan"></i></b>
					<span>钉钉</span>
				</div>
				<ul class="msg-head-nav">
					<li><i class="icon iconfont icon-dingdingdianhua1"></i></li>
					<li><i class="icon iconfont icon-chazhao"></i></li>
				</ul>
			</div>
			<ul class="msg-content">
				<router-link to="/msgNewFriend">
					<li>
						<div class="msg-list-log">
							<span class="dingNewFriend"><i class="icon iconfont icon-tianjiahaoyou"></i></span>
						</div>
						<div class="msg-list-cont">
							<p><span>新的好友</span><span>昨天</span></p>
							<p>这里是相关信息</p>
						</div>
					</li>
				</router-link>
				
				<li>
					<div class="msg-list-log">
						<span class="dingFile"><i class="icon iconfont icon-tianjiahaoyou"></i></span>
					</div>
					<div class="msg-list-cont">
						<p><span>文件小助手</span><span></span></p>
						<p>这里是相关信息</p>
					</div>
				</li>
				<li>
					<div class="msg-list-log">
						<span class="dingPhone"><i class="icon iconfont icon-dingdingdianhua"></i></span>
					</div>
					<div class="msg-list-cont">
						<p><span>钉钉电话</span><span>昨天</span></p>
						<p>这里是相关信息</p>
					</div>
				</li>
			</ul>
		</div>
        <main-footerNav></main-footerNav>
	</div>
</template>
<script>
	import MainFooterNav from '../../components/main/footer.vue'
	export default{
		name: 'd-msg',
        components: {
            MainFooterNav
        }
	}
</script>
<style  lang='scss' scoped>
    .cont-wap{
        width:100%;
        height:100%;
        .msg-wap{
            font-size:.16rem;
            .msg-head{
                width:100%;
                height:55px;
                border-bottom:1px solid #D2D2D2;
                .msg-head-log{
                    float:left;
                    padding-left:10px;
                    b,span{
                        display:inline-block;
                        height:55px;
                        line-height:45px;
                        float:left;
                    }
                    b{
                        i{
                            font-size:35px;
                            color:#1397F4;
                        }
                    }
                    span{
                        line-height:50px;
                        color:#1397F4;
                    }
                }
                .msg-head-nav{
                    float:right;
                    padding-right:20px;
                    li{
                        float:right;
                        width:55px;
                        height:55px;
                        text-align:right;
                        line-height:50px;
                        i{
                            font-size:23px;
                            color:#1397F4;
                        }
                    }
                }
            }
            .msg-content{
                width:100%;
                padding-left:20px;
                box-sizing:border-box;
                li{
                    width:100%;
                    height:70px;
                    display:flex;
                    .msg-list-log,.msg-list-cont{
                        float:left;
                    }
                    .msg-list-log{
                        width:78px;
                        height:100%;
                        display:flex;
                        align-items:center;
                        span{
                            display:inline-block;
                            width:55px;
                            height:55px;
                            border-radius:50%;
                            text-align:center;
                            line-height:62px;
                            background:#16C295;
                            i{
                                font-size:30px;
                                color:#fff;
                            }
                        }
                    }
                    .msg-list-cont{
                        flex:1;
                        padding-top:8px;
                        box-sizing:border-box;
                        border-bottom:1px solid #D9D9D9;
                        P{
                            
                            width:100%;
                            font-size:.13rem;
                            
                            &:first-child{
                                font-size:20px;
                                margin-bottom:8px;
                                display: flex;
                                align-items: center;
                                span{
                                    display:block;
                                    &:nth-of-type(1){
                                        float: left;
                                        color:#000;
                                        padding:0 5px;
                                    }
                                    &:nth-of-type(2){
                                        float: right;
                                        font-size:12px;
                                        color:#B8B8B8;
                                    }
                                }
                            }
                            &:last-child{
                                font-size:14px;
                                color:#888888;
                            }
                            
                        }
                    
                    }
                }
            }
        }
    }

	/* .cont-wap{
        width:100%;
        height:91.5%;
    }
    .msg-wap{
        width:100%;
        height:100%;
    }
    .msg-head{
        width:100%;
        height:.72rem;
        border-bottom:1px solid #D2D2D2;
        
    }
    
    
  
    
    
    .msg-list-log span{
        
    }
    
    
    .msg-list-log span i{
        
    }
    
    .msg-list-cont 
    .msg-list-cont 
    .msg-list-cont P:first-child span:last-child{
        
    } */
</style>