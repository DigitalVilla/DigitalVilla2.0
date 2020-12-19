import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export function useDatePicker({ startDate, maxDate, minDate }) {
  const [date, setDate] = useState(startDate)
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  let latestYear = maxDate.getFullYear() + 1
  let dateIndex = 1
  let lastDayPrev =
    new Date(date.getFullYear(), date.getMonth(), 0).getDate() - (startDay - 1)
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()
  const store = useRef({
    years: [...Array(maxDate.getFullYear() - minDate.getFullYear() + 1)].map(
      () => --latestYear
    ),
  })

  const setDateParam = (dateValue, param) => {
    const newDate = new Date(
      date.getFullYear(),
      param === 'prev'
        ? date.getMonth() - 1
        : param === 'next'
        ? date.getMonth() + 1
        : date.getMonth(),
      dateValue
    )

    return newDate.setHours(23, 59, 59) < minDate ||
      newDate.setHours(0, 0, 0) > maxDate
      ? 'disabled'
      : param
  }

  const prevDays = [...Array(startDay)].map((el, i) => ({
    day: lastDayPrev++,
    param: setDateParam(lastDayPrev - 1, 'prev'),
  }))

  const currentDays = [...Array(lastDate)].map(() => ({
    day: dateIndex++,
    param: setDateParam(dateIndex - 1, 'current'),
  }))

  const nextDays = [...Array(42 - (prevDays.length + currentDays.length))].map(
    (el, i) => ({
      day: i + 1,
      param: setDateParam(i + 1, 'next'),
    })
  )

  const navigateDate = (navigateBy, param) => {
    if (param === 'prev') {
      const prevDate = new Date(
        navigateBy === 'year' ? date.getFullYear() - 1 : date.getFullYear(),
        navigateBy === 'month' ? date.getMonth() - 1 : date.getMonth(),
        date.getDate()
      )
      setDate(prevDate > minDate ? prevDate : minDate)
    } else if (param === 'next') {
      const nextDate = new Date(
        navigateBy === 'year' ? date.getFullYear() + 1 : date.getFullYear(),
        navigateBy === 'month' ? date.getMonth() + 1 : date.getMonth(),
        date.getDate()
      )
      setDate(nextDate < maxDate ? nextDate : maxDate)
    }
  }

  const setNewDate = (newDate) => {
    const validDate = getValidDate(newDate)
    if (!validDate) return false
    if (validDate < minDate || validDate > maxDate) return false
    setDate(new Date(newDate))
    return true
  }

  const pickDate = ({ target }) => {
    const name = target.name ? target.name : 'day'
    let month = name === 'month' ? Number(target.value) : date.getMonth()
    const year = name === 'year' ? Number(target.value) : date.getFullYear()
    let dateNumber = date.getDate()

    if (name === 'day') {
      const param = target.getAttribute('data-param')
      dateNumber = Number(target.getAttribute('data-date'))
      if (param === 'disabled') return
      if (param === 'prev') month = month - 1
      if (param === 'next') month = month + 1
    }

    setDate(new Date(year, month, dateNumber))
  }

  return {
    date,
    pickDate,
    setNewDate,
    navigateDate,
    years: store.current.years,
    months,
    weekdays,
    days: [...prevDays, ...currentDays, ...nextDays],
  }
}

export function getValidDate(newDate, throwError) {
  if (newDate instanceof Date) return newDate
  const dates = newDate.split('/')
  let isValid = Number.isInteger(Number(dates.join('')))
  if (isValid && dates.length !== 3) isValid = false

  const month = dates[0]
  const date = dates[1]
  const year = dates[2]

  if (isValid && month.length !== 2) isValid = false
  if (isValid && date.length !== 2) isValid = false
  if (isValid && year.length !== 4) isValid = false

  if (isValid && Number(month) > 12) isValid = false
  if (isValid && Number(date) > 31) isValid = false
  if (isValid) return new Date(newDate)

  if (throwError) {
    throw new Error(
      `Verify [${newDate}] follows [mm/dd/yyyy] and months do not exceed [12] or days [31]`
    )
  }

  return false
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

useDatePicker.propTypes = {
  paramsObject: PropTypes.shape({
    maxDate: PropTypes.instanceOf(Date).isRequired,
    minDate: PropTypes.instanceOf(Date).isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
  }),
}

export default useDatePicker
