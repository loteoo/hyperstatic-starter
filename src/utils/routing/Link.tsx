import { h } from 'hyperapp'
import { SetPathAsInitialized, SetRouteStatus } from './actions'
import { loadRoute } from './loadRoute'
import { navigate } from './navigate'

const Link = ({ href, ...rest }, children) => ({ meta, getLocation }) => {
  const location = getLocation(href)
  const { route, path } = location

  if (!route) {
    const DumbNavigate = (state: State, ev) => {
      ev.preventDefault()
      return [state, navigate(href)]
    }
    return h(
      'a',
      {
        href,
        onclick: DumbNavigate,
        ...rest
      },
      children
    )
  }

  // @ts-expect-error
  if (window.registerPath) {
    // @ts-expect-error
    window.registerPath(path)
  }

  const RequestNavigation = (state: State, ev) => {
    ev.preventDefault()
    // If target route isn't loaded, load it
    if (!state.routes[route]?.status) {
      return [
        SetRouteStatus(state, { route, status: 'loading' }),
        loadRoute({ route, path, meta, location }),
        navigate(href)
      ]
    }

    // If current path isn't initialized
    if (
      typeof meta[route].bundle?.init === 'function' &&
      !state.routes[route]?.initialized[path]
    ) {
      const stateWithPathInitialized = SetPathAsInitialized(state, {
        route,
        path
      })
      const action = meta[route].bundle?.init(
        stateWithPathInitialized,
        location
      )
      if (Array.isArray(action)) {
        action.push(navigate(href))
        return action
      }
      return [action, navigate(href)]
    }

    return [state, navigate(href)]
  }

  const PreloadPage = (state: State, _ev) => {
    // If target route isn't loaded, load it
    if (!state.routes[route]?.status) {
      return [
        SetRouteStatus(state, { route, status: 'loading' }),
        loadRoute({ route, path, meta, location })
      ]
    }

    // If current path isn't initialized
    if (
      typeof meta[route].bundle?.init === 'function' &&
      !state.routes[route]?.initialized[path]
    ) {
      const stateWithPathInitialized = SetPathAsInitialized(state, {
        route,
        path
      })
      const action = meta[route].bundle?.init(
        stateWithPathInitialized,
        location
      )
      return action
    }

    return state
  }

  return h(
    'a',
    {
      href,
      onclick: RequestNavigation,
      onmouseover: PreloadPage,
      onfocus: PreloadPage,
      ...rest
    },
    children
  )
}

export default Link
