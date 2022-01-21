<script>
import Episode from '@components/episode-single'
import EpisodeModal from '@components/episode-modal'
import MenuReturn from '@components/menu-return'
import draggable from 'vuedraggable'
import { mixin as VueTimers } from 'vue-timers'

export default {
	name: 'EpisodeRound',
  components: { Episode, EpisodeModal, MenuReturn, draggable },
  mixins: [ VueTimers ],
	props: {
	  gameplayRounds: { type: Number, required: true },
		roundsArr: { type: Array, required: true },
		currentRound: { type: Number, required: true },
	  resultsStage: { type: Function, required: true },
		goToRound: { type: Function, required: true },
		score: { type: Number, required: true },
		plusone: { type: Function, required: true },
	},
	timers: {
		lockTimer: { time: 1000, autostart: false, repeat: false },
		feedbackText: { time: 3000, autostart: false, repeat: false },
		feedbackTimer: { time: 4000, autostart: false, repeat: false },
		inactivityTimer: { time: 1200000, autostart: true, repeat: false },
	},

  data() {
	  return {
// 		  feedbackVisible: false,
			isModalVisible: false,
			headerState: "showMain",
			roundData: [],
			nextRound: null,
			correctOrder: [],
			userOrder: [],
			userOrderNums: [],
			videopath: null,
			correctAnswer: true,
			lockedStatus: false,
			showButtons: false,
			publicPath: process.env.BASE_URL,
		}
	},
	
	computed: {
    dragOptions() {
      return {
        animation: 500,
        disabled: false,
        ghostClass: "ghost"        
      }
    },
    
	  headerMessage() {
	    switch ( this.headerState ) {
	      case 'showMain': return 'main'
	      case 'showNone': return 'invisible'
	      case 'showCorrect': return 'correct'
	      case 'showWrong': return 'wrong'
	    }
	  },
  },
  
  beforeMount() {
	  this.roundData = this.roundsArr[this.currentRound - 1]

		// Populate array with the correct order
		this.roundData.episodes.forEach( (episode )=> this.correctOrder.push( episode.episodeNum ) );
// print episode numbers
// this.roundData.episodes.forEach( (episode )=>console.log(episode.episodeNum ) );

/* console.log( "correctOrder = " + this.correctOrder ) */
		
		this.shuffleArr( this.roundData.episodes );
// print shuffled episode numbers
// this.roundData.episodes.forEach( (episode )=>console.log(episode.episodeNum ) );
		this.userOrderNums = this.roundData.episodes.map( a => a.episodeNum )
		this.userOrder = this.roundData.episodes
  },
  
  methods: {
		feedbackText() { this.isSorted() },
		
	  feedbackTimer() {
			this.nextRound = this.currentRound + 1;

			this.showButtons = true
	  },
	  
		inactivityTimer() {
			this.$router.push({ path: '/'})
			
			this.$analytics.event('Knowing Friends', 'TimeOut', { evLabel: `${this.$locationVar}` + " Ep. Mix-Up: Time Out", evValue: 1 })
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
			
/* 			this.$ua.trackEvent( "Knowing Friends", "TimeOut", `${this.$locationVar}` + " Ep. Mix-Up: Time Out", 1 ) */
		},

		checkRound() {
			if ( this.nextRound <= this.gameplayRounds ) {	
	        this.goToRound( this.nextRound )
      } else {
        this.goToRound( 1 )
        this.resultsStage();
      }
		},

		dropEnd( array ) {
			draggable.isDragging = false
			
			// push current order via episodeNums to array for checking
			this.userOrderNums = array.episodes.map( a => a.episodeNum )
			this.userOrder = array.episodes
			
/* console.log("submitted array = " + this.userOrder)			 */
		},
	  
		showModal( videoToPlay ) {			
			this.videopath = videoToPlay
			this.isModalVisible = true;
// 			this.modalPlayVideo( videoToPlay );

			this.$analytics.event('Knowing Friends', 'Click', { evLabel: `${this.$locationVar}` + " Ep. Mix-Up: Clip PLAYED", evValue: 1 })
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
/* 			this.$ua.trackEvent( "Knowing Friends", "Click", `${this.$locationVar}` + " Ep. Mix-Up Clip PLAYED", 1 ) */
		},

		closeModal() {
			this.isModalVisible = false;
/* 			console.log("this.isModalVisible = " + this.isModalVisible ) */
// 			this.videopath = videoToPlay
// 			this.modalStopVideo( videoToPlay );
		},
		
		showFeedback( i, correct, user, videoEl ) {
			(function (i) {
			    setTimeout( function() {
				    
							if ( correct[i] !== user[i].episodeNum ) {
								videoEl.children[i].elm.classList.add( 'wrong' )
				    	}
				    	else {
								videoEl.children[i].elm.classList.add( 'correct' )
				    	}
			    }, 750 * i );
			})(i);
		},

	  async lockOrder() {
			this.lockedStatus = true
			this.headerState = "showNone"
			this.$timer.start('lockTimer');
	  },

		lockTimer() {
			this.judgement();
		},

		judgement() {
			for ( let i = 0, l = this.correctOrder.length; i < l; i++ ) {
				this.showFeedback( i, this.correctOrder, this.userOrder, this.$refs.clips )
			}
			this.$timer.start('feedbackTimer');
			this.$timer.start('feedbackText');
		},

		isSorted() {
			// Iterate through array to see if it is in numerical order
			let result = this.userOrderNums.every( ( val, i, arr ) => !i || ( val >= arr[i - 1] ) );
			this.correctAnswer = result;
			
			if ( result ) {
				this.headerState = "showCorrect"
				this.plusone()

				this.$analytics.event('Knowing Friends', 'Submit', { evLabel: `${this.$locationVar}` + " Ep. Mix-Up: Answer CORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });

/* 				this.$ua.trackEvent( "Knowing Friends", "Submit", `${this.$locationVar}` + " Ep. Mix-Up: Answer CORRECT", 1 ) */

			} else {
				this.headerState = "showWrong"

				this.$analytics.event('Knowing Friends', 'Submit', { evLabel: `${this.$locationVar}` + " Ep. Mix-Up: Answer INCORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });	
/* 				this.$ua.trackEvent( "Knowing Friends", "Submit", `${this.$locationVar}` + " Ep. Mix-Up: Answer INCORRECT", 1 ) */
			}
		},
	
		shuffleArr( array ) {
		  for ( let i = array.length - 1; i > 0; i-- ) {
		    let j = Math.floor( Math.random() * ( i + 1 ) ); // random index from 0 to i
		    [ array[i], array[j] ] = [ array[j], array[i] ]; // swap elements
		  }
		},
  },
}
</script>

<template>
	<div :class=" lockedStatus ? 'disableAll' : '' " class="roundWrapper">

		<transition
			name="fade" 
			mode="out-in"
		>
			<header v-if="headerState === 'showMain' " key="main" class="">
				<div class="triviaCounter">{{ currentRound }} / {{ gameplayRounds }}</div>
				<h2>Episode<span class='reduceSpace'>&nbsp;</span>Mix-Up</h2>
				<h3>put these episodes in the correct order in which they appeared</h3>
			</header>
			<header v-if="headerState === 'showCorrect' " key="feedbackCorrect" class="headerResults">
				<h2 class="correct">NICE<span class='reduceSpace'>&nbsp;</span>JOB!</h2>
				<h3>You really know your <span style="font-style:italic;">FRIENDS</span>.</h3>
				<figure class="nextRoungImage"></figure>
				<MenuReturn />
			</header>
			<header v-if="headerState === 'showWrong' " key="feedbackWrong" class="headerResults">
				<h2 class="wrong">Whoops!</h2>
				<h3>Watching <span style="font-style:italic;">FRIENDS</span> makes the master.</h3>
			</header>
			<header v-if="headerState === 'showNone' " key="invisible">
				
			</header>
		</transition>
	
<!-- <p v-for='( episode ) in roundData.episodes' style="color:#FFF" >{{ episode.episodeNum }}</p> -->
		<section class="playArea">	
			<draggable
				v-model="roundData.episodes"
				v-bind="dragOptions"
				draggable="li.imgWrapper"
				class="draggableObj"
	      @start="isDragging = true"
	      @end="dropEnd( roundData )"
			>
				<transition-group
					ref='clips'
					name="fade"
					class='episodes'
					tag="ul"
				>
					<Episode
						v-for='( episode ) in roundData.episodes'
						:key='episode.episodeNum'
						:episode-num='episode.episodeNum'
						:stillpath="episode.stillpath"
						:videopath='episode.videopath'
						:publicpath="publicPath"
						@show-modal="showModal"
					/>

				</transition-group>
			</draggable>			

			<EpisodeModal
				v-show="isModalVisible"
				:visible="isModalVisible"
				:videopath="videopath"
				:publicpath="publicPath"
				@close="closeModal"
			/>
		</section>
			

		<footer class="footer">
			<transition key="lock" name="fade" mode="out-in">	
			<div v-if="headerState === 'showMain' " class="lock">
				<button type="button" class="lock" @click.prevent="lockOrder"></button>
			</div>
			</transition>
			<div class="buttonWrapper">
				<transition
					name="fade" 
					mode="out-in"
				>
					<div v-if="showButtons" key="buttons">
						<button class="nextRoungImage" type="button" @click.prevent="checkRound"></button>
						<MenuReturn />
					</div>
				</transition>
			</div>
		</footer>
	</div> <!-- close .ROUNDWRAPPER -->

</template>

<style lang="scss" module>
.buttonWrapper {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	z-index: 100;
}
</style>
