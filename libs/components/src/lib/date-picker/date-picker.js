import React, { useState, useEffect, useRef } from 'react'
import { useDatePicker, getValidDate } from './useDatePicker'
import { useAccessibleModal } from '@digitalvilla/hooks'
import { Input, Select } from '../formComponents'
import { SVGButton } from '../svg/svg'
import PropTypes from 'prop-types'
import './date-picker.scss'

export function DatePicker({
  onDateChange,
  startDate,
  maxDate,
  minDate,
  navigateBy,
}) {
  const [dateInput, setDateInput] = useState('')
  const [state, setState] = useState('idle')
  const store = useRef({
    datePicked: false,
    hasDate: false,
    usedDeleteKey: false,
    errorMessage: '',
  })
  const {
    date,
    pickDate,
    navigateDate,
    setNewDate,
    years,
    months,
    weekdays,
    days,
  } = useDatePicker({
    startDate: getValidDate(startDate, true),
    maxDate: getValidDate(maxDate, true),
    minDate: getValidDate(minDate, true),
  })
  const [
    isModalOpen,
    toggleModal,
    handleEscapeKey,
    triggerRef,
    targetRef,
  ] = useAccessibleModal('datePickerModal')

  useEffect(() => {
    if (store.current.datePicked) {
      setDateInput(
        `${trailingZero(date.getMonth() + 1)}/${trailingZero(
          date.getDate()
        )}/${date.getFullYear()}`
      )
    }
  }, [date])

  useEffect(() => {
    if (
      store.current.datePicked ||
      (dateInput.length === 10 &&
        dateInput.split('/').length === 3 &&
        setNewDate(dateInput))
    ) {
      store.current.hasDate = true
      onDateChange(dateInput)
      setState('idle')
    } else if (store.current.hasDate) {
      store.current.hasDate = false
      onDateChange('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateInput])

  const dateChange = ({ target: { value } }) => {
    store.current.datePicked = false
    const val = value.split('/').join('')
    const isValid = new RegExp(/^\d+$/).test(val)
    if (val.length && (!isValid || val.length > 8)) return
    setDateInput(value)
    setState('idle')
  }

  const handleDay = (e) => {
    if (e.target.getAttribute('data-param') !== 'disabled') {
      toggleModal(false)
      pickDate(e)
    }
  }

  const handleBlur = () => {
    if (dateInput.length === 0) return
    if (dateInput.length !== 10 || dateInput.split('/').length !== 3) {
      store.current.errorMessage = `Enter a valid date as MM/DD/YYYY`
    } else if (!setNewDate(dateInput)) {
      store.current.errorMessage = `Date must be between ${minDate} and ${maxDate}`
    } else return
    return setState('error')
  }

  const handleCalendarClick = () => {
    store.current.datePicked = true
    toggleModal()
  }

  return (
    <div className='date-picker'>
      <div className='input-container'>
        <Input
          label='Date of Birth'
          name='date'
          className='input'
          type='text'
          placeholder='MM/DD/YYYY'
          autoComplete='off'
          value={dateInput}
          onChange={dateChange}
          onBlur={handleBlur}
          maxLength={10}
          hasError={state === 'error'}
          errorMessageIcon={'warning'}
          errorMessage={store.current.errorMessage}
          required
        >
          <SVGButton
            icon='calendar'
            className={`date-picker-icon ${isModalOpen && 'active'}`}
            onClick={handleCalendarClick}
            reference={triggerRef}
          />
        </Input>
      </div>

      <div
        id='datePickerModal'
        className={`date-picker-modal noSelect ${isModalOpen && 'active'}`}
        onKeyDown={handleEscapeKey}
      >
        <div className='header'>
          <div className='controls'>
            <SVGButton
              icon={'chevronLeft'}
              className='date-picker-chevron'
              onClick={() => navigateDate(navigateBy, 'prev')}
              aria-label='Previous year'
            />

            <Select
              name='month'
              label='Select month'
              value={date.getMonth() + ''}
              onChange={pickDate}
              reference={targetRef}
              noLabel
            >
              {months.map((month, i) => {
                return (
                  <option key={month} value={i + ''}>
                    {month}
                  </option>
                )
              })}
            </Select>

            <Select
              name='year'
              label='Select year'
              value={date.getFullYear() + ''}
              onChange={pickDate}
              noLabel
            >
              {years.map((year) => {
                return (
                  <option key={year} value={year + ''}>
                    {year}
                  </option>
                )
              })}
            </Select>

            <SVGButton
              icon={'chevronRight'}
              className='date-picker-chevron'
              onClick={() => navigateDate(navigateBy, 'next')}
              aria-label='Next year'
            />
          </div>
        </div>
        <div className='body'>
          <div className='weekdays grid gutter-0 bleed-0'>
            {weekdays.map((day, i) => {
              return (
                <div className='cell cell-7 ' key={day + i} value={day}>
                  {day}
                </div>
              )
            })}
          </div>
          <ul className='days grid gutter-1 bleed-0' onClick={handleDay}>
            {days.map((d, i) => {
              return (
                <li
                  key={`${d.param}-${d.day}-${i}`}
                  data-date={d.day}
                  data-param={d.param}
                  className={`cell cell-7 ${d.param} ${
                    d.param === 'disabled'
                  } ${date.getDate() === d.day && 'active'}`}
                  aria-label={d.day}
                >
                  {d.day}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  navigateBy: PropTypes.oneOf(['month', 'year']),
  maxDate: PropTypes.oneOfType([
    PropTypes.string /* format: mm/dd/yyyy */,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  minDate: PropTypes.oneOfType([
    PropTypes.string /* format: mm/dd/yyyy */,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.string /* format: mm/dd/yyyy */,
    PropTypes.instanceOf(Date),
  ]).isRequired,
}

const trailingZero = (num) => (String(num).length < 2 ? `0${num}` : num)
