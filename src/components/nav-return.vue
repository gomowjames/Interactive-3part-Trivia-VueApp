<script>
import NavBarRoutes from './nav-bar-routes'

export default {
  components: { NavBarRoutes },
  
  data() {
    return {
      menuRoute: [
        {
          name: 'home',
          title: 'Return',
        },
      ],
    }
  },
}
</script>

<template>
  <ul>
    <NavBarRoutes :routes="menuRoute" />
  </ul>
</template>