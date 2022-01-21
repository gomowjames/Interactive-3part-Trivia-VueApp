<script>
import TriviaInputs from '@components/trivia-inputs'
import { mutations } from "../store"
import Modal from '@components/game-modal'
import MenuReturn from '@components/menu-return'

import { mixin as VueTimers } from 'vue-timers'

export default {
	
	name: 'TriviaRound',
	components: { TriviaInputs, Modal, MenuReturn },
  mixins: [ VueTimers ],
  props: {
	  rounds: { type: Number, required: true },
		questions: { type: Array, required: true },
	  currentQuestion: { type: Number, default: null },
	  goToQ: { type: Function,  required: true },
	  resultsStage: { type: Function, required: true },
	},
	
  data() {
	  return {
			usersAnswer: null,
			answerStatus: null,
			correctAnswer: null,
			isModalVisible: false,
			showFeedbackVideo: true,
			showCountdown: true,
			nextQuestion: null,

			timeLeft: null,
			
			countdownTime: 30,
  	}
  },
  
	timers: {
		qTimer: { time: 1000, autostart: false, repeat: true },
	},
	  
	watch: {
			  
  	isModalVisible: function(newVal, oldVal) {

			if ( newVal ) {
				this.videoEl = document.getElementById('modalVideo')	
				this.modalPlayVideo( this.videoEl );		
			}
    },
  },

	mounted(){
		this.timeLeft = this.countdownTime
		this.$timer.start('qTimer');
	},
  
  methods: {
		qTimer() {
			if ( this.timeLeft === 0 ) {

				this.$timer.stop( 'qTimer' )
				
				if ( this.currentQuestion + 1 > this.rounds ) {
					this.resultsStage();
				} else {
					
					mutations.addAnswer( null );
					this.goToQ( this.currentQuestion + 1  );
				}
				
				this.$analytics.event('Knowing Friends', 'TimeOut', { evLabel: `${this.$locationVar}` + " Vocab: Question Time Out", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });
	    
	    } else {
				this.timeLeft--
	    }
		},  
	  
		modalPlayVideo( video ) {
			this.modalVideoOnEnd( video )

			if ( video.tagName.toLowerCase() === 'video' ) {				
				video.load();
				video.play();
				return
			}

			video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';

		},

		modalVideoOnEnd( vid ) {			
			vid.onended = (event) => {

			  this.showFeedbackVideo = false
				this.isModalVisible = false
				this.showCorrect() 
			  
	      setTimeout( () => {

					this.handleFeedback()

	      }, 2000 );			  
			}
		},

		modalStopVideo() {
			var video = document.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');
			if ( !video ) return;

			if ( video.tagName.toLowerCase() === 'video' ) {
				video.pause();
				return;
			}

			video.src = video.src.replace('&autoplay=1', '').replace('?autoplay=1', '');		
		},

		showModal() {
			this.showCountdown = false
			this.isModalVisible = true
			
			this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_VocabModal', 'Vocab Answer Clip ' + `${this.$locationVar}` )
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
			
/* 			this.$ua.trackView('Vocab Answer Clip: ' + `${this.$locationVar}`  , true) */
/* 			this.modalPlayVideo() */
		},

		closeModal() {
			this.isModalVisible = false;
			this.modalStopVideo();
			this.showFeedbackVideo = true;
			this.handleFeedback()
		},

	  handleFeedback() {
			mutations.setStage( "gameOn" );	

			this.usersAnswer = null;
			
			if ( this.nextQuestion <= this.rounds ) {
				
				this.showCountdown = true
        this.goToQ( this.nextQuestion )
        
      } else {
        this.resultsStage();    
      }
	  },
	  
    handleAnswer( answer, correct ) {

/* 			this.$ua.trackEvent( "Knowing Friends", "Click", `${this.$locationVar}` + " Vocab: Answer selected", 1 ) */

			this.$timer.stop( 'qTimer' )

			this.correctAnswer = correct;
			
      if ( this.usersAnswer !== null ) return;

      this.usersAnswer = answer;

			if ( this.usersAnswer === correct ) {
				this.answerStatus = true;

				this.$analytics.event('Knowing Friends', 'Click', { evLabel: `${this.$locationVar}` + " Vocab: Answer CORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });

/* 				this.$ua.trackEvent( "Knowing Friends", "Click", `${this.$locationVar}` + " Vocab: Answer CORRECT", 1 ) */
			} else {
				this.answerStatus = false;
				
				this.$analytics.event('Knowing Friends', 'Click', { evLabel: `${this.$locationVar}` + " Vocab: Answer INCORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });
/* 				this.$ua.trackEvent( "Knowing Friends", "Click", `${this.$locationVar}` + " Vocab: Answer INCORRECT", 1 ) */
			}

      mutations.addAnswer( answer );

      this.nextQuestion = +this.currentQuestion + 1;

      setTimeout( () => {

				this.showModal();
	    }, 1000 );
    
			this.$analytics.event('Knowing Friends', 'Click', { evLabel: `${this.$locationVar}` + " Vocab: Answer selected", evValue: 1 })
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
    },

  	showCorrect() {
			if ( this.usersAnswer	!== this.correctAnswer ) {
				
				let selected = document.getElementsByClassName('selected')
				selected[0].classList.remove('selected')
				
				let newCorrect = document.getElementsByClassName('correct')
				newCorrect[0].classList.add('selected')
			}
  	},
  },

}
</script>

<template>

	<div :class="$style.triviaInputs" class="triviaInputs">

		<TriviaInputs
			:question-text="questions[currentQuestion - 1].question"
			:correct-answer="questions[currentQuestion - 1].correct_answer"
			:answers="questions[currentQuestion - 1].answers"
			:users-choice="usersAnswer"
			@pass-answer="handleAnswer"
		/>
		<footer class="countdown">
			<transition
				name="rescind" 
				mode="out-in"
				appear
			>
				<div v-if="showCountdown" id="countdown">{{ timeLeft }}</div>
			</transition>
		</footer>
		<Modal
			v-show="isModalVisible"
			:show-feedback-video="showFeedbackVideo"
			:answer-status="answerStatus"
			@close="closeModal"
		/>

		<transition
			name="rescind" 
			mode="out-in"
			appear
		>
			<div class="return" >
				<MenuReturn />
			</div>
		</transition>
	</div>
</template>

<style lang="scss" module>
	.triviaInputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
</style>
