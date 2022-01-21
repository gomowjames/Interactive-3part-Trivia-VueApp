<script>
export default {
  name: 'EpisodeModal',

	props: {
		videopath: { type: String, default: null },
		publicpath: { type: String, required: true },
		visible: { type: Boolean, default: false },
	},

	data() {
		return {
// 			folderpath: this.publicpath + 'static/videos/_episodeMixUp/',
			folderpath: '/static/videos/_episodeMixUp/',
			videoEl: null,
			videoElSrc: null,
		}
	},

  watch: {
			  
  	visible: function(newVal, oldVal) { // watch it
//       console.log('Prop changed: ', newVal, ' | was: ', oldVal)

			if ( newVal ) {
				this.videoEl = document.getElementById('modalVideo')
				
				this.videoElSrc = document.getElementById('modalVidSource')
	
				this.videoElSrc.src = this.folderpath + this.videopath ;
	
				this.modalPlayVideo( this.videoEl );				
			}
    },
  },

  methods: {
		
		modalPlayVideo( video ) {
// 			let video = this.$el.querySelector( 'iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video' );

			this.modalVideoOnEnd( video )

			if ( video.tagName.toLowerCase() === 'video' ) {				
				video.load();
				video.play();
				return
			}

			video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';

		},

		modalVideoOnEnd( video ) {			
			
			video.onended = ( event ) => {
				this.close( video );
			}
		},

		modalStopVideo( video ) {
			video.pause();
		},

    close( video ) {
			this.modalStopVideo( video );
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
					<video id="modalVideo" width="1289" height="722">
					  <source id="modalVidSource" src="" type="video/mp4">
						  Your browser does not support HTML5 video.
					</video>
        </section>
      </div>
      <footer class="modal-footer">
        <button
          type="button"
          class="close"
          aria-label="Close modal"
          @click="close( videoEl )"
        >
					<img src="@assets/images/button-close.png" alt="button-close" />
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