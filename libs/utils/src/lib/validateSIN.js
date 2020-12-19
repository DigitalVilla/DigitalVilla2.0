/**
 * @summary Luhn formula for SIN validation
 * @param {String} SIN can be separated by dashes and empty spaces
 * @returns {boolean} isValid
 */
export function validateSIN(SIN) {
  // Validate first digit
  const first = parseInt(SIN.charAt(0))
  let isValid = first !== 0 && first !== 8

  // Remove space and dashes and validate length
  const str = isValid ? SIN.replace(/ |-|/g, '') : ''
  isValid = isValid ? str.length === 9 : false

  // Validate it contains just digits
  isValid = isValid ? new RegExp(/^\d+$/).test(str) : false

  // Validate Checksum
  if (isValid) {
    const Luhn = [1, 2, 1, 2, 1, 2, 1, 2, 1]
    const checksum = str.split('').reduce((acc, val, i) => {
      let int = parseInt(val) * Luhn[i]
      int = int > 9 ? (int % 10) + 1 : int
      return acc + int
    }, 0)

    isValid = checksum % 10 === 0
  }

  return isValid
}
