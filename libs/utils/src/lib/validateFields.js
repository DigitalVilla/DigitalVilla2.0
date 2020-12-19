import { getAreaByCode } from './areaCodes'

export function validateFields(target, regex) {
  target.value = target.value.trim()
  const subField = target.name.split(':')
  const name = subField.length === 2 ? subField[1] : subField[0]
  if (regex) regex = new RegExp(regex)

  switch (name) {
    case 'city':
    case 'firstName':
    case 'lastName':
    case 'fullName':
      regex = regex || new RegExp(/^[a-zA-Z\s-]*$/)
      break
    case 'email':
      regex = regex || new RegExp(/\S+@\S+\.\S+/)
      break
    case 'phone':
      regex =
        regex ||
        new RegExp(
          /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
        )
      break
    case 'number':
      regex = regex || new RegExp(/^\d+$/)
      break
    case 'postalCode':
      regex = regex || new RegExp(/^[A-Z][0-9][A-Z]\\s?[0-9][A-Z][0-9]$/)
      break
    case 'vin':
      regex = regex || new RegExp(/^[a-zA-Z0-9]*$/)
      break
    default:
      regex = regex || new RegExp('')
      break
  }

  const result = {
    isValid: regex.test(target.value),
    message: '',
  }

  if (name === 'phone') {
    const phone = target.value.match(/\d/g)
    if (!result.isValid || phone.length < 10) {
      result.message = 'Enter a 10 digit phone number'
    } else {
      if (phone.length === 11) phone.splice(0, 1)
      const areaCode = phone.join('').substring(0, 3)
      result.isValid = getAreaByCode(Number(areaCode)) !== 'none'
      result.message = 'Enter a valid canadian number'
    }
  }
  if (name === 'number') {
    if (!result.isValid || (result.isValid && Number(target.value) <= 0)) {
      result.isValid = false
      result.message = 'Enter a valid number'
    }
  }
  if (name === 'vin') {
    if (!result.isValid || target.value.length !== 17) {
      result.message = 'Enter a valid 17 digit VIN'
      result.isValid = false
    }
  }
  if (name === 'postalCode') {
    if (!result.isValid || target.value.length > 7 || target.value.length < 7) {
      result.message = 'Enter a valid Canadian postal code'
      result.isValid = false
    }
  }

  return result
}
