<template>
  <div class="appstore">
    <header-view :headerObj="{title:title}"></header-view>
    <component :is="currentView"></component>
    <div class="footer">
      <div :class="{active:recomIsActive}"  class="footerNav" @click="pageChange('RecommendNice','精品推荐')">
        <i class="iconfont icon-home"></i>
        <span>精品推荐</span>
      </div>
      <div :class="{active:appliIsActive}" class="footerNav" @click="pageChange('ApplicationList','应用分类')">
        <i class="iconfont icon-xiaoxi"></i>
        <span>应用分类</span>
      </div>
      <div :class="{active:compIsActive}" class="footerNav" @click="pageChange('CompanyMade','企业定制')">
        <i class="iconfont icon-lianxiren"></i>
        <span>企业定制</span>
      </div>
    </div>
  </div>
</template>

<script>
    import router from '../../router'
    import HeaderView from '../../components/appStore/header-x'
    import RecommendNice from './recommentNice'
    import ApplicationList from './application'
    import CompanyMade from './companyMade'
    export default {
        name: "appstore",
        data:function(){
            return {
                title: "精品推荐",
                currentView:RecommendNice,
                recomIsActive:true,
                appliIsActive:false,
                compIsActive:false
            }
        },
        components:{
          HeaderView,
          RecommendNice,
          ApplicationList,
          CompanyMade
        },
        methods:{
          pageChange:function(url,title){
            this.currentView=url;
            this.title=title;
            this.compIsActive=false;
            this.recomIsActive=false;
            this.appliIsActive=false;
            switch(url){
              case "RecommendNice":this.recomIsActive=true;break;
              case "ApplicationList":this.appliIsActive=true;break;
              case "CompanyMade":this.compIsActive=true;break;
          }
        }
      }
    }

</script>

<style lang='scss' scoped>
@import '../../static/css/comment.scss';
  div.appstore{
    padding: 4rem 0 5rem 0;
    .footer{
      position:fixed;
      left:0;
      bottom:0;
      z-index: 100;
      display: flex;
      display: -webkit-flex;
      border-top: 1px $gray solid;
      width:100%;
      background: $white;
      .footerNav{
        flex: 1;
        text-align: center;
        padding:5px 0;
        >i{
          font-size: 23px;
        }
        >span{
          display: block;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .footerNav.active{
        i,span{color:red;}
      }
    }
  }

</style>
