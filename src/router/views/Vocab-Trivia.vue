<script>
import Layout from '@layouts/game'
import TriviaGameplay from '@components/trivia-gameplay'

export default {
  page: {
    title: 'Friends Vocab',
  },
  
  components: { Layout, TriviaGameplay },
}
</script>

<template>
  <Layout>
	
		<TriviaGameplay />
							
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>