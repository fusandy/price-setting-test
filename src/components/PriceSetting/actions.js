export const formatNumberWithCommas = value => {
  const numberString = value.toString()
  const decimalIndex = numberString.indexOf('.')
  let interger
  let returnValue

  if (decimalIndex !== -1) {
    interger = numberString.slice(0, decimalIndex)
  } else {
    interger = numberString
  }

  const intergerPart = interger.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  if (decimalIndex !== -1) {
    const decimalPart = numberString.slice(decimalIndex)
    returnValue = intergerPart + decimalPart
  } else {
    returnValue = intergerPart
  }

  return returnValue
}