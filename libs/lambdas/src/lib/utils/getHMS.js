// Return dates time as 02:06:20
export const getHMS = (d = {}) => {
  const { date = Date.now(), zeroed = true } = d
  let t = new Date(date).toLocaleString().substring(12, 20)
  if (!zeroed) return t
  t = t.split(':').map((el) => padZero(el))
  return t.join(':')
}

function padZero(num) {
  num = Math.floor(num)
  return String(num).length === 1 ? '0' + num : num
}
