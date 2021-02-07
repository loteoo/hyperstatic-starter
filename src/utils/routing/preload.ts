import fx from '../fx'

const preload = fx((dispatch, props) => {
  // @ts-ignore
  const cachedUrl = window?.HYPERSTATIC_DATA?.cache[props.url]
  
  const url = cachedUrl ?? props.url;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // @ts-expect-error
      if (window.cacheData) {
        // @ts-expect-error
        window.cacheData(props.url, data)
      }
      dispatch(props.action, data)
    })
    .catch(err => dispatch(props.error, err))
})

export default preload
