import statisticsFunctions from 'lib/statistics'
import utilityFunctions from 'lib/utilityFunctions'
const EventEmitter = require('events')

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
    public numTosses = 10
  ) {
    super()
    this.setNorm()
  }

  public curExpValue() {
    return statisticsFunctions.expectedValue(this.results, this.probabilities)
  }

  public curMedian() {
    return statisticsFunctions.median(this.results)
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
    if (value > 1000) {
      this.startVal = 1000
    } else if (value < 0) {
      this.startVal = 100
    } else {
      this.startVal = value
    }

    this.handleChangeMade()

    return this.startVal
  }

  public setNumTosses(newTosses: number) {
    if (newTosses < 0) {
      newTosses = 0
    } else if (newTosses > 100) {
      newTosses = 100
    }

    if (newTosses !== this.numTosses) {
      if (this.ready && this.playedAlready) {
        if (newTosses > this.tosses.length) {
          for (let i = 0; i < newTosses - this.tosses.length; i++) {
            const newToss = this.getRandomBoolean()

            this.tosses.push(newToss)
            this.values.push(this.getNextVal(newToss, this.curVal()))
          }
        } else {
          for (let i = 0; i < this.tosses.length - newTosses; i++) {
            this.tosses.pop()
            this.values.pop()
          }
        }
        this.emit('event', this.values)
      }
      this.numTosses = newTosses
      this.setNorm()
    }

    return this.numTosses
  }

  public setHeadsFactor(value: number) {
    if (value > 100) {
      this.headsFactor = 100
    } else if (value < -100) {
      this.headsFactor = -100
    } else {
      this.headsFactor = value
    }

    this.handleChangeMade()
    return this.headsFactor
  }

  public setTailsFactor(value: number) {
    if (value > 100) {
      this.tailsFactor = 100
    } else if (value < -100) {
      this.tailsFactor = -100
    } else {
      this.tailsFactor = value
    }

    this.handleChangeMade()
    return this.tailsFactor
  }

  public shuffleTosses() {
    if (this.ready) {
      this.tosses = utilityFunctions.shuffle(this.tosses)
      this.rerunWithNewFactor()
    }
  }

  public async begin(pass = false) {
    this.ready = false
    this.emit('ready', this.ready)

    this.pass = pass
    this.emit('pass', this.pass)

    if (this.pass) {
      await utilityFunctions.sleep(1200)
    }
    this.values = [this.startVal]

    this.tosses = []
    for (let i = 0; i < this.numTosses; i++) {
      this.tosses.push(this.getRandomBoolean())
    }

    for (let i = 0; i < this.tosses.length; i++) {
      this.go(this.tosses[i])
      await utilityFunctions.sleep(3000 / this.tosses.length)
    }

    this.ready = true
    this.emit('ready', this.ready)

    this.playedAlready = true
    this.emit(
      'played'
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
      const prob = statisticsFunctions.combinations(this.numTosses, i) / numWays
      probabilities.push(prob)
      results.push(
        this.startVal *
          Math.pow(1 + this.headsFactor / 100, i) *
          Math.pow(1 + this.tailsFactor / 100, this.numTosses - i)
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

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  private getRandomBoolean() {
    return this.getRandomInt(2) === 1
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
