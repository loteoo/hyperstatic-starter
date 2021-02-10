import { InitializePath, SetPathStatus } from './actions'
import fx from './fx'

interface LoadRouteArgs {
  route: string;
  path: string;
  meta: any;
  location: LocationState;
}

export const loadRoute = fx(async (dispatch, { meta, location }: LoadRouteArgs) => {
  const { route, path } = location
  try {
    if (!meta[route].bundle) {
      const bundle = await meta[route].promise;
      meta[route].bundle = bundle
      dispatch([InitializePath, { location, bundle: meta[route].bundle }])
    }
  } catch (err) {
    dispatch([SetPathStatus, { path, status: 'error' }])
    console.error(err)
  }
})
