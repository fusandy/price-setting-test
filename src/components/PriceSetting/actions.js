export const formatNumberWithCommas = value => {
  const numberString = value.toString()

  let interger

  const decimalIndex = numberString.indexOf('.')
  if (decimalIndex !== -1) {
    interger = numberString.slice(0, decimalIndex)
  } else {
    interger = numberString
  }

  console.log('interger:', interger)
  const intergerPart = interger.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  console.log('intergerPart:', intergerPart)

  if (decimalIndex !== -1) {
    const decimalPart = numberString.slice(decimalIndex)
    return intergerPart + decimalPart
  } else {
    return intergerPart
  }
}