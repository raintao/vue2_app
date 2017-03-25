# vues_app
vuex2做了一个移动端的demo，并封装成了app并调用了手机的一些硬件(相机，扫码等)，所用到的技术有vue2，vue-router，vue-resource，vuex，mint，scss，websocket等


# 在dist文件夹下有编译好的代码和打包好的apk文件，请多多支持，给个star，谢谢！


# 1.项目从零开始搭建

          对于vue2的语法，不是很明白的同学请先到[vue2官网](https://cn.vuejs.org/v2/guide/ "vuejs官网")熟悉语法，包括es2015，webpack等，这个就不在一一说明。   
&emsp;&emsp;首先Vue.js提供的[官方命令行工具](https://github.com/vuejs/vue-cli)来初始化我们的项目：   
            # 全局安装 vue-cli
            $ npm install --global vue-cli
            # 创建一个基于 webpack 模板的新项目
            $ vue init webpack vue2_app
            # 安装依赖，走你
            $ cd vue2_app
            $ npm install
            $ npm run dev   

            &emsp;&emsp;刚开始初始化项目的时候构建工具会询问一些有关项目的一些信息，可根据自己的需要进行选择，如果你不是太明白，一路回车就可以了。对于没有翻墙的同学npm加载可能比较慢，这时可以使用淘宝的镜像cnpm，具体怎么用[点击这里](https://npm.taobao.org/)。在npm run dev之后我们就可以在浏览器中查看当前项目的内容了。对于端口冲突的同学，请在／config/index.js文件中第26行自行修改。看到下面的内容说明你的项目已经初始化成功了。   
&emsp;&emsp;&emsp;&emsp; ![success](https://github.com/raintao/vue2_app/blob/master/src/assets/11.png?raw=true)
# 2.改造自己的项目 router+scss+iconfont

        &emsp;&emsp;手写修改app.vue文件如下：         


            <template>   
             <keep-alive>   
                   <router-view></router-view>
              </keep-alive>
            </template>
            <script>
  	        export default {
                }

            </script>

            <style lang="scss">


            </style>


&emsp;&emsp;其中每个文件的代码就不再一一说明，整个项目src中的目录如下：   
&emsp;&emsp;&emsp;&emsp; ![success](https://github.com/raintao/vue2_app/blob/master/src/assets/1.png?raw=true)

# 3. scss

        &emsp;&emsp;为了使项目UI好看点，加入了样式，但是对于习惯用sass,less的同学来说，突然间用css来写样式总是感觉不太方便，这里我们就用csss的语法来编写css，对于官方提供的webpack工具，已经配置好了，我们只需要安装两个依赖的npm包就可以使用scss了，如下:    
        cnpm install sass-loader    
        cnpm install node-sass      
        注意：用windows系统的用npm安装可能会报错，建议用cnpm

# 4.mnit            
&emsp;&emsp; 由饿了么前端团队推出的 Mint UI 是一个基于 Vue.js 的移动端组件库。已发布了 2.0 版本，支持了vue2。引入方式为:   
              // ui框架  
                import MintUI from 'mint-ui'   
                import 'mint-ui/lib/style.css'   
                Vue.use(MintUI)

                  &emsp;&emsp;当然也可按需引入，来减少项目的大小。具体怎么用请参考官网：[Mint UI官网手册](http://mint-ui.github.io/docs/#!/zh-cn2)

# 5.字体文件用的是[阿里巴巴矢量图标库](http://www.iconfont.cn/),可以自定义需要哪些图标，用着比较方便。    
                // 阿里字体图标
                import './static/css/neat-min.css'
                import './static/css/iconfont.css'
#  6.vuex和vue-resource的使用
        &emsp;&emsp;vue-resource的使用比较简单，对于具体怎么使用请参考官方手册。vuex这里把store的action,getters,mutation封装成了一个独立的文件。对于他们的调用和映射等，我总结了一下，可以做个参考，如下：   
  ![总结](https://github.com/raintao/vue2_app/blob/master/src/assets/6.png?raw=true)

# 7.echart的使用

         //整体引入  
        // import echarts from 'echarts'  
        // 引入 ECharts 主模块 按需引入        
        var echarts = require('echarts/lib/echarts');   
         // 引入柱状图        
        require('echarts/lib/chart/bar');   
        // 引入提示框和标题组件  
         require('echarts/lib/component/tooltip');   
          require('echarts/lib/component/title');
                &emsp;&emsp;echart主流的web图表控件,是在canvas类库zrender的基础上做的主题图库，优点有数据驱动，图例丰富，功能强大，[官网](http://echarts.baidu.com/index.html)有更详细的介绍，有同学的可以去参考下。

# 8.websocket

        &emsp;&emsp; WebSocket协议是基于TCP的一种新的协议。WebSocket最初在HTML5规范中被引用为TCP连接，作为基于TCP的套接字API的占位符。它实现了浏览器与服务器全双工(full-duplex)通信。这个需要用nodejs做后台才能正常测试demo，后台代码在根目录下的static文件夹中。可以测试一下。  

# 9.打包成app，调用手机底层应用，比如相机等

## 9.1打包平台

### 目前能打包成app的平台很多，随着淘宝weex的开源，让webapp🈶️火了一把，目前可以打包成app的平台总结了几个：pnonegap ，APICloud，appcan，wex5 ，weex，具体怎么应用大家可以自己去各自的官网详细了解。

## 9.2调用底层

### Cordova提供了一组设备相关的API，通过这组API，移动应用能够以JavaScript访问原生的设备功能，如摄像头、麦克风等。Cordova还提供了一组统一的JavaScript类库，以及为这些类库所用的设备相关的原生后台代码。

# 10.项目的效果图

&emsp;&emsp;![页面1](https://github.com/raintao/vue2_app/blob/master/src/assets/2.png?raw=true)
&emsp;&emsp;![页面2](https://github.com/raintao/vue2_app/blob/master/src/assets/3.png?raw=true)
&emsp;&emsp;![页面3](https://github.com/raintao/vue2_app/blob/master/src/assets/4.png?raw=true)
&emsp;&emsp;![socket](https://github.com/raintao/vue2_app/blob/master/src/assets/5.png?raw=true)

# 11. 最后在项目的dist文件里面有编译好的源码和已经打包好的apk包。

# 12.请多多支持，给个star，谢谢！
