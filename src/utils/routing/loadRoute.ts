import { SetPathStatus } from './actions'
import fx from './fx'

interface LoadRouteArgs {
  route: string;
  path: string;
  meta: any;
  location: LocationState;
}

export const loadRoute = fx((dispatch, { meta, location }: LoadRouteArgs) => {
  const { route, path } = location
  console.log('loading route ' + route)
  if (!meta[route].bundle) {
    meta[route].promise.then((bundle) => {
      meta[route].bundle = bundle
      if (typeof meta[route].bundle?.init === 'function') {

        console.log('initiating path ' + path)

        dispatch((state) => {
          // const stateWithRouteFlaggedAsReady = SetPathStatus(state, { path, status: 'ready' })
          const action = meta[route].bundle?.init(state, location)

          if (Array.isArray(action)) {
            // @ts-expect-error
            const cacheDeps = window?.HYPERSTATIC_DATA?.cacheDeps[path]
            if (cacheDeps && action[0].paths[path].loadedCaches.length !== cacheDeps.length) {
              action[0] = SetPathStatus(action[0], { path, status: 'fetching' })
            }
            return action
          }

          return SetPathStatus(action, { path, status: 'ready' })

        })
      } else {
        dispatch([SetPathStatus, { path, status: 'ready' }])
      }
    }).catch((err: any) => {
      dispatch([SetPathStatus, { path, status: 'error' }])
      console.error(err)
    })
  }
})
