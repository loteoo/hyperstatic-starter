import { match } from "path-to-regexp";
import { SetRouteState } from './actions';
import { loadRoute } from './loadRoute';
import parseQueryString from './parseQueryString';
import { provide } from './provide'
import { onRouteChanged } from './subs'

type Routes = Record<string, Promise<any>>;

interface Options {
  baseUrl?: string;
}

const hyperstatic = (app, routes: Routes, options?: Options) => ({ init, view, subscriptions = (_s) => [], ...rest }) => {

  const meta = Object.keys(routes).reduce((obj, route) => {
    obj[route] = {
      matcher: match(route),
      promise: routes[route],
      bundle: null
    }
    return obj
  }, {})

  const routesState = Object.keys(routes).reduce<RoutesState>((obj, route) => {
    obj[route] = {
      status: 'iddle',
      initialized: false
    }
    return obj
  }, {})

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



  const LocationChange = ({ location: _, ...state }: State, pathname: string) => {
    const location = getLocation(pathname)
    const { route } = location;
    const nextState = { location, ...state }
    if (nextState.routes[route].status === 'iddle') {
      return [
        SetRouteState(nextState, { route, update: { status: 'loading' } }),
        loadRoute({ route, meta })
      ]
    }
    return nextState
  }



  const initialPath = window.location.pathname + window.location.search;

  return app({
    init: LocationChange({ ...init, routes: routesState }, initialPath),
    view: (state) => provide({ state, meta, getLocation }, view(state)),
    subscriptions: (state) => [
      ...subscriptions(state),
      onRouteChanged(LocationChange)
    ],
    ...rest
  })
}

export default hyperstatic
