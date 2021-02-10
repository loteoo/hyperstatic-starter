
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

export const InitializePath = (state: State, { location, bundle }) => {
  const { path } = location;

  // If current path is already initiated, do nothing
  if (state.paths[path]?.status === 'ready') {
    return state;
  }

  // If current path doesn't have an "init" to run
  if (typeof bundle?.init !== 'function') {

    // Set as ready
    return SetPathStatus(state, { path, status: 'ready' })
  }


  // Compute next state or action tuple using the provided "init" action
  const action = bundle?.init(
    SetPathStatus(state, { path, status: 'ready' }),
    location
  )

  return action
}
