<script>
import Instructions from '@components/game-instructions'
import MenuReturn from '@components/menu-return'
import json from '@assets/json/trivia-data.json'
import TriviaRound from '@components/trivia-round'

import { mixin as VueTimers } from 'vue-timers'
import { store, mutations, actions } from "../store"
import { version as appVersion } from "../../package.json"

export default {
	name: 'TriviaGameplay',
	components: { TriviaRound, Instructions, MenuReturn },
  mixins: [ VueTimers ],
  
  data() {
	  
	  return {
			game: 'VocabTrivia',
			relPath: '@assets/',
			loading: true,
      correct: null,
			rounds: 6, // the number of rounds of the trivia game	
			questionindex: 0, // question index, used to show the current question
			questionData:	json, // assign the json object
			questionArr: [],
			randomArr: [],
  	}
  },
  
	timers: {
		resultsTimer: { time: 20000, autostart: false, repeat: false },
	},
	
	computed: {
    stage: () => store.stage,
    title: () => store.title,    
    questions: () => store.questions,
    currentQuestion: () => store.currentQuestion,
    answers: () => store.answers,
    
    correctAnswers() {
      let count = 0;
      this.questions.forEach( ( q, i ) => {
      	if ( q.correct_answer === this.answers[i] ) count++;
      });      
      return count;
    },
    
    resultsInfo() {
	    
	    let total = this.correctAnswers
	    
      if ( total < 2 ) {
        return {
          text1:
            "WHOOPS!",
          text2:
            "Time to catch up with <span style='font-style:italic'>FRIENDS</span><br>and watch your favorites again!"
        };
      }
      
      if ( total >= 2 && total <= 4 ) {
        return {
          text1:
            "GOOD<span class='reduceSpace'>&nbsp;</span>WORK!",
          text2:
            "But it wouldn't hurt to freshen up your <span style='font-style:italic'>FRIENDS</span> vocabulary..."
        };
      }
      
      if ( total >= 5 && total <= 6 ) {
        return {
          text1:
            "WOW!",
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
	},
  
  watch: {
/*
    stage( val ) {
      localStorage.stage = val;
    },
    
    currentQuestion( val ) {
      localStorage.currentQuestion = val;
    },
*/
    
    answers( val ) {
      localStorage.answers = val;
    },
  },
  
  async mounted() {
    await this.init();
   
// 		let userResponseSkelaton = Array(this.rounds).fill(null)

		// use questionArr to grab questions from json	
		this.questionArr = this.questionData.questions
		
		// now shuffle the questions
		this.randomArr = this.shuffleArr( this.questionArr )		

		return this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_Vocab_STARTED', 'KnowingFriends ' + `${this.$locationVar}` + ': Vocab STARTED' )
		  .then((response) => {
		    return response;
		  }).catch((err) => {
		    return err;
		  });
/* 		this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Vocab STARTED', true) */
  },
  
	methods: {
		resultsTimer() {
			this.$router.push({ path: '/'})
		},
		
		getImgUrl( imgPath ) {
			return require( '../assets/images/' + imgPath )
		},
	
		shuffleArr( array ) {
		  for ( let i = array.length - 1; i > 0; i-- ) {
		    let j = Math.floor( Math.random() * ( i + 1 ) ); // random index from 0 to i
		    [ array[i], array[j] ] = [ array[j], array[i] ]; // swap elements
		  }
		},
    
    goToQuestion( i ) {
      const qText = this.questions[ i - 1 ].question;
			mutations.setQuestionText( qText );
      mutations.setCurrentQuestion( i );
			console.log("currentQ = " + this.currentQuestion)
    },

    async fetchData() {
      await actions.fetchData( this.questionData );
    },
    
    async init() {
      await this.fetchData();
			
      if (
        !localStorage.stage ||
        localStorage.stage === "instructions" ||
        localStorage.appVersion !== appVersion ||
        localStorage.triviaVersion !== store.triviaVersion
      ) {
        this.initInstructStage();
      } else if ( localStorage.stage === "gameOn" ) {
        this.initTriviaStage( localStorage.currentQuestion || 1 );
      } else {
        this.initResultsStage();
      }
    },
    
    initInstructStage() {
      mutations.setStage( "instructions" );
      mutations.setTitle( "INSTRUCTIONS" );
/*       mutations.setImg(welcomeImg); */
      mutations.setCurrentQuestion( 0 );
      mutations.resetAnswers();

      localStorage.appVersion = appVersion;
      localStorage.triviaVersion = store.triviaVersion;

      this.loading = false;
    },
    
    initTriviaStage( currentQuestion ) {
      mutations.setStage( "gameOn" );
      mutations.setTitle( localStorage.questionText );
      mutations.setQuestionText( localStorage.setQuestionText );
      mutations.setAnswers(
        localStorage.answers ? localStorage.answers.split(",") : []
      );
      this.goToQuestion( +currentQuestion || 1 );
			this.loading = false;
    },
    
    initResultsStage() {
      mutations.setStage( "results" );
      
      mutations.setAnswers( localStorage.answers.split(",") );
      mutations.setTitle(
        `${ this.correctAnswers } / ${ this.rounds }`
      );
//       mutations.setImg(this.resultsInfo.img);
      mutations.setCurrentQuestion( null );
      this.loading = false;
			this.$timer.start('resultsTimer');

			this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_Vocab_COMPLETED', 'KnowingFriends ' + `${this.$locationVar}` + ': Vocab COMPLETED' )
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
/* 			this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': Vocab COMPLETED', true)			 */
    },
  },
}
</script>

<template>

  <section id="trivia" style="background-color: #009edb">

		<transition
			v-if="!loading"
			name="fade"
			mode="out-in"
			appear
		>
			<div :key="currentQuestion">
				
				<section v-if="stage === 'instructions'" class="instWrapper">
					<Instructions current-game="VocabTrivia" @init-game-stage="initTriviaStage" />
				</section>			  
			  
			  <section v-if="stage === 'gameOn'" id="trivia-main" class="">
					<div class="triviaCounter">{{ currentQuestion }} / {{ rounds }}</div>
				
				  <TriviaRound
				  	v-if="!loading"
				  	:rounds="rounds"
				  	:questions="questions"
						:current-question="currentQuestion"
						:go-to-q="goToQuestion"
						:results-stage="initResultsStage"
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