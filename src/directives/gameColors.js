import Vue from 'vue';

const defaultBackgroundColor = '#000000'

export const gameColors = {
	
	inserted( el, binding, vnode ) {
		
    // Allow users to customise the color by passing an expression.
    const color = binding.value || defaultBackgroundColor

    // el might not be present for server-side rendering.
		if ( el ) {
			el.style.backgroundColor = color
		}
	}
}

Vue.directive('game-color', gameColors)