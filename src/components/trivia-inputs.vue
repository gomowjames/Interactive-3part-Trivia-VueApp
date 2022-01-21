<script>
// import handleAnswer from '@components/trivia-gameplay'
	
export default {
	name: "TriviaInputs",
	props: {
		questionText: { type: String, default: null },
		questionBuzzWord: { type: String, default: null },
		correctAnswer: { type: String, default: null },
		answers: { type: Array, required: true },
		usersChoice: { type: String, default: null },
	},
	
	data() {
		return {
			showQuestion: true,
			isActive: true,
			selected: undefined,
		}
	},
	
	methods: {
		passAnswer( answer, correctA ) {
			this.isActive = ! this.isActive;
			this.$emit( "pass-answer", answer, correctA )			
		}
	},
}
</script>

<template>
		<transition
			name="rescind" 
			mode="out-in"
			appear
		>
		
		<div :class="$style.wrapper">
			<header>
				<h3 class="triviaQuestion" v-html="questionText"></h3>
	<!-- 			<h5>correct answer = {{ correctAnswer }}</h5> -->						
			</header>
			
			<section class="playArea">
			  <ul class="triviaAnswers">
			    <li
			      v-for="( answer, i ) in answers"
			      :key="i"
						:class="[{ selected: answer === selected }, $style.triviaAnswer, { 'fullOpacity': isActive }, { correct: answer === correctAnswer }]"
			    >
			      <button @click="[selected = answer, passAnswer( answer, correctAnswer ), correct = correctAnswer] ">{{ answer }}</button>
			    </li>
			  </ul>
			</section>
		</div>
	</transition>
</template>

<style lang="scss" module>
.wrapper {

	ul {
		width: 100%;
		margin: 0 auto;
		text-align: left;

		li.triviaAnswer {
		
			&:nth-of-type(1) button:before {
				background: url('@assets/images/badge-answer-A.png') center center no-repeat;
				background-size: contain;
			}	
			&:nth-of-type(2) button:before {
				background: url('@assets/images/badge-answer-B.png') center center no-repeat;
				background-size: contain;
			}	
			&:nth-of-type(3) button:before {
				background: url('@assets/images/badge-answer-C.png') center center no-repeat;
				background-size: contain;
			}		
		}
	}
}

</style>
