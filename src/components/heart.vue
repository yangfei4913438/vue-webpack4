<template>
  <div >
    <div id="heart"></div>
    <router-link to="/"><span class="page">Home</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'Heart'
}
</script>

<style lang="stylus" scoped>
  .page
    color #ff9900
  #heart {
    position: relative;
    width: 200px;
    height: 180px;
    animation: scaleDraw 5s ease-in-out infinite;
  }
  #heart:before,
  #heart:after {
    position: absolute;
    content: "";
    left: 100px;
    top: 0;
    width: 100px;
    height: 160px;
    background: red;
    border-radius: 100px 100px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  #heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin :100% 100%;
  }
  
  @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
      0%{
          transform: scale(1);  /*开始为原始大小*/
      }
      25%{
          transform: scale(0.5); /*缩小0.5倍*/
      }
      50%{
          transform: scale(1);
      }
      75%{
          transform: scale(0.5);
      }
  }
</style>