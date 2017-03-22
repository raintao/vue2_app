<template>
    <mt-swipe :auto="5000" :showIndicators='true' class="mySlider">
      <mt-swipe-item class="swipe-item">
        <img :src="url.slider0" alt="">
      </mt-swipe-item>
      <mt-swipe-item class="swipe-item">
        <img :src="url.slider1" alt="">
      </mt-swipe-item>
      <mt-swipe-item class="swipe-item">
        <img :src="url.slider2" alt="">
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  name:"Slider",
  props:['sliderUrl'],
  data:function(){
    return {
      url:this.sliderUrl.sliderUrlObj
    }
  },
  methods:{
    log:function(){
      console.log(this.url.slider0);
    }
  }
}

</script>

<style lang="scss" scoped>
.mySlider{
  height: 200px;
  text-align: center;
  background-color: #aaa;
  .swipe-item{
    >img{width: 100%;height: 100%;}
  }
}


</style>
