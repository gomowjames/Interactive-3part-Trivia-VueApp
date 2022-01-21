<script>

export default {
  components: {},
}
</script>

<template>
  <div :class="$style.container">
    <slot />  
  </div>
</template>

<style lang="scss" module>
.container {
/*
	background: url(../../assets/images/Friends_Pattern_Blue_TILE.png) center center repeat #009edb;
	background-size: auto;
*/
	max-width: 100%;
	min-width: 100%;
	min-height: 100vh;
  margin: 0 auto;
  background-color: transparent;
}
</style>
