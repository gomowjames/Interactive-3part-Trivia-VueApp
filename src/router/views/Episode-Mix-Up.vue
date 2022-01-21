<script>
import Layout from '@layouts/game'
import EpisodeGameplay from '@components/episode-gameplay'

export default {

  page: {
    title: 'Episode Mix-Up',
  },

  components: { Layout, EpisodeGameplay },
}
</script>

<template>
  <Layout>
		<EpisodeGameplay />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>