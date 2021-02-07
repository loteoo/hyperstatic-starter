import { h, text } from 'hyperapp'

const Router = () => ({ state, meta, options }) => {
  const { route, path } = state.location
  const view = meta[route]?.bundle?.default;

  if (view) {
    return view(state)
  }

  // Display custom loader if specified
  if (options.loader && typeof options.loader === 'function') {
    return options.loader(state)
  }

  // Default loader
  return (
    h('div', { style: { padding: '1rem' } }, [
      h('h2', { style: { textAlign: 'center' } }, text('Loading...'))
    ])
  )
}

export default Router
