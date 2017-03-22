<template>
    <div class="applist">
      <header-view :headerObj="{title:renderTitle,path:'/other',count:0}"></header-view>
      <p v-if="renderTopImgTur"><img :src="renderTopImgTur" alt=""></p>
      <div>
        <ul>
          <template v-for="item in appListItems">
                <li @click="jump(item.id)">
                  <div class="imgTd"><img :src="item.imgSrc" alt=""></div>
                  <div>
                      <h4>{{item.title}}</h4>
                      <p>
                        <span v-for="taglist in item.tag">{{taglist}}</span>
                      </p>
                      <div v-if="item.star==5">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                      </div>
                      <div v-if="item.star==4">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="starSrc" alt="">
                        <img :src="halfStarSrc" alt="">
                      </div>
                    </div>
                  <div class="linkTd"><a href="javascript:void(0)">查看详情</a></div>
                </li>
          </template>
        </ul>
      </div>
    </div>
</template>

<script>
   import router from '../../router'
   import HeaderView from '../../components/appStore/header-x'
    export default {
        name: "appList",
        data:function(){
            return {
                topImgTrue:'',
                titles:'',
                starSrc:'./static/img/yeallow_star_full.png',
                halfStarSrc:'./static/img/yeallow_star.png',
                appListItems:[
                  {
                    imgSrc:'./static/img/hotRecomm.png',
                    title:'任务管家',
                    id:123,
                    tag:["协同效率"],
                    url:"https://baidu.com",
                    star:5
                  },{
                    imgSrc:'./static/img/hotRecomm.png',
                    title:'微活动',
                    id:456,
                    tag:["协同效率","合作良好"],
                    url:"https://baidu.com",
                    star:4
                  }
                ]
            }
        },
        computed:{
          renderTitle:function(){
            return this.titles=this.$route.query.title
          },
          renderTopImgTur:function(){
            return  this.topImgTrue=this.$route.query.topImgTrue
          }
        },
        components:{HeaderView},
        methods:{
          // initData:function(){
          //   this.topImgTrue=this.$route.query.topImgTrue,
          //   this.titles=this.$route.query.title
          // },
          jump:function(id){
            router.push({
              path:'/appDetail',
              query:{
                appid:id
              }
            });
          }
        }
    }
</script>
<style lang='scss' scoped>
@import '../../static/css/comment.scss';
  .applist{
      padding-top: 4rem;
      >div{
        padding-left: 1rem;
        >ul{
          >li{
            width: 100%;
            padding: 1rem 0;
            border-bottom: 1px $gray solid;
            >div{
              display: inline-block;
              vertical-align: top;
              text-align: left;
              >p{
                margin:.8rem 0 .5rem 0;
                >span{
                  border:1px $gray solid;
                  border-radius: .5rem;
                  padding: 0 .5rem;
                  margin-right: .5rem;
                  font-size: .5rem;
                }
              }
            }
            >.imgTd{
              width: 6rem;
              margin-right: 1rem;
              >img{
                width: 100%;
                border-radius: 1.5rem;
              }
            }
            >.linkTd{
              float: right;
              padding:1rem 1rem 0 0;
              >a{
                border: 1px blue solid;
                border-radius: .5rem;
                display: inline-block;
                padding:.5rem;
                font-size: .8rem;
              }
            }
          }
        }
      }
  }
</style>
