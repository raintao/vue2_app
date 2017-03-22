<template>
  <header>
    <i class="iconfont icon-back" @click="goBack"></i>
     <i v-if="closeSee" @click="closeWindow">x</i>
     <span>{{renderTitle}}</span>
   </header>
</template>

<script>
import router from '../../router'
export default {
  name:'headerX',
  props:['headerObj'],
  data:function(){
    return {
      title:'',
      count:0,
      closeSee:false,
      path:this.renderPath
    }
  },
  computed:{
    renderTitle:function(){
      this.path=this.headerObj.path || '/mainMsg';
      return this.title=this.headerObj.title
    }
  },
  methods:{
    goBack:function(){
      router.go(-1);
      //关闭当前页面用
      // if(this.count>=2){this.closeSee=true;}
      // this.count++;
    },
    closeWindow:function(){
      router.replace({ path:this.path});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/comment.scss';
  header{
    position: fixed;
    z-index: 100;
    left:0;top:0;
    height: 4rem;
    width: 100%;
    border-bottom: 1px $gray solid;
    font-size: 2rem;
    background: $white;
    >i{
      color:blue;
      font-style: normal;
      font-size: 3rem;
      padding:0 10px;
    }
    >span{
      border-left: 1px $gray solid;
      padding-left:20px;
    }
  }
</style>
