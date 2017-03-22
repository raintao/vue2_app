<template>
    <div class="other">
        <h1>{{msg}}</h1>
        <div class="charts">
          <div id="charts">
              <div ref="main" id="main"  :style="{width:'600px',height:'400px'}"></div>
          </div>
        </div>
        <button type="button" name="button" @click="jump">返回</button>
    </div>
</template>

<script>
   import router from '../../router'
   //整体引入
  // import echarts from 'echarts'
   // 引入 ECharts 主模块 按需引入
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

    export default {
        name: "Other",
        data() {
            return {
                msg: "hello Other"
            }
        },
        methods:{
          jump:function(){
            router.go(-1);
          }
        },
        mounted:function(){
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(this.$refs.main);
          // 指定图表的配置项和数据
          var option = {
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                  data:['销量']
              },
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
    }
</script>
<style lang='scss' scoped>
  .other{
    .charts{
      overflow: hidden;
      height: 380px;
      >div{
        position: relative;
        overflow-x:auto;
        height: 400px;
        >div{
          position: absolute;
          left:0;
          top:0;
        }
      }
    }
  }
</style>
