<script>
import json from '@assets/json/feedbackVids.json'

  export default {
    name: 'Modal',
    props: [ 'showFeedbackVideo', 'answerStatus', 'isModalVisible' ],

		data() {
			return {
				correctVid: null,
				incorrectVid: null,
				feedbackVids: json,
				feedbackCorrect: [],
				feedbackIncorrect: [],
				publicpath: process.env.BASE_URL,
			}
		},

		beforeMount() {
				this.correctVid = this.feedbackVids.videos[0].correct[Math.floor( Math.random()* this.feedbackVids.videos[0].correct.length )];
				this.incorrectVid = this.feedbackVids.videos[1].incorrect[Math.floor( Math.random()* this.feedbackVids.videos[1].incorrect.length )];
		},

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div id="modalOverlay" :class="$style.modalOverlay"></div>
      <div
	      :class="$style.main"
				class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section class="modalBody">
        	<div v-if="answerStatus" name="positive" class="feedbackVideoWrapper">
						<video id="modalVideo" width="1289" height="722">
<!-- 						  <source id="modalVidSource" :src="`${ publicpath }static/videos/_friendsVocab/CORRECT/${ correctVid }`"  type="video/mp4"> -->
						  <source id="modalVidSource" :src="`/static/videos/_friendsVocab/CORRECT/${ correctVid }`"  type="video/mp4">
						  Your browser does not support HTML5 video.
						</video>
        	</div>

        	<div v-else name="negative" class="feedbackVideoWrapper">
						<video id="modalVideo" width="1289" height="722">
<!-- 						  <source id="modalVidSource" :src="`${ publicpath }static/videos/_friendsVocab/INCORRECT/${ incorrectVid }`" type="video/mp4"> -->
						  <source id="modalVidSource" :src="`/static/videos/_friendsVocab/INCORRECT/${ incorrectVid }`" type="video/mp4">
						  Your browser does not support HTML5 video.
						</video>
        	</div>
        </section>
      </div>
	    <footer class="modal-footer">
	      <button
	        type="button"
	        class="skip"
	        aria-label="Close modal"
	        @click="close"
	      >
					<img src="@assets/images/button-skip.png" alt="button-skip" />
	      </button>
	    </footer>
    </div>
  </transition>
</template>

<style lang="scss" module>
	
	.main {
		background: url('@assets/images/frame-video-borderStroke.png') center center no-repeat transparent;
		background-size: contain;
		width: 1396px;
		height: 809px;
		box-shadow: none;
		position: relative;

		@media screen and (max-width: 1400px) { 
			background: none;
		  width: 110vh;
		  height: 62.25vh;
		}

		section {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
	}
	
.modalOverlay {
	display: none;

	@media screen and (max-width: 1400px) {
		display: block;
		background: url('@assets/images/frame-instructions-borderStroke.png') center center no-repeat transparent;
		background-size: contain;
	}
}
	
</style>
