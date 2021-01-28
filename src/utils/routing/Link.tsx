import { h } from 'hyperapp'
import { SetRouteState } from './actions'
import { loadRoute } from './loadRoute'
import { navigate } from './navigate'

const Link = ({ href, ...rest }, children) => ({ meta, getLocation }) => {
  const { route } = getLocation(href)

  const HandleClick = (state: State, ev) => {
    ev.preventDefault()
    if (state.routes[route].status === 'iddle') {
      return [
        SetRouteState(state, { route, update: { status: 'loading' } }),
        loadRoute({ route, meta }),
        navigate(href)
      ]
    }
    return [state, navigate(href)]
  }

  const HandleHover = (state: State, _ev) => {
    if (state.routes[route].status === 'iddle') {
      return [
        SetRouteState(state, { route, update: { status: 'loading' } }),
        loadRoute({ route, meta })
      ]
    }
    return state
  }

  return h(
    'a',
    { href, onclick: HandleClick, onmouseover: HandleHover, ...rest },
    children
  )
}

export default Link
