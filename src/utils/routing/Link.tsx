import { h } from 'hyperapp'
import { loadRoute } from './loadRoute'
import { navigate } from './navigate'

const Link = ({ href, ...rest }, children) => ({ meta, getLocation }) => {
  const { route } = getLocation(href)

  const HandleClick = (state: State, ev) => {
    ev.preventDefault()

    const actionArray = [state, navigate(href)]

    if (state.routes[route].status === 'iddle') {
      actionArray.push(loadRoute({ route, meta }))
    }

    return actionArray
  }
  // const { route } = getLocation(href)
  // if (!meta[route].bundle) {
  //   meta[route].promise.then((bundle) => {
  //     meta[route].bundle = bundle
  //   })
  // }
  return h('a', { href, onclick: HandleClick, ...rest }, children)
}

export default Link
