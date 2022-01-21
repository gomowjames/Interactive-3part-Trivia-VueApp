<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
      
  data() {
	  
	  return {
			loading: true,
		}
	},
	
	mounted() {

		window.addEventListener('load', () => {
	  	this.loading = false;
    })
	}
}
</script>

<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
  	<transition v-if="!loading" name="fade" mode="out-in" appear>
	    <RouterView :key="$route.fullPath"></RouterView>
  	</transition>
  </div>
</template>

<style lang="scss">	
@font-face {
	font-family: 'Friends25th-WB';
	src:	url('./assets/fonts/Friends25thWB.woff2') format('woff2'),
				url('./assets/fonts/Friends25thWB.woff') format('woff'),
				url('./assets/fonts/Friends25thWB.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'AleckSans_Bold';
	src:	url('./assets/fonts/ATTAleckSans_Bd.woff2') format('woff2'),
				url('./assets/fonts/ATTAleckSans_Bd.woff') format('woff'),
				url('./assets/fonts/ATTAleckSans_Bd.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'AleckSans_Medium';
	src:	url('./assets/fonts/ATTAleckSans_Md.woff2') format('woff2'),
				url('./assets/fonts/ATTAleckSans_Md.woff') format('woff'),
				url('./assets/fonts/ATTAleckSans_Md.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'AleckSans_Light';
	src:	url('./assets/fonts/ATTAleckSans_Lt.woff2') format('woff2'),
				url('./assets/fonts/ATTAleckSans_Lt.woff') format('woff'),
				url('./assets/fonts/ATTAleckSans_Lt.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

	
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
	height: 100%;
}

body {
/*   background: $color-body-bg; */
	background: url('./assets/images/Friends_Pattern_Blue_TILE.png') center center repeat #009edb;
	background-size: auto;
}

figure {
	margin: 0;
}

#app {
  @extend %typography-small;
}

.red, .yellow, .blue {
	figure {
		height: 250px;
		width: 250px;
		background-color: transparent;
		border: 2px solid #000;
		border-radius: 50%;
		margin: 0 auto 40px;
		background-position: center center;
		background-size: contain;
	}	
}

.red figure { background-image: url('./assets/images/menu_mixup.png'); }
				
.yellow figure { background-image: url('./assets/images/menu_match.png'); }

.blue figure { background-image: url('./assets/images/menu_vocab.png'); }

// ===
// Base element styles
// ===

a,
a:hover,
a:visited {
  color: $color-link-text;
  text-decoration: none;
}

h1 {
  @extend %typography-xxlarge;
	font-family: 'Friends25th-WB', sans-serif;
	color: #FFF;
  font-weight: normal;
  margin: 0 auto;
	text-transform: uppercase;
}

h2 {
  @extend %typography-xlarge;
	font-family: 'Friends25th-WB', sans-serif;
	color: #FFF;
  font-weight: normal;
  margin: 0 auto;
	text-transform: uppercase;
  font-size: 7rem;
  line-height: .75;
  text-align: center;
}

h3 {
  @extend %typography-large;
	text-transform: uppercase;
	font-family: 'AleckSans_Bold', sans-serif;
  font-size: 2rem;
  line-height: 1.2;
  text-align: center;
	color: #000;
	letter-spacing: .035em;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

.active {
	display: block;
}

.inactive {
	display: none;
}

.reduceSpace {
	letter-spacing: -.05em;
}

header {
	text-align: center;
	width: 100%;
	height: 20vh;
	margin: 0 auto;
	padding: 0;
				
	h2 {
		margin-bottom: 30px;
		padding-top: 0;
		height: 10vh;
    font-size: 15vh;
    line-height: 1;
	}
	
	h3 {
		font-size: 3vh;
		margin: 10px 0 0 0;
		text-align: center;
		display: inline-block;
		line-height: 1.5;
	}
}	

.contentBox {
	height: 50vh;
	padding: 30px 3.5vh;
	width: 100%;
	position: relative;
	margin: 0 auto;
	text-align: center;
	max-width: 1100px;
	
	.innerContent {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: center;
	
		h1 {
			display: inline-block;
			margin: 1rem auto 2.5rem;
			text-transform: uppercase;
			font-family: 'AleckSans_Bold', sans-serif;
		  font-size: 4.5vh;
			line-height: 1;
		}
	}
	
	ul {
		list-style: url('~@assets/images/list-dot.png');
	}
}

.playArea {
	width: 100%;
	height: 60vh;
	margin: 0 auto;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
}

#episodeMixUp, #trivia {

	section.results {
		
		h1.total {
			font-size: 20vh;			
			line-height: 1;
			text-align: center;
			font-family: 'AleckSans_Bold', sans-serif;
			margin: 16vh auto 20vh;
		}
		
		img {
			max-width: 1000px;
			margin: 0 auto;
		}
		
		figure.menuImage {
			position: relative;
			text-align: center;
			margin: 2rem auto 0;
			padding-bottom: 3rem;
			left: unset;
			bottom: unset;	
		}
	}
}

#character-match, #episodeMixUp, #trivia {
	.triviaCounter {
		padding-top: 1vh;
		margin-bottom: 3vh;
		height: 2vh;
		font-size: 2vh;
	}

	.results {
		max-width: 100%;
		min-width: 100%;
		min-height: 100vh;
		height: 100%;
		
		header {
			height: 30vh;
			width: 100%;
			margin: 0 auto;
			padding: 5vh 0 0;
			
			h2 {
			}
			h3 {
				margin: 0;
			}
		}
		
		
		.scoreWrapper {
			height: 40vh;
			width: 100%;
			margin: 0 auto;
			padding: 0;
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: center;
			flex-direction: column;

			h4 {
				font-size: 4vh;
			  color: #000;
				font-family: 'AleckSans_Bold', sans-serif;
			  text-transform: uppercase;
			  line-height: 1;
				letter-spacing: .075em;
			  text-align: center;
			  margin: 0 auto;
			}

			h1 {
				text-transform: uppercase;
				font-family: 'AleckSans_Bold', sans-serif;
			  font-size: 20vh;
			  line-height: 1;
			  text-align: center;
				color: #FFF;
				letter-spacing: .035em;
				margin: 0;
			}
		}
		
		footer {
			height: 30vh;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: 6vh;
			
			
			figure.menuImage {
		    width: 25vh;
		    height: 8vh;
				max-width: 338px;
				max-height: 106px;
				position: relative;
				margin: 0 auto;
				background-size: contain;
				display: inline-block;
				background-repeat: no-repeat;
				outline: none;
				border: none;
				left: unset;
				bottom: unset;
			}
		}
	}
}

button.menuImage {
	background-image: url('./assets/images/button-exit.png');
	position: absolute;
	outline: none;
	border: none;
	background-color: transparent;
  background-size: contain;
  display: inline-block;
  background-repeat: no-repeat;
	left: 6vh;
	bottom: 6vh;
	width: 30vh;
  height: 10vh;
}

button.nextRoungImage {
	background-color: transparent;
	background-image: url('./assets/images/button-continue.png');
	position: absolute;
  background-size: contain;
  display: inline-block;
  background-repeat: no-repeat;
	outline: none;
	border: none;
	
	right: 6vh;
	bottom: 6vh;
	width: 30vh;
  height: 10vh;
}

button.start {
	background: url('./assets/images/frame-brushStroke.png') center center no-repeat transparent;
	background-size: contain;
  height: 16vh;
  width: 16vh;
	color: #FFF;
	margin-top: 3vh;	
	text-transform: uppercase;
	border: none;
	cursor: pointer;
	font-family: 'AleckSans_Bold', sans-serif;
  font-size: 2.5vh;
	letter-spacing: .05em;
  line-height: 1;
  text-align: center;
}

button.lock {
	background: url('./assets/images/button-lock.png') center center no-repeat transparent;
	background-size: contain;
	height: 220px;
	width: 190px;
	color: #FFF;
	text-transform: uppercase;
	border: none;
	cursor: pointer;
	font-family: 'AleckSans_Bold', sans-serif;
  font-size: 2rem;
	letter-spacing: .05em;
  line-height: 1;
  text-align: center;
}

button.close, button.skip {
	background-color: transparent;
	height: auto;
	width: auto;
	color: #FFF;
	text-transform: uppercase;
	border: none;
	cursor: pointer;
	font-family: 'AleckSans_Bold', sans-serif;
  font-size: 2rem;
	letter-spacing: .05em;
  line-height: 1;
  text-align: center;
}


// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>
