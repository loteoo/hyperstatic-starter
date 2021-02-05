import fx from './fx'

const preload = fx((dispatch, props) =>
  fetch(props.url)
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
)

export default preload
