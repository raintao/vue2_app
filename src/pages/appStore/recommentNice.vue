<template>
    <div class="application">
        <warp-slider :sliderUrl="{sliderUrlObj:obj}"></warp-slider>
        <div class="hot">
          <h4>热门推荐 <span @click="jump('/applist','热门推荐','./static/img/slider1.png')">显示全部</span></h4>
          <div>
            <div>
            <ul>
              <template  v-for="item in hotItems">
                <li @click="jump('/appDetail',123)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{item.title}}</p>
                </li>
              </template>
            </ul>
            </div>
          </div>
        </div>
        <div class="company">
          <h4>企业推荐 <span @click="jump('/applist','企业推荐','./static/img/slider2.jpg')">显示全部</span></h4>
          <div>
            <div>
            <ul>
              <template  v-for="item in companyItems">
                <li @click="jump('/appDetail',123)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{item.title}}</p>
                </li>
              </template>
            </ul>
          </div>
          </div>
        </div>
        <div class="service">
          <h4>服务永续专题 <span @click="jump('/applist','服务永续专题','./static/img/slider3.jpg')">显示全部</span></h4>
          <div>
            <div>
            <ul>
              <template  v-for="item in serviceItems">
                <li @click="jump('/appDetail',123)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{item.title}}</p>
                </li>
              </template>
            </ul>
            </div>
          </div>
        </div>
        <p @click="jump('/applist','全部应用')">全部应用</p>
    </div>
</template>

<script>
   import WarpSlider from '../../components/appStore/slider'
   import router from '../../router'
    export default {
        name: "application",
        data:function() {
            return {
                msg: "hello application",
                hotItems:[
                  {
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'小圈ERP'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'小圈ERP'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'小圈ERP'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  }
                ],
                companyItems:[
                  {
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'阿里商旅'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'天猫企业购'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  }
                ],
                serviceItems:[
                  {
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'销帮帮CRM'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'微活动'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'爱克CRM'
                  },
                  {
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  },{
                    imgSrc:"./static/img/hotRecomm.png",
                    title:'任务管家'
                  }
                ],
                obj:{
                  slider0:"./static/img/slider1.png",
                  slider1:"./static/img/slider2.jpg",
                  slider2:"./static/img/slider3.jpg"
                }
            }
        },
        components:{WarpSlider},
        methods:{
          jump:function(url,title,imgSrc){
            router.push({
              path:url,
              query:{
                topImgTrue:imgSrc,
                title:title,
                appid:title
              }
            });
          }
        }

    }
</script>
<style lang='scss' scoped>
  @import '../../static/css/comment.scss';
  .application{
    >p{
      text-align: center;
      font-size: 2rem;
      padding:2rem;
      cursor: pointer;
    }
    >div>{
      >h4{
        padding:1rem;
        font-size: 2rem;
        text-align: left;
        padding-left: 1.5rem;
        >span{
          float:right;
          color:$gray;
          font-size:1.5rem;
          cursor:pointer;
        }
      }
      >div{
        height: 140px;
        overflow: hidden;
        border-bottom: 1px $gray solid;
        >div{
          position: relative;
          height: 120%;
          overflow-x:auto;
          >ul{
            overflow: hidden;
            position: absolute;
            left:0;top:0;
            z-index: 1;
            width: 700px;
            >li{
              float: left;
              text-align: center;
              margin:1rem;
              >img{
                width: 6rem;
                height: 6rem;
                border-radius: 1.5rem;
              }
              >p{
                padding: 1rem;
                font-size: 1.5rem;
              }
            }
          }
        }
      }
    }
    .company{
      >div>div>ul{width: 340px;}
    }
  }
</style>
