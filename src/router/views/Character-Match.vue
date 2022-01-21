<script>
import Layout from '@layouts/game'
import CharMatchGameplay from '@components/charmatch-gameplay'

export default {
  page: {
    title: 'Character Match',
  },
  components: { Layout, CharMatchGameplay },
}
</script>

<template>
  <Layout>
    <CharMatchGameplay />    
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>

