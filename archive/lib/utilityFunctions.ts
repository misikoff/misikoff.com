export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomBoolean(cutOff: number = 0.5) {
  return Math.random() > cutOff
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
