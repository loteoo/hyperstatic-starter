interface SetRouteStatusArgs {
  route: string
  status: RouteStatus;
}
export const SetRouteStatus = (state: State, { route, status }: SetRouteStatusArgs): State => ({
  ...state,
  routes: {
    ...state.routes,
    [route]: {
      status,
      initialized: state.routes[route]?.initialized ?? {}
    }
  }
})

interface SetPathAsInitializedArgs {
  route: string
  path: string
}
export const SetPathAsInitialized = (state: State, { route, path }: SetPathAsInitializedArgs): State => ({
  ...state,
  routes: {
    ...state.routes,
    [route]: {
      ...state.routes[route],
      initialized: {
        ...state.routes[route].initialized,
        [path]: true
      }
    }
  }
})

