import { SetRouteStatus, SetPathAsInitialized } from './actions'
import fx from './fx'

interface LoadRouteArgs {
  route: string;
  path: string;
  meta: any;
  location: LocationState;
}

export const loadRoute = fx((dispatch, { route, path, meta, location }: LoadRouteArgs) => {
  console.log('loading route ' + route)
  if (!meta[route].bundle) {
    meta[route].promise.then((bundle) => {
      meta[route].bundle = bundle
      if (typeof meta[route].bundle?.init === 'function') {
        dispatch((state) => {
          const stateWithRouteFlaggedAsReady = SetRouteStatus(state, { route, status: 'ready' })
          const stateWithPathInitialized = SetPathAsInitialized(stateWithRouteFlaggedAsReady, { route, path })
          const action = meta[route].bundle?.init(stateWithPathInitialized, location)
          return action
        })
      } else {
        dispatch([SetRouteStatus, { route, status: 'ready' }])
      }
    }).catch((err: any) => {
      dispatch([SetRouteStatus, { route, status: 'error' }])
      console.error(err)
    })
  }
})
