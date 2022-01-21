<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import menuPortal from '@components/menu-portal'
import { mixin as VueTimers } from 'vue-timers'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  
  components: { Layout, menuPortal },
  mixins: [ VueTimers ],

	data() {
		
		return {
			message: 0,
			showIntro: true,
			activeClass: 'active',
			inactiveClass: 'inactive',
		
			text: [
				{
					"h1": "KNOWING<br>FRIENDS"
				},
				{
					"h1": "TEST<span class='reduceSpace'>&nbsp;</span>YOUR<br>KNOWLEDGE!"
				},				
			]
		}
	},

	timers: {
		setMessage: { time: 5000, autostart: true, repeat: true },
		deActivateMenu: { time: 15000, autostart: false, repeat: false }
	},
	
	created: function() {
		window.addEventListener('click', this.activateMenu);
	},

	destroyed: function() {
		window.removeEventListener('click', this.activateMenu);
	},
	
  async mounted() {

		this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_Attract', 'KnowingFriends ' + `${ this.$locationVar }` + ': Attract' )
		  .then((response) => {
		    return response;
		  }).catch((err) => {
		    return err;
		  });

// 		this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Attract', true)
  },
	
	methods: {

		setMessage() {
			this.message === 1 ? this.message = 0 : this.message = 1
		},

		activateMenu() {
			this.showIntro = false
			// IF THERE'S INACTIVITY
			this.$timer.start('deActivateMenu')
		},
		
		// USED BY THE TIMER HENCE NO TOGGLE
		deActivateMenu() {
			this.showIntro = true
			this.$timer.stop('deActivateMenu')
		}
	},
}

</script>

<template>
  <Layout>
  	
		<transition
			name="rescind" 
			mode="out-in"
			appear
		>
		 <main v-if="showIntro">
	    <section :class="$style.logo">
		    <img src="../../assets/images/logo-HBOfriends.png" alt="HBO Friends logo image" />
	    </section>

			<transition
				name="rescind" 
				mode="out-in"
			>
		    <section :key="message"
			    :class="$style.message"
					@click="activateMenu"
				>
			    <h1 v-html="text[ message ].h1"></h1>
		    </section>
			</transition>
	
			<section :class="$style.cta">
				<h3 class="pulse">TAP TO BEGIN</h3>
			</section>
	    	    
	    <section :class="$style.legal">
		    <div class="legal-logos">
			    <img src="../../assets/images/menu_legalLogos.png" />
		    </div>
		    <small class="legal-copy">FRIENDS and all related characters and elements © & ™ Warner Bros. Entertainment Inc. (s19)<br>©2020 AT&T Intellectual Property. All rights reserved. AT&T and the AT&T logo are trademarks of AT&T Intellectual Property.</small>
	    </section>
		</main> 

    <menuPortal v-else />

		</transition>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.logo {
	height: 20vh;
	padding-top: 5vh;
	margin: 0 auto;
}

.message {
	width: 100%;
	height: 48vh;
	margin: 0 auto;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: flex-start;	
	
	h1 {
		font-family: 'Friends25th-WB', sans-serif;
		font-size: 20vh;
		line-height: .75;
		color: #FFF;
    font-weight: normal;
    margin: 12vh auto 7vh;

		@include media-breakpoint-down(md) {
			font-size: 10rem
		}
	}	
}

.cta {
	height: 10vh;
}

.legal {
	width: 100%;
	position: absolute;
	bottom: 2vh;
	left: 0;
	
	img {
    height: 5vh;
    margin: 0 auto;
	}
	
	small {
		font-family: 'AleckSans_Light', sans-serif;
		font-size: 14px;
		line-height: 1;
		color: #FFF;
	}	
}
</style>

