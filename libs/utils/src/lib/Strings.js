class STR {
  constructor() {}

  capitalizeAll = (str) => {
    return str
      .split(' ')
      .map((s) => this.capitalize(s))
      .join(' ')
  }

  capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1).toLowerCase()
  }
}

export const Strings = new STR()
