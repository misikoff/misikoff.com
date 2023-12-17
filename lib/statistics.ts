export function combinations(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k))
}

export function factorial(n: number): number {
  let result = 1
  while (n > 1) {
    result *= n
    n--
  }
  return result
}
export function expectedValue(
  results: number[],
  probabilities: number[],
): number {
  let weightedAvg = 0
  if (results.length === probabilities.length) {
    for (let i = 0; i < results.length; i += 1) {
      weightedAvg += results[i] * probabilities[i]
    }
    return weightedAvg
  } else {
    return 0
  }
}

export function median(list: number[]): number {
  const length = list.length
  if (length === 0) {
    return 0
  }
  const middle = Math.round(length / 2)
  if (length % 2) {
    return list[middle - 1]
  } else {
    return (list[middle - 1] + list[middle]) / 2
  }
}

export function geometricMean(list: number[]): number {
  let product = 1
  for (const num of list) {
    product *= num
  }
  return Math.pow(product, 1 / list.length)
}
