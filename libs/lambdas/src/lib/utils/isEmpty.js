export const isEmpty = (obj) => {
  if (obj.length !== undefined) return obj.length === 0
  else return Object.keys(obj).length === 0
}
