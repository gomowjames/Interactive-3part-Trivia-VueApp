<script>
import Instructions from '@components/game-instructions'
import MenuReturn from '@components/menu-return'

import draggable from 'vuedraggable'

import json from "@assets/json/charmatch-data.json"

import { mixin as VueTimers } from 'vue-timers'
import { store, mutations, matchActions } from "../store"

export default {
  name: 'CharMatchGameplay',
	components: { Instructions, MenuReturn, draggable },
  mixins: [ VueTimers ],
	timers: {
		inactivityTimer: { time: 600000, autostart: true, repeat: false },
		resultsTimer: { time: 20000, autostart: false, repeat: false },
	},
	
  data() {
	  return {
			game: 'CharMatch',
			loading: true,
		  matchData: json,
			mainFriends: null,
			roundsNum: null,
		  roundsArr: [],
		  randomCat: [],
		  friendsArr: [],
		  selectedArr: [],
		  solutionArr: [ 0, 1, 2, 3, 4, 5],
		  score: 600,
		  notAccepting: false,
			nextQuestion: null,
		  answerStatus: null,
			showButtons: false,
			publicpath: process.env.BASE_URL,
			lists: [{
				left: [],
				right: [],
				slot_0: [],
				slot_1: [],
				slot_2: [],
				slot_3: [],
				slot_4: [],
				slot_5: [],
	  	}]
	  }
  },

	computed: {
    stage: () => store.stage,
    title: () => store.title,
    categories: () => store.categories,
    currentCategory: () => store.currentCategory,
//     answers: () => store.answers,
		
	  limitColumnLeft() {
	    return 3 ? this.friendsArr.slice(0, 3) : this.friendsArr;
	  },
	  limitColumnRight() {
	    return 3 ? this.friendsArr.slice(3, 6) : this.friendsArr
	  },
		
    dragOptions() {
      return {
		    group: {
			    name: 'friends',
			    put: function( to ){
				    return to.el.children.length < 1;
			    }
		    },
        animation: 500,
        disabled: false,
				ghostClass: "ghost",
				emptyInsertThreshold: 5,
      }
    },
    resultsInfo() {
	    
      if ( this.score <= 600 ) {
        return {
          text1:
            "DANG<span class='reduceSpace'>&nbsp;</span>IT",
          text2:
            "NO WORRIES. LEARN MORE BY WATCHING <span style='font-style:italic'>FRIENDS!</span>"
        };
      }
      
      if ( this.score > 600 ) {
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
  },

  watch: {
	  answerStatus( val ) {			
			if ( val === 'correct' )
			{
							this.score += 75;			
			}
			else if ( val === 'incorrect' )
			{
							this.score -= 25;
			}
		},
/*
    stage( val ) {
      localStorage.stage = val;
    },
*/
    
/*
    currentCategory( val ) {
      localStorage.currentCategory = val;
    },
*/
/*
    answers( val ) {
      localStorage.answers = val;
    },
*/
  },

  async mounted() {
    await this.init();
    
			this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_CharMatch_STARTED', 'KnowingFriends ' + `${this.$locationVar}` + ': CharMatch STARTED' )
		  .then((response) => {
		    return response;
		  }).catch((err) => {
		    return err;
		  });
// 		this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': CharMatch STARTED', true)
  },

  methods: {
		resultsTimer() {
					this.$router.push({ path: '/'})
		},
		
    async fetchData() {
      await matchActions.fetchData( this.matchData );
    },
    
    async init() {
      await this.fetchData();
			
			await this.selectCatData();
      
      if (
        !localStorage.stage ||
        localStorage.stage === "instructions"
      ) {
        this.initInstructStage();
      } else if ( localStorage.stage === "gameOn" ) {
        this.initMatchStage( localStorage.currentCategory || 1 );
      } else {
        this.initResultsStage();
      }
    },

    async selectCatData() {
			// fill array with the categories that will determine each round
			this.roundsArr = this.categories
			// Set the number of rounds based on categories
			this.roundsNum = this.categories.length
			// SHUFFLE array to randomize round categories
/* 			this.shuffleArr( this.roundsArr ); */
/* console.log( "this.roundsArr = " + JSON.stringify( this.roundsArr ) ) */

			// fill array with FRIENDS objects			
			this.friendsArr = this.matchData.friends

			// SHUFFLE the Friends Array to RANDOMIZE order
	/* 		this.shuffleArr( this.friendsArr ); */
			this.selectedArr = [...this.friendsArr];
			this.shuffleArr( this.selectedArr );
			this.shuffleArr( this.solutionArr );
    },

    initInstructStage() {
      mutations.setStage( "instructions" );
      mutations.setTitle( "INSTRUCTIONS" );
      mutations.setCurrentCategory( 0 );
/*       mutations.resetAnswers(); */

      this.loading = false;
    },
    
    initMatchStage( currentCategory ) {
/* console.log( "initMatchStage called" );	     */
      mutations.setStage( "gameOn" );
      mutations.setScore( localStorage.score = 0 );
/*       this.goToRound( currentCategory || 0 ); */
      this.goToRound( +currentCategory || 1 );
			this.loading = false;
			
/* console.log("currentCategory = " + this.currentCategory ) */
    },
    
    initResultsStage() {
      mutations.setStage( "results" );      
/*       mutations.setAnswers( localStorage.answers.split(",") ) */;
      mutations.setTitle(
        `Your Score: ${ this.correctAnswers } out of ${ this.rounds }`
      );
/*       mutations.setImg(this.resultsInfo.img); */
      mutations.setCurrentCategory( null );
      this.loading = false;
			this.$timer.start('resultsTimer');

				this.$analytics.pageview( 'http://friends.sticky.tv', '/KF_CharMatch_COMPLETED', 'KnowingFriends ' + `${this.$locationVar}` + ': CharMatch COMPLETED' )
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
/* 			this.$ua.trackView('KnowingFriends ' + `${this.$locationVar}` + ': CharMatch COMPLETED', true) */
    },

		checkRound() {
			if ( this.currentCategory + 1 <= this.roundsNum ) {
	        this.goToRound( this.currentCategory + 1 )
      } else {
        this.initResultsStage();
      }
		},

		goToRound( i ) {
			this.mainFriends = null;
			this.answerStatus = null;
			this.showButtons = false;
      mutations.setCurrentCategory( i );
/* console.log("new currentCategory = " + this.currentCategory) */
    },
    
    // SHUFFLE FUNCTION FOR ARRAYS
		shuffleArr( array ) {
		  for ( let i = array.length - 1; i > 0; i-- ) {
		    let j = Math.floor( Math.random() * ( i + 1 ) ); // random index from 0 to i
		    [ array[i], array[j] ] = [ array[j], array[i] ]; // swap elements
		  }
		},

		checkSlot( evt ) {
			document.getElementById('plus').classList.remove("correct")
			document.getElementById('minus').classList.remove("incorrect")
			
			let parentSlot = evt.item.closest( 'figure' )

			if ( evt.item.getAttribute('name') ===  parentSlot.getAttribute('name') && parentSlot.classList.contains('ready') ) {

				parentSlot.classList.remove("ready")
				this.answerStatus = "correct";
				evt.item.classList.add('disable');
				
				this.$analytics.event('Knowing Friends', 'DragDrop', { evLabel: `${this.$locationVar}` + " CharMatch: Answer CORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });
/* 				this.$ua.trackEvent( "Knowing Friends", "DragDrop", `${this.$locationVar}` + " CharMatch: Answer CORRECT", 1 ) */
			} else {
				this.answerStatus = "incorrect";
				
				this.$analytics.event('Knowing Friends', 'DragDrop', { evLabel: `${this.$locationVar}` + " CharMatch: Answer INCORRECT", evValue: 1 })
				  .then((response) => {
				    return response;
				  }).catch((err) => {
				    return err;
				  });
/* 				this.$ua.trackEvent( "Knowing Friends", "DragDrop", `${this.$locationVar}` + " CharMatch: Answer INCORRECT", 1 ) */
			}
		},

		noChildren( currentValue ) {
		  return currentValue.children.length < 1;
		},

		grabStart() {
			this.answerStatus = 'neither';
			console.log("answerStatus = " + this.answerStatus );
		},

		dropEnd( evt ) {
			draggable.isDragging = false
			
			this.mainFriends = document.querySelectorAll( '.charWrapper > figure' );
			this.mainFriends = Array.from( this.mainFriends )

			if ( this.mainFriends.every( this.noChildren ) ) {
				this.showButtons = true;
			};
		},

		inactivityTimer() {
			this.$router.push({ path: '/'})

			this.$analytics.event('Knowing Friends', 'TimeOut', { evLabel: `${this.$locationVar}` + " CharMatch: Time Out", evValue: 1 })
			  .then((response) => {
			    return response;
			  }).catch((err) => {
			    return err;
			  });
/* 			this.$ua.trackEvent("Knowing Friends", "TimeOut", `${this.$locationVar}` + " CharMatch: Time Out", 1) */
		},		
  },
}
</script>

<template>
<section id="character-match" style="background-color: #ffb001">
  <transition
		v-if="!loading"
		name="fade"
		mode="out-in"
		appear
	>
	<div :key="currentCategory">
		<section v-if="stage === 'instructions'" class="instWrapper">
			<Instructions current-game="CharMatch" @init-game-stage="initMatchStage" />
		</section>

		<section v-if="stage === 'gameOn'" id="match-main">
			<header>
				<div class="triviaCounter">{{ currentCategory }} / {{ roundsNum }}</div>
				<h2>Match</h2>
				<h3>match each friend to their {{ categories[currentCategory - 1 ].name }}</h3>
			</header>
	
			<section class="playArea">
				<div class="characters-group-left">
					<div
						v-for="friend in limitColumnLeft"
						:key="friend.name"
						class="charParent"
					>
						<div class="charWrapper">
							<draggable
								v-bind="dragOptions"
								:list="lists.left"
								:disabled="notAccepting"
					      tag="figure"
					      @start="grabStart"
					      @end="dropEnd"
							>
								<div class="circle friend" :name="`${ friend.name }`">
<!-- 									<img :src="`${ publicpath }static/images/_charMatch/${ friend.charImgPath }`"/> -->
									<img :src="`/static/images/_charMatch/${ friend.charImgPath }`"/>
								</div>
							</draggable>
						</div>
						<h4>{{ friend.name }}</h4>
					</div>
				</div>			
				
			  <div class="slots-group clearfix">
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${selectedArr[0].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_0"
								:disabled="notAccepting"
								class="character-slot"
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
<!-- 							<img :src="`${ publicpath }static/images/_charMatch/${selectedArr[0].categories[currentCategory].assocImgPath }`"/> -->
							<img :src="`/static/images/_charMatch/${selectedArr[0].categories[currentCategory - 1].assocImgPath }`"/>

					  </figure>
					</section>
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${selectedArr[1].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_1"
								:disabled="notAccepting"
								class="character-slot"								
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
<!-- 							<img :src="`${ publicpath }static/images/_charMatch/${selectedArr[1].categories[currentCategory].assocImgPath }`"/> -->
							<img :src="`/static/images/_charMatch/${selectedArr[1].categories[currentCategory - 1 ].assocImgPath }`"/>
					  </figure>
					</section>
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${selectedArr[2].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_2"
								:disabled="notAccepting"
								class="character-slot"
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
							<img :src="`/static/images/_charMatch/${selectedArr[2].categories[currentCategory - 1].assocImgPath }`"/>
					  </figure>
					</section>
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${selectedArr[3].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_3"
								:disabled="notAccepting"
								class="character-slot"
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
							<img :src="`/static/images/_charMatch/${selectedArr[3].categories[currentCategory - 1].assocImgPath }`"/>
					  </figure>
					</section>
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${selectedArr[4].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_4"
								:disabled="notAccepting"
								class="character-slot"
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
							<img :src="`/static/images/_charMatch/${selectedArr[4].categories[currentCategory - 1].assocImgPath }`"/>
					  </figure>
					</section>
					<section class="slotWrapper">
					  <figure class="circle slot ready" :name="`${ selectedArr[5].name }`">	
							<draggable
								v-bind="dragOptions"
								:list="lists.slot_5"
								:disabled="notAccepting"
								class="character-slot"
					      @start="grabStart"
								@add="checkSlot"
					      @end="dropEnd"
							>
							</draggable>
						</figure>
						<div class="lineSpacer"></div>
					  <figure class="association circle">
							<img :src="`/static/images/_charMatch/${selectedArr[5].categories[currentCategory - 1 ].assocImgPath }`"/>
					  </figure>
					</section>
			  </div>

				<div class="characters-group-right">
					<div
						v-for="friend in limitColumnRight"
						:key="friend.name"
						class="charParent"
					>
						<div class="charWrapper">
							<draggable
								v-bind="dragOptions"
								:list="lists.right"
								:disabled="notAccepting"
					      tag="figure"
					      @start="grabStart"
					      @end="dropEnd"
							>
								<div class="circle friend" :name="`${ friend.name }`">
									<img :src="`/static/images/_charMatch/${ friend.charImgPath }`"/>
								</div>
							</draggable>
						</div>
						<h4>{{ friend.name }}</h4>
					</div>
				</div>
	
			</section>		
			
			<footer>
				<div class="inner-footer">
					<h4>YOUR SCORE</h4>
					<h3 style="color:#FFF">{{ score }}</h3>
						<h4 id="plus" :class="answerStatus === 'correct' ? 'correct' : '' " class="score">+75</h4>
						<h4 id="minus" :class="answerStatus === 'incorrect' ? 'incorrect' : '' " class="score">-25</h4>
				</div>

				<div :class="$style.buttonWrapper">
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
	</section>
	

		<section v-if="stage === 'results'" class="results">
	    <header>
		    <h2 class="triviaResult" v-html="resultsInfo.text1"></h2>
		    <h3 class="triviaResult" v-html="resultsInfo.text2"></h3>
	    </header>
	    <div class="scoreWrapper">
				<h4>YOUR SCORE</h4>
		    <h1 class="triviaResult total" >{{ score }}</h1>
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
@import '@design';

</style>