import preload from "./preload"

interface SetPathStatusArgs {
  path: string
  status: PathStatus;
}

export const SetPathStatus = (state: State, { path, status }: SetPathStatusArgs): State => ({
  ...state,
  paths: {
    ...state.paths,
    [path]: {
      ...state.paths[path],
      status
    }
  }
})

interface AddPathCacheStatusArgs {
  path: string
  cache: string;
}

export const AddPathCacheStatus = (state: State, { path, cache }: AddPathCacheStatusArgs): State => ({
  ...state,
  paths: {
    ...state.paths,
    [path]: {
      ...state.paths[path],
      loadedCaches: state.paths[path]?.loadedCaches ? state.paths[path].loadedCaches.concat(cache) : [cache]
    }
  }
})

export const Preload = (state: State, { url, action, error }) => [
  state,
  preload({ location: state.location, url, action, error })
]
