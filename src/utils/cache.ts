import fx from './fx'

const cache = fx((dispatch, props) => {
    console.log(`Caching data: ${props.key}`)
    // @ts-expect-error
    if (window.cacheData) {
      // @ts-expect-error
      window.cacheData(props.key, props.data)
    }
  }
)

export default cache
