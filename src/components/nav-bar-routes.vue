<script>
// Allows stubbing BaseLink in unit tests
const BaseLink = 'BaseLink'

export default {
  // Functional components are stateless, meaning they can't
  // have data, computed properties, etc and they have no
  // `this` context.
  functional: true,
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  // Render functions are an alternative to templates
  render(h, { props, $style = {} }) {
    function getRouteTitle( route ) {
      return typeof route.title === 'function' ? route.title() : route.title

    }

    // Functional components are the only components allowed
    // to return an array of children, rather than a single
    // root node.
    return props.routes.map( ( route ) => (
      <BaseLink
        tag="li"
				allowInsecure={true}
        key={ route.name }
        to={ route }
        class={ route.color }
        exact-active-class={ $style.active }
      >
        <a>
					<figure class="menuPortalImage"></figure>        
					<h4 class="menuName">
						{ getRouteTitle( route ) }
					</h4>        
        </a>
      </BaseLink>
    ))
  },
}
</script>