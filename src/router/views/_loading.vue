<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: 'Loading page...',
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <Transition appear>
      <BaseIcon :class="$style.loadingIcon" name="sync" spin />
    </Transition>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.loadingIcon {
	
	position: absolute;
	left: 50%;
	bottom: 50%;
	transform: translate(-50%, -50%);
	z-index: 500;
	
  @extend %typography-xxlarge;

  display: block;
  margin: 0 auto;

  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter-active) {
    transition: opacity 1s;
  }
  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter) {
    opacity: 0;
  }
}
</style>
