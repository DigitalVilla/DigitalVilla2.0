import { useState } from 'react'

/**
 * @summary Handles localStorage actions to set and get data
 *
 * @param {String} key
 * @param {String} initialValue
 * @returns [
 *      storedValue, parsed JSON
 *      setValue, function to update storedValue
 *   ]
 */
export default function useLocalStorage(key, initialValue = '') {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check first if  value exist in local storage
      const item = window.localStorage.getItem(key)
      // Return initial value
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value, persist) => {
    try {
      // Allow value to be a callback function
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      // Update state
      !persist && setStoredValue(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  const removeValue = (persist) => {
    window.localStorage.removeItem(key)
    !persist && setStoredValue(null)
  }

  return [storedValue, setValue, removeValue]
}
