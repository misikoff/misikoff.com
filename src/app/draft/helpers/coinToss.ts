import EventEmitter from 'events'

import { combinations, expectedValue, median } from '../lib/statistics'
import { getRandomBoolean, shuffle, sleep } from '../lib/utilityFunctions'

type BoundType = { [key: string]: number[] }
const BOUNDS = {
  numTosses: [1, 20],
  headsFactor: [-100, 100],
  tailsFactor: [-100, 100],
  startVal: [1, 100],
} as BoundType

function handleBounds(value: number, boundKey: string) {
  if (value < BOUNDS[boundKey][0]) {
    return BOUNDS[boundKey][0]
  } else if (value > BOUNDS[boundKey][1]) {
    return BOUNDS[boundKey][1]
  } else {
    return value
  }
}
export class CoinTossGame extends EventEmitter {
  private ready = true
  public playedAlready = false
  private pass = false
  private tosses = [] as boolean[]
  public values = [] as number[]
  public results = [] as number[]
  public probabilities = [] as number[]

  constructor(
    public startVal = 100,
    public headsFactor = 50,
    public tailsFactor = -40,
    public numTosses = 10,
  ) {
    super()
    this.setNorm()
  }

  public curExpValue() {
    return expectedValue(this.results, this.probabilities)
  }

  public curMedian() {
    return median(this.results)
  }

  public curVal() {
    if (!this.values.length) {
      return this.startVal
    } else {
      return this.values[this.values.length - 1]
    }
  }

  public headsCount() {
    return this.tosses.filter((t) => {
      return t
    }).length
  }

  public setStartVal(value: number) {
    this.startVal = handleBounds(value, 'startVal')
    this.handleChangeMade()

    return this.startVal
  }

  public setNumTosses(value: number) {
    const newTosses = handleBounds(value, 'numTosses')

    if (newTosses !== this.numTosses) {
      if (this.ready && this.playedAlready) {
        if (newTosses > this.tosses.length) {
          for (let i = 0; i < newTosses - this.tosses.length; i++) {
            const newToss = getRandomBoolean()

            this.tosses.push(newToss)
            this.values.push(this.getNextVal(newToss, this.curVal()))
          }
        } else {
          this.tosses = this.tosses.slice(0, newTosses)
          this.values = this.values.slice(0, newTosses)
        }
        this.emit('event', this.values)
      }
      this.numTosses = newTosses
      this.setNorm()
    }

    return this.numTosses
  }

  public setHeadsFactor(value: number) {
    this.headsFactor = handleBounds(value, 'headsFactor')
    this.handleChangeMade()

    return this.headsFactor
  }

  public setTailsFactor(value: number) {
    this.tailsFactor = handleBounds(value, 'tailsFactor')
    this.handleChangeMade()

    return this.tailsFactor
  }

  public shuffleTosses() {
    if (this.ready) {
      this.tosses = shuffle(this.tosses)
      this.rerunWithNewFactor()
    }
  }

  public async begin(pass = false) {
    this.ready = false
    this.emit('ready', this.ready)

    this.pass = pass
    this.emit('pass', this.pass)

    if (this.pass) {
      await sleep(1200)
    }
    this.values = [this.startVal]

    this.tosses = []
    for (let i = 0; i < this.numTosses; i++) {
      this.tosses.push(getRandomBoolean())
    }

    for (let i = 0; i < this.tosses.length; i++) {
      this.go(this.tosses[i])
      await sleep(3000 / this.tosses.length)
    }

    this.ready = true
    this.emit('ready', this.ready)

    this.playedAlready = true
    this.emit(
      'played',
      //   this.values[
      //     this.values.length - 1
      //   ]
    )
  }

  private setNorm() {
    let probabilities = []
    let results = []
    const numWays = Math.pow(2, this.numTosses)
    for (let i = 0; i <= this.numTosses; i += 1) {
      const prob = combinations(this.numTosses, i) / numWays
      probabilities.push(prob)
      results.push(
        this.startVal *
          Math.pow(1 + this.headsFactor / 100, i) *
          Math.pow(1 + this.tailsFactor / 100, this.numTosses - i),
      )
    }

    this.results = results
    this.probabilities = probabilities
    this.emit('updated-norm', {
      probabilities: this.probabilities,
      results: this.results,
    })
  }

  private rerunWithNewFactor() {
    this.values = []
    this.values.push(Number(this.startVal))

    for (let i = 0; i < this.tosses.length; i += 1) {
      const curVal = this.values[i]
      const nextVal = this.getNextVal(this.tosses[i], curVal)

      this.values.push(nextVal)
    }

    this.emit('event', this.values)
  }

  private getNextVal(coinToss: boolean, curVal: number) {
    if (coinToss) {
      return curVal * (1 + this.headsFactor / 100)
    } else {
      return curVal * (1 + this.tailsFactor / 100)
    }
  }

  private go(coinToss: boolean) {
    const curVal = this.values[this.values.length - 1]
    const nextVal = this.getNextVal(coinToss, curVal)

    this.values.push(nextVal)

    this.emit('event', this.values)
  }

  private handleChangeMade() {
    if (this.ready) {
      this.rerunWithNewFactor()
    }
    this.setNorm()
  }
}
