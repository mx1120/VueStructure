<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import * as types from 'vuex'
export default {
  name: 'App',
  computed:{
	  ...types.mapState({
	  	direction: state => state.direction
      })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "assets/scss/reset.scss";
    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
      will-change: transform;
      transition: all 0.25s linear;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      position: absolute;
      backface-visibility: hidden;
      perspective: 1000;
    }

    .vux-pop-out-enter {
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        transform: translate3d(-100%, 0, 0);
    }
</style>
