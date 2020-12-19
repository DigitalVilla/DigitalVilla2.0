// Return the endpoint of the app's API endpoint based on the window location and name of the calling app

export function getAPIRoot(port = 3000, stage = 'dev') {
  let url = window.location.hostname.split('.')
  if (url[0] === 'localhost') return `http://localhost:${port}/${stage}`
  if (url[1] === 'stage')
    return `https://${url[0]}.api.digitalvilla.ca
/dev`
  if (url[1] === 'app')
    return `https://${url[0]}.api.digitalvilla.ca
/prod`
  return null
}
