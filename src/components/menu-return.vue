<script>
import MenuReturnRoute from './menu-return-route'

export default {
  components: { MenuReturnRoute },
  
  data() {
    return {
	    image: "@assets/images/button-exit.png",
      menuRoute: [
        {
          name: 'home-KnowingFriends',
          title: 'Return',
        },
      ],
    }
  },
}
</script>

<template>

	<MenuReturnRoute :image="image" :routes="menuRoute" />

</template>