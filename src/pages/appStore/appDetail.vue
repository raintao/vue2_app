<template>
  <div class="appDetail">
    <header-view :headerObj="{title:'产品详情',count:0}"></header-view>
    <div class="appShow">
            <p>{{items}}</p>
            <div class="imgTd"><img :src="item.imgsrc" alt=""></div>
            <div>
                <h4>{{item.title}}</h4>
                <p>{{item.fullname}}</p>
                <p v-if="item.isok">钉钉安全认证</p>
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
    </div>
    <mt-navbar v-model="selected"  ref="navbar" :class="{active:mtIsActive}">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 20" :title="'内容 ' + n"  key="1"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n"  key="2"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 17" :title="'选项 ' + n"  key="3"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import router from '../../router'
  import HeaderView from '../../components/appStore/header-x'
  export default {
    name:'appDetail',
    data(){
      return {
        appid:'',
        starSrc:'./static/img/yeallow_star_full.png',
        halfStarSrc:'./static/img/yeallow_star.png',
        item:{},
        selected:"1",
        mtIsActive:false
      }
    },
    mounted(){
      var _this=this;
      window.onscroll=function(){
        var hTop=_this.$refs.navbar.$el.offsetTop-document.body.scrollTop;
        if(hTop<48){
          _this.mtIsActive=true;
        }else{
          _this.mtIsActive=false;
        }
      }
    },
    computed:{
      items(){
        this.appid=this.$route.query.appid;
        this.mtIsActive=false;
        var that=this;
        document.body.scrollTop=0;
        this.$http.get('./static/appDetail.json',{"appid":this.appid}).then(res=>{
          this.item=JSON.parse(res.data).backData;
          console.log("res=>1",res);
          console.log("res.data=>2",res.data);
          console.log("res.data=>typeof",typeof(res.data));
          console.log("res.data.backData=>3",JSON.parse(res.data).backData);
        },err=>{
          console.log(err);
        });
      }
    },
    components:{HeaderView},
    methods:{
      getItem(){
        this.$http.get('./static/mockData.json').then(res=>{

          // es6=>不影响上下文this
          this.item=res.data.data;
        },err=>{
          console.log(err);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../static/css/comment.scss';
  .appDetail{
    padding:4rem 0;
    >.appShow{
      width: 100%;
      padding: 1rem;
      border-bottom: 1px $gray solid;
      >div{
        display: inline-block;
        vertical-align: top;
        text-align: left;
        >p{
          margin:.2rem 0;
        }
        >div{
          >img{width: 1.3rem;}
        }
      }
      >.imgTd{
        width: 7rem;
        margin-right: 1rem;
        >img{
          width: 100%;
          border-radius: 1.5rem;
        }
      }
    }
    .mint-navbar.active{
      position: fixed;
      top:4rem;left:0;
      width: 100%;
      z-index: 1;
    }
    .mint-navbar{
      position: relative;
      z-index: 1;
    }
  }
</style>
