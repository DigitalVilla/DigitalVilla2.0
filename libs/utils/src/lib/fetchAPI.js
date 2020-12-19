export const fetchAPI = async ({
  api,
  body = {},
  options = {},
  method = 'POST',
}) => {
  const ops = {
    method,
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    if (method !== 'GET' && method !== 'HEAD') ops.body = JSON.stringify(body)
    const response = await fetch(api, { ...ops, ...options })
    if (response.status >= 200 && response.status <= 299) {
      const body = await response.json()
      return body
    } else {
      throw Error(response)
    }
  } catch (error) {
    return { error: error.message }
  }
}
