export const formatNumberWithCommas = value => {
  // 找到小數點的Index
  const decimalIndex = value.indexOf('.')

  let interger
  let returnValue

  if (decimalIndex !== -1) {
    // 如果有小數, 切出整數
    interger = value.slice(0, decimalIndex)
  } else {
    interger = value
  }

  // 整數每三位加上逗號
  const intergerPart = interger.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  if (decimalIndex !== -1) {
    // 有分好的正數 + 小數
    const decimalPart = value.slice(decimalIndex)
    returnValue = intergerPart + decimalPart
  } else {
    returnValue = intergerPart
  }

  return returnValue
}

export const findOverlapAndNotInclude = ageRangeList => {
  // console.log(`ageRangeList: ${ageRangeList}`)
  // 填補數字區間

  // ex. input => [[0, 6], [3, 8], [7, 12], [11, 15]]
  const list = ageRangeList && ageRangeList.map(range => {
    // =============== find overlap ====================
    const [start, end] = range
    let expandedRange = []

    if (range.length === 1) {
      if (start) { expandedRange.push(start) }
      if (end) { expandedRange.push(end)}
    } else {      
      for (let i = start; i <= end; i++) {
        expandedRange.push(i)
      }
    }
    return expandedRange
  })

  // expect output => [[0, 1, 2, 3, 4, 5, 6], [3, 4, 5, 6, 7, 8], [7, 8, 9, 10, 11, 12], [11, 12, 13, 14, 15]]
  // console.log('list:', list)

  // 將list攤平並重新排列
  const flatList = list.flat().sort((a, b) => a - b)
  // expect output => [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 11, 11, 12, 12, 13, 14, 15]
  // console.log('flatList:', flatList)

  // 找出 flatList 中重複的數字
  const countMap = {}
  const duplicatedList = []

  flatList.forEach(num => {
    if (countMap[num]) {
      // 每個數字再次出現 countMap[num]++
      countMap[num]++

      // expect output => {"0":1,"1":1,"2":1,"3":2,"4":2,"5":2,"6":2,"7":2,"8":2,"9":1,"10":1,"11":2,"12":2}
      if (countMap[num] === 2) {
        // countMap[num]大於等於2時，表示一定重複
        // duplicatedList陣列push重複的值
        duplicatedList.push(num)
      }
    } else {
      // 每個數字第一次
      countMap[num] = 1
    }
  })

  // expect output => [3, 4, 5, 6, 7, 8, 11, 12]
  // console.log('duplicatedList:', duplicatedList)

  // 找出重複數字的連號關係
  const duplicatedResult = []
  let duplicatedRange = []

  for (let i = 0; i < duplicatedList.length; i++) {
    if (i === 0 || duplicatedList[i] === duplicatedList[i - 1] + 1) {
        //  找出從i=0之後的連續數字 ex. [3] => [3,4] => [3,4,5] => ...
        duplicatedRange.push(duplicatedList[i])
        // console.log(`i: ${i}, duplicatedRange: ${duplicatedRange}`)
    } else {
        // 連續數字中斷後，先把第一組 duplicatedRange push進duplicatedResult ex. [3, 4, 5, 6, 7, 8]
        duplicatedResult.push(duplicatedRange)
        // 新的 duplicatedRange 從斷開後的值開始 ex. [11]
        duplicatedRange = [duplicatedList[i]] 
    }
  }

  // expect output => [[3, 4, 5, 6, 7, 8], [11,12]]
  // console.log(`duplicatedResult: ${duplicatedResult}`)

  // 最後如有非連號的單一重複數字
  if (duplicatedRange.length > 0) {
    duplicatedResult.push(duplicatedRange)
  }

  // subArray保留頭尾的值
  const duplicatedFormattedResult = duplicatedResult.map(subArray => {
    if (subArray.length === 1) {
      return subArray
    } else {
      return [subArray[0], subArray[subArray.length - 1]]
    }
  })
  // expect output => [[3, 8], [11, 12]]
  // console.log('duplicatedFormattedResult:', duplicatedFormattedResult)

  // =============== find not include ====================
  // 找出不在0 ~ 20的數字
  const rangeStart = 0
  const rangeEnd = 20

  // new Set出唯一值
  const includedNumbers = new Set(flatList)
  const notIncluded = []

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!includedNumbers.has(i)) {
        notIncluded.push(i)
    }
  }

  // expect output => [16, 17, 18, 19, 20]
  // console.log('notIncluded:', notIncluded)

  const notIncludedResult = []
  let notIncludedRange = []

  // 找出未包含數字的連號關係
  for (let i = 0; i < notIncluded.length; i++) {
    if (i === 0 || notIncluded[i] === notIncluded[i - 1] + 1) {
        notIncludedRange.push(notIncluded[i])
    } else {
        notIncludedResult.push(notIncludedRange)
        notIncludedRange = [notIncluded[i]]
    }
  }

  if (notIncludedRange.length > 0) {
    notIncludedResult.push(notIncludedRange)
  }

  // expect output => [16, 17, 18, 19, 20]
  // console.log(`notIncludedResult: ${notIncludedResult}`)

  // subArray保留頭尾的值
  const notIncludeFormattedResult = notIncludedResult.map(subArray => {
    if (subArray.length === 1) {
      return subArray
    } else {
      return [subArray[0], subArray[subArray.length - 1]]
    }
  })
  // expect output => [16, 20]
  // console.log('notIncludeFormattedResult:', notIncludeFormattedResult)

  return {
    overlap: duplicatedFormattedResult,
    notInclude: notIncludeFormattedResult
  }
}
