<script>
import NavBar from '@components/nav-bar'

export default {  
  components: { NavBar },

  mounted() {

		this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_MenuPortal', 'KnowingFriends ' + `${ this.$locationVar }` + ': Menu Portal' )
		  .then((response) => {
		    return response;
		  }).catch((err) => {
		    return err;
		  });

// 		this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Menu Portal', true)
  },  
}
</script>

<template>
	<section :class="$style.menuPortal">
    <header>
	    <h2>MENU</h2>
	    <h3>WHAT&#8217;S YOUR AREA OF EXPERTISE?</h3>
    </header>
		
		<div :class="$style.portalMain">
			<NavBar :class="$style.portal" />
		</div>
	</section>
</template>

<style lang="scss" module>
.menuPortal {
	header {
		padding-top: 5vh;
	}
}

.portalMain {
	height: 60vh;
	width: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
}

ul.portal {
  text-align: center;  
  list-style-type: none;
  padding: 0;
	margin: 0 auto;
	position: relative;
	
	li {
		display: inline-block;
		text-align: center;
		padding: 0 50px;
		max-width: 33.33333%;
		position: relative;

		h4 {
			font-family: 'AleckSans_Bold', sans-serif;
			font-size: 30px;
			letter-spacing: .1em;
			text-transform: uppercase;
			line-height: 1.1;
			color: #FFF;
			max-width: 230px;
			margin: 0 auto;
		}
	}
}
</style>

