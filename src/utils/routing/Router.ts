import { text } from 'hyperapp'
import { navigate } from './navigate'

const Router = () => ({ state, routes, meta }) => {


  const { route } = state.location
  const view = meta[route]?.bundle?.default;
  if (view) {
    return view(state)
  }


  return text('yeet')
}

export default Router
