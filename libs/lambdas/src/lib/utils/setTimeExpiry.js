export const setTimeExpiry = (duration = 1, interval, timestamp) => {
  const ts = timestamp || Math.floor(Date.now() / 1000)
  switch (interval) {
    case 'minute':
      return ts + Math.floor(duration * 60)
    case 'day':
      return ts + Math.floor(duration * 86400)
    case 'week':
      return ts + Math.floor(duration * (86400 * 7))
    case 'year':
      return ts + Math.floor(duration * 31557600)
    case 'hour':
    default:
      return ts + Math.floor(duration * 3600)
  }
}
