import { LocationChange } from './actions'
import { provide } from './provide'
import { onRouteChanged } from './subs'

interface Options {
  baseUrl?: string;
}

const hyperstatic = (app, routes, options?: Options) => ({ init, view, subscriptions = (_s) => [], ...rest }) => {
  return app({
    init: LocationChange({ routes: {}, ...init }, window.location.pathname + window.location.search),
    view: (state) => {
      return provide({ location: state.location, routes: state.routes }, view)
    },
    subscriptions: (state) => [
      ...subscriptions(state),
      onRouteChanged(LocationChange)
    ],
    ...rest
  })
}

export default hyperstatic
