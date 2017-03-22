<template lang="html">
  <div class="application">
    <br>
    <br>
    <p>{{msg}}</p>

    <br>
    <br>
    <button type="button" name="button" @click="openCamera">调用相机</button>
    <br>
    <br>
    <button type="button" name="button" @click="openMa">扫码</button>
    <br>
    <button type="button" name="button" @click="jump('./socket')">聊天室</button>
    <br>
    <p>{{count}}</p>
    <br>
    <button  @click="incrment(1)">vuex点击加一</button>
    <br>
    <br>
    <br>
    <button  @click="incrment(-1)">vuex点击减一</button>
    <br>
    <br>
    <button type="button" name="button" @click="jump('./other')">echarts</button>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import router from '../../router'
export default {
  name:'application',
  data:function(){
    return {
      msg:'application'
    }
  },
  computed:{
   ...mapState(["count"])
  },
  methods:{
    openCamera:function(){
      var tag=this;
      summer.openCamera({
        callback : function(args){
          tag.msg=args;
        }
      });
    },
    openMa:function(){
      summer.openScanner({
          callback : function (args){
            $summer.alert(args)
          }
      });
    },
    jump:function(url){
      router.push({
        path:url
      })
    },
    ...mapActions({incrment:'routerQuery'})
    // incrment(query){
    //   this.$store.dispatch('routerQuery',query)
    // }
  }
}
</script>

<style lang="css">
</style>
