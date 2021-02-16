import { app, h } from 'hyperapp'
import { match } from "path-to-regexp";
import { InitializePath, SetPathStatus } from './actions';
import { loadRoute } from './loadRoute';
import parseQueryString from './parseQueryString';
import { provide } from './provide'
import { onLinkEnteredViewPort, onRouteChanged } from './subs'

const hyperstatic = ({ routes, options, init, view, subscriptions = (_s) => [], ...rest }: Config) => {

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

  // Preload page Action
  const PreloadPage = (state: State, href: string) => {
    const location = getLocation(href)
    const { route, path } = location

    const bundle = meta[route].bundle;

    // If target route's bundle isn't loaded, load it
    if (!bundle) {
      return [
        SetPathStatus(state, { path, status: 'loading' }),
        loadRoute({ route, path, meta, location })
      ]
    }

    return InitializePath(state, { location, bundle })
  }

  // Location changed action
  const LocationChanged = ({ location: _, ...state }: State, pathname: string) => {
    const location = getLocation(pathname)
    const nextState = { location, ...state }
    return PreloadPage(nextState, pathname)
  }

  const initialPath = window.location.pathname + window.location.search;

  return app({
    init: LocationChanged({ ...init, paths: {} } as State, initialPath),
    view: (state) => provide(
      { state, meta, options, getLocation, PreloadPage },
      h('div', { id: 'app' }, view(state))
    ),
    subscriptions: (state) => [
      ...subscriptions(state),
      onRouteChanged(LocationChanged),
      onLinkEnteredViewPort({
        selector: 'a[data-status=iddle]',
        action: PreloadPage
      })
    ],
    ...rest
  })
}

export default hyperstatic
