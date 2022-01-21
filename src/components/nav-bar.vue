<script>
import NavBarRoutes from './nav-bar-routes'

export default {
  components: { NavBarRoutes },
  data() {
    return {
	    
      persistentNavRoutes: [
        {
				  id: "0",
          name: 'Episode-Mix-Up',
				  title: "Episode Mix-Up",
				  color: "red",
				  imgPath: "",
				  linkPath: ""
        },
        {
				  id: "1",
          name: 'Character-Match',
          title: 'Character Match',
				  color: "yellow",
				  imgPath: "",
				  linkPath: ""
        },
        {
				  id: "2",
          name: 'Vocab-Trivia',
          title: 'Friends Vocab',
				  color: "blue",
				  imgPath: "",
				  linkPath: ""
        },
      ],
    }
  },
}
</script>

<template>
  <ul>
	  
    <NavBarRoutes :routes="persistentNavRoutes" />

  </ul>  
</template>