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

export const findOverlapAndNotInclude = ageRangeList => {
  // 填補數字區間
  // ex. [[5,8], [10, undefined], [12,15]] => [[5,6,7,8], [10], [12,13,14,15]]
  const list = ageRangeList && ageRangeList.map(range => {
    const [start, end] = range
    const expandedRange = []

    if (range.length === 1) {
      if (start === undefined && end) return [end]
      if (end === undefined && start) return [start]
      if (start === undefined && end === undefined) return []
    } else {      
      for (let i = start; i <= end; i++) {
        expandedRange.push(i)
      }
    }
    return expandedRange
  })
  // console.log('list:', list)

  // 將list攤平並重新排列
  const flatList = list.flat().sort((a, b) => a - b)
  // ex. [ 0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
  // console.log('flatList:', flatList)

  // 找出 flatList 中重複的數字
  const countMap = {}
  const duplicatedList = []

  flatList.forEach(num => {
    if (countMap[num]) {
      // 每個數字再次出現 countMap[num]++
      countMap[num]++
      if (countMap[num] === 2) {
        // countMap[num]等於2時，表示一定重複
        // duplicatedList陣列push重複的值
        duplicatedList.push(num)
      }
    } else {
      // 每個數字第一次
      countMap[num] = 1
    }
  })

  // ex. duplicatedList = [3, 4, 5, 6, 7, 9, 10, 11, 12]
  // console.log('duplicatedList:', duplicatedList)

  // 將連續且重複的數字範圍轉換成頭尾格式
  // ex. [ [3, 7], [9, 12] ]
  const duplicatedResult = []
  let duplicatedRange = []

  for (let i = 0; i < duplicatedList.length; i++) {
    if (i === 0 || duplicatedList[i] === duplicatedList[i - 1] + 1) {
        //  找出從i=0之後的連續數字 ex. [3] => [3,4] => [3,4,5] => ...
        duplicatedRange.push(duplicatedList[i])
    } else {
        // 連續數字中斷後，先把第一組 duplicatedRange push進duplicatedResult ex. [3,4,5,6,7]
        duplicatedResult.push(duplicatedRange)
        // 新的 duplicatedRange 從斷開後的值開始 ex. [9]
        duplicatedRange = [duplicatedList[i]] 
    }
  }

  // 最後如有非連號的單一重複數字
  if (duplicatedRange.length > 0) {
    duplicatedResult.push(duplicatedRange)
  }

  // duplicatedResult = [ [3,4,5,6,7], [9,10,11,12] ]
  // subArray保留頭尾的值
  const duplicatedFormattedResult = duplicatedResult.map(subArray => [subArray[0], subArray[subArray.length - 1]])
  // duplicatedFormattedResult = [ [3, 7], [9, 12] ]
  // console.log('duplicatedFormattedResult:', duplicatedFormattedResult)

  // 找出不在0~20的數字
  const rangeStart = 0
  const rangeEnd = 20

  // new Set出唯一值
  const includedNumbers = new Set(flatList)
  const notIncluded = [];

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!includedNumbers.has(i)) {
        notIncluded.push(i)
    }
  }

  // [15, 16, 17, 18, 19, 20]
  // console.log('notIncluded:', notIncluded)

  const notIncludedResult = []
  let notIncludedRange = []

  // 同重複值的做法，找出連續的數字
  for (let i = 0; i < notIncluded.length; i++) {
    if (i === 0 || notIncluded[i] === notIncluded[i - 1] + 1) {
        notIncludedRange.push(notIncluded[i]);
    } else {
        notIncludedResult.push(notIncludedRange);
        notIncludedRange = [notIncluded[i]];
    }
  }

  if (notIncludedRange.length > 0) {
    notIncludedResult.push(notIncludedRange);
  }

  // notIncludedResult = [[15,16,17,18,19,20]]
  // subArray保留頭尾的值
  const notIncludeFormattedResult = notIncludedResult.map(subArray => [subArray[0], subArray[subArray.length - 1]]);
  // notIncludeFormattedResult = [15, 20]
  // console.log('notIncludeFormattedResult:', notIncludeFormattedResult)

  // { overlap: [ [7,7] ], notInclude: [ [0,1], [8,11], [19,20]] }
  // 把相同的值縮減成一個element
  const overlap = duplicatedFormattedResult.map(result => {
    if (result[0] === result[1]) {
      return [result[0]]
    } else {
      return result
    } 
  })

  const notInclude = notIncludeFormattedResult.map(result => {
    if (result[0] === result[1]) {
      return [result[0]]
    } else {
      return result
    } 
  })

  return { overlap, notInclude }
}
