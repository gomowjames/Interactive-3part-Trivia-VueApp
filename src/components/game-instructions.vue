<script>
import { gameColors } from '../directives/gameColors.js'

export default {

	name: 'Instructions',	

	directives: { gameColors },

	props:
		[ 'currentGame' ],

	data() {
		return {
			gameIndex: [],
			currentData: [],

			games:
				[{
// EpisodeMixUp: {
									name: "EpisodeMixUp",
									title: "Episode<span class='reduceSpace'>&nbsp;</span>Mix-Up",
									desc: "put these episodes in the correct order in which they appeared",
									instructs:	[
																"TAP any image to watch a clip.",
																"TAP + HOLD to drag and re-order episodes.",
																"When satisfied, lock to check your order."
															],
									color: "#F05033",
									darkColor: "#5b240f"
},

{
// CharMatch: {
								name: "CharMatch",
								title: "Match",
								desc: "match each friend to their object or interest",
								instructs:	[
															"TAP + HOLD to drag a character into position.",
															"Correct answers earn points.",
															"Incorrect answers deduct points.",
															"We'll give you 600 points to get started."
														],
								color: "#ffb001",
								darkColor: "#664600"
},
{
// VocabTrivia: {
								name: "VocabTrivia",
								title: "Friends<span class='reduceSpace'>&nbsp;</span>Vocab",
								desc: "Six multiple choice questions",
								instructs:	[
															"READ the question and each possible answer.",
															"TAP the one you believe is correct.",
															"WATCH to see if you picked correctly!"
														],
								color: "#009edb",
								darkColor: "#004059"	
}
			]
		}
	},

/*   beforeMount() { */
  beforeMount() {
	  
		this.gameTag = this.currentGame;
	  
// 	  console.log("gameTag = " + this.gameTag );

		this.gameIndex = this.games.filter( game => game.name === this.gameTag );
	},
	
	mounted() {
	},
	
	methods: {
		passStartClick() {
// 			console.log( "passStartClick clicked" )
			this.$emit( "init-game-stage" )			
		}
	},
	
}
</script>

<template>
	<div v-game-color="gameIndex[0].darkColor" class="instructions" :class="currentGame">

		<header>
			<h2 v-html="gameIndex[0].title"></h2>
			<h3>{{ gameIndex[0].desc }}</h3>	
		</header>

		<div class="contentBox">			
			<div  v-game-color="gameIndex[0].color" class="innerContent">
				<h1>HOW TO PLAY</h1>
				<ul >
					<li
						v-for="(step, index) in gameIndex[0].instructs"
						:key="index"
					>
					{{ step }}
					</li>
				</ul>
			</div>
			
			<div class="frame">
				<img src="@assets/images/frame-instructions-borderStroke.png" alt="frame-instructions-borderStroke" /><!-- width="1016" height="589" -->
			</div>
		</div>		

    <button
			type="button"
      class="start"
      @click="passStartClick"
    >START</button>
	</div>
</template>

<style lang="scss" module>
@import '@design';

</style>
