<template>
  <div>
    <div id="round"></div>
    <router-link to="/"><span class="page">Home</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'Round'
}
</script>

<style lang="stylus" scoped>
  .page
    color #ff9900
  #round
    width: 192px;
    height: 96px;
    background: #eee;
    border-color: red;
    border-style: solid;
    border-width: 4px 4px 100px 4px;
    border-radius: 100%;
    position: relative;
    animation: App-logo-spin infinite 15s linear;
  #round:before
     content: "";
     position: absolute;
     top: 50%;
     left: 0;
     background: #eee;
     border: 36px solid red;
     border-radius: 100%;
     width: 24px;
     height: 24px;
  #round:after
     content: "";
     position: absolute;
     top: 50%;
     left: 50%;
     background: red;
     border: 36px solid #eee;
     border-radius:100%;
     width: 24px;
     height: 24px;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>