import fx from '/utils/fx'

export const onRouteChanged = fx((dispatch, action) => {
  const handleLocationChange = () => {
    dispatch([action, window.location.pathname + window.location.search])
  }
  addEventListener('pushstate', handleLocationChange)
  addEventListener('popstate', handleLocationChange)
  return () => {
    removeEventListener('pushstate', handleLocationChange)
    removeEventListener('popstate', handleLocationChange)
  }
})

export const onRouteLoaded = fx((dispatch, action) => {
  const handleRouteLoaded = (route) => {
    dispatch([action, route])
  }
  addEventListener('routeload', handleRouteLoaded)
  return () => {
    removeEventListener('routeload', handleRouteLoaded)
  }
})
