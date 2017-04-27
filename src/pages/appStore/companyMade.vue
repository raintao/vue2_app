<template lang="html">
  <div class="application">
    <br>
    <p>{{count}}</p>
    <br>
    <button  @click="incrment(1)">vuex点击加一</button>
    <br>
    <button type="button" name="button" @click="http1">本地获取json</button>

    <button type="button" name="button" @click="http2">远程跨域获取jsonp</button>
    <ul>
      <li v-for="item in msg">
        {{item.text}}
      </li>
    </ul>
    <ul>
      <li v-for="item in msgs">
        <div class="content">
          <img :src="item.images.large" alt=""><br><br>
          <h3>{{item.title}}</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name:'companyMade',
  data:function(){
    return {
      msg:'CompanyMade',
      msgs:''
    }
  },
  computed:{
    ...mapState(["count"])
  },
  methods:{
    ...mapActions({incrment:'routerQuery'}),
    http1:function(){
      this.$http.get('./static/mockData.json').then(res=>{
        // this.msg=JSON.parse(res.data).data;
        this.msg=res.data.data;
        console.log(res);
        console.log("typeof(res.data)=>"+typeof(res.data),res.data);
        },err=>{
        this.msg=res;
      });
    },
    http2:function(){
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10p').then((res)=>{
        this.msgs=res.data.subjects;
        console.log(res);
        },err=>{
        this.msgs=res;
      });
    }

  }
}
</script>

<style lang="scss">
  .application{
    text-align: center;
    >ul{
      margin-top: 5rem;
      >li{
        margin: 2rem;
      }
    }
  }
</style>
