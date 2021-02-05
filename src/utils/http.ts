import fx from './fx'

const http = fx((dispatch, props) =>
  fetch(props.url)
    .then(response => response.json())
    .then(data => dispatch(props.action, data))
    .catch(err => dispatch(props.error, err))
)

export default http
