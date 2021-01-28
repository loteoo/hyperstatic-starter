import { SetRouteState } from './actions'
import fx from './fx'

interface LoadRouteArgs {
  route: string;
  meta: any;
}
export const loadRoute = fx((dispatch, { route, meta }: LoadRouteArgs) => {
  console.log('loading route ' + route)
  if (!meta[route].bundle) {
    meta[route].promise.then((bundle) => {
      meta[route].bundle = bundle
      if (meta[route].bundle?.init && typeof meta[route].bundle?.init === 'function') {
        dispatch((state) => {
          const stateWithRouteFlaggedAsInitiated = SetRouteState(state, { route, update: { initialized: true, status: 'ready' } })
          const action = meta[route].bundle?.init(stateWithRouteFlaggedAsInitiated)
          return action
        })
      } else {
        dispatch([SetRouteState, { route, update: { status: 'ready' } }])
      }
    }).catch((err: any) => {
      dispatch([SetRouteState, { route, update: { status: 'error' } }])
      console.error(err)
    })
  }
})
