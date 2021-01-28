import { match } from "path-to-regexp";
import { SetPathAsInitialized, SetRouteStatus } from './actions';
import { loadRoute } from './loadRoute';
import parseQueryString from './parseQueryString';
import { provide } from './provide'
import { onRouteChanged } from './subs'


const hyperstatic = (app, routes: Routes, options?: Options) => ({ init, view, subscriptions = (_s) => [], ...rest }) => {

  // Internal values saved for each routes
  const meta = Object.keys(routes).reduce((obj, route) => {
    obj[route] = {
      matcher: match(route),
      promise: routes[route],
      bundle: null
    }
    return obj
  }, {})

  // Utility function to parse data from paths
  const getLocation = (pathname: string): LocationState => {
    const [path, qs] = pathname.split('?')
    let matchedRoute;
    let params = {};
    for (const route of Object.keys(routes)) {
      const maybeMatch = meta[route].matcher(path)
      if (maybeMatch) {
        matchedRoute = route;
        params = maybeMatch.params;
        break
      }
    }
    return {
      route: matchedRoute,
      path,
      params,
      query: qs ? parseQueryString(qs) : {},
    }
  }

  // Location changed action
  const LocationChange = ({ location: _, ...state }: State, pathname: string) => {
    const location = getLocation(pathname)
    const { route, path } = location;
    const nextState = { location, ...state }

    // If current route isn't loaded, load it
    if (!nextState.routes[route]?.status) {
      return [
        SetRouteStatus(nextState, { route, status: 'loading' }),
        loadRoute({ route, path, meta, location })
      ]
    }

    // If current path isn't initialized
    if (
      typeof meta[route].bundle?.init === 'function'
      && !nextState.routes[route]?.initialized[path]
    ) {
      const stateWithPathInitialized = SetPathAsInitialized(nextState, { route, path })
      const action = meta[route].bundle?.init(stateWithPathInitialized, location)
      return action
    }

    return nextState
  }

  const initialPath = window.location.pathname + window.location.search;

  return app({
    init: LocationChange({ ...init, routes: {} }, initialPath),
    view: (state) => provide({ state, meta, options, getLocation }, view(state)),
    subscriptions: (state) => [
      ...subscriptions(state),
      onRouteChanged(LocationChange)
    ],
    ...rest
  })
}

export default hyperstatic
