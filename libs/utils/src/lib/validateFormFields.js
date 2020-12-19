import { flattenObject } from './flattenObject'

export function validateFormFields(formValues, totalFields) {
  const values = flattenObject(formValues)
  const count = { count: 0 }
  const result = {
    isValid: true,
    missingField: keysLoop(values, count),
  }

  if (result.missingField.length || count.count !== totalFields) {
    result.isValid = false
  }

  return result
}

const keysLoop = (values, count) => {
  for (const [key, value] of Object.entries(values)) {
    count.count = count.count + 1
    if (!value) return `${key}`
  }

  return ''
}
