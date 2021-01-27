interface SetRouteStateArgs {
  route: string
  update: Partial<RouteState>
}
export const SetRouteState = (state: State, { route, update }: SetRouteStateArgs): State => ({
  ...state,
  routes: {
    ...state.routes,
    [route]: {
      ...state.routes[route],
      ...update
    }
  }
})

