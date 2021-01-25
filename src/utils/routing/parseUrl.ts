import parseQueryString from './parseQueryString'

const parseUrl = (url) => {
  const [path, qs] = url.split('?')
  return {
    path,
    query: qs ? parseQueryString(qs) : {},
    route: ''
  }
}

export default parseUrl
