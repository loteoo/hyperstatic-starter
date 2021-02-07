import fx from '../fx'
import { AddPathCacheStatus, SetPathStatus } from './actions'

const preload = fx((dispatch, props) => {
  // @ts-ignore
  const cachedUrl = window?.HYPERSTATIC_DATA?.cache[props.url]
  const url = cachedUrl ?? props.url
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // @ts-expect-error
      if (window.cacheData) {
        // @ts-expect-error
        window.cacheData(props.url, data, props.path)
      }
      dispatch((state) => {
        const withCacheSetAsLoaded = props.path
          ? AddPathCacheStatus(state, { cache: url, path: props.path })
          : state

        // @ts-expect-error
        const cacheDeps = window?.HYPERSTATIC_DATA?.cacheDeps[props.path]

        const allCacheLoaded = cacheDeps && withCacheSetAsLoaded.paths[props.path].loadedCaches.length === cacheDeps.length;

        const nextState = allCacheLoaded ? SetPathStatus(withCacheSetAsLoaded, { path: props.path, status: 'ready' }) : withCacheSetAsLoaded

        return props.action(nextState, data)
      })
    })
    .catch(err => {
      console.error(err)
      dispatch(props.error, err)
    })
})

export default preload
