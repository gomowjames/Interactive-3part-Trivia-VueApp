<script>

export default {
  components: {},
}
</script>

<template>
  <main :class="$style.container">
    <slot />
  </main>
</template>

<style lang="scss" module>
.container {
	max-width: 100%;
	min-width: 100%;
	min-height: 100vh;
  margin: 0 auto;
  padding: 0;

}
</style>
