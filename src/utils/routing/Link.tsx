import { h } from 'hyperapp'
import { navigate } from './navigate'

const Link = ({ href, ...rest }, children) => ({ getLocation, PreloadPage }) => {
  const location = getLocation(href)
  const { route, path } = location

  if (!route) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid link pointing to ${href} will 404.`);
    }
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
    const action = PreloadPage(state, href);
    if (Array.isArray(action)) {
      action.push(navigate(href))
      return action
    }
    return [action, navigate(href)]
  }

  const PreloadPageHandler = (state: State, _ev) => {
    return PreloadPage(state, href);
  }

  return h(
    'a',
    {
      href,
      onclick: RequestNavigation,
      onmouseover: PreloadPageHandler,
      onfocus: PreloadPageHandler,
      ...rest
    },
    children
  )
}

export default Link
