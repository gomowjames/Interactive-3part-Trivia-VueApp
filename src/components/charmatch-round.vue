<script>
import { mutations } from "../store"

import { mixin as VueTimers } from 'vue-timers'

export default {
	
	name: 'CharMatchRound',
	components: {  },
  mixins: [ VueTimers ],
  
  props: {
	  rounds: { type: Number, required: true },
		questions: { type: Array, required: true },
	  currentQuestion: { type: Number, default: null },
	  goToQ: { type: Function },
	  resultsStage: { type: Function },
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
}
</script>

<template>
	
</template>

<style lang="scss" module>
@import '@design';
</style>
