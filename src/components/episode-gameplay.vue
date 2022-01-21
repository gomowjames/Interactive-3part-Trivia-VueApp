<script>
import Instructions from '@components/game-instructions'
import EpisodeRound from '@components/episode-round'
import MenuReturn from '@components/menu-return'
import json from '@assets/json/episode-data.json'

import { mixin as VueTimers } from 'vue-timers'
import { store, mutations, episodeActions } from "../store"

export default {
	name: 'EpisodeGameplay',
	components: { Instructions, EpisodeRound, MenuReturn },
  mixins: [ VueTimers ],

	dataJson:	json,	

  data() {
	  
	  return {
			game: 'EpisodeMixUp',
			loading: true,
			gameplayRounds: 6,
			roundsArr: [],
			score: 0,
		}
  },
  
// 	timers: { inactivityTimer: { time: 60000, autostart: false, repeat: false },	},
	timers: { resultsTimer: { time: 10000, autostart: false, repeat: false },	},

	computed: {
    stage: () => store.stage,
    title: () => store.title,
    rounds: () => store.rounds,
    currentRound: () => store.currentRound,
//     answers: () => store.answers,
		
    resultsInfo() {
	    	    
      if ( this.score <= 4 ) {
        return {
          text1:
            "DANG<span class='reduceSpace'>&nbsp;</span>IT",
          text2:
            "NO WORRIES.<br>LEARN MORE BY WATCHING <span style='font-style:italic'>FRIENDS!</span>"
        };
      }
      
      if ( this.score > 4 ) {
        return {
          text1:
            "WAY<span class='reduceSpace'>&nbsp;</span>TO<span class='reduceSpace'>&nbsp;</span>GO!",
          text2:
						"You really know your <span style='font-style:italic'>FRIENDS!</span>"
        };
      }

	    return {
	      text1:
	        "GOOD<span class='reduceSpace'>&nbsp;</span>WORK!",
	      text2:
	        "But it wouldn't hurt to freshen up your <span style='font-style:italic'>FRIENDS</span> vocabulary..."
	    };
    },
		
    dragOptions() {
      return {
        animation: 500,
        group: "description",
        disabled: false,
        ghostClass: "ghost"        
      }
    },
  },
	
  watch: {
/*
    stage( val ) {
      localStorage.stage = val;
    },
    
    currentRound( val ) {
			      localStorage.currentRound = val;
    },
*/
    answers( val ) {
      localStorage.answers = val;
    },
  },

	beforeMount() {
		this.fetchData();

		this.roundsArr = this.$options.dataJson.rounds
	},
  
  async mounted() {
    await this.init();
    
		this.shuffledArr = document.getElementsByTagName( 'article' )

		this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_EpMixUp_STARTED', 'KnowingFriends ' + `${this.$locationVar}` + ': Ep. Mix-Up STARTED' )
		  .then((response) => {
		    return response;
		  }).catch((err) => {
		    return err;
		  });
    
/* 		this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Ep. Mix-Up STARTED', true) */
	},

	methods: {
		plusone() {
			this.score = this.score + 1
		},
		
		resultsTimer() {
					this.$router.push({ path: '/'})
		},

    goToRound( i ) {
      mutations.setCurrentRound( i );
    },
		
    async fetchData() {
      await episodeActions.fetchData( this.$options.dataJson.rounds );
    },
    
    async init() {

      if (
        !localStorage.stage ||
        localStorage.stage === "instructions"
      ) {
        this.initInstructStage();
      } else if ( localStorage.stage === "gameOn" ) {
        this.initGameStage( localStorage.currentRound || 1 );
      } else {
        this.initResultsStage();
      }
    },
    
    initInstructStage() {
      mutations.setStage( "instructions" );
      mutations.setTitle( "INSTRUCTIONS" );
      mutations.setCurrentRound( 0 );
/*       mutations.resetAnswers(); */

      this.loading = false;
    },
    
    initGameStage( currentRound ) {
      mutations.setStage( "gameOn" );
//       mutations.setTitle( localStorage.questionText );
//       mutations.setQuestionText( localStorage.setQuestionText );
/*
      mutations.setAnswers(
        localStorage.answers ? localStorage.answers.split(",") : []
      );
*/
      this.goToRound( +currentRound || 1 );
			this.loading = false;
/* console.log("currentRound = " + this.currentRound ) */
    },
    
    initResultsStage() {
      mutations.setStage( "results" );
/*       mutations.setAnswers( localStorage.answers.split(",") ); */
      mutations.setTitle(
        `${ this.score } / ${ this.gameplayRounds }`
      );
/*       mutations.setImg(this.resultsInfo.img); */
      mutations.setCurrentRound( null );
      this.loading = false;
			this.$timer.start('resultsTimer');

			this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_EpMixUp_COMPLETED', 'KnowingFriends ' + `${this.$locationVar}` + ': Ep. Mix-Up COMPLETED' )
			  .then((response) => {
			    return response;
			    
			  }).catch((err) => {
			    return err;
			  });

/* 			this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Ep. Mix-Up COMPLETED', true) */
    },
  },
}
</script>

<template>
  <section id="episodeMixUp" style="background-color: #F05033">
	  <transition
			v-if="!loading"
			name="fade"
			mode="out-in"
			appear
		>
			<div :key="currentRound">
				<section v-if="stage === 'instructions'" class="instWrapper">
					<Instructions current-game="EpisodeMixUp" @init-game-stage="initGameStage" />
				</section>
				
		  	<section v-if="stage === 'gameOn'" class="EpisodeMixUp">
				  <EpisodeRound
						:loading="loading"
				  	:rounds-arr="roundsArr"
						:current-round="currentRound"
						:gameplay-rounds="gameplayRounds"
						:go-to-round="goToRound"
						:results-stage="initResultsStage"
						:score="score"
						:plusone="plusone"
						@addtoscore="plusone"
				  />
				</section>
				
				<section v-if="stage === 'results'" class="results">

			    <header>
				    <h2 class="triviaResult" v-html="resultsInfo.text1"></h2>
				    <h3 class="triviaResult" v-html="resultsInfo.text2"></h3>
			    </header>
	
			    <div class="scoreWrapper">
				    <h1 class="triviaResult total" v-html="title"></h1>
			    </div>
			    <footer>
						<MenuReturn />
			    </footer>		
				</section>
		    <div v-else class="loader">
		      <span></span>
		    </div>
			</div>	
	  </transition>
  </section>
</template>

<style lang="scss" module>
</style>
