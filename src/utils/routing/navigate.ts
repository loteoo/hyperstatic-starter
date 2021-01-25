import fx from './fx'

export const navigate = fx((dispatch, to) => {
  history.pushState(null, '', to)
  dispatchEvent(new CustomEvent("pushstate"))
  window.scroll({
    top: 0
  })
})
