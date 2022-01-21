<script>
export default {
	name: 'Episode',
	props: {
		episodeNum: { type: String, default: null },
		title: { type: String, default: null },
		videopath: { type: String, required: true },
		stillpath: { type: String, required: true },
		publicpath: { type: String, required: true },
	},

	methods: {
		createpath( base, file) {
			let filepath = this.folderpath + file
			return filepath
		},
		
    open( videopath ) {
      this.$emit( "show-modal", videopath );
    },
	},
}
</script>

<template>
	<li :id="`${ episodeNum }`" class="imgWrapper">
<!-- 		<p style="color: #FFF">{{ episodeNum }}</p> -->
		<button
			type="button"
			:class="$style.play"
			aria-label="Play video clip"
			@click="open( videopath )"
		>
<!-- 			<img src="@assets/images/button-play.png" /> -->
<!-- 			<img :src="`${ publicpath }static/images/_episodeMixUp/${ stillpath }`"> -->
			<img :src="`/static/images/_episodeMixUp/${ stillpath }`">
		</button>

			<img src="@assets/images/_episodeMixUp/_wrong.png" class="feedback wrong" alt="_wrong" width="100" height="100" />
			<img src="@assets/images/_episodeMixUp/_correct.png" class="feedback correct" alt="_correct" width="105" height="97" />		
	</li>

</template>

<style lang="scss" module>
.play {
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
}

</style>
