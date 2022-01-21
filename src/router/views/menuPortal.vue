<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import NavBar from '@components/nav-bar'

export default {
  page: {
    title: 'Menu Portal',
  },
  
  components: { Layout, NavBar },  
}
</script>

<template>
  <Layout>
		<main>
	    <header>
		    <h2>MENU</h2>
		    <h3>SELECT A CATEGORY</h3>
	    </header>

			<NavBar />
	        
		</main>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>

