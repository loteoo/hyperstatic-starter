import { match } from "path-to-regexp";
import parseQueryString from './parseQueryString';
import { provide } from './provide'
import { onRouteChanged } from './subs'

type Routes = Record<string, Promise<any>>;

interface Options {
  baseUrl?: string;
}

const hyperstatic = (app, routes: Routes, options?: Options) => ({ init, view, subscriptions = (_s) => [], ...rest }) => {

  const routesMeta = Object.keys(routes).reduce((meta, route) => {
    meta[route] = {
      match: match(route),
      bundlePromise: routes[route],
    }
    return meta
  }, {})

  const LocationChange = ({ location: _, ...state }: State, pathname: string) => {

    const [path, qs] = pathname.split('?')

    let matchedRoute;
    let params = {};
    for (const route of Object.keys(routesMeta)) {
      const maybeMatch = routesMeta[route].match(path)
      if (maybeMatch) {
        matchedRoute = route;
        params = maybeMatch.params;
      }
    }

    return {
      location: {
        path,
        params,
        query: qs ? parseQueryString(qs) : {},
        route: matchedRoute
      },
      ...state,
    }
  }

  const initialPath = window.location.pathname + window.location.search;

  return app({
    init: LocationChange({ routes, ...init }, initialPath),
    view: (state) => {
      return provide({ location: state.location, routes: state.routes, routesMeta }, view)
    },
    subscriptions: (state) => [
      ...subscriptions(state),
      onRouteChanged(LocationChange)
    ],
    ...rest
  })
}

export default hyperstatic
