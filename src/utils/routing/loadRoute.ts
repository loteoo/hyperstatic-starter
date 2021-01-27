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
      if (meta[route].bundle?.init) {
        dispatch((state) => {
          const initializedState = meta[route].bundle?.init(state)
          return SetRouteState(initializedState, { route, update: { initialized: true, status: 'ready' } })
        })
      } else {
        dispatch([SetRouteState, { route, update: { status: 'ready' } }])
      }

    }).catch((_err: any) => {
      dispatch([SetRouteState, { route, update: { status: 'error' } }])
    })
  }
})
