import fx from '../fx'

const loadStatic = fx(async (dispatch, { key, loader, action, error }) => {
  try {

    // @ts-ignore
    const cachedUrl = window?.HYPERSTATIC_DATA?.cache[key]

    const promise = cachedUrl
      ? fetch(cachedUrl).then(res => res.json())
      : loader()

    const data = await promise;

    // @ts-expect-error
    if (window.cacheData) {
      // @ts-expect-error
      window.cacheData(key, data)
    }

    dispatch(action, data)

  } catch (err) {
    console.error(err)
    dispatch(error, err)
  }
})

export default loadStatic
